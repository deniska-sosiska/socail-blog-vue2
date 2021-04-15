const mutations = {
  isLoaded(state) {
    state.loading = false
  }
}

const actions = {}

const getters = {
  loading: ({ loading }) => loading
}

const state = () => ({
  loading: true
})

export default {
  state,
  mutations,
  actions,
  getters
}