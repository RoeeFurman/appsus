import { router } from "./router.js";
import homePage from "./pages/home-page.cmp.js";

const options = {
  template: `
                <!-- <app-header /> -->
                <!-- <user-msg /> -->
                <router-view />
                <!-- <home-page /> -->
                <!-- <app-footer /> -->
`,
  components: {
    homePage,
    // bookApp,
    // appHeader,
    // appFooter,
    // userMsg,
  },
};

const app = Vue.createApp(options);
app.use(router);
app.mount("#app");
