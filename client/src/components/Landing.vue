<template>
  <div class="landingWrapper">
    <div class="landingContent">
      <h1>Savify</h1>
      <p>Emmagatzema, organitza i gestiona la Web </p>
      <div @click="goRegister" class="landingButton">Registra't</div>
      <p>Ja tens compte?</p>
      <a @click="goLogin">Accedeix</a>
    </div>
    <div class="imgWrapper">
      <img src="../../css/Browser_UI.svg">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      error: '',
      inputColor: '#DBDADA'

    }
  },

  methods: {
    async goRegister () {
      this.$router.push('/register')
    },

    async goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style src="../../css/landing.css"></style>
