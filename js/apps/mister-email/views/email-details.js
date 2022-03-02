import { mailService } from "../services/mail-service.js";

export default {
  template: `
                <section v-if="mail" class="mail-details">
                    <router-link class="back-link" to="/mail/"> |
                    <router-link to="/mail/details">details</router-link> 
                        Back to Mails
                    </router-link>
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

const theData = { val: "Bobo" };

export const details = {
  template: `<section>
        <h2>Our Team is Amazing</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla excepturi odit totam labore ipsam recusandae corrupti aperiam, cum, quis, quaerat facere repellat omnis dolorem saepe veniam ab soluta non doloribus!</p>
        <input type="text" v-model="val" />
    </section>`,
  data() {
    return { ...theData };
  },
};
