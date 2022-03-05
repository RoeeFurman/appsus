import { mailService } from '../services/mail-service.js';
import { eventBus } from '../../../services/eventBus-service.js';

export default {
    template: `
        <section class="email-compose">
            <h1>Compose New Mail:</h1>
            <form @submit.prevent>
            <div class="compose-new-mail">
                <table class="compose-table">
                    <tr>
                        <td class="first-column"><b> To: </b></td>
                        <td><input ref="input" type="email" @input="displayNewMail" v-model="newMail.to" placeholder="maggie@appsus.com" required/></td>
                    </tr>
                    <tr>
                    <td><b>Subject: </b></td>
                    <td><input type="text" @input="displayNewMail" v-model="newMail.subject" placeholder="New Subject" class="subject-input"/></td>
                    </tr>
                    <tr>
                        <td><b>Body: </b></td>
                        <td>
                            <textarea v-model="newMail.body" rows="10" cols="40" placeholder="Your Mail here"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button @click="send">Send <img src="img-notes/bxs-paper-plane.svg"></button>
                            <button @click="moveToDraft">Draft <img src="img-notes/draft-icon.png" class="draft-icon"></button>
                            <button @click="backToMails" class="back-link"><img src="img-notes/bx-left-arrow-circle.svg" class="icon">Back to Mails</button>
                        </td>
                    </tr>
                </table>
            </div>
        </form>
        </section>
    `,
    data() {
        return {
            newMail: {
                // id: '',
                subject: '',
                body: '',
                isRead: false, 
                isSent: true, 
                isDraft: false,
                isStarred: false,
                isTrash: false,
                sentAt: new Date(),
                to: ''
            },
        };
    },
    methods: {
        displayNewMail(){
        },
        send(){
            if(!this.newMail.to || !this.newMail.subject) return
            console.log(this.newMail);
            mailService.addMail(this.newMail);
                this.$emit('mailSent', this.newMail)

            eventBus.emit('show-msg',{ txt: 'Mail Sent', type: 'success' })
        },
        moveToDraft(){
            this.newMail.isDraft = true;
            this.newMail.isSent = false;
            console.log(this.newMail)
            mailService.addMail(this.newMail);
            this.$emit('mailSent', this.newMail)
            eventBus.emit('show-msg',{ txt: 'Mail Sent to Draft', type: 'success' })
        },
        backToMails(){
            this.$emit('backToMails', true)
        }
        },
    computed: {
    }
}