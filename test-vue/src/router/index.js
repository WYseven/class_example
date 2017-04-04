import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

document.onclick = function () {
  /*
    require(['../pages/test.js'], function (require) {
    require('../pages/test2.js')
    console.log('good')
  }, 'test-chunk')
   r => require.ensure([], () => r(require('../pages/index.vue')), 'group-foo')
  */
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: (r) => {
        require.ensure(['../pages/info.vue'], (require) => {
          r(require('../pages/index.vue'))
        })
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/u',
      // name: 'User', 如果有默认子路由，父路由name要去掉
      component: resolve => require(['../components/Hello.vue'], resolve),
      children: [
        {
          path: 'home',
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
