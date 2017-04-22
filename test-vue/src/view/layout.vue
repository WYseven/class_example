<template>
  <div>
    <header class="header">
      <h1>MIAOV.COM</h1>
      <nav class="header_nav">
        <ul class="list">
          <li>
            <a href="">
              Hi,seven
              <img src="../assets/github.jpeg" alt="">
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <section class="main">
      <div id="left">
        <side-bar></side-bar>
      </div>
      <section class="content">
        <div class="inner">
          <router-view></router-view>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
   import sideBar from 'views/sideBar'
  export default {
    name: 'layout',
    components: {
      sideBar
    }
  }
</script>

<style>

</style>
