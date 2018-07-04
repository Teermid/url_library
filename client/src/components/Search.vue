<template>
  <div>
    <v-dialog v-model="logOutVerification" origin="top center" max-width="400px">
      <v-card class="pb-2">
        <v-card-title>
          <img class="customIcon" src="../../css/svg/exit_icon.svg">
          <span class="subheading px-2">{{ this.text.logout.exit }}</span>
          <v-spacer></v-spacer>
          <v-btn icon slot="activator" @click="logOutVerification = !logOutVerification">
            <v-icon color="grey lighten-2">close</v-icon>
          </v-btn>
         </v-card-title>
        <v-card-text class="pt-3 pb-0">
          <div style="height:50px;">
            <div
              @click="logOut"
              class="customButton white--text"
              id="deleteButton">
              {{ this.text.logout.y }}</div>
            <div
              @click="logOutVerification = !logOutVerification"
              class="customButton"
              id="cancelButton">
              {{ this.text.logout.n }}</div>
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
          'placeholder': null,
          logout: {
            exit: null,
            y: null,
            n: null
          }
        },
        search: '',
        drawer: true,
        logOutVerification: false
      }
    },

    beforeMount () {
      this.text.placeholder = this.$store.getters.getContent.searchBar.placeholder
      this.text.logout.exit = this.$store.getters.getContent.searchBar.logout.exit
      this.text.logout.y = this.$store.getters.getContent.searchBar.logout.y
      this.text.logout.n = this.$store.getters.getContent.searchBar.logout.n
    },

    methods: {
      toggleSidebar () {
        this.$store.commit('setSidebarDisplay')
      },

      async logOut () {
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
