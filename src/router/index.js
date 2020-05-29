import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['../components/HelloWorld'], resolve),
      children: []
    },
    {
      path: '/masaike',
      component: resolve => require(['../views/masaike/masaike4'], resolve),
      meta: { requireAuth: false }
    }
  ]
})
