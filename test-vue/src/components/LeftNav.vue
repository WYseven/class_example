<template>
  <div>
    <h2>左侧导航</h2>

    <router-link to="/u/info/">学员信息</router-link>
    <router-link to="/u/home">home</router-link>
    <router-link to="/u/modules/">模块设置</router-link>
    <router-link to="/u/contents/">内容管理</router-link>
  </div>
</template>

<script>

  // 暴露一个组件的选项参数，内部会用Vue.extend进行包装

  export default {
    name: 'left-nav'
  }
</script>

<style>
  a {
    display: block;
  }
  .router-link-active {
    color: #f00;
  }
</style>
