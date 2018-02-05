<template>
  <div>
    <PageHeader></PageHeader>
    <div class="">
        <h1>Register</h1>

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
        <button @click="register">
          Register
        </button>
        <p v-html="error" />
    </div>
  </div>
</template>

<script>
import auth from '@/services/Auth'
import PageHeader from '@/components/Header.vue'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      email: '',
      password: '',
      error: 'NO ERRORS'

    }
  },

  methods: {
    async register () {
      try {
        const response = await auth.register({
          email: this.email,
          password: this.password
        })
        console.log(response)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setUserID', response.data.user.id)
        this.$router.push('/list')
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
