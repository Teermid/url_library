import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    userLogged: false,
    searchString: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.userLogged = true
      }
    },
    setUser (state, user) {
      state.user = user
    },
    userLogOut (state) {
      console.log('inside set state: ' + state.userLogged)
      state.userLogged = false
    },
    setSearchString (state, searchString) {
      state.searchString = searchString
    }

  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    userLogOut ({commit}) {
      console.log('inside userLogOut')
      commit('userLogOut')
    },
    setSearchString ({commit}, searchString) {
      commit('setSearchString', searchString)
    }

  }
})
