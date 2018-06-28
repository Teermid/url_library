<template>
  <div>
    <div class="sessionWrapper">
      <div class="form">
        <h2>SAVIFY</h2>
        <input
          placeholder="E-mail"
          v-model="email"
          type="email"
          name="email"
          value="email">
        <br>
        <input
          placeholder="Contrasenya"
          v-model="password"
          type="password"
          name="password"
          value="password">
        <input
          placeholder="Confirmar contrasenya"
          v-model="password"
          type="password"
          name="password"
          value="password">
        <br>
        <div @click="Login" class="loginButton">
          Registrar-se
        </div>
        <p @click="goRegister">Accés</p>
      </div>
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
        this.$store.commit('setToken', response.data.token)
        this.$store.commit('setUser', response.data.user)
        this.$store.commit('setUserID', response.data.user._id)
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
<style src="../../css/session.css"></style>
