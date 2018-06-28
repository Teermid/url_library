import axios from 'axios'

export default () => {
  let authToken = document.cookie.split('=')
  return axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
      Authoritzation: 'Bearer ' + authToken[1] || null
    }
  })
}
