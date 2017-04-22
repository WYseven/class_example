<template src="./a.html">
  <div class="hello">
    <router-link to="/">返回首页</router-link>
    <div id="left">
      <left-nav></left-nav>
    </div>
    <div id="right">
      <transition model="out-in" name="fade">
          <router-view></router-view>
      </transition>

    </div>
  </div>
</template>

<script>

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}



#left {
  float: left;
  width: 200px;
  border: 1px solid #ccc;
}
#right {
  float: left;
  width: 500px;
  height: 1000px;
  border: 1px solid #999;
  box-shadow: 1px 2px 5px #000;
  position: relative;
  overflow: hidden;
}


.fade-enter {
  opacity:0;
  transform: translateX(500px);
}
.fade-enter-active {
  transition: .5s;
}
.fade-enter-to {
  opacity:1;
  transform: translateX(0px);
}
.fade-leave {
  transform: translateX(0px);
}
.fade-leave-active {
  transition: 1s;
}
.fade-leave-to {
  transform: translateX(-500px);
}
</style>
