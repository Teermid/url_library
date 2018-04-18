<template>
<div>

  <v-dialog v-model="popUpEdit" origin="top center" max-width="500px">
    <edit-element></edit-element>
  </v-dialog>

  <v-dialog v-model="deleteVerification" origin="top center" max-width="250px">
    <v-card class="pb-2">
      <v-card-text class="pt-3 pb-0">
        <v-icon color="red">warning</v-icon>
        <p class="subheading f_bold mt-1">Eliminar marcador?</p>
      </v-card-text>
      <v-btn
        @click="deleteVerification = !deleteVerification"
        depressed
        color="red accent-2"
        class="white--text">
        Cancelar</v-btn>
      <v-btn
        @click="confirmDeletion()"
        depressed
        color="blue accent-2"
        class="white--text">
        Confirmar</v-btn>
    </v-card>
  </v-dialog>

  <!-- GRID -->
  <div v-if="$store.getters.getGrid" id="card-content-body">
    <v-card class="white shadow" v-for="el in elements" :key="el.id" flat>
       <a v-bind:href="el.link"><v-card-media v-bind:src="el.imageURL" height="150px"></v-card-media></a>
       <v-card-title class="pb-0" style="min-height:180px">
         <div class="info_container">
           <div class="ma-0 black--text left f_black float-left title_">{{ el.title }}</div>
           <div class="mt-2 mx-0 black--text left f_light float-left description">{{ el.description }}</div>

           <v-menu bottom left>
              <v-btn icon slot="activator" light>
                <v-icon color="grey lighten-2">more_horiz</v-icon>
              </v-btn>
              <v-list class="white">
                <v-list-tile @click="deleteElement(el._id)">
                  <v-list-tile-title> Eliminar </v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="editElement(el._id)">
                  <v-list-tile-title> Editar </v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="">
                  <v-list-tile-title> (Visualitzar) </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

         </div>
       </v-card-title>
       <v-card-actions>
       </v-card-actions>
     </v-card>
  </div>

  <!-- LIST -->
  <div v-if="!$store.getters.getGrid" id="grid-content-body">
    <v-card class="white shadow" v-for="el in elements" :key="el.id" flat>
       <a v-bind:href="el.link"><v-card-media v-bind:src="el.imageURL" height="100px"></v-card-media></a>
       <v-card-title class="pb-0 pt-2">
         <div class="info_container">
           <div class="ma-0 black--text left f_black float-left title_">{{ el.title }}</div>
           <v-menu bottom left>
              <v-btn icon slot="activator" light>
                <v-icon color="grey lighten-2">more_horiz</v-icon>
              </v-btn>
              <v-list class="white">
                <v-list-tile @click="deleteElement(el._id)">
                  <v-list-tile-title> Eliminar </v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="editElement(el._id)">
                  <v-list-tile-title> Editar </v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="">
                  <v-list-tile-title> (Visualitzar) </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

         </div>
       </v-card-title>
       <v-card-actions>
       </v-card-actions>
     </v-card>
  </div>


</div>
</template>

<script>
import Elements from '@/services/Elements'
import EditElement from '@/components/EditElement'
export default {
  components: {
    EditElement
  },
  data () {
    return {
      elements: [{}],
      userID: this.$store.getters.getUserID,
      categoryFilter: 'All',
      searchValue: '',
      sortBy: this.$store.getters.getSortBy,
      popUpEdit: false,
      deleteVerification: false,
      idToDelete: ''
    }
  },

  async beforeMount () {
    this.getElements('All', false, null, this.userID, this.sortBy)
  },

  methods: {
    async getElements (cat, isSearch, searchVal, userID, sortBy) {
      this.elements = (await Elements.getElements(cat, isSearch, searchVal, userID, sortBy)).data
    },

    async deleteElement (id) {
      // await Elements.deleteElement(id)
      // this.getElements(this.categoryFilter, 'true', this.searchValue, this.userID, this.sortBy)
      this.idToDelete = id
      this.deleteVerification = true
    },

    async confirmDeletion () {
      await Elements.deleteElement(this.idToDelete)
      this.getElements(this.categoryFilter, 'true', this.searchValue, this.userID, this.sortBy)
      this.deleteVerification = false
    },

    editElement (id) {
      this.$store.commit('setElementId', id)
      this.$store.commit('setElementByIdTrigger')
      this.popUpEdit = !this.popUpEdit
    },

    navigateTo (route) {
      this.$router.push(route)
    }
  },

  watch: {
    '$store.state.searchString': {
      // this.searchValue = this.$store.getters.getSearchString
      async handler (value) {
        this.searchValue = value
        this.getElements(null, 'true', this.searchValue, this.userID, this.sortBy)
      }
    },

    '$store.state.categoryFilter': {
      // this.$store.getters.getCategoryFilter
      async handler (value) {
        this.categoryFilter = value
        this.getElements(this.categoryFilter, 'false', null, this.userID, this.sortBy)
      }
    },

    '$store.state.sortBy': {
      async handler (value) {
        this.sortBy = value
        let searchValue = this.searchValue || null
        let isSearch = 'true'
        if (searchValue === null) {
          isSearch = 'false'
        }
        this.getElements(this.categoryFilter, isSearch, searchValue, this.userID, this.sortBy)
      }
    },

    '$store.state.refreshElements': {
      async handler () {
        this.getElements(this.categoryFilter, 'false', null, this.userID, this.sortBy)
      }
    }
  }
}
</script>

<style>
:root {
  --content-body-width: calc(100% - 40px);
  --content-body-height: calc(100vh - 150px);
  --box-shadow: 0px 2px 2px 0px rgba(222,221,223,0.7);

  --card-content-container-width: 280px;
  --card-content-container-height: 330px;

  --grid-content-container-width: 200px;
  --grid-content-container-height: 200px;

}


#card-content-body {
  width: var(--content-body-width);
  height: var(--content-body-height);
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(var(--card-content-container-width), 1fr));
  grid-auto-rows: var(--card-content-container-height);
  padding: 0 20px 0px 20px;
  overflow-y: scroll;

}

.shadow {
  box-shadow: var(--box-shadow);
  webkit-box-shadow: var(--box-shadow);
  border-radius: 3px;
}

.description {
  max-height: 65px;
  min-height: 65px;
  margin-top:20px;
  overflow: hidden;
}

.title_ {
  max-height: 48px;
  overflow: hidden;
}

/* --------------------------------------------- */

#grid-content-body {
  width: var(--content-body-width);
  height: var(--content-body-height);
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(var(--grid-content-container-width), 1fr));
  grid-auto-rows: var(--grid-content-container-height);
  padding: 0 20px 0px 20px;
  overflow-y: scroll;
}

</style>
