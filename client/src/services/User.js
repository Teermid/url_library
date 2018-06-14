import api from '@/services/Api'

export default {
  getSettings (userID) {
    return api().get(`settings/${userID}`)
  },

  loadSettings (userID, settings) {
    return api().post(`settings/${userID}`, settings)
  },

  getAppContent (userID) {
    return api().get(`content/${userID}`)
  }
}
