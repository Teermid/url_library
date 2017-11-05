<template>
    <div class="header">
      <router-link to="register" v-if="!$store.state.userLogged">Register</router-link>
      <router-link to="login" v-if="!$store.state.userLogged">Login</router-link>
    </div>
</template>

<script>
  export default {
    methods: {
      /*
      navigateTo (route) {
        this.$router.push(route)
      }
      */
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
