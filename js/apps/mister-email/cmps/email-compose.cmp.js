import { mailService } from '../services/mail-service.js';

export default {
    template: `
        <section class="email-compose">
            <h1>Compose-Mode</h1>
            <form @submit.prevent class="review-add">
            <div class="review">
                to: <input ref="input" type="email" @input="displayNewMail" v-model="newMail.to"  /><br><br>
                subject: <input ref="input" type="text" @input="displayNewMail" v-model="newMail.subject" placeholder="Subject" /><br><br>
                Body: <textarea v-model="newMail.body" rows="4" cols="30" placeholder="Your Mail here"></textarea>
                <!-- Rate:<select @change="displayNewMail" v-model="review.rate" size=1>
                            <option v-for="star in stars" :value="star">{{'💥'.repeat(star)}}</option>
                     </select>
                Date: <input v-model="review.date" type="date" id="start">
                </div>
                 -->
                <button @click="save">Submit</button>
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