import api from '@/services/Api'

export default {
  getCategories (id) {
    return api().get('categories', {
      params: {
        userID: id
      }
    })
  },

  getCategoriesSidebar (id) {
    return api().get('categories-sidebar', {
      params: {
        userID: id
      }
    })
  },

  getCategoryById (id) {
    return api().get(`category/${id}`)
  },

  getCustomCategories () {
    return api().get('custom-categories')
  },

  getChildCategories () {
    return api().get('child-categories')
  },

  addCategory (content) {
    return api().post('category', content)
  },

  editCategoryName (content) {
    return api().put(`category/${content._id}`, content)
  },

  editCategoryHierarchy (dragId, dropName) {
    return api().put(`category/${dragId}/${dropName}`)
  },

  removeNested (dragId) {
    return api().delete(`category-nested/${dragId}`)
  },

  deleteCategory (id, content) {
    console.log('content -> ' + content)
    return api().delete(`category/${id}/${content}`)
  },

  isEmpty (id) {
    return api().get(`categoryEmpty/${id}`)
  }
}
