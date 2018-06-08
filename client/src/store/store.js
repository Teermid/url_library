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
    tag: false,
    tagContent: '',
    categoriesList: [],
    rootCategoriesList: [],
    popUpDisplay: false,
    editDisplay: false,
    refreshElements: false,
    refreshChildCategories: false,
    elementsDisplay: 'card',
    sortBy: ['title', 1],
    sidebarDisplay: true,
    elementId: '',
    elementByIdTrigger: false,
    multSelect: false,
    selectAll: false,
    selectedArray: [],
    categoryId: '',
    categoryByIdTrigger: false,
    editCategoryDisplay: false
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

    setTag (state) {
      state.tag = !state.tag
    },

    setTagContent (state, content) {
      state.tagContent = content
    },

    setCategoriesList (state, content) {
      state.categoriesList = content
    },

    setRootCategoriesList (state, content) {
      state.rootCategoriesList = content
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

    setRefreshChildCategories (state) {
      state.refreshChildCategories = !state.refreshChildCategories
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
      state.elementId = content
    },

    setElementByIdTrigger (state) {
      state.elementByIdTrigger = !state.elementByIdTrigger
    },

    setMultSelect (state) {
      state.multSelect = !state.multSelect
    },

    setSelectAll (state, content) {
      state.selectAll = content
    },

    setSelectedArray (state, content) {
      state.selectedArray.push(content)
    },

    resetSelectedArray (state) {
      state.selectedArray = []
    },

    setCategoryId (state, content) {
      state.categoryId = content
    },

    setCategoryByIdTrigger (state) {
      state.categoryByIdTrigger = !state.categoryByIdTrigger
    },

    setEditCategoryDisplay (state) {
      state.editCategoryDisplay = !state.editCategoryDisplay
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

    getTag (state) {
      return state.tag
    },

    getTagContent (state) {
      return state.tagContent
    },

    getCategoriesList (state) {
      return state.categoriesList
    },

    getRootCategoriesList (state) {
      return state.rootCategoriesList
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
      return state.elementId
    },

    getElementByIdTrigger (state) {
      return state.elementByIdTrigger
    },

    getMultSelect (state) {
      return state.multSelect
    },

    getSelectedArray (state) {
      return state.selectedArray
    },

    getEditCategoryDisplay (state) {
      return state.editCategoryDisplay
    },

    getCategoryId (state) {
      return state.categoryId
    }
  }
})
