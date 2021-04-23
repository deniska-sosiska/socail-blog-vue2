const mutations = {
  isLoadingMainPage(state) {
    state.loadingMainPage = !state.loadingMainPage
  },
  isLoadingContent(state) {
    state.loadingContent = !state.loadingContent
  }
}

const actions = {}

const getters = {
  loadingMainPage: ({ loadingMainPage }) => loadingMainPage,
  loadingContent: ({ loadingContent }) => loadingContent
}

const state = () => ({
  loadingMainPage: false,
  loadingContent: false
})

export default {
  state,
  mutations,
  actions,
  getters
}