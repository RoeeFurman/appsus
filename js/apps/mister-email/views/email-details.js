import { mailService } from "../services/mail-service";

export default {
    template: `
                <section v-if="mail" class="mail-details">
                    <router-link class="back-link" to="/mail/">Back to Mails</router-link><br>

                </section>
                `,
    components: {

    },
    data() {
        return {
            mail: null,
            mailId: null,
        };
    },
    created() {
        const id = this.$route.params.mailId;
        this.mailId = id;
        console.log(id)
        mailService.get(id)
            .then(mail => {
                console.log(mail);
                this.mail = mail
            });
    },
}
