import api from '@/services/Api'

export default {
  register (credentials) {
    return api().post('register', credentials)
  },
  login (credentials) {
    return api().get('login', {
      params: {
        email: credentials.email,
        password: credentials.password
      }
    })
  },
  getUserFromToken (jwt) {
    return api().get(`user/${jwt}`)
  }
}
