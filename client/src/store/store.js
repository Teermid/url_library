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
    categoriesList: [],
    popUpDisplay: false,
    editDisplay: false,
    refreshElements: false,
    elementsDisplay: 'card',
    sortBy: ['timestamp', 1],
    sidebarDisplay: true,
    elementID: '',
    elementByIdTrigger: false,
    multSelect: false,
    selectedArray: []
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

    setCategoriesList (state, content) {
      state.categoriesList = content
    },

    setPopUpDisplay (state) {
      state.popUpDisplay = !state.popUpDisplay
    },

    setEditDisplay (state) {
      state.editDisplay = !state.editDisplay
    },

    setRefreshElements (state) {
      state.refreshElements = !state.refreshElements
    },

    setElementsDisplay (state, content) {
      state.elementsDisplay = content
    },

    setSortBy (state, content) {
      state.sortBy = content
    },

    setSidebarDisplay (state) {
      state.sidebarDisplay = !state.sidebarDisplay
    },

    setElementId (state, content) {
      state.elementID = content
    },

    setElementByIdTrigger (state) {
      state.elementByIdTrigger = !state.elementByIdTrigger
    },

    setMultSelect (state) {
      state.multSelect = !state.multSelect
    },

    setSelectedArray (state, content) {
      state.selectedArray.push(content)
    }
  },

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

    getCategoriesList (state) {
      return state.categoriesList
    },

    getPopUpDisplay (state) {
      return state.popUpDisplay
    },

    getEditDisplay (state) {
      return state.editDisplay
    },

    getElementsDisplay (state) {
      return state.elementsDisplay
    },

    getSortBy (state) {
      return state.sortBy
    },

    getSidebarDisplay (state) {
      return state.sidebarDisplay
    },

    getElementId (state) {
      return state.elementID
    },

    getElementByIdTrigger (state) {
      return state.elementByIdTrigger
    },

    getMultSelect (state) {
      return state.multSelect
    },

    getSelectedArray (state) {
      return state.selectedArray
    }
  }
})
