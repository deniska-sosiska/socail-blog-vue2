const routes = [
  {
    path: "/",
    name: "Posts",
    component: () => import("@/views/V-Posts"),
    
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/V-Users"),
    meta: {  requiresAuth: true  }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/V-Profile"),
    meta: {  requiresAuth: true  }
  },
  {
    path: "/auth",
    name: "PageAuthorization",
    component: () => import("@/views/V-Authorization"),
  }
];

export default routes