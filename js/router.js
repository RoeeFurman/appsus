// import bookApp from "./views/book-app.js";
import homePage from "./pages/home-page.cmp.js";
import aboutPage from "./pages/about-page.cmp.js";
import emailApp from "./apps/mister-email/views/email-app.cmp.js";
import noteApp from "./apps/miss-keep/views/note-app.cmp.js";

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
    path: "/note",
    component: noteApp,
  },
];

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
});