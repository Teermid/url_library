<template>
  <div id="node">
    <v-navigation-drawer fixed v-model="$store.state.sidebarDisplay" app dark class="sidebar">
      
      <div id="brand" class="white--text f_black subheading">
        SAVIFY
      </div>

      <div class="fixedCategories">
        <div class="rootWrapper white--text" v-for="ca in fixedCategories" v-bind:class="{ selected: ca.selected }" @click="displayCategory(ca)" v-bind:value="ca.value"> {{ ca.name }} </div>
      </div>

      <div class="categoriesTitle body-2 f_black">
        CATEGORIES
      </div>

      <div class="categoryList">
        <div class="categoryContainer" v-for="ca in categoriesTemp" :key="ca._id" v-if="!ca.parentCategory">
          <div class="rootWrapper" 
            v-bind:class="{ selected: ca.selected }"
            v-on:drop="drop(ca, $event)" 
            v-on:dragover="$event.preventDefault()"
            @click="displayCategory(ca)" 
            v-bind:value="ca.name"
            draggable="true" 
            v-on:dragstart="drag(ca, $event)">
            <div class="root white--text" > {{ ca.name }} </div>
            <div class="dropdown white--text" @click="dropdown(ca)" v-if="ca.kind == 'root'"> ▼ </div>
          </div>
          <div class="childWrapper" 
            v-bind:class="{ hidden: ca.hidden }"
            v-for="nested in ca.nestedCategories" 
          >
            <div class="child white--text" 
             :key="nested._id"  
              v-bind:value="nested.name" 
              v-bind:class="{ selected: nested.selected }"
              draggable="true" 
              v-on:dragstart="drag(nested, $event)"
              @click="displayCategory(nested)"
              v-on:drop="drop(nested, $event)" 
              v-on:dragover="$event.preventDefault()"> 
              {{ nested.name }} </div>
          </div>
        </div>
      </div>

      <div class="addContainer">
        <v-menu top offset-y :close-on-content-click="false">
          <!-- <v-btn slot="activator">A Menu</v-btn> -->
          <div slot="activator" class="add white--text" >Afegir Categoria</div>
          <v-list>
            <v-form>
              <v-text-field v-model="category.name"></v-text-field>
              <v-btn @click="addCategory">Afegir</v-btn>
            </v-form>
        </v-list>
        </v-menu>
        <div class="add white--text" @click="togglePopUp">Afegir Marcador</div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import Category from '@/services/Category'
  import addBookmark from '@/components/addBookmark'
  import Element from '@/services/Elements'
  export default {
    components: {
      addBookmark
    },
    data () {
      return {
        category: {
          name: ''
        },
        categories: [{}],
        categoriesTemp: [{}],
        fixedCategories: [
          {
            name: 'Tots',
            selected: true,
            value: 'All'
          },
          {
            name: 'Sense Classificar',
            selected: false,
            value: 'Unsorted'
          }
        ],
        rootCategories: [],
        userID: this.$store.getters.getUserID
        // hasBeenCalled = false
      }
    },

    async beforeMount () {
      // if (!hasBeenCalled) {
      this.printCategories()
      //  this.hasBeenCalled = true
      // }
    },

    methods: {
      async printCategories () {
        this.categoriesTemp = (await Category.getCategory(this.userID)).data
        this.categories = (await Category.getCategory(this.userID)).data
        this.rootCategories = (await Category.getRootCategories()).data
        this.$store.commit('setCategoriesList', this.categories)
        this.$store.commit('setRootCategoriesList', this.rootCategories)
      },

      displayCategory (cat) {
        this.select(cat, null)
        this.$store.commit('setCategoryFilter', event.currentTarget.getAttribute('value'))
      },

      async addCategory () {
        this.category.owner = this.$store.getters.getUserID
        try {
          await Category.addCategory(this.category)
          this.printCategories()
          this.$store.commit('setRefreshChildCategories')
        } catch (e) {
          console.log(e.response)
        }
      },

      togglePopUp () {
        this.$store.commit('setPopUpDisplay')
      },

      dropdown (ca) {
        ca.hidden = !ca.hidden
      },

      async deleteCategory (caID) {
        await Category.deleteCategory(caID)
        this.printCategories()
      },

      select (ca, tag) {
        if (ca) {
          for (var i in this.categoriesTemp) {
            this.categoriesTemp[i].selected = false
            for (var j in this.categoriesTemp[i].nestedCategories) {
              this.categoriesTemp[i].nestedCategories[j].selected = false
            }
          }
          for (var k in this.fixedCategories) {
            this.fixedCategories[k].selected = false
          }
          ca.selected = !ca.selected
        }

        if (tag) {
          for (var l in this.categoriesTemp) {
            this.categoriesTemp[l].selected = (this.categoriesTemp[l].name === tag)
            for (var m in this.categoriesTemp[l].nestedCategories) {
              if (this.categoriesTemp[l].nestedCategories[m].name === tag) {
                this.categoriesTemp[l].nestedCategories[m].selected = true
                this.categoriesTemp[l].hidden = false
              } else {
                this.categoriesTemp[l].nestedCategories[m].selected = false
              }
            }
          }
          for (var n in this.fixedCategories) {
            this.fixedCategories[n].selected = (this.fixedCategories[n].name === tag)
          }
        }
      },

      async drag (category, event) {
        let msg = {
          'transmitter': 'category',
          'content': category
        }
        event.dataTransfer.setData('text', JSON.stringify(msg))
      },

      async drop (dropCategory, event) {
        event.preventDefault()
        let msg = JSON.parse(event.dataTransfer.getData('text'))
        if (msg.transmitter === 'category') {
          let allow = false
          // Dragged category data
          let dragCategory = msg.content
          let dragId = dragCategory._id
          let dragName = dragCategory.name
          let dragHasBookmarks = ((await Element.checkCategory(dragCategory._id)).data.length > 0)

          // Droped category data
          let dropName = dropCategory.name
          let dropHasBookmarks = ((await Element.checkCategory(dropCategory._id)).data.length > 0)

          /*
            GROUP 1
            Dragged category: child without parent nor bookmarks inside
          */
          if ((dragCategory.kind === 'child' && !dragCategory.parentCategory && !dragHasBookmarks) && (dropCategory.kind === 'child' && !dropCategory.parentCategory && !dropHasBookmarks)) {
            allow = true
          }
          if ((dragCategory.kind === 'child' && !dragCategory.parentCategory && !dragHasBookmarks) && (dropCategory.kind === 'root')) {
            allow = true
          }

          /*
            GROUP 2
            Dragged category: child without parent with bookmarks inside
          */
          if ((dragCategory.kind === 'child' && !dragCategory.parentCategory && dragHasBookmarks) && (dropCategory.kind === 'child' && !dropCategory.parentCategory && !dropHasBookmarks)) {
            allow = true
          }
          if ((dragCategory.kind === 'child' && !dragCategory.parentCategory && dragHasBookmarks) && (dropCategory.kind === 'root')) {
            allow = true
          }

          /*
            GROUP 3
            Dragged category: child with parent
          */
          if ((dragCategory.kind === 'child' && dragCategory.parentCategory) && (dropCategory.kind === 'root')) {
            allow = true
          }
          if ((dragCategory.kind === 'child' && dragCategory.parentCategory) && (dropCategory.kind === 'child' && !dropCategory.parentCategory && !dropHasBookmarks)) {
            allow = true
          }

          if (allow) {
            await Category.editCategory(dragId, {'name': dragName, 'rootName': dropName})
            this.printCategories()
          }
        }
        if (msg.transmitter === 'Bookmark') {
          if (dropCategory.kind !== 'root') {
            await Element.addMult([msg.content], dropCategory._id)
            this.$store.commit('setRefreshElements')
          }
        }
        if (msg.transmitter === 'multBookmarks') {
          if (dropCategory.kind !== 'root') {
            await Element.addMult(this.$store.getters.getSelectedArray, dropCategory._id)
            this.$store.commit('setRefreshElements')
          }
        }
      }
    },

    watch: {
      '$store.state.tag': {
        async handler (value) {
          this.select(null, this.$store.getters.getTagContent)
        }
      }
    }
}
</script>

