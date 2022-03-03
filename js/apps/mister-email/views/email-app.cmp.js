import { mailService } from "../services/mail-service.js";
import mailList from "../cmps/mail-list.cmp.js"
import mailFilter from "../cmps/mail-filter.js"
import sideFilter from "../cmps/side-filter.js"
import { eventBus } from "../../../services/eventBus-service.js";


export default {
    template: `
    <div class="main-nav">
        <section class="email-app app-main">
            <h1>Mail app</h1>
            <router-link to="/">Home</router-link>
           <br>
    </div>
                <div class="main-container">
                    <div class="side-search">
                    <side-filter @sortBy="setSort"/>
                    </div>
                    <div class="sec-container">
                        <mail-filter @filtered="setFilter" />
                        <mail-list :mails="mailsToShow" @remove="removeMail" @toggleRead="toggleRead"/>
                    </div>
                </div>
            </section>
    `,
    components: {
    mailList,
    mailFilter,
    sideFilter
    },
    data() {
        return {
            mails: null,
            filterBy: {
                subject: '',
            },
            sortBy: null,

        };
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails);
    },
    methods: {
        updateMails(mails){
            this.mails = mails
            console.log(mails)
        },
        removeMail(id) {
            mailService.remove(id)
                .then(() => {
                    const idx = this.mails.findIndex((mail) => mail.id === id);
                    this.mails.splice(idx, 1);
        //             showSuccessMsg('Deleted succesfully');
                })
        //         .catch(err => {
        //             console.error(err);
        //             showErrorMsg('Error - please try again later')
        //         });
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        setSort(sortBy) {
            console.log(sortBy)
            this.sortBy = sortBy;
            return this
        },
        toggleRead(id){
            console.log(id)
            mailService.get(id)
            .then((mail)=>{
                console.log(mail)
                mail.isRead = !mail.isRead
                mailService.save(mail).then(() => {
                    mailService.query().then(mails => {
                        console.log(mails)
                        this.mails = mails
                    })
                })

            })
    },
},
    computed: {
        mailsToShow(){
            if (!this.filterBy) return this.mails;
            console.log(this.sortBy)
            const regex = new RegExp(this.filterBy.subject, 'i');
            if(!this.sortBy) return this.mails.filter(mail => (regex.test(mail.subject)));
            else if(this.sortBy === 'read') return this.mails.filter(mail => (regex.test(mail.subject) && mail.isRead))
            else if(this.sortBy === 'unread') return this.mails.filter(mail => (regex.test(mail.subject) && !mail.isRead))
            else if(this.sortBy === 'trash') return this.mails.filter(mail => (regex.test(mail.subject) && mail.isTrash))
            else if(this.sortBy === 'sent') return this.mails.filter(mail => (regex.test(mail.subject) && mail.isSent))
            else if(this.sortBy === 'draft') return this.mails.filter(mail => (regex.test(mail.subject) && mail.isDraft))
            }
        }

    // },
};
