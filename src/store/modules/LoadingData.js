const mutations = {
  isLoadingMainPage(state) {
    state.loadingMainPage = !state.loadingMainPage
  },
  isLoadingContent(state) {
    state.loadingContent = !state.loadingContent
  },
  isShowLinks(state) {
    state.showLinks = !state.showLinks

  }
}

const actions = {}

const getters = {
  loadingMainPage: ({ loadingMainPage }) => loadingMainPage,
  loadingContent: ({ loadingContent }) => loadingContent,
  showLinks: ({ showLinks }) => showLinks
}

const state = () => ({
  loadingMainPage: false,
  loadingContent: false,
  showLinks: false
})

export default {
  state,
  mutations,
  actions,
  getters
}