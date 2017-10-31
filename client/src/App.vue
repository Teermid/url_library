<template>
  <div id="app">
    <page-header />
    <router-view/>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style>

body, h1 {
  margin: 0px;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
