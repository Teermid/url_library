<template>
  <v-app dark>

    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense height="100%">
        <v-list-tile class="mt-3" @click="">
          <v-list-tile-action class="icon-span">
            <v-icon class="icon-span" color="white">dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="white--text">Tots</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon color="white">inbox</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="white--text">Sense Classificar</v-list-tile-title>
        </v-list-tile>

        <v-subheader>CATEGORIES</v-subheader>
        <v-list>
          <v-expansion-panel expand style="box-shadow:none">
            <v-expansion-panel-content style="border:none" v-for="(item,i) in 5" :key="i">
              <div slot="header">Lorem</div>
              <v-list dense>
                <v-list-tile @click="">
                  <v-list-tile-title class="ml-4">Ipsu</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-list>

      </v-list>

      <div>
        <v-list dense>
          <v-list-tile class="mt-3" @click="">
            <v-list-tile-action>
              <v-icon color="white">playlist_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="white--text">Afegir Categoria</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="white">library_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="white--text">Afegir Marcador</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-toolbar
      color="white"
      height="60"
      dense
      fixed
      app>
      <v-toolbar-side-icon color="grey--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="ml-3" color="grey lighten-1" size="25px">search</v-icon>
      <v-layout row align-center style="max-width: 650px">
        <input type="text" placeholder="Cerca.."
          style="
            padding:10px;
          "
        >
      </v-layout>
    </v-toolbar>

    <v-content class="white">
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn
                icon
                large
                :href="source"
                target="_blank"
                slot="activator"
              >
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <v-btn icon large href="https://codepen.io/johnjleider/pen/YeRKwQ" target="_blank" slot="activator">
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
              <span>Codepen</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: true
    }),
    props: {
      source: String
    }
  }
</script>

<style>
/*  .icon-span {
    min-width: 54px !important;
  }*/
</style>
