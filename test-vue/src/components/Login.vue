<template>
  <div>
    用户名：<input type="text" />
    密码：<input type="password" />
    <input type="button" value="登录" @click="loginIn" />
  </div>
</template>

<script>
export default {
  methods: {
    loginIn () {
      this.$router.push('/u')
    }
  }
}
</script>

<style>

</style>
