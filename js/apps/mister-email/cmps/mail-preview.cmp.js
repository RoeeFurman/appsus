import { eventBus } from "../../../services/eventBus-service.js"
import {mailService} from "../services/mail-service.js"

export default {
    props: ['mail'],
    template: `
            <section >
                <div :class="displayReadUnreadClass">
                    <div class="preview-table">
                        <router-link :to="'/mail/'+mail.id" @click="markAsRead(mail)">
                        <tbody>
                                <div class="to">
                                     {{mail.to}} 
                                </div>
                                <div class="subject">
                                    SUBJECT: {{mail.subject}} 
                                </div>
                                <div class="sent-at">
                                    {{sentAtToDisplay}}
                                </div>
                        </tbody>
                        </router-link>
                        </div>
                </div>
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
        markAsRead(mail){
            console.log(mail)
            this.$emit('markAsRead', mail)
        }
     
    },
    created() {
    }

}
