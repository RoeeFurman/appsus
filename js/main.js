import { router } from "./router.js";
import homePage from "./pages/home-page.cmp.js";
import appHeader from "./cmps/app-header.js";
import appFooter from "./cmps/app-footer.js"; 
import userMsg from "./cmps/user-msg.cmp.js"; 

const options = {
  template: `
                <app-header />
                <user-msg />
                <router-view class="app-main" />
                <!-- <home-page /> -->
                <app-footer />
`,
  components: {
    homePage,
    // bookApp,
    appHeader,
    appFooter,
    userMsg,
  },
};

const app = Vue.createApp(options);
app.use(router);
app.mount("#app");
