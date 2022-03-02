import { mailService } from '../services/mail-service.js';
import mailList from "../cmps/mail-list.cmp.js";


export default {
  template: `
			<section class="email-app">
				<h1>Mister Email</h1>
                <router-link to="/" class="home-go">Home</router-link>
                <mail-list :mails="mails"></mail-list>
			</section>

    `,
  components: {
      mailList,


  },
  data() {
    return {
        mails: [],
    };
  },
  created() {
      mailService.query()
      .then(mails => this.mails = mails)
  },
  // methods: {}

  computed: {
        mailsToShow() {
            // this.mails = mails;
        }

  },
};
