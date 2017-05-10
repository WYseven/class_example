// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// require("./assets/css/main.css")

Vue.config.productionTip = false  // 在应用启动时,关闭生产模式下给出的提示



// 当new一个对象的时候，需要赋值给一个变量，当不需要赋值给变量，需要单独添加规则，跳过eslint的验证
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
