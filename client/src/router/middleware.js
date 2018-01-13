import ls from '@/store/store'
console.log(ls.state.userLogged)

export default {
  userLogged (to, from, next) {
    if (ls.state.userLogged) {
      next()
    } else {
      next({path: '/login', name: 'login'})
    }
  },

  userNotLogged (to, from, next) {
    if (!ls.state.userLogged) {
      next()
    } else {
      next({path: '/list', name: 'list'})
    }
  }
}
