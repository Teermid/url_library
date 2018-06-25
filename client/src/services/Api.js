import axios from 'axios'

export default () => {
  let authToken = document.cookie.split('=')
  return axios.create({
    baseURL: 'http://192.168.1.130:8081',
    headers: {
      Authoritzation: 'Bearer ' + authToken[1] || null
    }
  })
}
