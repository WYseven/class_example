/**
 * Created by wangyun on 17/4/22.
 */

export default [

  {
    name: 'dashboard',
    path: '',
    component: resolve => require.ensure([], () => resolve(require('views/main/index')), 'dashboard')
  },
  {
    name: 'update',
    path: '/update',
    component: resolve => require.ensure([], () => resolve(require('views/main/update')), 'update')
  },
  {
    name: 'posts',
    path: 'posts/:type',
    meta: { requiresAuth: true },
    component: resolve => require.ensure([], () => resolve(require('views/main/posts')), 'posts')
  },
  {
    name: 'new',
    path: 'new/:type',
    meta: { requiresAuth: true },
    component: resolve => require.ensure([], () => resolve(require('views/main/new')), 'posts')
  },
  {
    name: 'edit',
    path: 'edit/:type/:slug?',
    meta: { requiresAuth: true },
    component: resolve => require.ensure([], () => resolve(require('views/main/edit')), 'posts')
  },
  {
    name: 'terms',
    path: 'terms/:type',
    meta: { requiresAuth: true },
    component: resolve => require.ensure([], () => resolve(require('views/main/terms')), 'terms')
  }
]
