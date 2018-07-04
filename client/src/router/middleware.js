import Auth from '@/services/Auth.js'
import User from '@/services/User.js'
import store from '@/store/store'

async function loadData (user) {
  let content = (await User.getAppContent(user._id)).data
  store.state.userID = user._id
  store.state.settings = user.settings
  store.state.content = content
}

export default {

  async checkUserLogged (to, from, next) {
    // Comprovem si l'usuari es troba actiu a l'aplicació
    if (!store.state.userLogged) {
      // Carreguem la cookie d'autenticació
      let authToken = document.cookie.split('=')
      // Si la cookie existeix..
      if (authToken[1]) {
        // Obtenim les dades del usuari corresponent i carreguem el contingut
        // en base a la seva configuració
        try {
          let user = (await Auth.getUserFromToken()).data
          store.state.user = user
          await loadData(user)
          // Permetem l'accés a la ruta
          next()
        } catch (e) {
          // En cas d'error al obtenir l'usuari redirigim a /login
          next({path: '/login', name: 'login'})
        }
        // Si la cookie no existeix..
      } else {
        // Redirigim a /login
        next({path: '/login', name: 'login'})
      }
      // Si l'usuari es troba actiu a l'aplicació..
    } else {
      // Obtenim dades i permetem accés a la ruta
      await loadData(store.state.user)
      next()
    }
  },

  checkUserUnlogged (to, from, next) {
    let authToken = document.cookie.split('=')
    if (!authToken[1]) {
      next()
    } else {
      next({path: '/home', name: 'home'})
    }
  }
}
