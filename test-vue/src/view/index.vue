<template>
    <div>
      <h2>这里是首页</h2>
    </div>
</template>

<script>
  var data = [
    {
      path: 'index',
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

<style>

</style>
