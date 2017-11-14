import api from '@/services/Api'

export default{
  getElements () {
    return api().get('elements')
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
