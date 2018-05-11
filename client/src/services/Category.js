import api from '@/services/Api'

export default{
  getCategory (userID) {
    return api().get('category', {
      params: {
        userID: userID
      }
    })
  },

  getRootCategories () {
    return api().get('root-categories')
  },

  addCategory (content) {
    console.log(content)
    return api().post('category', content)
  }

}
