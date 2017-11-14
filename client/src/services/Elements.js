import api from '@/services/Api'

export default{
  getElements (search) {
    return api().get('elements', {
      params: {
        search: search
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
