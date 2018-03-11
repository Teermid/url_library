import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
// import CreateElement from '@/components/createElement'
import EditElement from '@/components/editElement'
import Main from '@/components/Main'
import guard from '@/router/middleware'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      beforeEnter: guard.userNotLogged
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: guard.userNotLogged
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: guard.userNotLogged
    },
    {
      path: '/list',
      name: 'list',
      component: Main,
      beforeEnter: guard.userLogged
    },
    {
      path: '/list/edit/:element_id',
      name: 'edit',
      component: EditElement,
      beforeEnter: guard.userLogged
    }
  ]
})
