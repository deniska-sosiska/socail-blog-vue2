const mutations = {
  isLoaded(state) {
    state.loading = !state.loading
  }
}

const actions = {}

const getters = {
  loading: ({ loading }) => loading
}

const state = () => ({
  loading: false
})

export default {
  state,
  mutations,
  actions,
  getters
}