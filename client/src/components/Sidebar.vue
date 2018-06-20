<template>
  <div id="node">
    <v-dialog v-model="popupDeleteBookmarks" origin="top center" max-width="250px">
      <v-card class="pb-2">
        <v-card-text class="pt-3 pb-0">
          <v-icon color="red">warning</v-icon>
          <p class="subheading f_bold mt-1">{{ text.popups.deleteBookmarks.header }}</p>
        </v-card-text>
        <v-btn
          @click="deleteCategoryWithBookmarks(categoryIdToDelete)"
          class="white--text"
          depressed
          color="red accent-2">
        {{ text.popups.deleteBookmarks.y }}
        </v-btn>
        <v-btn
          @click="deleteCategory(categoryIdToDelete, true)"
          class="white--text"
          depressed
          color="blue accent-2">
        {{ text.popups.deleteBookmarks.n }}
        </v-btn>
      </v-card>
    </v-dialog>
    <v-navigation-drawer v-bind:style="{'background-color':$store.state.settings.color.hex}" v-bind:class="{ 'white--text':!$store.state.settings.color.light }" fixed v-model="$store.state.sidebarDisplay" app class="sidebar">
      <div id="brand" class="f_black subheading">
        SAVIFY
      </div>

      <div class="fixedCategories">
        <div class="rootWrapper"
          v-for="ca in text.fixedCategories"
          v-bind:class="{ 'selectedLight': categorySelectedLight(ca), 'selectedDark': categorySelectedDark(ca), 'lightHover': $store.state.settings.color.light, 'darkHover': !$store.state.settings.color.light }"
          @click="displayCategory(ca)"
          v-bind:value="ca.value">
          {{ ca.name }}
        </div>
      </div>

      <div class="categoriesTitle body-2 f_black">
        {{ text.CATEGORIES}}
      </div>

      <div class="categoryList">
        <div class="categoryContainer" v-for="ca in categoriesSidebar" :key="ca._id" v-if="!ca.parentCategory">

          <div class="rootWrapper category"
            v-bind:class="{ 'selectedLight': categorySelectedLight(ca), 'selectedDark': categorySelectedDark(ca), 'lightHover': $store.state.settings.color.light, 'darkHover': !$store.state.settings.color.light }"
            v-on:drop="drop(ca, $event)"
            v-on:dragover="$event.preventDefault()"
            draggable="true"
            v-on:dragstart="drag(ca, $event)">
            <v-icon size="large" v-bind:class="{ 'white--text':!$store.state.settings.color.light }" class="dropdown" @click="dropdown(ca)" v-if="ca.kind == 'root'"> keyboard_arrow_down </v-icon>
            <div class="root" @click="displayCategory(ca)" v-bind:value="ca.name"> {{ ca.name }} </div>
            <v-menu v-model="showMenu" offset-y absolute full-width>
              <v-icon slot="activator" v-bind:class="{ 'white--text':!$store.state.settings.color.light }" class="edit" size="medium"> more_vert </v-icon>
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
            v-bind:class="{ hidden: ca.hidden }">
            <div class="childWrapper category"
              v-for="nested in ca.nestedCategories"
              v-bind:class="{ 'selectedLight': categorySelectedLight(nested), 'selectedDark': categorySelectedDark(nested), 'lightHover': $store.state.settings.color.light, 'darkHover': !$store.state.settings.color.light }">
              <div class="child"
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
                <v-icon slot="activator" v-bind:class="{ 'white--text':!$store.state.settings.color.light }" class="edit" size="medium"> more_vert </v-icon>
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
          <div slot="activator" class="add" >{{ text.buttons.addCategory }}</div>
          <v-list>
            <v-form>
              <v-text-field
                :placeholder="text.popups.addCategory.placeholder"
                v-model="category.name"
              ></v-text-field>
              <v-select
                :items="rootCategories"
                :placeholder="text.popups.addCategory.select"
                clearable="true"
                v-model="category.parentCategory"
                item-text="name"
                item-value="name"
              ></v-select>
              <v-btn @click="addCategory">Afegir</v-btn>
            </v-form>
        </v-list>
        </v-menu>
        <div class="add" @click="toggleBookmarkPopUp">{{ text.buttons.addBookmark }}</div>
        <div class="add"  @click="settings">Settings</div>
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
        text: {
          CATEGORIES: null,
          fixedCategories: [
            {
              name: null,
              selected: true,
              value: 'All'
            },
            {
              name: null,
              selected: false,
              value: 'Unsorted'
            }
          ],
          buttons: {
            addCategory: null,
            addBookmark: null
          },

          popups: {
            addCategory: {
              placeholder: null
            },
            deleteBookmarks: {
              header: null,
              y: null,
              n: null
            }
          }
        },

        category: {
          name: null,
          parentCategory: null
        },
        categories: [{}],
        categoriesSidebar: [{}],
        rootCategories: [],
        userID: null,
        editCatPopUp: false,
        categoryIdToDelete: null,
        popupDeleteBookmarks: false
        // hasBeenCalled = false
      }
    },

    async beforeMount () {
      this.text.CATEGORIES = this.$store.getters.getContent.sidebar.categories
      this.text.fixedCategories[0].name = this.$store.getters.getContent.sidebar.all
      this.text.fixedCategories[1].name = this.$store.getters.getContent.sidebar.unsorted
      this.text.buttons.addCategory = this.$store.getters.getContent.sidebar.buttons.addCategory
      this.text.buttons.addBookmark = this.$store.getters.getContent.sidebar.buttons.addBookmark
      this.text.popups.addCategory.placeholder = this.$store.getters.getContent.popups.addCategory.placeholder
      this.text.popups.addCategory.select = this.$store.getters.getContent.popups.addCategory.select
      this.text.popups.deleteBookmarks.header = this.$store.getters.getContent.popups.deleteBookmarks.header
      this.text.popups.deleteBookmarks.y = this.$store.getters.getContent.popups.deleteBookmarks.y
      this.text.popups.deleteBookmarks.n = this.$store.getters.getContent.popups.deleteBookmarks.n
      this.userID = this.$store.getters.getUserID
      this.printCategories()
    },

    methods: {
      async printCategories () {
        this.categories = (await Category.getCategory(this.userID)).data
        this.categoriesSidebar = (await Category.getCategory(this.userID)).data
        this.customCategories = (await Category.getCustomCategories()).data
        this.$store.commit('setCategoriesList', this.categories)
        this.$store.commit('setCustomCategories', this.customCategories)
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
          for (var i in this.categoriesSidebar) {
            this.categoriesSidebar[i].selected = false
            for (var j in this.categoriesSidebar[i].nestedCategories) {
              this.categoriesSidebar[i].nestedCategories[j].selected = false
            }
          }
          for (var k in this.text.fixedCategories) {
            this.text.fixedCategories[k].selected = false
          }
          ca.selected = !ca.selected
        }

        if (tag) {
          for (var l in this.categoriesSidebar) {
            this.categoriesSidebar[l].selected = (this.categoriesSidebar[l].name === tag)
            for (var m in this.categoriesSidebar[l].nestedCategories) {
              if (this.categoriesSidebar[l].nestedCategories[m].name === tag) {
                this.categoriesSidebar[l].nestedCategories[m].selected = true
                this.categoriesSidebar[l].hidden = false
              } else {
                this.categoriesSidebar[l].nestedCategories[m].selected = false
              }
            }
          }
          for (var n in this.text.fixedCategories) {
            this.text.fixedCategories[n].selected = (this.text.fixedCategories[n].name === tag)
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
        if (msg.transmitter === 'category' && (msg.content.name !== dropCategory.name)) {
          let dragCategory = msg.content
          let dragId = dragCategory._id
          let dropName = dropCategory.name

          if ((dragCategory.kind === 'child') && ((dropCategory.kind === 'child' && !dropCategory.parentCategory) || dropCategory.kind === 'root')) {
            await Category.editCategoryHierarchy(dragId, dropName)
            this.printCategories()
          }
        }

        if (msg.transmitter === 'Bookmark') {
          await Element.addMult([msg.content], dropCategory._id)
          this.$store.commit('setRefreshElements')
          this.$store.commit('resetSelectedArray')
        }
        if (msg.transmitter === 'multBookmarks') {
          await Element.addMult(this.$store.getters.getSelectedArray, dropCategory._id)
          this.$store.commit('setRefreshElements')
          this.$store.commit('resetSelectedArray')
        }
      },

      categorySelectedLight (ca) {
        return (ca.selected && this.$store.state.settings.color.light)
      },

      categorySelectedDark (ca) {
        return (ca.selected && !this.$store.state.settings.color.light)
      },

      settings () {
        this.$store.commit('setSettingsPopUp')
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
