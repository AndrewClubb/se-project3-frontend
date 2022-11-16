import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/courses",
      name: "courses",
      component: () => import("./components/CourseList")
    },
    {
      path: "/courses/:id",
      name: "course-details",
      component: () => import("./components/Course")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddCourse.vue")
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("./components/CalendarApp.vue")
    },
    {
      path: "/section/:id",
      name: "section-details",
      component: () => import("./components/EditSection.vue")
    }
  ]
});