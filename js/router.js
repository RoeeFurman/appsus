
import homePage from "./pages/home-page.cmp.js";
import aboutPage from "./pages/about-page.cmp.js";
import emailApp from "./apps/mister-email/views/email-app.cmp.js";
import noteApp from "./apps/miss-keep/views/note-app.cmp.js";
import emailDetails from "./apps/mister-email/views/email-details.js";

const routes = [
  {
    path: "/",
    component: homePage,
  },
  {
    path: "/about",
    component: aboutPage,
  },
  //   {
  //     path: "/book",
  //     component: bookApp,
  //   },
  {
    path: "/mail",
    component: emailApp,
  },
  {
    path: "/mail/:mailId",
    component: emailDetails,
  },
  {
    path: "/note",
    component: noteApp,
  },
];

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
});
