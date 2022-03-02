import { router } from './router.js';


const options = {
    template: `
                <app-header />
                <user-msg />
                <router-view />
                <app-footer />
`,
    components: {
        bookApp,
        appHeader,
        appFooter,
        userMsg
    },

}


const app = Vue.createApp(options);
app.use(router);
app.mount('#app');

