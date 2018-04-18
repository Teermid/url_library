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
    <v-navigation-drawer fixed v-model="drawer" app dark class="sidebar">
      <sidebar></sidebar>
    </v-navigation-drawer>
    <v-toolbar
      color="white"
      height="60"
      dense
      fixed
      app>
      <v-toolbar-side-icon color="grey--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="ml-3" color="grey lighten-1" size="25px">search</v-icon>
      <v-layout row align-center>
        <input class="black--text" type="text" placeholder="Cerca.." v-model="search"
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
        search: '',
        drawer: true
      }
    },

    watch: {
      search (value) {
        this.$store.commit('setSearchString', value)
      }
    }
  }
</script>
