const routes = [
  {
    path: "/",
    name: "Posts",
    component: () => import("@/views/V-Posts"),
  },
  {
    path: "/post/:postID",
    name: 'Post',
    props: true,
    component: () => import("@/views/V-ShowPost"),
    // meta: {  requiresAuth: true  }
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/V-Users"),
    meta: {  requiresAuth: true  }
  },
  {
    path: "/profile/:userID",
    name: "Profile",
    props: true,
    component: () => import("@/views/V-Profile"),
    meta: {  requiresAuth: true  }
  },
  {
    path: "/authorization",
    name: "Authorization",
    props: true,
    component: () => import("@/views/V-Authorization"),
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import("@/views/V-NotFound") 
  }
]

export default routes