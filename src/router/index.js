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
  if(to.matched.some(record => record.meta.requiresAuth)) {
    console.log(localStorage.getItem("userData"))
    // if (store.getters.userData === null) {
    let saved_user_data = JSON.parse(localStorage.getItem("userData"))
    if (!saved_user_data) {
      next({
        path: '/auth',
        query: {  redirect: to.fullPath  }
      })
    }
    else {  next()  }
  }
  else {  next()  }
})

export default router;
