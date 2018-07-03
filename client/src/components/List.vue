<template>
<div class="wrapper">
  <v-progress-circular v-if="!contentLoaded" class="mt-3" size="30" :width="3" indeterminate color="blue"></v-progress-circular>
  <v-dialog v-model="deleteVerification" origin="top center" max-width="400px">
    <v-card class="pb-2">
      <v-card-title>
        <img class="customIcon" src="../../css/svg/delete_icon.svg">
        <span class="subheading px-2">{{ text.deleteConfirmation.header }}</span>
        <v-spacer></v-spacer>
        <v-btn icon slot="activator" @click="deleteVerification = !deleteVerification">
          <v-icon color="grey lighten-2">close</v-icon>
        </v-btn>
       </v-card-title>
      <v-card-text class="pt-3 pb-0">
        <div style="height:50px;">
          <div
            @click="confirmDeletion()"
            class="customButton white--text"
            id="deleteButton">
            {{ text.deleteConfirmation.y }}</div>
          <div
            @click="deleteVerification = !deleteVerification"
            class="customButton"
            id="cancelButton">
            {{ text.deleteConfirmation.n }}</div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <div class="noContent" v-if="noContent">
    <img src="../../css/svg/no_content.svg">
    <div> Cap marcador trobat </div>
  </div>

  <div class="chunk" v-if="contentLoaded" v-for="chunk in data">
  <p class="f_left uppercase">{{ chunk.title }}</p>
    <!-- CARDS -->
    <div v-if="$store.state.elementsDisplay === 'card'" id="card-content-body">
      <v-card class="white shadow" v-for="el in chunk.elements" :key="el.id" flat draggable="true" v-on:dragstart="drag(el._id, $event)">
        <div class="multSelectIcon shadow" v-if="$store.state.multSelect" v-bind:class=" { multSelectIconSelected : el.selected } ">
          <v-icon class="mt-1" v-bind:class=" { 'white--text' : el.selected } ">done</v-icon>
        </div>
        <div class="selectionFilter" v-if="$store.state.multSelect" @click="select(el)"></div>
        <div class="selectionFilterSelected" v-if="el.selected"></div>
        <a class="hover" v-bind:href="el.url">
          <v-card-media v-bind:src="el.imageURL" height="150px"></v-card-media>
        </a>
        <v-card-title class="pt-2">
        <div class="tagsContainer">
          <div class="tag" v-for="tag in el.categories" @click="tagClicked(tag.name)">
            {{ tag.name }}
          </div>
        </div>
          <div class="info_container">
            <div class="mt-1 black--text f_left f_black float-f_left title_">{{ el.title }}</div>
            <div class="mt-1 mx-0 black--text f_left f_light float-f_left description">{{ el.description }}</div>
          </div>
          <v-menu class="cardOptions" offset-y>
            <v-btn @click="loadCategories(el.categories)" icon slot="activator" light >
              <v-icon color="grey lighten-2">more_horiz</v-icon>
            </v-btn>
            <v-list class="white">
              <v-list-tile @click="viewElement(el._id)">
                <v-icon color="grey" class="mr-2">visibility</v-icon>
                <v-list-tile-title> Veure </v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="editElement(el._id)">
                <v-icon color="grey" class="mr-2">edit</v-icon>
                <v-list-tile-title> Editar </v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="deleteElement(el._id)">
                <v-icon color="grey" class="mr-2">delete</v-icon>
                <v-list-tile-title> Eliminar </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
         </v-card-title>
       </v-card>
    </div>

    <!-- GRID -->
    <div v-if="$store.state.elementsDisplay === 'grid'" id="grid-content-body">
      <v-card class="white shadow" v-for="el in chunk.elements" :key="el.id" flat draggable="true" v-on:dragstart="drag(el._id, $event)">
        <div class="multSelectIcon shadow" v-if="$store.state.multSelect" v-bind:class=" { multSelectIconSelected : el.selected } ">
          <v-icon class="mt-1" v-bind:class=" { 'white--text' : el.selected } ">done</v-icon>
        </div>
        <div class="selectionFilter" v-if="$store.state.multSelect" @click="select(el)"></div>
        <div class="selectionFilterSelected" v-if="el.selected"></div>
        <a v-bind:href="el.url"><v-card-media v-bind:src="el.imageURL" height="115px"></v-card-media></a>
        <v-card-title class="pb-0 pl-2 pr-3 pt-2">
          <div class="tagsContainer">
            <div class="tag" v-for="tag in el.categories" @click="tagClicked(tag.name)">
              {{ tag.name }}
            </div>
          </div>
          <div class="info_container">
            <div class="ma-0 black--text f_left f_normal float-f_left title_">{{ el.title }}</div>
           </div>
         </v-card-title>
         <v-card-actions>
         </v-card-actions>
         <v-menu class="gridOptions" offset-y>
           <v-btn @click="loadCategories(el.categories)" icon slot="activator" light flat ripple=false>
             <v-icon color="grey lighten-2">more_vert</v-icon>
           </v-btn>
           <v-list class="white">
             <v-list-tile @click="viewElement(el._id)">
               <v-icon color="grey" class="mr-2">visibility</v-icon>
               <v-list-tile-title> Veure </v-list-tile-title>
             </v-list-tile>
             <v-list-tile @click="editElement(el._id)">
               <v-icon color="grey" class="mr-2">edit</v-icon>
               <v-list-tile-title> Editar </v-list-tile-title>
             </v-list-tile>
             <v-list-tile @click="deleteElement(el._id)">
               <v-icon color="grey" class="mr-2">delete</v-icon>
               <v-list-tile-title> Eliminar </v-list-tile-title>
             </v-list-tile>
           </v-list>
         </v-menu>
       </v-card>
    </div>

    <!-- LIST -->

    <div v-if="$store.state.elementsDisplay === 'list'" id="list-content-body">
      <v-card class="white shadow listContainer" v-for="el in chunk.elements" :key="el.id" flat draggable="true" v-on:dragstart="drag(el._id, $event)">
        <div class="multSelectIcon shadow" v-if="$store.state.multSelect" v-bind:class=" { multSelectIconSelected : el.selected } ">
          <v-icon class="mt-1" v-bind:class=" { 'white--text' : el.selected } ">done</v-icon>
        </div>
        <div class="selectionFilter" v-if="$store.state.multSelect" @click="select(el)"></div>
        <div class="selectionFilterSelected" v-if="el.selected"></div>
        <div class="imageContainer" v-bind:style="{ backgroundImage: 'url(' + el.imageURL + ')'}"></div>
        <div class="infoContainer">
          <div class="titleContainer f_left f_normal">
            <p> {{ el.title }} </p>
          </div>
          <div class="descriptionContainer f_left f_light">
            <p>{{ el.description }}</p>
          </div>
          <div class="tagsContainer mt-1">
            <div class="tag" v-for="tag in el.categories" @click="tagClicked(tag.name)">
              {{ tag.name }}
            </div>
          </div>
        </div>
        <v-menu offset-y class="listOptions">
          <v-btn icon slot="activator" light>
            <v-icon color="grey lighten-2">more_vert</v-icon>
          </v-btn>
          <v-list class="white">
            <v-list-tile @click="viewElement(el._id)">
              <v-icon color="grey" class="mr-2">visibility</v-icon>
              <v-list-tile-title> Veure </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="editElement(el._id)">
              <v-icon color="grey" class="mr-2">edit</v-icon>
              <v-list-tile-title> Editar </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="deleteElement(el._id)">
              <v-icon color="grey" class="mr-2">delete</v-icon>
              <v-list-tile-title> Eliminar </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card>
    </div>
  </div>
  <v-snackbar
    v-if="$store.state.settings.notifications"
    bottom
    right
    timeout=3000
    v-model="snackbar">
    {{ text.snackbar }}
    <v-btn dark flat color="pink" @click.native="snackbar = false">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</div>
