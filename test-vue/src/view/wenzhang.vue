<template>
  <div>
    <div>这里是文章列表</div>
    <h2>文章列表</h2>
    <ul class="wenzhang">
      <li>
        <router-link :to="{name:'wenzhang',params:{id:1}}">第1篇文章</router-link>
      </li>
      <li>
        <router-link :to="{name:'wenzhang',params:{id:2}}">第2篇文章</router-link>
      </li>
      <li>
        <router-link :to="{name:'wenzhang',params:{id:3}}">第3篇文章</router-link>
      </li>
    </ul>
    <hr>
    <h2>在这里预览文章</h2>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    data () {
       return {
          num: 1
       }
    },
    watch: {
        '$route'(){
            //拿到id发送请求
          console.log(this.$route.params.id)
      }
    }
  }
</script>

<style>
.wenzhang .router-link-active {
  color: red;
}
</style>