<style scoped>
#node {
  text-align: left;
}

/* .sidebar {
  width:270px !important;
} */

#brand {
  width:100%;
  float:left;
  text-align: center;
  padding:20px;
}

.fixedCategories {
  width:100%;
  margin-bottom:20px;
  float:left;
}

.categoriesTitle {
  width:100%;
  float:left;
  padding:10px;
  color: #EEEEEE;
}

.categoryList {
  float:left;
  width:100%;
  min-height: 60vh;
  overflow-y:scroll;
  margin-bottom:20px;
}

.categoryContainer {
  width:100%;
  float:left;
}

.rootWrapper {
  width:100%;
  float:left;
  padding:10px;
  cursor:pointer;
  transition: 0.2s;
}

.rootWrapper:hover {
  background-color: #4b4b4b;
  transition: 0.2s;
}

.rootWrapper:hover .delete {
  visibility: visible;
}

.root {
  width: calc(100% - 20px);
  float:left;
}

.dropdown {
  width: fit-content;
  float:left;
  font-size:11px;
}

.childWrapper {
  float:left;
  width:100%;
}

.child {
  width:100%;
  float:left;
  padding:10px 10px 10px 30px;
  height:100%;
  cursor:pointer;
}

.child:hover {
  background-color: #4b4b4b;
}

.hidden {
  height:0px;
  overflow:hidden;
}

.selected {
  background-color: #5a5a5a;
  border-left:1px solid white;
}

.selected:hover {
  background-color: #5a5a5a !important;
}

.addContainer {
  width:100%;
  float:left;
}

.add {
  cursor:pointer;
  padding:10px;
}

.delete {
  visibility:hidden;
}



</style>
