import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import List from '@/components/List'
import CreateElement from '@/components/createElement'
import EditElement from '@/components/editElement'

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
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/list/add',
      name: 'add',
      component: CreateElement
    },
    {
      path: '/list/edit/:element_id',
      name: 'edit',
      component: EditElement
    }
  ]
})
