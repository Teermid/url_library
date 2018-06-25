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
        // Petició d'inici de sessió
        const response = await auth.login({
          email: this.email,
          password: this.password
        })
        // Emmagatzemem dades de l'usuari
        await this.$store.commit('setUser', response.data.user)
        // Estat de l'usuari actiu
        await this.$store.commit('setUserLogged', true)
        // Guardem cookie al cercador
        await this.$cookies.set('session', response.data.token)
        // Redirigim usuari
        this.$router.push('/list')
      } catch (e) {
        console.log('ERROR')
      }
    }
  },

  watch: {
    email (value) {
    }
  }
}
</script>
