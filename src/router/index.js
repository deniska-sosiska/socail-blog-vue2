import Vue from "vue"
import VueRouter from "vue-router"
// import store from '@/store'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const savedAccountData = localStorage.getItem("accountData")

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!savedAccountData) {
      next({
        name: "Authorization",
        params: { fromPage: to.name, flag: true },
        query: {  redirect: to.fullPath  }
      })
    }
    else {  next()  }
  }
  else {  
    (to.name === "Authorization" && savedAccountData)
    ? next({  name: "Posts"  })
    : next()
  }
  
})

export default router
