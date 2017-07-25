import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: function (resolve) {
        require.ensure([] , function () {
           resolve(require('views/index'))
        })
      }
    },
    {
      path: '/wenzhang/:id?',
      component: function (resolve) {
        require.ensure([] , function () {
          return resolve(require('views/wenzhang'))
        })
      },
      children: [
        {
          path:'',
          name: 'wenzhang',
          component: function (resolve) {
            require.ensure([] , function () {
              return resolve(require('views/posts'))
            })
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: function (resolve) {
        require.ensure([] , function () {
          return resolve(require('views/about'))
        })
      }
    },
    {
      path:'*',
      redirect: '/'
    }
  ]
})
