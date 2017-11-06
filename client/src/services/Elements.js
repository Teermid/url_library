import api from '@/services/Api'

export default{
  getElements () {
    return api().get('elements')
  },

  addElements (content) {
    return api().post('elements', content)
  }
}
