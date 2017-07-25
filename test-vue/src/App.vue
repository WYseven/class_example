<template>
  <div id="app">
    <ul>
      <li v-for="value in data">
        <router-link :to="value" href="">{{value.title}}</router-link>
      </li>
    </ul>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
  var data = [
    {
      path: '/',
      title: "首页"
    },
    {
      path: 'wenzhang',
      title: '文章列表'
    },
    {
      path: 'about',
      title: '关于我'
    }
  ]
  export default {
    data(){
      return {
        data:data
      }
    }
  }
</script>

