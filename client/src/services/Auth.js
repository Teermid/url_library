import api from '@/services/Api'

export default{
  register (credentials) {
    return api().post('register', credentials)
  }
}

// auth.register({
//   email: 'test@test.com',
//   password: 'qwerty'
// });
