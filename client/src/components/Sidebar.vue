

<template>
  <div>
    <v-dialog v-model="popUpDisplay" origin="top center" max-width="500px">
      <add-bookmark></add-bookmark>
    </v-dialog>

    <v-list class="mt-5 sidebar" dense dark>
      <v-list-tile class="mt-3" @click="">
        <v-list-tile-action class="icon-span">
          <v-icon class="icon-span" color="white">dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="white--text" @click="displayCategory" value="All">Tots</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon color="white">inbox</v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="white--text"  @click="displayCategory" value="Unsorted">Sense Classificar</v-list-tile-title>
      </v-list-tile>

      <v-subheader class="mt-4">CATEGORIES</v-subheader>
      <v-list>

        <v-expansion-panel expand focusable style="box-shadow:none">
            <v-expansion-panel-content style="border:none" v-for="ca in categories" :key="ca._id" v-if="!ca.parentCategory">
              <div slot="header" @click="displayCategory" v-bind:value="ca.name"> {{ ca.name }} </div>
              <v-list dense>
                <v-list-tile @click="" v-for="nested in ca.nestedCategories" :key="nested._id">
                  <v-list-tile-title class="ml-4" @click="displayCategory" v-bind:value="nested.name"> {{ nested.name }} </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-expansion-panel-content>
        </v-expansion-panel>

      </v-list>
    </v-list>

    <div>
      <v-list dense dark>
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
          <v-list-tile-title class="white--text" @click.stop="popUpDisplay = !popUpDisplay">Afegir Marcador</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </div>
  </div>
</template>

<script>
  import Category from '@/services/Category'
  import addBookmark from '@/components/addBookmark'
  export default {
    components: {
      addBookmark
    },
    data () {
      return {
        popUpDisplay: false,
        category: {
          name: '',
          parentCategory: ''
        },
        categories: [{}],
        userID: this.$store.getters.getUserID
      }
    },

    async beforeMount () {
      this.printCategories()
    },

    methods: {
      async printCategories () {
        this.categories = (await Category.getCategory(this.userID)).data
        this.$store.commit('setCategoriesList', this.categories)
      },

      displayCategory () {
        this.displayed = !this.displayed
        var value = event.currentTarget.getAttribute('value')
        this.$store.commit('setCategoryFilter', value)
      },

      async addCategory () {
        this.category.owner = this.$store.getters.getUserID
        try {
          const response = await Category.addCategory(this.category)
          console.log(response)
          this.printCategories()
        } catch (e) {
          console.log(e.response)
        }
      }
    },

    watch: {
      '$store.state.popUpDisplay': {
        async handler (value) {
          this.popUpDisplay = !this.popUpDisplay
        }
      }
    }
}
</script>
