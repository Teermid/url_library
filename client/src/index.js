import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Main from '@/components/Main'
import guard from '@/router/middleware'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEnter: guard.checkUserUnLogged
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: guard.checkUserUnlogged
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: guard.checkUserUnlogged
    },
    {
      path: '/list',
      name: 'list',
      component: Main,
      beforeEnter: guard.checkUserLogged
    }
  ]
})
