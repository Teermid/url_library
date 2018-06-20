<template>
  <div>
    <div>
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
  </div>
</template>

<script>
import auth from '@/services/Auth'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: ''

    }
  },

  methods: {
    async Login () {
      try {
        const response = await auth.login({
          email: this.email,
          password: this.password
        })
        await this.$store.commit('setUser', response.data.user)
        await this.$store.commit('setUserID', response.data.user._id)
        console.log('setting cookie -> ' + this.$cookies.set('SESSION', response.data.token))
        console.log('redirecting -> ' + this.$router.push('/list'))
      } catch (e) {
        console.log('ERROR')
        // this.error = e.response.data.error
      }
    }

  },
  watch: {
    email (value) {
    }
  }
}
</script>
