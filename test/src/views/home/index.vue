<template>
  <div class="home-page">
    <img alt="Vue logo" src="~@image/home/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// import { getHomeInfo } from '@api/home'
import HelloWorld from '@components/HelloWorld/index.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
