import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  mode: "history",
  // mode: "hash",
  base: process.env.NODE_ENV === "development" ? "/" : "/project3/2022/t2/",
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: () => import("./components/LoginPage"),
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("./components/CourseList"),
    },
    {
      path: "/courses/:id",
      name: "course-details",
      component: () => import("./components/Course"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddCourse.vue"),
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("./components/CalendarApp.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  if (authRequired && !loggedIn) {
    return next("/");
  }
  next();
});

export default router;
