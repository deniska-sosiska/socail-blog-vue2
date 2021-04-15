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

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.userData === null) {
//       console.log("private")
//       next({
//         path: '/auth',
//         query: {  redirect: to.fullPath  }
//       })
//     }
//     else {  next() }
//   }
//   else {  next()  }
// })

export default router;
