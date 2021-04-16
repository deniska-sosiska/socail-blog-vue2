import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import { DefaultLoader } from "vue-spinners-css";
import VuePreLoader from "./components/V-PreLoader"


Vue.config.productionTip = false
Vue.component("DefaultLoader", DefaultLoader)
Vue.component("VuePreLoader", VuePreLoader)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")
