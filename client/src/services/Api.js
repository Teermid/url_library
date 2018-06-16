import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
      Authoritzation: 'Bearer ' + localStorage.getItem('authToken') || null
    }
  })
}
