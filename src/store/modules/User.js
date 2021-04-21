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
    commit("isLoaded")
    localStorage.setItem("token", payload)

    try {
      const res = await getAccountDataByToken()
      commit("setCurrentAccountData", res)
    } catch(err) {
      console.error('Error in: Store/Auth.service.js/checkAuthUser(): ', err)
      commit("clearCurrentAccountData")
    } finally {
      commit("isLoaded")
    }
  },

  async changeAvatarAndUpdateUser({ commit }, payload) {
    commit("isLoaded")

    try {
      const res = await changeAvatar({ userID: payload.userID, bodyFormData: payload.bodyFormData })
      commit("setCurrentAccountData", res)
      
    } catch(err) {
      console.error('Error in: Store/Auth.service.js/changeAvatarAndUpdateUser(): ', err)
    } finally {
      commit("isLoaded")
    }
  },
   
  async fetchUserList({ commit }) {
    try {
      const res = await getAllUsers()
      commit("setUserList", res)
    } catch (err){
      console.error("Error in: Store/Auth.service.js/fetchUserList(): ", err)
    } finally {
      // commit("isLoaded")
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