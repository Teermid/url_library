import api from '@/services/Api'

export default{
  getElements (categoryValue, isSearch, searchValue, userID, sortBy) {
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

  getEditElement (elementid) {
    return api().get(`elements/${elementid}`)
  },

  editElement (element) {
    return api().put(`elements/${element.id}`, element)
  },

  deleteElement (elementid) {
    return api().delete(`elements/${elementid}`)
  }
}
