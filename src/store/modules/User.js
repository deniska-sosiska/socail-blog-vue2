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

    const res = await axiosApiInstance({
      url: `/auth/user`,
      method: "get",
    })

    commit("setCurrentAccountData", res)
    commit("isLoadingMainPage")
  },

  async changeAvatarAndUpdateUser({ commit }, payload) {
    commit("isLoadingContent")

    const res = await axiosApiInstance({
      url: `/users/upload/${payload.userID}`,
      data: payload.bodyFormData,
      method: "put"
    })

    commit("setCurrentAccountData", res)
    commit("isLoadingContent")
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