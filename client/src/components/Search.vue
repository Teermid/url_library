<template>
  <div>
    <v-dialog v-model="logOutVerification" origin="top center" max-width="400px">
      <v-card class="pb-2">
        <v-card-title>
          <img class="customIcon" src="../../css/svg/exit_icon.svg">
          <span class="subheading px-2">Sortr de l'aplicació?</span>
          <v-spacer></v-spacer>
          <v-btn icon slot="activator" @click="close">
            <v-icon color="grey lighten-2">close</v-icon>
          </v-btn>
         </v-card-title>
        <v-card-text class="pt-3 pb-0">
          <div style="height:50px;">
            <div
              @click="logOut"
              class="customButton white--text"
              id="deleteButton">
              Sortir</div>
            <div
              @click="logOutVerification = !logOutVerification"
              class="customButton"
              id="cancelButton">
              Cancelar</div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-toolbar
      color="white"
      height="60"
      class= "shadow"
      v-bind:class=" { toolbarCustom:$store.state.sidebarDisplay } "
      dense
      fixed
      app>
      <v-toolbar-side-icon color="grey--text" @click.stop="toggleSidebar"></v-toolbar-side-icon>
      <v-icon class="ml-3" color="grey lighten-1" size="25px">search</v-icon>
      <input
        class="black--text"
        type="text"
        :placeholder="text.placeholder"
        v-model="search"
        style="
          padding:10px;
          border:none;"
      >
      <v-btn icon light @click="logOutVerification = !logOutVerification">
        <v-icon color="grey lighten-1">exit_to_app</v-icon>
      </v-btn>

    </v-toolbar>

  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar.vue'
  export default {
    components: {
      Sidebar
    },
    data () {
      return {
        'text': {
          'placeholder': null
        },
        search: '',
        drawer: true,
        logOutVerification: false
      }
    },

    beforeMount () {
      this.text.placeholder = this.$store.getters.getContent.searchBar.placeholder
    },

    methods: {
      toggleSidebar () {
        this.$store.commit('setSidebarDisplay')
      },

      async logOut () {
        alert('logOut')
        alert(this.$cookies.get('session'))
        await this.$cookies.remove('session')
        this.$router.push('/')
      }
    },

    watch: {
      search (value) {
        this.$store.commit('setSearchString', value)
      }
    }
  }
</script>

<style scoped>

  input {
    padding: 10px;
    border: none;
    width: 100%;
  }

</style>
