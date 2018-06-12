<template>
  <div id="node">
    <v-dialog v-model="popupDeleteBookmarks" origin="top center" max-width="250px">
      <v-card class="pb-2">
        <v-card-text class="pt-3 pb-0">
          <v-icon color="red">warning</v-icon>
          <p class="subheading f_bold mt-1">Eliminar marcadors de la categoria?</p>
        </v-card-text>
        <v-btn
          @click="deleteCategory(categoryIdToDelete, true)"
          depressed
          color="blue accent-2"
          class="white--text">
          NO</v-btn>
        <v-btn
          @click="deleteCategoryWithBookmarks(categoryIdToDelete)"
          depressed
          color="red accent-2"
          class="white--text">
          SÍ</v-btn>
      </v-card>
    </v-dialog>
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
          <div class="rootWrapper category"
            v-bind:class="{ selected: ca.selected }"
            v-on:drop="drop(ca, $event)"
            v-on:dragover="$event.preventDefault()"
            draggable="true"
            v-on:dragstart="drag(ca, $event)">
            <v-icon size="large" class="dropdown white--text" @click="dropdown(ca)" v-if="ca.kind == 'root'"> keyboard_arrow_down </v-icon>
            <div class="root white--text" @click="displayCategory(ca)" v-bind:value="ca.name"> {{ ca.name }} </div>
            <v-menu v-model="showMenu" offset-y absolute full-width>
              <v-icon slot="activator" class="edit" size="medium"> more_vert </v-icon>
              <v-list>
                <v-list-tile @click="editCategory(ca._id)">
                  <v-list-tile-title>Editar</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="deleteCategory(ca._id)">
                  <v-list-tile-title>Eliminar</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>

          <div class="childContainer"
            v-bind:class="{ hidden: ca.hidden }"
          >
            <div class="childWrapper category"
              v-for="nested in ca.nestedCategories"
              v-bind:class="{ selected: nested.selected }"
            >
              <div class="child white--text category"
               :key="nested._id"
                v-bind:value="nested.name"
                draggable="true"
                v-on:dragstart="drag(nested, $event)"
                @click="displayCategory(nested)"
                v-on:drop="drop(nested, $event)"
                v-on:dragover="$event.preventDefault()">
                {{ nested.name }}
              </div>
              <v-menu v-model="showMenu" offset-y absolute full-width>
                <v-icon slot="activator" class="edit" size="medium"> more_vert </v-icon>
                <v-list>
                  <v-list-tile @click="editCategory(nested._id)">
                    <v-list-tile-title>Editar</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="deleteCategory(nested._id, false)">
                    <v-list-tile-title>Eliminar</v-list-tile-title>
                  </v-list-tile>
                </v-list>
             </v-menu>
            </div>
          </div>
        </div>
      </div>

      <div class="addContainer">
        <v-menu top offset-y :close-on-content-click="false" value="addCategoryPopUp">
          <!-- <v-btn slot="activator">A Menu</v-btn> -->
          <div slot="activator" class="add white--text" >Afegir Categoria</div>
          <v-list>
            <v-form>
              <v-text-field
                placeholder="Nom"
                v-model="category.name"
              ></v-text-field>
              <v-select
                :items="rootCategories"
                placeholder="Categoria pare"
                clearable="true"
                v-model="category.parentCategory"
                label="Select"
                item-text="name"
                item-value="name"
              ></v-select>
              <v-btn @click="addCategory">Afegir</v-btn>
            </v-form>
        </v-list>
        </v-menu>
        <div class="add white--text" @click="toggleBookmarkPopUp">Afegir Marcador</div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import Category from '@/services/Category'
  import Element from '@/services/Elements'
  export default {
    data () {
      return {
        category: {
          name: '',
          parentCategory: ''
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
        userID: this.$store.getters.getUserID,
        editCatPopUp: false,
        categoryIdToDelete: '',
        popupDeleteBookmarks: false
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

      displayCategory (ca) {
        this.select(ca, null)
        this.$store.commit('setCategoryFilter', event.currentTarget.getAttribute('value'))
      },

      async addCategory () {
        this.category.owner = this.$store.getters.getUserID
        try {
          await Category.addCategory(this.category)
          this.category.name = ''
          this.category.parentCategory = ''
          this.addCategoryPopUp = false
          this.printCategories()
          this.$store.commit('setRefreshChildCategories')
        } catch (e) {
          alert(e.response.data.error)
        }
      },

      toggleBookmarkPopUp () {
        this.$store.commit('setPopUpDisplay')
      },

      dropdown (ca) {
        ca.hidden = !ca.hidden
      },

      async deleteCategory (id, skip) {
        if (skip) {
          await Category.deleteCategory(id, false)
          this.popupDeleteBookmarks = false
          this.printCategories()
          this.$store.commit('setRefreshElements')
        } else {
          this.categoryIdToDelete = id
          if ((await Category.isEmpty(id)).data) {
            await Category.deleteCategory(id, false)
            this.printCategories()
            this.$store.commit('setRefreshElements')
          } else {
            this.popupDeleteBookmarks = true
          }
        }
      },

      async deleteCategoryWithBookmarks (id) {
        await Category.deleteCategory(id, true)
        this.popupDeleteBookmarks = false
        this.printCategories()
        this.$store.commit('setRefreshElements')
      },

      editCategory (id) {
        this.$store.commit('setCategoryId', id)
        this.$store.commit('setCategoryByIdTrigger')
        this.$store.commit('setEditCategoryDisplay')
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
          let dragCategory = msg.content
          let dragId = dragCategory._id
          let dropName = dropCategory.name

          if ((dragCategory.kind === 'child') && ((dropCategory.kind === 'child' && !dropCategory.parentCategory) || dropCategory.kind === 'root')) {
            allow = true
          }

          if (allow) {
            await Category.editCategoryHierarchy(dragId, dropName)
            this.printCategories()
          }
        }

        if (msg.transmitter === 'Bookmark') {
          await Element.addMult([msg.content], dropCategory._id)
          this.$store.commit('setRefreshElements')
        }
        if (msg.transmitter === 'multBookmarks') {
          await Element.addMult(this.$store.getters.getSelectedArray, dropCategory._id)
          this.$store.commit('setRefreshElements')
        }
      }
    },

    watch: {
      '$store.state.refreshElements': {
        async handler (value) {
          this.printCategories()
        }

      },

      '$store.state.tag': {
        async handler (value) {
          this.select(null, this.$store.getters.getTagContent)
        }
      }
    }
}
</script>
<style src="../../css/sidebar.css"></style>
