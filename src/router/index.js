import Vue from "vue";
import VueRouter from "vue-router";
import PagePosts from "@/views/V-Posts";
import PageUsers from "@/views/V-Users";
import PageProfile from "@/views/V-Profile"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Posts",
    component: PagePosts,
  },
  {
    path: "/users",
    name: "Users",
    component: PageUsers,
  },
  {
    path: "/profile",
    name: "Profile",
    component: PageProfile,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
