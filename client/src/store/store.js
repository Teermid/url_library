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
    categoryFilter: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.userLogged = true
      } else {
        state.userLogged = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setUserID (state, userID) {
      state.userID = userID
    },
    userNameLogOut (state) {
      console.log('inside set state: ' + state.userLogged)
      state.userLogged = false
    },
    setSearchString (state, searchString) {
      state.searchString = searchString
    },
    setCategoryFilter (state, categoryFilter) {
      state.categoryFilter = categoryFilter
    }

  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, userName) {
      commit('setUser', userName)
    },
    setUserID ({commit}, userID) {
      commit('setUserID', userID)
    },
    userNameLogOut ({commit}) {
      console.log('inside userNameLogOut')
      commit('userNameLogOut')
    },
    setSearchString ({commit}, searchString) {
      commit('setSearchString', searchString)
    },
    setCategoryFilter ({commit}, categoryFilter) {
      commit('setCategoryFilter', categoryFilter)
    }

  }
})
