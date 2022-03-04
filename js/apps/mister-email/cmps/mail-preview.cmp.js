import { eventBus } from "../../../services/eventBus-service.js"
import {mailService} from "../services/mail-service.js"

export default {
    props: ['mail'],
    template: `
            <section >
                <div :class="displayReadUnreadClass">
                    <table class="preview-table">
                        <router-link :to="'/mail/'+mail.id" @click="markAsRead(mail)">
                        <tbody>
                            <tr>
                                <td class="to">
                                     {{mail.to}} 
                                </td>
                                <td class="subject">
                                    SUBJECT: {{mail.subject}} 
                                </td>
                                <td>
                                    {{sentAtToDisplay}}
                                </td>
                            </tr>
                        </tbody>
                        </router-link>
                    </table>
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
