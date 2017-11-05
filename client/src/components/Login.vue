<template>
    <div class="">
        <h1>Login</h1>

        <input
          v-model="email"
          type="email"
          name="email"
          value="email">
        <br>
        <input
          v-model="password"
          type="password"
          name="password"
          value="password">
        <br>
        <button @click="Login">
          Login
        </button>
        <p v-html="error" />
    </div>

</template>

<script>
import auth from '@/services/Auth'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: 'NO ERRORS'

    }
  },

  methods: {
    async Login () {
      console.log('VUE --> Login')
      try {
        console.log('VUE --> login --> try')
        const response = await auth.login({
          email: this.email,
          password: this.password
        })
        console.log('RESPONSE => ' + response.data.token)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (e) {
        this.error = e.response.data.error
      }
    }

  },
  watch: {
    email (value) {
    }
  }
}
</script>
