import { mailService } from "../services/mail-service.js";
import { eventBus } from "../../../services/eventBus-service.js";
import sideFilter from "../cmps/side-filter.js"


export default {
  template: `
                <section v-if="mail" class="mail-details">
                  <h1>Mail details</h1>
                  <!-- <router-link class="back-link" to="/mail/">
                    Back to Mails
                    </router-link> -->
                  <div class="main-container-details">
                  <div class="side-filter-container">
                  <side-filter/>
                </div>
                <div class="mail-details-container">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          Subject:
                        </td>
                        <td>
                          <span> {{mail.subject}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      Sent at:
                        </td> 
                        <td>
                          <span>{{mail.sentAt}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                            To:
                          </td>
                          <td>
                            <span>{{mail.to}}</span><
                           </td>
                        </tr>
                        <tr>
                        <td>
                          Body:
                          </td>
                          <td>
                            <span>{{mail.body}}</span>
                          </td>
                        </tr>
                        <tr>
                        <td>
                          Delete mail:
                          </td>
                          <td>
                            <button @click="deleteMail" class="delete-mail-details"><img src="img-notes/bx-trash.svg" class="icon"></button>
                            <!-- <span>{{mail.body}}</span> -->
                          </td>
                        </tr>
                        </table>
                      </div>
              </div>
                <div class="sec-footer">
                    <router-link class="back-link" to="/mail/">
                      <img src="img-notes/bx-left-arrow-circle.svg" class="icon">
                        Back to Mails
                    </router-link>
              </div>
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
