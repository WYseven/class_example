import Vue from 'vue'
import Router from 'vue-router'
import mainRouters from './mainRouters'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: function (resolve) {
        require.ensure([] , function () {
          return resolve(require('views/layout'))
        })
      },
      children: mainRouters
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require.ensure([], () => resolve(require('views/login')), 'login')
    }
  ]
})
