import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
// import List from '@/components/List'
import CreateElement from '@/components/createElement'
import EditElement from '@/components/editElement'
import Main from '@/components/Main'
import guard from '@/router/middleware'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
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
      path: '/list/add',
      name: 'add',
      component: CreateElement,
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
