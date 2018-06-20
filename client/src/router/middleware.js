import Auth from '@/services/Auth.js'
import User from '@/services/User.js'
import store from '@/store/store'

async function loadData (user, content) {
  store.state.user = user
  store.state.userID = user._id
  store.state.settings = user.settings
  store.state.content = content
  store.state.elementsDisplay = user.settings.view
  store.state.sortBy = user.settings.sortBy
  store.state.categoryFilter = user.settings.category
}

export default {
  async userLogged (to, from, next) {
    // if (localStorage.getItem('authToken')) {
    let authToken = document.cookie.split('=')
    if (authToken[1]) {
      try {
        console.log('middleware -> ' + authToken[1])
        let user = (await Auth.getUserFromToken()).data
        let content = (await User.getAppContent(user._id)).data
        await loadData(user, content)
        next()
      } catch (e) {
        // localStorage.removeItem('authToken')
        next({path: '/login', name: 'login'})
      }
    } else {
      next({path: '/login', name: 'login'})
    }
  },

  userNotLogged (to, from, next) {
    if (!localStorage.getItem('authToken')) {
      next()
    } else {
      next({path: '/list', name: 'list'})
    }
  }
}
