<template>
<div>
  <v-dialog v-model="deleteVerification" origin="top center" max-width="250px">
    <v-card class="pb-2">
      <v-card-text class="pt-3 pb-0">
        <v-icon color="red">warning</v-icon>
        <p class="subheading f_bold mt-1">Eliminar marcador?</p>
      </v-card-text>
      <v-btn
        @click="confirmDeletion()"
        depressed
        color="red accent-2"
        class="white--text">
        Confirmar</v-btn>
      <v-btn
        @click="deleteVerification = !deleteVerification"
        depressed
        color="blue accent-2"
        class="white--text">
        Cancelar</v-btn>
    </v-card>
  </v-dialog>

  <!-- CARDS -->
  <div v-if="$store.state.elementsDisplay === 'card'" id="card-content-body">
    <v-card class="white shadow" v-for="el in elements" :key="el.id" flat draggable="true" v-on:dragstart="drag(el._id, $event)">
      <div class="multSelectIcon shadow" v-if="$store.state.multSelect" v-bind:class=" { multSelectIconSelected : el.selected } "></div>
      <div class="selectionFilter" v-if="$store.state.multSelect" @click="select(el)"></div>
      <div class="selectionFilterSelected" v-if="el.selected"></div>
      <a class="hover" v-bind:href="el.link">
        <v-card-media v-bind:src="el.imageURL" height="150px"></v-card-media>
      </a>
      <v-card-title class="pt-2">
      <div class="tagsContainer">
        <div class="tag" v-for="cat in el.categories" @click="tagClicked(cat.name)">
          {{ cat.name }}
        </div>
      </div>
        <div class="info_container">
          <div class="mt-1 black--text left f_black float-left title_">{{ el.title }}</div>
          <div class="mt-1 mx-0 black--text left f_light float-left description">{{ el.description }}</div>
        </div>
        <v-menu class="options" offset-y>
          <v-btn @click="loadCategories(el.categories)" icon slot="activator" light >
            <v-icon color="grey lighten-2">more_horiz</v-icon>
          </v-btn>
          <v-list class="white">
            <v-list-tile @click="deleteElement(el._id)">
              <v-list-tile-title> Eliminar </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="editElement(el._id)">
              <v-list-tile-title> Editar </v-list-tile-title>
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
       <v-card-actions>
       </v-card-actions>
     </v-card>
  </div>

  <!-- GRID -->
  <div v-if="$store.state.elementsDisplay === 'grid'" id="grid-content-body">
    <!-- <v-card class="white shadow" v-for="el in elements" :key="el.id" flat draggable="true" v-on:dragstart="drag(el._id, $event)"> -->
    <v-card class="white shadow" v-for="el in elements" :key="el.id" flat>    
      <div class="selectionFilter" v-if="$store.state.multSelect" @click="select(el)"></div>
      <div class="selectionFilterSelected" v-if="el.selected"></div>
       <a v-bind:href="el.link"><v-card-media v-bind:src="el.imageURL" height="115px"></v-card-media></a>
       <v-card-title class="pb-0 pt-2">
         <div class="info_container">
           <div class="ma-0 black--text left f_black float-left title_">{{ el.title }}</div>
           <!-- <v-menu bottom left>
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
    <v-card class="white shadow listContainer" v-for="el in elements" :key="el.id" flat draggable="true" v-on:dragstart="drag(el._id, $event)">
      <div class="selectionFilter" v-if="$store.state.multSelect" @click="select(el)"></div>
      <div class="selectionFilterSelected" v-if="el.selected"></div>
      <div class="imageContainer" v-bind:style="{ backgroundImage: 'url(' + el.imageURL + ')'}"></div>
      <div class="infoContainer">
        <div class="titleContainer left f_black">
          <p> {{ el.title }} </p>
        </div>
        <div class="descriptionContainer left f_light">
          <p>{{ el.description }}</p>
        </div>
           <!-- <v-menu bottom left>
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
    </v-card>
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
      elements: [{}],
      userID: this.$store.getters.getUserID,
      categoryFilter: 'All',
      searchValue: '',
      sortBy: this.$store.getters.getSortBy,
      popUpEdit: false,
      deleteVerification: false,
      idToDelete: '',
      selectionFilterSelected: false,
      selectedArray: [],
      childCategoryList: []
    }
  },

  async beforeMount () {
    this.getElements('All', false, null, this.userID, this.sortBy)
    this.getChildCategories()
  },

  methods: {
    async getElements (cat, isSearch, searchVal, userID, sortBy) {
      this.elements = (await Elements.getElements(cat, isSearch, searchVal, userID, sortBy)).data
    },

    async getChildCategories () {
      this.childCategoryList = (await Category.getChildCategories()).data
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
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].selected = true
        this.$store.commit('setSelectedArray', this.elements[i]._id)
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
    },

    loadCategories (categories) {
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

<style>
:root {
  --content-body-width: calc(100% - 40px);
  --content-body-height: calc(100vh - 150px);
  /*--box-shadow: 0px 2px 2px 0px rgba(222,221,223,0.7);
  --box-shadow: 0px 1px 2px 0 #d0d7df; */
  --box-shadow: 0 1px 3px 0 rgba(0,0,0,.16);

  --card-content-container-width: 280px;
  --card-content-container-height: 335px;

  --grid-content-container-width: 230px;
  --grid-content-container-height: 190px;

  --list-content-container-height: 100px; 

}


#card-content-body {
  width: 100%;
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

/* ------------------- GRID ---------------------- */

#grid-content-body {
  width: 100%;
  height: var(--content-body-height);
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(var(--grid-content-container-width), 1fr));
  grid-auto-rows: var(--grid-content-container-height);
  padding: 0 20px 0px 20px;
  overflow-y: scroll;
}

