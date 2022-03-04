import { mailService } from '../services/mail-service.js';

export default {
    template: `
        <section class="email-compose">
            <h1>Compose-Mode</h1>
            <form @submit.prevent class="review-add">
            <div class="review">
                <table>
                    <tr>
                        <td class="first-column"> To: </td>
                        <td><input ref="input" type="email" @input="displayNewMail" v-model="newMail.to"  /></td>
                    </tr>
                    <tr>
                    <td>Subject: </td>
                    <td><input type="text" @input="displayNewMail" v-model="newMail.subject" placeholder="Subject" /></td>
                    </tr>
                    <tr>
                        <td>Body:</td>
                        <td>
                            <textarea v-model="newMail.body" rows="4" cols="30" placeholder="Your Mail here"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button @click="save"><img src="img-notes/bxs-paper-plane.svg"></button>
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
                subject: 'New Subject',
                body: '',
                isRead: false, 
                isSent: true, 
                isDraft: false,
                isStarred: false,
                isTrash: false,
                sentAt: new Date(),
                to: 'maggie@appsus.com'
            },
        };
    },
    methods: {
        displayNewMail(){
        },
        save(){
            console.log(this.newMail);
            mailService.addMail(this.newMail);
                this.$emit('mailSent', this.newMail)
   

        


        }
        },
    // },
    computed: {

        // }
    }
}