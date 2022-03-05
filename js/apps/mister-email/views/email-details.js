import { mailService } from "../services/mail-service.js";
import { eventBus } from "../../../services/eventBus-service.js";
import sideFilter from "../cmps/side-filter.js"


export default {
  template: `
                <section v-if="mail" class="mail-details">
                  <h1>Mail details</h1>
                  <div class="main-container-details">
                <div class="mail-details-container">
                  <table>
                    <tbody>
                    <tr>
                        <td>
                         <b> Actions:</b>
                          </td>
                          <td>
                            <button @click="deleteMail" class="delete-mail-details"><img src="img-notes/bx-trash.svg" class="icon"></button>
                          </td>
                        </tr>
                      <tr>
                        <td>
                          <b>Subject:</b>
                        </td>
                        <td>
                          <span> {{mail.subject}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <b>Time:</b>
                        </td> 
                        <td>
                          <span>{{displayTime}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                           <b> To:</b>
                          </td>
                          <td>
                            <span>{{mail.to}}</span>
                           </td>
                        </tr>
                        <tr>
                        <td>
                         <b> Body:</b>
                          </td>
                          <td>
                            <span>{{mail.body}}</span>
                          </td>
                        </tr>
                      </tbody>
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
    mailService.get(id).then((mail) => {
      console.log(mail);
      this.mail = mail;
    });
  },
  computed: {
    displayTime(){
      let time = new Date(this.mail.sentAt)
      let date = time.toISOString().slice(0,10);
      let hour = time.toISOString().slice(11,20);
      return (`${date} at: ${hour}`)

    }
  },
  methods: {
    deleteMail() {
      mailService.remove(this.mail.id)
        .then(() => mailService.query()
        .then((mails) => {
            eventBus.emit('updatedMails', mails)
            this.$router.push('/mail')            
        }));
        
        eventBus.emit('show-msg', { txt: 'Mail Deleted', type: 'failure' })

    },
  },
};
