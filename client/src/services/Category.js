import api from '@/services/Api'

export default {
  getCategory (userID) {
    console.log('SERVICE_USERID: ' + userID)
    return api().get('category', {
      params: {
        userID: userID
      }
    })
  },

  getRootCategories () {
    return api().get('root-categories')
  },

  getChildCategories () {
    return api().get('child-categories')
  },

  addCategory (content) {
    console.log(content)
    return api().post('category', content)
  },

  editCategory (id, content) {
    return api().put(`category/${id}`, content)
  },

  deleteCategory (id) {
    return api().delete(`category/${id}`)
  }
}
