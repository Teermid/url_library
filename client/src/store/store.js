import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    userID: null,
    userLogged: false,
    searchString: null,
    categoryFilter: 'All',
    popupDisplay: false,
    refreshElements: false,
    grid: true,
    sortBy: 'updatedAt'
  },
  mutations: { // syncronous
    setToken (state, content) {
      if (content) {
        state.token = content
        state.userLogged = true
      }
      /* Necessari?? */
      // } else  {
      //   state.userLogged = false
      // }
    },

    setUser (state, content) {
      state.user = content
    },

    setUserID (state, content) {
      state.userID = content
    },

    setUserLogged (state, content) {
      state.userLogged = content
    },

    setSearchString (state, content) {
      state.searchString = content
    },

    setCategoryFilter (state, content) {
      state.categoryFilter = content
    },

    setPopUpDisplay (state) {
      state.popupDisplay = !state.popupDisplay
    },

    setRefreshElements (state) {
      state.refreshElements = !state.refreshElements
    },

    setGrid (state) {
      state.grid = !state.grid
    },

    setSortBy (state, content) {
      state.sortBy = content
    }
  },

  // actions: { // asyncronous
  //   setToken ({commit}, token) {
  //     commit('setToken', token)
  //   },
  //   setUser ({commit}, userName) {
  //     commit('setUser', userName)
  //   },
  //   setUserID ({commit}, userID) {
  //     commit('setUserID', userID)
  //   },
  //   userNameLogOut ({commit}) {
  //     console.log('inside userNameLogOut')
  //     commit('userNameLogOut')
  //   },
  //   setSearchString ({commit}, searchString) {
  //     commit('setSearchString', searchString)
  //   },
  //   setCategoryFilter ({commit}, categoryFilter) {
  //     commit('setCategoryFilter', categoryFilter)
  //   },
  //   setPopupDisplay ({commit}, popupDisplay) {
  //     commit('setPopupDisplay', popupDisplay)
  //   }
  // },

  getters: {
    getToken (state) {
      return state.token
    },

    getUser (state) {
      return state.user
    },

    getUserID (state) {
      return state.userID
    },

    getUserLogged (state) {
      return state.userLogged
    },

    getSearchString (state) {
      return state.searchString
    },

    getCategoryFilter (state) {
      return state.categoryFilter
    },

    getPopUpDisplay (state) {
      return state.popupDisplay
    },

    getGrid (state) {
      return state.grid
    },

    getSortBy (state) {
      return state.sortBy
    }
  }
})
