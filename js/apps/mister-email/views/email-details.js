import { mailService } from "../services/mail-service.js";
import { eventBus } from "../../../services/eventBus-service.js";
import sideFilter from "../cmps/side-filter.js"


export default {
  template: `
                <section v-if="mail" class="mail-details">
                  <h1>Mail details</h1>
                  <router-link class="back-link" to="/mail/">
                    Back to Mails
                  </router-link>
                  <side-filter/>
                    <span>subject: {{mail.subject}}</span><br>
                    <span>sent at: {{mail.sentAt}}</span><br>
                    <span>sent to: {{mail.to}}</span><br>
                    <span>body: {{mail.body}}</span>
                    <hr>
                    <button @click="deleteMail"><img src="img-notes/bx-trash.svg" class="icon"></button>
                    <router-link class="back-link" to="/mail/"> |
                        Back to Mails
                    </router-link>
                    <br>
                </section>
                `,
  components: {
      sideFilter,
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
    // console.log(id);
    mailService.get(id).then((mail) => {
      console.log(mail);
      this.mail = mail;
    });
  },
  methods: {
    deleteMail() {
      mailService.remove(this.mail.id)
        .then(() => mailService.query()
        .then((mails) => {
            eventBus.emit('updatedMails', mails)
            this.$router.push('/mail')

            console.log(mails)
        }));
      //       console.log(this.mail.id)
      //       mailService.removeMail(this.mail.id).then(mail => console.log(mail))
    },
  },
};
