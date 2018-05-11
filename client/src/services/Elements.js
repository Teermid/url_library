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

  getElementById (elementid) {
    return api().get(`elements/${elementid}`)
  },

  editElement (element) {
    return api().put(`elements/${element._id}`, element)
  },

  deleteElement (elementid) {
    return api().delete(`elements/${elementid}`)
  },

  deleteMult (ids) {
    console.log(ids)
    return api().post(`mult`, ids)
  }
}
