<template>
  <div>
    这里是内容设置页
    <router-link v-for=" n,index of 10 " :key="index" :to='{name:"contents",params:{page:n}}'>第{{n}}篇文章</router-link>
    <div>
      获取到了：
        <p v-html='post'></p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        post: ''
      }
    },
    created () {
      this.fetchPost()
    },
    watch: {
      '$route': 'fetchPost'
    },
    methods: {
      fetchPost () {
        if (this.$route.params.page) {
          this.post = `<p>${this.$route.params.page}</p>`
        } else {
          console.log(this.$router)
          this.$router.push({name: 'contents', params: {page: 1}})

          this.post = `<p>${this.$route.params.page}</p>`
        }
      }
    }
  }
</script>

<style>

</style>
