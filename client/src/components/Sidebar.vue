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
        <div class="categoryContainer" v-for="ca in categories" :key="ca._id" v-if="!ca.parentCategory">
          <div class="rootWrapper" v-bind:class="{ selected: ca.selected }">
            <div class="root white--text" @click="displayCategory(ca)" v-bind:value="ca.name"> {{ ca.name }} </div>
            <div class="dropdown white--text" @click="dropdown(ca)" v-if="ca.kind == 'root'"> ▼ </div>
          </div>
          <div class="childWrapper" v-bind:class="{ hidden: ca.hidden }">
            <div class="child white--text" v-for="nested in ca.nestedCategories" :key="nested._id" @click="displayCategory(nested)" v-bind:value="nested.name" v-bind:class="{ selected: nested.selected }"> {{ nested.name }} </div>
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
              <v-select :items="rootCategories" v-model="category.parentCategory" item-text="name" item-disabled="none"></v-select>
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
  export default {
    components: {
      addBookmark
    },
    data () {
      return {
        category: {
          name: '',
          parentCategory: ''
        },
        categories: [{}],
        fixedCategories: [
          {
            name: 'Tots',
            selected: false,
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
      }
    },

    async beforeMount () {
      this.printCategories()
    },

    methods: {
      async printCategories () {
        this.categories = (await Category.getCategory(this.userID)).data
        this.rootCategories = (await Category.getRootCategories()).data
        console.log('this.rootCategories -> ' + this.rootCategories[0])
        this.$store.commit('setCategoriesList', this.categories)
      },

      displayCategory (cat) {
        this.select(cat)
        var value = event.currentTarget.getAttribute('value')
        this.$store.commit('setCategoryFilter', value)
      },

      async addCategory () {
        this.category.owner = this.$store.getters.getUserID
        this.category.parentCategory = this.category.parentCategory.name
        try {
          console.log('category -> ' + this.category.parentCategory)
          const response = await Category.addCategory(this.category)
          console.log(response)
          this.printCategories()
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

      select (ca) {
        for (var i in this.categories) {
          this.categories[i].selected = false
          for (var j in this.categories[i].nestedCategories) {
            this.categories[i].nestedCategories[j].selected = false
          }
        }
        for (var k in this.fixedCategories) {
          this.fixedCategories[k].selected = false
        }
        ca.selected = !ca.selected
      }
    }
}
</script>

<style scoped>
#node {
  text-align: left;
}

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

</style>
