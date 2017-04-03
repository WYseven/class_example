import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: resolve => require(['../pages/index.vue'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/u',
      name: 'User',
      component: resolve => require(['../components/Hello.vue'], resolve),
      children: [
        {
          path: '/',
          name: 'Home',
          component: resolve => require(['../pages/home.vue'], resolve)
        },
        {
          path: 'info',
          name: 'Info',
          component: resolve => require(['../pages/info.vue'], resolve)
        },
        {
          path: 'modules',
          name: 'modules',
          component: resolve => require(['../pages/modules.vue'], resolve)
        },
        {
          path: 'contents/:page?',
          name: 'contents',
          component: resolve => require(['../pages/contents.vue'], resolve)
        }
      ]
    }
  ]
})
