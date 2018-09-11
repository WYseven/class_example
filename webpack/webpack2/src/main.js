/**
 * Created by seven on 2017/4/9.
 */
import Vue from 'vue';
import obj from './a';
import App from './app';

console.log("ok")

console.log(document.getElementById("app"))

var vm = new Vue({
    template:'<div id="app">hello,123</div>'
})


vm.$mount("#app")


console.log(vm.$el)

