import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Landing from '@/components/Landing'
import Main from '@/components/Main'
import guard from '@/router/middleware'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: Landing,
      beforeEnter: guard.checkUserUnlogged
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: guard.checkUserUnlogged
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: guard.checkUserUnlogged
    },
    {
      path: '/home',
      name: 'home',
      component: Main,
      beforeEnter: guard.checkUserLogged
    }
  ]
})
