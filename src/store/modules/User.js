import { authCurrentUser, registrationUser } from '@/services/auth.service.js'

const mutations = {
  setCurrentUser(state, payload) {
    state.user = payload.user
    localStorage.setItem("userData", payload.user)

    state.token = payload.token
    localStorage.setItem("token", payload.token)
  },
  currentUserLogOut(state) {
    state.user = {}
    state.token = ""
  }
}

const actions = {
  async createCurrentUser({ commit }, payload) {
    const res = await authCurrentUser(payload)
    const data = {
      user: payload,
      token: res
    }
    commit('setCurrentUser', data)
  },
  async createNewUser({ dispatch }, payload) {
    await registrationUser(payload)

    dispatch('createCurrentUser', payload)
  }
}

const getters = {}

const state = () => ({
  userData: localStorage.getItem("userData") || {},
  token: localStorage.getItem("token") || ''
})

export default {
  state,
  mutations,
  actions,
  getters
}