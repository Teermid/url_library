import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    userName: null,
    userId: null,
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
    setuserName (state, userName) {
      state.userName = userName
    },
    setuserId (state, userId) {
      state.userId = userId
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
    setuserName ({commit}, userName) {
      commit('setuserName', userName)
    },
    setuserId ({commit}, userId) {
      commit('setuserId', userId)
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
