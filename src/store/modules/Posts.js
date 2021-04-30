import axiosApiInstance from "@/services/axiosApiInstance"

const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  }
}

const actions = {
  async fetchAllPosts({ commit }, payload = {}) {
    commit("isLoadingContent")
    let postedBy = '', limit = '', skip = ''
    
    if (payload.postedBy) postedBy = `&postedBy=${payload.postedBy}`
    if (payload.limit || payload.limit === 0) limit = `&limit=${payload.limit}` 
    if (payload.skip) skip = `&skip=${payload.skip}` 

    const posts = await axiosApiInstance({
      url: `/posts?` + postedBy + limit + skip,
      method: "get"
    })

    commit("setPosts", posts)
    commit("isLoadingContent")
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