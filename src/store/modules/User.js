import { getUserDataByToken } from '@/services/auth.service.js'
import { changeAvatar } from '@/services/profile.service.js'

// import { authCurrentUser, registrationUser, getUserDataByToken } from '@/services/auth.service.js'


const mutations = {
  setCurrentUserData(state, payload) {
    state.userData = payload.userData

    localStorage.setItem("token", payload.token)
    localStorage.setItem("userData", JSON.stringify(payload.userData))
  },
  clearCurrentUserData(state) {
    state.userData = null
    localStorage.removeItem("token")
    localStorage.removeItem("userData")

  }
}



const actions = {

  async checkAuthUser({ commit }, payload) {
    try {
      commit("isLoadingRightNow")
      const res = await getUserDataByToken(payload)

      const data = {
        userData: res,
        token: payload
      }

      commit("setCurrentUserData", data)
      commit("isLoaded")
    }
    catch(e) {
      console.log(e)
      commit("clearCurrentUserData")
      commit("isLoaded")
    }
  },

  async changeAvatarAndUpdateUser({ commit }, payload) {
    try {
      const res = await changeAvatar({ userID: payload.userID, bodyFormData: payload.bodyFormData })
      const data = {
        userData: res,
        token: localStorage.token
      }
      commit("setCurrentUserData", data)
    }
    catch(e) {
      console.log(e)
    }
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