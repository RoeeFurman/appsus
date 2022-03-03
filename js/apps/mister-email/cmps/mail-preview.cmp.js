import { eventBus } from "../../../services/eventBus-service.js"
import {mailService} from "../services/mail-service.js"

export default {
    props: ['mail'],
    template: `
            <section class="mail-preview">
                <div :class="displayReadUnreadClass" :class="displayStar">
                    <router-link :to="'/mail/'+mail.id" @click.prevent>
                    SUBJECT: {{mail.subject}} TO: {{mail.to}} SENT-AT:{{sentAtToDisplay}}
                </router-link>
                </div>
                <!-- <button @click="deleteMail">Delete</button> -->
            </section>
    `,
    data() {
        return {}
    },
    computed: {
        displayReadUnreadClass(){
            console.log(this.mail.isRead)
            if(this.mail.isRead) return "readMail"
            else return "unReadMail"
        },
        displayStar(){
            return "starred"
        },
        sentAtToDisplay(){
          let time = new Date(this.mail.sentAt)
          return time.toISOString().slice(0,10)
        },
        toggleStar(id){
            console.log(id)
            this.$emit('toggleStar', id)
        }

    },
    methods:{
     
    },
    created() {
    }

}
