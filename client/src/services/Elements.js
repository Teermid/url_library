import api from '@/services/Api'

export default{
  getElements (categoryValue, isSearch, searchValue) {
    return api().get('elements', {
      params: {
        categoryValue: categoryValue,
        isSearch: isSearch,
        searchValue: searchValue
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
  }
}
