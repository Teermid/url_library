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
    --modal-width: 450px;
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

  input:focus, textarea:focus, select:focus {
    outline: 1px solid lightblue;
  }

  body h1 {
    margin: 0px;
    padding: 0;
    border: 0;
    outline: 0;
  }

  input, textarea {
    font-family: 'Lato', sans-serif;
  }

  #app {
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; */
    /* font-family: 'Roboto', sans-serif; */
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
