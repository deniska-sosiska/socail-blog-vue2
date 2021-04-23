import axiosApiInstance from "@/services/axiosApiInstance"

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
  async getAccountDataByToken({ commit }, payload) {
    commit("isLoadingMainPage")
    localStorage.setItem("token", payload)

    try {
      const res = await axiosApiInstance({
        url: `/auth/user`,
        method: "get",
      })
      commit("setCurrentAccountData", res)
    } catch(err) {
      console.error('Error in: Store/User.js/getAccountDataByToken(): ', err)
      commit("clearCurrentAccountData")
    } finally {
      commit("isLoadingMainPage")
    }
  },

  async changeAvatarAndUpdateUser({ commit }, payload) {
    commit("isLoadingContent")

    try {
      const res = await axiosApiInstance({
        url: `/users/upload/${payload.userID}`,
        data: payload.bodyFormData,
        method: "put"
      })
      commit("setCurrentAccountData", res)
      
    } catch(err) {
      console.error('Error in: Store/User.js/changeAvatarAndUpdateUser(): ', err)
    } finally {
      commit("isLoadingContent")
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