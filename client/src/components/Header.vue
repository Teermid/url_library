<template>
    <div class="header">
      <div class="left">
        <router-link to="/list" v-if="$store.state.userLogged">List</router-link>
        <router-link to="/list/add" v-if="$store.state.userLogged">Add</router-link>
      </div>
      <div class="right">
        <router-link to="register" v-if="!$store.state.userLogged">Register</router-link>
        <router-link to="login" v-if="!$store.state.userLogged">Login</router-link>
        <button @click="logOut" v-if="$store.state.userLogged">Log Out</button>
      </div>
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
      logOut () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('userLogOut', false)
        this.$router.push('/')
      }

    }
  }
</script>

<style>
  .header {
      margin-bottom: 20px;
      width: 100%;
      float: left;
      height: 70px;
      background-color: cyan;
      opacity: 0.5;
  }

  .left {
    float:left;
    width: fit-content;
    margin: 10px 0px 0px 10px;
  }
  .right {
    float:right;
    width: fit-content;
    margin: 10px 10px 0px 0px;
  }

</style>
