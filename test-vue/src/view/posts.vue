<template>
  <div>{{ $route.params.id }}</div>
</template>

<script>
export default {
watch: {
  '$route'(){
    //拿到id发送请求
    console.log(this.$route.params.id)
  }
}
}
</script>

<style>

</style>
