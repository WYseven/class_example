<template>
  <section class="login">
    <header class="login-header">
      <h1 class="brand">
        <a href="/" class="router-link-active" tabindex="-1">MIAOV.COM</a></h1>
      </header>
    <form class="el-form login-form el-form--label-top" auto-complete="off">
      <h2 class="heading">登录</h2>
      <div class="el-form-item is-required">
        <label for="username" class="el-form-item__label">用户名</label>
        <div class="el-form-item__content">
          <div class="el-input">
            <input type="text" placeholder="请输入用户名" autocomplete="off" class="el-input__inner">
            </div>
          </div>
      </div>
      <div class="el-form-item is-required">
        <label for="password" class="el-form-item__label">密码</label>
        <div class="el-form-item__content">
          <div class="el-input">
            <input type="password" placeholder="请输入密码" autocomplete="off" class="el-input__inner">
            <</div>
          <</div>
      </div>
      <button @click="loginHandle" type="button" class="el-button el-button--primary">
        <span>登录</span>
      </button>
    </form>
    <footer class="login-footer">← 返回到
      <a href="/">WEDN.NET</a></footer>
  </section>
</template>

<script>
  export default {
      name: 'login',
      methods: {
        loginHandle(){
          // 有一系列的验证
          this.$router.replace({ path: '/' })
        }
      }
  }
</script>

<style>
  .login {
    -webkit-box-flex:1;
    flex:1;
    width:95%;
    max-width:22rem;
    margin:0 auto;
    font-size:.875rem
  }
  .login-header {
    margin-bottom:1rem
  }
  .login-header .brand {
    margin:4.5rem 0 3.5rem;
    text-align:center;
    letter-spacing:.125rem
  }
  .login-header .brand a {
    margin:0;
    color:#D3DCE6;
    font:300 3rem sans-serif
  }
  .login-header .brand a:hover {
    color:#fff;
    text-shadow:0 0 1rem #fff
  }
  .login-form {
    margin-bottom:2.5rem;
    padding:1.875rem 1.25rem;
    background:#F0F1F3;
    color:#2b3b49
  }
  .login-form .heading {
    margin:0 0 1rem;
    font-weight:400;
    font-size:1.5rem
  }
  .login-form .el-button {
    margin-top:.5rem;
    width:100%
  }
  .login-footer {
    margin-bottom:1rem;
    padding:.625rem;
    border:0.0625rem solid #D3DCE6;
    font-size:.75rem;
    text-align:center
  }
  .login-footer a {
    color:#D3DCE6
  }
</style>
