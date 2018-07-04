<!-- <template>
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
          v-model="repeatPassword"
          type="password"
          name="password"
          value="password">
        <br>
        <div @click="register" class="loginButton">
          Registrar-se
        </div>
        <p @click="goRegister">Accés</p>
      </div>
    </div>
    <v-snackbar
      bottom
      timeout=3000
      v-model="snackbar">
        HALA
      <v-btn dark flat color="pink" @click.native="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template> -->
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
          v-model="repeatPassword"
          type="password"
          name="password"
          value="password">
        <br>
        <div @click="Register" class="loginButton">
          Registrar-se
        </div>
        <p @click="goLogin">Accés</p>
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
    async Register () {
      this.snackbar = false
      try {
        if (this.email.length === 0 || this.password.length === 0 || this.repeatPassword.length === 0) {
          this.error = 'Omple tots els camps!'
          this.snackbar = true
        } else if (this.password !== this.repeatPassword) {
          this.error = 'Les contrasenyes no coincideixen'
          this.snackbar = true
        } else {
          const response = await auth.register({
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
        }
      } catch (e) {
        this.error = e.response.data.error
        this.snackbar = true
      }
    },

    goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style src="../../css/session.css"></style>
