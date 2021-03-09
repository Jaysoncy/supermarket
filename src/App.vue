<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
      <!-- keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们 -->
      <!-- 为了使keep-alive包裹的某个组件不受约束，可以使用exclude="" -->
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import 'assets/css/base.css';
</style>
