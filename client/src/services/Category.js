import api from '@/services/Api'

export default {
  getCategory (id) {
    return api().get('category', {
      params: {
        userID: id
      }
    })
  },

  getCategoryById (id) {
    return api().get(`category/${id}`)
  },

  getRootCategories () {
    return api().get('root-categories')
  },

  getChildCategories () {
    return api().get('child-categories')
  },

  addCategory (content) {
    return api().post('category', content)
  },

  editCategory (id, content) {
    return api().put(`category/${id}`, content)
  },

  deleteCategory (id, content) {
    console.log('content -> ' + content)
    return api().delete(`category/${id}/${content}`)
  },

  isEmpty (id) {
    return api().get(`categoryEmpty/${id}`)
  }
}
