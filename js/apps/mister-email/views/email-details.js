import { mailService } from "../services/mail-service.js";

export default {
  template: `
                <section v-if="mail" class="mail-details">
                    <router-link class="back-link" to="/mail/"> |
                        Back to Mails
                    </router-link>
                    <h1>Mail details</h1>
                    <span>subject: {{mail.subject}}</span><br>
                    <span>sent at: {{mail.sentAt}}</span><br>
                    <span>sent to: {{mail.to}}</span><br>
                    <span>body: {{mail.body}}</span>

                    <br>
                </section>
                `,
  components: {},
  data() {
    return {
      mail: null,
      mailId: null,
    };
  },
  created() {
    const id = this.$route.params.mailId;
    this.mailId = id;
    console.log(id);
    mailService.get(id).then((mail) => {
      console.log(mail);
      this.mail = mail;
    });
  },
};
