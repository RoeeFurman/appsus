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
            <hr><br>
    </div>
                <div class="main-container">
                    <div class="side-search">
                    <side-filter/>
                    </div>
                    <div class="sec-container">
                        <mail-filter @filtered="setFilter" />
                        <mail-list :mails="mailsToShow" @remove="removeMail" />
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
            filterBy: null,

        };
    },
    created() {
        this.unsubscribe = eventBus.on('updatedMails', this.updateMails);
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
        }
    },
    computed: {
        mailsToShow(){
            if (!this.filterBy) return this.mails;
            const regex = new RegExp(this.filterBy.subject, 'i');
            return this.mails.filter(mail => (regex.test(mail.subject) && this.filterBy.isRead === mail.isRead));
        }
        // carsForDisplay() {
        //     if (!this.filterBy) return this.cars;
        //     const regex = new RegExp(this.filterBy.vendor, 'i');
        //     return this.cars.filter(car => regex.test(car.vendor));
        },
        unmounted() {
            this.unsubscribe();
        }
    // },
};
