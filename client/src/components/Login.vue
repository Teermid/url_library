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
        <br>
        <div @click="Login" class="loginButton">
          Accedir
        </div>
        <p @click="goRegister">Registre</p>
      </div>
    </div>
    <v-snackbar
      bottom
      timeout=3000
      v-model="snackbar">
        {{ error }}
      <v-btn dark flat color="pink" @click.native="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import auth from '@/services/Auth'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: '',
      snackbar: false
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
        this.$router.push('/home')
      } catch (e) {
        this.error = e.response.data.error
        this.snackbar = true
      }
    },
    goRegister () {
      this.$router.push('/register')
    }
  }
}
</script>
<style src="../../css/session.css"></style>
