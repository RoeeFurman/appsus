import { router } from "./router.js";

const options = {
  template: `
                <!-- <app-header /> -->
                <!-- <user-msg /> -->
                <home-page />
                <router-view />
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
