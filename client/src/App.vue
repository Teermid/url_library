<template>
  <div id="app">
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

  :root {
    --header-padding: 25px;
    --_6element-width: 1630px;
    --_5element-width: 1360px;
    --_4element-width: 1090px;
    --_3element-width: 820px;
    --_2element-width: 550px;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  html body {
    margin: 0px;
    padding: 0;
    border: 0;
    outline: 0;
  }

  input:focus {
    outline: none;
  }

  body h1 {
    margin: 0px;
    padding: 0;
    border: 0;
    outline: 0;
  }

  #app {
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  @media screen and (max-width: 920px) {
     #sidebar {
       position:absolute;
       left: -270px;
     }

     #main {
       width:100% !important;
     }
  }
</style>
