<template>
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
    </div>

</template>

<script>
import auth from '@/services/Auth'
export default {
  data () {
    return {
      email: 'abc',
      password: '123'

    }
  },

  methods: {
    async register () {
      const response = await auth.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }

  },
  watch: {
    email (value) {
    }
  }
}
</script>
