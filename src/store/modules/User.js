import { getUserDataByToken } from '@/services/auth.service.js'
import { changeAvatar } from '@/services/profile.service.js'
// import { getAllUsers } from '@/services/user.service.js'


const mutations = {
  setCurrentUserData(state, payload) {
    state.userData = payload.userData

    localStorage.setItem("token", payload.token)
    localStorage.setItem("userData", JSON.stringify(payload.userData))
  },
  clearCurrentUserData(state) {
    state.userData = {}
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
  }
}


const actions = {
  async checkAuthUser({ commit }, payload) {
    try {
      commit("isLoaded")
      const res = await getUserDataByToken(payload)

      const data = {
        userData: res,
        token: payload
      }

      commit("setCurrentUserData", data)

    } catch(err) {
      console.log('error from changeAvatarAndUpdateUser', err)
      commit("clearCurrentUserData")
    } finally {
      commit("isLoaded")
    }
  },

  async changeAvatarAndUpdateUser({ commit }, payload) {
    try {
      commit("isLoaded")

      const res = await changeAvatar({ userID: payload.userID, bodyFormData: payload.bodyFormData })
      const data = {
        userData: res,
        token: localStorage.token
      }

      commit("setCurrentUserData", data)
    } catch(e) {
      console.log('error from changeAvatarAndUpdateUser', e)
    } finally {
      commit("isLoaded")
    }
  }
}

const getters = {
  userData: ({ userData }) => userData,
  userList: ({ userList }) => userList
}

const state = () => ({
  userData: {},
  userList: []
})

export default {
  state,
  mutations,
  actions,
  getters
}