.multSelectIcon {
  width: 30px;
   height: 30px;
   border-radius: 100% !important;
   position: absolute;
   background-color: white;
   z-index: 1;
   left: calc(100% - 35px);
   top:5px
}

.multSelectIconSelected {
  background-color: lightblue;
}

/* ----------------- LIST ------------------------ */
#list-content-body {
  width: 100%;
  height: var(--content-body-height);
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 100%;
  grid-auto-rows: var(--list-content-container-height);
  padding: 0 20px 0px 20px;
  overflow-y: scroll;
}

.imageContainer {
  float:left;
  width: var(--list-content-container-height);
  height: var(--list-content-container-height);
  background-size:cover;
  background-position:center;
}

.tag {
  background-color: #409eff1a;
  border-radius: 10px;
  width: fit-content;
  padding: 0px 6px 0px 4px;
  color: #409eff;
  border: 1px solid rgba(64,158,255,.2);
  float:left;
  font-size:12px;
  margin-right:3px;
  transition: .2s;
}

.tag:hover {
  background-color: #409eff33;
  transition: .2s;
  cursor:pointer
}

.infoContainer {
  float:left;
  width:calc(100% - (var(--list-content-container-height)));
  min-width:500px;
  height:calc(var(--list-content-container-height));
  padding:10px;
}

.infoContainer > div {
  float:left;
  width:100%;
}

.infoContainer p {
  margin-bottom: 0px; 
}

.titleContainer {
  min-width:500px;
  overflow:hidden;
  height:calc(var(--list-content-container-height) - 20 - 50);
  font-weight:bold;
}

.descriptionContainer {
  min-width:500px;
  overflow:hidden;
  height: calc(var(--list-content-container-height) - 20 - 30);
  overflow:hidden;
}

/* --------------------------------------------- */

.selectionFilter {
  z-index:3;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor:pointer;
}

.selectionFilterSelected {
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #bee0fa26;
  border: 2px solid #7ab2dc;
  border-radius: 3px;
}

.options {
  padding: 0px !important;
  position:absolute;
  top: 290px;
  left: calc(50% - 25px);


}

/* .hover:hover ~ .options {
  visibility:visible;
} */

.buttonCustom {
  height: 30px;
  width: 30px;
}

.info_container {
  min-height: 120px;
}

</style>