</template>

<script>
import Elements from '@/services/Elements'
// import Category from '@/services/Category'
import EditElement from '@/components/EditElement'
export default {
  components: {
    EditElement
  },
  data () {
    return {
      text: {
        deleteConfirmation: {
          header: null,
          y: null,
          n: null
        },
        snackbar: null
      },
      noContent: false,
      contentLoaded: false,
      data: [],
      userID: null,
      categoryFilter: 'All',
      searchValue: null,
      sortBy: null,
      popUpEdit: false,
      deleteVerification: false,
      idToDelete: null,
      selectionFilterSelected: false,
      selectedArray: [],
      categories: []
    }
  },

  async beforeMount () {
    this.text.deleteConfirmation.header = this.$store.getters.getContent.popups.deleteConfirmation.header
    this.text.deleteConfirmation.y = this.$store.getters.getContent.popups.deleteConfirmation.y
    this.text.deleteConfirmation.n = this.$store.getters.getContent.popups.deleteConfirmation.n
    this.text.snackbar = this.$store.getters.getContent.snackbars.deleteOne
    this.categoryFilter = this.$store.getters.getCategoryFilter
    this.sortBy = this.$store.getters.getSortBy
    this.userID = this.$store.getters.getUserID
    this.getData(this.categoryFilter, false, null, this.userID, this.sortBy)
    // this.getCategories()
  },

  methods: {
    async getData (cat, isSearch, searchVal, userID, sortBy) {
      // this.contentLoaded = false
      this.data = (await Elements.getData(cat, isSearch, searchVal, userID, sortBy)).data
      this.noContent = (this.data.length === 0)
      let counter = 0
      for (var i = 0; i < this.data.length; i++) {
        for (var j = 0; j < this.data[i].elements.length; j++) {
          counter++
        }
      }
      this.contentLoaded = true
      this.$store.commit('setNumberOfBookmarks', counter)
    },

    toggleBookmarkPopUp () {
      this.$store.commit('setPopUpDisplay')
    },

    async deleteElement (id) {
      this.idToDelete = id
      this.deleteVerification = true
    },

    async confirmDeletion () {
      await Elements.delete([this.idToDelete])
      this.getData(this.categoryFilter, 'true', this.searchValue, this.userID, this.sortBy)
      this.deleteVerification = false
      this.snackbar = true
    },

    editElement (id) {
      this.$store.commit('setElementId', id)
      this.$store.commit('setElementByIdTrigger')
      this.$store.commit('setEditDisplay')
    },

    viewElement (id) {
      this.$store.commit('setElementId', id)
      this.$store.commit('displayElementView', true)
    },

    navigateTo (route) {
      this.$router.push(route)
    },

    select (el) {
      var exists = false
      for (var i = 0; i < this.$store.getters.getSelectedArray.length; i++) {
        if (el._id === this.$store.getters.getSelectedArray[i]) {
          this.$store.getters.getSelectedArray.splice(i, 1)
          exists = true
        }
      }
      if (!exists) {
        this.$store.commit('setSelectedArray', el._id)
      }
      el.selected = !el.selected
    },

    selectAll () {
      for (var i = 0; i < this.data.length; i++) {
        for (var j = 0; j < this.data[i].elements.length; j++) {
          this.data[i].elements[j].selected = true
          this.$store.commit('setSelectedArray', this.data[i].elements[j]._id)
        }
      }
    },

    tagClicked (cat) {
      this.$store.commit('setTagContent', cat)
      this.$store.commit('setTag')
      this.$store.commit('setCategoryFilter', cat)
    },

    drag (elID, event) {
      let msg
      if (this.$store.getters.getMultSelect) {
        msg = {
          'transmitter': 'multBookmarks',
          'content': null
        }
      } else {
        msg = {
          'transmitter': 'Bookmark',
          'content': elID
        }
      }
      event.dataTransfer.setData('text', JSON.stringify(msg))
    }

    /* loadCategories (categories) {
      for (var x = 0; x < this.childCategoryList.length; x++) {
        this.childCategoryList[x].selected = false
      }

      for (var i = 0; i < this.childCategoryList.length; i++) {
        if (categories.length !== 0) {
          for (var j = 0; j < categories.length; j++) {
            this.childCategoryList[i].selected = (this.childCategoryList[i]._id === categories[j]._id) ? true : this.childCategoryList[i].selected
          }
        } else {
          this.childCategoryList[i].selected = false
        }
      }
    } */
  },

  watch: {

    '$store.state.searchString': {
      async handler (value) {
        this.searchValue = value
        this.getData(this.categoryFilter, 'true', this.searchValue, this.userID, this.sortBy)
      }
    },

    '$store.state.categoryFilter': {
      async handler (value) {
        this.categoryFilter = value
        if (value !== 'All' && this.sortBy === 'category') {
          // S'ha d'igualar a valor pe defecte de la configuració d'usuari
          this.sortBy = 'date'
        }
        // TODO: Comprovar si ens trobem a una categoria root per permetre l'opció de filtrar per categories nidades

        this.getData(this.categoryFilter, 'false', null, this.userID, this.sortBy)
      }
    },

    '$store.state.sortBy': {
      async handler (value) {
        this.sortBy = value
        this.getData(this.categoryFilter, 'false', null, this.userID, this.sortBy)
      }
    },

    '$store.state.refreshElements': {
      async handler () {
        this.getData(this.categoryFilter, 'false', null, this.userID, this.sortBy)
      }
    },

    '$store.state.refreshChildCategories': {
      async handler () {
        this.getChildCategories()
      }
    },

    '$store.state.multSelect': {
      async handler (value) {
        if (value === false) {
          this.$store.commit('setRefreshElements')
          this.$store.commit('resetSelectedArray')
        }
      }
    },

    '$store.state.selectAll': {
      async handler (value) {
        if (value === true) {
          this.selectAll()
        } else {
          this.$store.commit('setRefreshElements')
          this.$store.commit('resetSelectedArray')
        }
      }
    }
  }
}
</script>
<style src="../../css/list.css"></style>
