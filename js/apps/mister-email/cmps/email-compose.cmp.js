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
                        <td class="first-column"> To: </td>
                        <td><input ref="input" type="email" @input="displayNewMail" v-model="newMail.to" size=50 placeholder="maggie@appsus.com" required/></td>
                    </tr>
                    <tr>
                    <td>Subject: </td>
                    <td><input type="text" @input="displayNewMail" v-model="newMail.subject" placeholder="New Subject" class="subject-input"/></td>
                    </tr>
                    <tr>
                        <td>Body:</td>
                        <td>
                            <textarea v-model="newMail.body" rows="10" cols="100" placeholder="Your Mail here"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button @click="send">Send <img src="img-notes/bxs-paper-plane.svg"></button>
                            <button @click="moveToDraft">Draft <img src="img-notes/draft-icon.png" class="draft-icon"></button>
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
        }
        },
    computed: {
    }
}