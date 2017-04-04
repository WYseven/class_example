<template>

    <div id="content">
      这里是内容设置页
      <router-link v-for=" n,index of 10 " :key="index" :to='{name:"contents",params:{page:n}}'>第{{n}}篇文章</router-link>
      <transition name="abc" model="out-in">
        <div>
          获取到了：
            <p v-html='post'></p>
        </div>
      </transition>
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
          this.$router.push({name: 'contents', params: {page: 1}})

          this.post = `<p>${this.$route.params.page}</p>`
        }
      }
    }
  }
</script>

<style>
#content {
  position: absolute;
  top:0;
  left:0;
}
.abc-enter {
  opacity: 0;
}
.abc-enter-active {
  transition: .5s;
}
.abc-enter-to {
  opacity:1;
}
.abc-leave {
  opacity: 1;
}
.abc-leave-active {
  transition: .5s;
}
.abc-leave-to {
  opacity:0;
}

</style>
