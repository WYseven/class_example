<template>
  <aside class="sidebar">
    <nav class="menu">
      <ul class="list">
        <li class="item active" v-for="item in menus">
          <router-link :to="item" class="router-link-active icon-before"
             :class="['icon-'+item.icon]" title="item.text">{{item.text}}</router-link>
          <ul class="list" v-if="item.children">
            <li class="item" v-for="sub in item.children">
              <router-link :to="sub">{{ sub.text }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
  var menus = [
    {
      text: '仪表盘',
      icon: 'meter',
      name: 'dashboard',
      children: [
        { text: '首页', name: 'dashboard'},
        { text: '更新', name: 'update'}
      ]
    },
    {
      text: '文章',
      icon: 'pushpin',
      name: 'posts',
      params: { type: 'blog' },
      children: [
        { text: '所有文章', name: 'posts', params: { type: 'blog' } },
        { text: '写文章', name: 'new', params: { type: 'blog' } },
        { text: '分类目录', name: 'terms', params: { type: 'blog-category' } },
        { text: '标签', name: 'terms', params: { type: 'blog-tag' } }
      ]
    },
    {
      text: '页面',
      icon: 'newspaper',
      name: 'posts',
      params: { type: 'page' },
      children: [
        { text: '所有页面', name: 'posts', params: { type: 'page' } },
        { text: '新建页面', name: 'new', params: { type: 'page' } }
      ]
    }
  ]
  export default {
      data(){
          return {
            menus: menus
          }
      }
  }
</script>
<style>

</style>
