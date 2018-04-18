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

  html body, body h1 {
    margin: 0px;
    padding: 0;
    border: 0;
    outline: 0;
    font-family: 'Source Sans Pro', sans-serif;
  }

  input:focus, textarea:focus, select:focus {
    outline: none;
  }


  #app {
    /*font-family: 'Roboto', sans-serif;*/
    font-family: 'Source Sans Pro', sans-serif;
    color: #2c3e50;
    text-align: center;
  }

  .justify {
    text-align: justify;
  }

  .left {
    text-align: left;
  }

  .f_light {
    font-weight: 300;
  }

  .f_regular {
    font-weight: 400;
  }

  .f_black {
    font-weight: 500;
    font-size:16px;
  }

  .f_bold {
    font-weight: 600;
  }

  .float-left {
    float:left !important;
    width: 100% !important;
  }

  .background {
    /*background-color: #f5f5f5;*/
    /*background-color: #f7f8fb;*/
    background-color: #f7f7f7;
  }

  div.dialog__content {
    align-items: flex-start;
    margin-top: 10vh;
    }

  /*.sidebar {
    background-color: #2c3e50 !important;
  }*/


</style>
