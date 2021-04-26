import Vue from "vue"
import Vuex from "vuex"
import user from './modules/User'
import Posts from './modules/Posts'
import loadingData from './modules/LoadingData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    Posts,
    loadingData
  }
})
