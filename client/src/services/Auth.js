import api from '@/services/Api'

export default{
  register (credentials) {
    return api().post('register', credentials)
  },
  login (credentials) {
    console.log('before axios create')
    return api().post('login', credentials)
  }
}
