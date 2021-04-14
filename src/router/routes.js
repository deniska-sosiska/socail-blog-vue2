import PagePosts from "@/views/V-Posts";
import PageUsers from "@/views/V-Users";
import PageProfile from "@/views/V-Profile"
import PageAuthorization from "@/views/V-Authorization"

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
  },
  {
    path: "/auth",
    name: "PageAuthorization",
    component: PageAuthorization,
  }
];

export default routes