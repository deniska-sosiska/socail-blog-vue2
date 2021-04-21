import { getAccountDataByToken } from '@/services/auth.service.js'
import { changeAvatar } from '@/services/profile.service.js'
import { getAllUsers } from '@/services/user.service.js'


const mutations = {
  setCurrentAccountData(state, payload) {
    state.accountData = payload
    localStorage.setItem("accountData", JSON.stringify(payload))
  },
  clearCurrentAccountData(state) {
    state.accountData = {}
    localStorage.removeItem("token")
    localStorage.removeItem("accountData")
  },
  setUserList(state, payload) {
    state.userList = payload
  }
}


const actions = {
  async checkAuthUser({ commit }, payload) {
    try {
      commit("isLoaded")
      const res = await getAccountDataByToken(payload)

      commit("setCurrentAccountData", res)
      localStorage.setItem("token", payload)

    } catch(err) {
      console.log('error from checkAuthUser: ', err)
      commit("clearCurrentAccountData")
    } finally {
      commit("isLoaded")
    }
  },

  async changeAvatarAndUpdateUser({ commit }, payload) {
    try {
      commit("isLoaded")

      const res = await changeAvatar({ userID: payload.userID, bodyFormData: payload.bodyFormData })
      commit("setCurrentAccountData", res)
      
    } catch(err) {
      console.log('error from changeAvatarAndUpdateUser: ', err)
    } finally {
      commit("isLoaded")
    }
  },
   
  async fetchUserList({ commit }) {
    try {
      const res = await getAllUsers()
      commit("setUserList", res)
    } catch (err){
      console.log("error from fetchUserList: ", err)
    }
  }
}

const getters = {
  accountData: ({ accountData }) => accountData,
  userList: ({ userList }) => userList
}

const state = () => ({
  accountData: {},
  userList: []
})

export default {
  state,
  mutations,
  actions,
  getters
}