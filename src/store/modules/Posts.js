import axiosApiInstance from "@/services/axiosApiInstance"

const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  }
}

const actions = {
  async fetchAllPosts({ commit }) {
    commit("isLoadingContent")
    try {
      const posts = await axiosApiInstance({
        url: "/posts",
        method: "get"
      })

      commit("setPosts", posts)
    } catch(err) {
      console.err("Error in: Store/Posts.js/fetchAllPosts(): ", err)
    } finally {
      commit("isLoadingContent")
    }
  },
}

const getters = {
  posts: ({ posts }) => posts,
}

const state = () => ({
  posts: []
})

export default {
  state,
  mutations,
  actions,
  getters
}