import Vue from 'vue'
import Router from 'vue-router'
import toolbar from '@/components_2/toolbar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'toolbar',
      component: toolbar
    }
  ]
})
