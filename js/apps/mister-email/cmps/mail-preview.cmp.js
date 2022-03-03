import { eventBus } from "../../../services/eventBus-service.js"
import {mailService} from "../services/mail-service.js"

export default {
    props: ['mail'],
    template: `
            <section class="mail-preview">
            <router-link :to="'/mail/'+mail.id" @click.prevent>
                <div :class="displayReadUnreadClass">subject: {{mail.subject}} to: {{mail.to}}</div>
                </router-link>
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
        }

    },
    methods:{
     
    },
    created() {
    }

}
