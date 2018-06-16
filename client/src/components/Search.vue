<!-- <template>
  <div id="searchbar">
    <input
      v-model="search"
      type="text"
      name="search"
      placeholder="Search.."
      ></input>
  </div>
</template>
-->

<template>
  <div>
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
      <v-layout row align-center>
        <input
          class="black--text"
          type="text"
          :placeholder="text.placeholder"
          v-model="search"
          style="
            padding:10px;
            border:none;
            width:100%;
          "
        >
      </v-layout>
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
        drawer: true
      }
    },

    beforeMount () {
      this.text.placeholder = this.$store.getters.getContent.searchBar.placeholder
    },

    methods: {
      toggleSidebar () {
        this.$store.commit('setSidebarDisplay')
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
