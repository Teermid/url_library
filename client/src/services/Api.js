import axios from 'axios'

export default () => {
  let authToken = document.cookie.split('=')
  console.log('api cookie -> ' + authToken)
  return axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
      Authoritzation: 'Bearer ' + authToken[1] || null
    }
  })
}
