import bookApp from "./views/book-app.js";
import homePage from "./views/home-page.cmp.js";
import aboutPage from "./views/about-page.cmp.js";

const routes = [
  {
    path: "/",
    component: homePage,
  },
  {
    path: "/about",
    component: aboutPage,
  },
  {
    path: "/book",
    component: bookApp,
  },
  {
    path: "/mail",
    component: mailApp,
  },
  {
    path: "/keep",
    component: noteApp,
  },
];

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
});
