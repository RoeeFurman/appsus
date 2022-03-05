import { mailService } from "../services/mail-service.js";
import mailList from "../cmps/mail-list.cmp.js"
import mailFilter from "../cmps/mail-filter.js"
import sideFilter from "../cmps/side-filter.js"
import emailCompose from "../cmps/email-compose.cmp.js"
import { eventBus } from "../../../services/eventBus-service.js";


export default {
    template: `
        <section class="email-app app-main">
    <div class="main-nav">
    <div class="mail-title"><router-link to="/mail">Mail app</router-link></div>
                </div>
                <div class="main-container">
                    <div class="side-search">
                        <side-filter :calcMailsByFolder="calcMailsByFolders" @sortBy="setSort"/>
                        <button v-if="!composeMode" @click="composeMode = !composeMode" class="compose-icon"><img src="img-notes/bx-message-rounded-add.svg" title="Create New Mail"></button>
                    </div>
                    <div class="sec-container" >
                        <mail-filter @filtered="setFilter" @sortByDate="sortByDate" @sortBySubject="sortBySubject"/>
                        <email-compose v-if="composeMode" @mailSent="addMail" @backToMails="backToMails"></email-compose>
                        <mail-list v-else :mails="mailsToShow" @remove="removeMail" @toggleRead="toggleRead" @toggleStar="toggleStar" @markAsRead="markAsRead"/>
                    </div>


                </div>
            </section>
    `,
    components: {
    mailList,
    mailFilter,
    sideFilter,
    emailCompose,
    eventBus
    },
    data() {
        return {
            mails: null,
            filterBy: {
                subject: '',
            },
            sortBy: null,
            setMailsByLatest: true, 
            setMailsBySubject: false,
            composeMode: false,
            currMail: null,
        };
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails);
        eventBus.on('sentContent',this.contentReceived)
    },
    methods: {
        sortBySubject(){
            this.setMailsBySubject = !this.setMailsBySubject
        },
        sortByDate(){
            this.setMailsByLatest = !this.setMailsByLatest
        },
        updateMails(mails){
            this.mails = mails
            // console.log(mails)
        },
        removeMail(id) {
            mailService.get(id).then(mail => {
                if(!mail.isTrash) {
                    mail.isTrash = true;
                    mail.isRead = false;
                    mail.isSent = false;
                mailService.save(mail).then(()=> {
                    mailService.query().then((mails)=> {
                        // console.log(mails)
                        this.mails = mails})
                })
            } else {
                (console.log('already in trash?!'))
                mailService.remove(mail.id).then(()=> {
                    mailService.query().then((mails)=>{
                        // console.log(mails)
                        this.mails = mails
                    })
                }
                )
            }
         })
         eventBus.emit('show-msg', { txt: 'Mail Deleted', type: 'failure' })

        },
        contentReceived(content){
            console.log(content)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        setSort(sortBy) {
            if(this.composeMode) this.composeMode = false;
            // console.log(sortBy)
            this.sortBy = sortBy;
            return this
        },
        toggleRead(id){
            // console.log(id)
            mailService.get(id)
            .then((mail)=>{
                // console.log(mail)
                mail.isRead = !mail.isRead
                mailService.save(mail).then(() => {
                    mailService.query().then(mails => {
                        // console.log(mails)
                        this.mails = mails
                    })
                })
            })
    },
        toggleStar(id){
            // console.log(id, "star")
            mailService.get(id)
            .then((mail)=>{
                // console.log(mail)
                mail.isStarred = !mail.isStarred
                mailService.save(mail).then(() => {
                    mailService.query().then(mails => {
                        // console.log(mails)
                        this.mails = mails
                    })
                })
            })
    },
        addMail(mail){
            this.mails.unshift(mail);
            this.composeMode = false;
    },
    markAsRead(mail){
        this.currMail = mail;
        this.currMail.isRead = true;
        // console.log(this.currMail.isRead, 'currMail')
        mailService.save(this.currMail).then(()=>{
            mailService.query().then(mails => {
                // console.log(mails)
                this.mails = mails
            })

        })
    }, 
    backToMails(){
        this.composeMode = false;
    }
},
    computed: {
        mailsToShow(){
            let filteredMails = this.mails
            
            const regex = new RegExp(this.filterBy.subject, 'i');
            if (!this.filterBy) return filteredMails.sort((c1, c2) => c2.sentAt - c1.sentAt);
            
            if(!this.sortBy) {
                 filteredMails = this.mails.filter(mail => (regex.test(mail.subject) && !mail.isSent && !mail.isDraft && !mail.isTrash));
                } else if(this.sortBy === 'read'){
                 filteredMails = this.mails.filter(mail => (regex.test(mail.subject) && mail.isRead && !mail.isSent && !mail.isTrash && !mail.isDraft))
                } else if(this.sortBy === 'starred'){
                 filteredMails = this.mails.filter(mail => (regex.test(mail.subject) && mail.isStarred))
                } else if(this.sortBy === 'unread'){
                 filteredMails = this.mails.filter(mail => (regex.test(mail.subject) && !mail.isRead && !mail.isTrash && !mail.isDraft  && !mail.isSent))
                } else if(this.sortBy === 'trash'){
                filteredMails = this.mails.filter(mail => (regex.test(mail.subject) && mail.isTrash))
                } else if(this.sortBy === 'sent'){
                filteredMails = this.mails.filter(mail => (regex.test(mail.subject) && mail.isSent))
                } else if(this.sortBy === 'draft'){
                filteredMails = this.mails.filter(mail => (regex.test(mail.subject) && mail.isDraft))
                }
                                
            if(this.setMailsBySubject && this.setMailsByLatest) return filteredMails.sort((c1, c2) => {
               var timeDiff = (c2.sentAt - c1.sentAt);
               if(timeDiff !== 0) return timeDiff
               else return timeDiff = c1.subject.localeCompare(c2.subject)
            })
            
            if (this.setMailsByLatest) return filteredMails.sort((c1, c2) => c2.sentAt - c1.sentAt)
            else if(this.setMailsBySubject) return filteredMails.sort((c1, c2) => {
                var timeDiff = (c1.sentAt - c2.sentAt)
                if(timeDiff !== 0) return timeDiff
                else return timeDiff = c1.subject.localeCompare(c2.subject)
            })
            else return filteredMails.sort((c1, c2) => c1.sentAt - c2.sentAt)

            },

        calcMailsByFolders(){
            return {
                readMails: this.mails.filter(mail => mail.isRead && !mail.isSent && !mail.isTrash && !mail.isDraft).length,
                unreadMails: this.mails.filter(mail => !mail.isRead && !mail.isSent && !mail.isTrash && !mail.isDraft).length,
                trashMails: this.mails.filter(mail => mail.isTrash).length,
            }
            },
        }
};
