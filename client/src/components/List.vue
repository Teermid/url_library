<template>
<div class="wrapper">
  <v-dialog v-model="deleteVerification" origin="top center" max-width="250px">
    <v-card class="pb-2">
      <v-card-text class="pt-3 pb-0">
        <v-icon color="red">warning</v-icon>
        <p class="subheading f_bold mt-1">{{ text.deleteConfirmation.header }}</p>
      </v-card-text>
        <v-btn
          @click="confirmDeletion()"
          depressed
          color="red accent-2"
          class="white--text">
          {{ text.deleteConfirmation.y }}</v-btn>
        <v-btn
          @click="deleteVerification = !deleteVerification"
          depressed
          color="blue accent-2"
          class="white--text">
          {{ text.deleteConfirmation.n }}</v-btn>
      </v-card>
  </v-dialog>

  <div class="chunk" v-for="chunk in data">
  <p class="f_left">{{ chunk.title }}</p>
    <!-- CARDS -->
    <div v-if="$store.state.elementsDisplay === 'card'" id="card-content-body">
      <v-card class="white shadow" v-for="el in chunk.elements" :key="el.id" flat draggable="true" v-on:dragstart="drag(el._id, $event)">
        <div class="multSelectIcon shadow" v-if="$store.state.multSelect" v-bind:class=" { multSelectIconSelected : el.selected } "></div>
        <div class="selectionFilter" v-if="$store.state.multSelect" @click="select(el)"></div>
        <div class="selectionFilterSelected" v-if="el.selected"></div>
        <a class="hover" v-bind:href="el.link">
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
          <v-menu class="options" offset-y>
            <v-btn @click="loadCategories(el.categories)" icon slot="activator" light >
              <v-icon color="grey lighten-2">more_horiz</v-icon>
            </v-btn>
            <v-list class="white">
              <v-list-tile @click="editElement(el._id)">
                <v-list-tile-title> Editar </v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="deleteElement(el._id)">
                <v-list-tile-title> Eliminar </v-list-tile-title>
              </v-list-tile>
              <!-- <v-menu offset-x open-on-hover :close-on-content-click="false">
                <v-list-tile slot="activator" @click="">
                  <v-list-tile-title>Categories</v-list-tile-title>
                  <v-list-tile-action class="justify-end">
                    <v-icon>keyboard_arrow_right</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list>
                  <v-list-tile v-for="cat in childCategoryList" :key="cat._id" @click="loadCategories(cat)">
                    <v-list-tile-title>
                      <v-checkbox :label="cat.name" v-model="cat.selected"></v-checkbox>
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu> -->
            </v-list>
          </v-menu>

         </v-card-title>
       </v-card>
    </div>

    <!-- GRID -->
    <div v-if="$store.state.elementsDisplay === 'grid'" id="grid-content-body">
      <!-- <v-card class="white shadow" v-for="el in elements" :key="el.id" flat draggable="true" v-on:dragstart="drag(el._id, $event)"> -->
      <v-card class="white shadow" v-for="el in chunk.elements" :key="el.id" flat draggable="true" v-on:dragstart="drag(el._id, $event)">
        <div class="multSelectIcon shadow" v-if="$store.state.multSelect" v-bind:class=" { multSelectIconSelected : el.selected } "></div>
        <div class="selectionFilter" v-if="$store.state.multSelect" @click="select(el)"></div>
        <div class="selectionFilterSelected" v-if="el.selected"></div>
        <a v-bind:href="el.link"><v-card-media v-bind:src="el.imageURL" height="115px"></v-card-media></a>
        <v-card-title class="pb-0 pt-2">
          <div class="info_container">
            <div class="ma-0 black--text f_left f_black float-f_left title_">{{ el.title }}</div>
             <!-- <v-menu bottom f_left>
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
                </v-list>
              </v-menu> -->

           </div>
         </v-card-title>
         <v-card-actions>
         </v-card-actions>
       </v-card>
    </div>

    <!-- LIST -->

    <div v-if="$store.state.elementsDisplay === 'list'" id="list-content-body">
      <v-card class="white listContainer" v-for="el in chunk.elements" :key="el.id" flat draggable="true" v-on:dragstart="drag(el._id, $event)">
        <div class="selectionFilter" v-if="$store.state.multSelect" @click="select(el)"></div>
        <div class="selectionFilterSelected" v-if="el.selected"></div>
        <div class="imageContainer" v-bind:style="{ backgroundImage: 'url(' + el.imageURL + ')'}"></div>
        <div class="infoContainer">
          <div class="titleContainer f_left f_black">
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
            <v-list-tile @click="deleteElement(el._id)">
              <v-list-tile-title> Eliminar </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="editElement(el._id)">
              <v-list-tile-title> Editar </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card>
    </div>
  </div>
</div>
</template>

<script>
import Elements from '@/services/Elements'
import Category from '@/services/Category'
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
        }
      },
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
    this.categoryFilter = this.$store.getters.getCategoryFilter
    this.sortBy = this.$store.getters.getSortBy
    this.userID = this.$store.getters.getUserID
    this.getData(this.categoryFilter, false, null, this.userID, this.sortBy)
    this.getCategories()
  },

  methods: {
    async getData (cat, isSearch, searchVal, userID, sortBy) {
      this.data = (await Elements.getData(cat, isSearch, searchVal, userID, sortBy)).data
    },

    async getCategories () {
      this.categories = (await Category.getCategory(this.userID)).data
    },

    async deleteElement (id) {
      // await Elements.deleteElement(id)
      // this.getElements(this.categoryFilter, 'true', this.searchValue, this.userID, this.sortBy)
      this.idToDelete = id
      this.deleteVerification = true
    },

    async confirmDeletion () {
      await Elements.deleteElement(this.idToDelete)
      this.getData(this.categoryFilter, 'true', this.searchValue, this.userID, this.sortBy)
      this.deleteVerification = false
    },

    editElement (id) {
      this.$store.commit('setElementId', id)
      this.$store.commit('setElementByIdTrigger')
      this.$store.commit('setEditDisplay')
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
        this.getData(null, 'true', this.searchValue, this.userID, this.sortBy)
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
