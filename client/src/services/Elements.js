import api from '@/services/Api'

export default {
  getData (categoryValue, isSearch, searchValue, userID, sortBy) {
    return api().get('elements', {
      params: {
        categoryValue: categoryValue,
        isSearch: isSearch,
        searchValue: searchValue,
        userID: userID,
        sortBy: sortBy
      }
    })
  },

  addElements (content) {
    return api().post('elements', content)
  },

  getElementById (elementid) {
    return api().get(`elements/${elementid}`)
  },

  getBookmarksByCategory (userid) {
    return api().get(`elementsbycat/${userid}`)
  },

  getBookmarksByName (userid) {
    return api().get(`elementsbyname/${userid}`)
  },

  editElement (element) {
    return api().put(`elements/${element._id}`, element)
  },

  deleteElement (elementid) {
    return api().delete(`elements/${elementid}`)
  },

  deleteMult (ids) {
    return api().post(`delmult`, ids)
  },

  checkCategory (catID) {
    return api().get(`elements/checkCat/${catID}`)
  },

  addMult (elements, catID) {
    return api().post(`addmult/${catID}`, elements)
  }
}
