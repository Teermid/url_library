<template>
    <div class="header">
      <button v-on:click="navigateTo('Register')">Register</button>
      <button v-on:click="navigateTo('Login')">Login</button>
    </div>
</template>

<script>
  export default {

    methods: {
      navigateTo (route) {
        this.$router.push(route)
      }
    }

  }
</script>

<style scoped>
  .header {
      margin-bottom: 20px;
      width: 100%;
      float: left;
      height: 70px;
      background-color: cyan;
      opacity: 0.5;
  }

</style>
