import Vue from "vue";
import Vuex from "vuex";
import user from './modules/User'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user
  }
});
