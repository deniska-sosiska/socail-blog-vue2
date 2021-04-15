import { getUserDataByToken } from '@/services/auth.service.js'
// import { authCurrentUser, registrationUser, getUserDataByToken } from '@/services/auth.service.js'

const mutations = {
  setCurrentUserData(state, payload) {
    state.userData = payload
    localStorage.setItem("userData", JSON.stringify(payload))
  },
  clearCurrentUserData(state) {
    state.userData = null
    localStorage.removeItem("token")
  }
}

const actions = {
  async checkAuthUser({ commit }, payload) {
    const res = await getUserDataByToken(payload)

    commit("setCurrentUserData", res)
    commit("isLoaded")
  }
}

const getters = {
  userData: ({ userData }) => userData,
}

const state = () => ({
  userData: null
})

export default {
  state,
  mutations,
  actions,
  getters
}