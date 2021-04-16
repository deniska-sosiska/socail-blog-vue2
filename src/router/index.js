import Vue from "vue";
import VueRouter from "vue-router"
// import store from '@/store'
import routes from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  // console.log("from: ", from)
  // console.log("to: ", to)
  const savedUserData = localStorage.getItem("userData")
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!savedUserData) {
      next({
        name: "Authorization",
        params: { fromPage: to.name, flag: true },
        query: {  redirect: to.fullPath  }
      })
    }
    else {  next()  }
  }
  else {  
    (to.name === "Authorization" && savedUserData)
    ? next({  name: "Posts"  })
    : next()
  }
})

export default router;
