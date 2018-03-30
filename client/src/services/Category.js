import api from '@/services/Api'

export default{
  getCategory (userID) {
    return api().get('category', {
      params: {
        userID: userID
      }
    })
  },

  addCategory (content) {
    console.log(content)
    return api().post('category', content)
  }

}
