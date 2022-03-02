
export default {
    props: ['mail'],
    template: `
            <section class="mail-preview">
            <router-link :to="'/mail/'+mail.id">
                <div :class="displayReadUnreadClass">subject: {{mail.subject}} to: {{mail.to}}<hr></div>
            </router-link>
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

    created() {
    }
}
