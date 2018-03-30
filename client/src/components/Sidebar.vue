<template>
  <div id="sidebar">
    <div id="branch"> SAVIFY </div>
    <div class="menu">
      <div v-model="category" @click="displayCategory" value="All">all</div>
      <div v-model="category" @click="displayCategory" value="Unsorted">Unsorted</div>

      <ul id="root-list">
        <li class="root" v-for="ca in categories" :key="ca._id" v-model="category">
          <span @click="displayCategory" v-bind:value="ca.name"> {{ ca.name }} </span>

          <ul class="nested-list">
            <li class="nested" v-for="nested in ca.nestedCategories" :key="nested._id">
              <span @click="displayCategory" v-bind:value="nested.name">{{ nested.name }}</span>
            </li>
          </ul>

       </li>
     </ul>

  </div>
  <div id="add-wrapper">
    <div id="add-category">
      <input
        v-model="category.name"
        type="text"
        name="name"
        value="name"
        placeholder="name">
      <input
        v-model="category.parent"
        type="text"
        name="parent"
        placeholder="parent">
      <button @click="addCategory">
        Add
      </button>
    </div>

    <button @click="popUpDisplay"style="margin-top:20px;">add link</button>
  </div>

</div>
</template>


<script>
  // import { EventBus } from '@/main.js'
  import Category from '@/services/Category'
  export default {
    data () {
      return {
        displayed: false,
        category: {
          name: '',
          parent: ''
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
        console.log(this.category)
        try {
          const response = await Category.addCategory(this.category)
          console.log(response)
          this.printCategories()
        } catch (e) {
          console.log(e.response)
        }
      },

      popUpDisplay () {
        this.$store.commit('setPopUpDisplay')
      }
    }
}
</script>

<style>

  .menu {
    float:left;
    width:100%;
    padding:0px 15px 0px 15px
  }

  .menu ul {
    list-style: none;
  }

  .menu li, .menu div {
    color: white;
    text-align: left;
    padding:5px 5px 0px 5px;
    cursor: pointer;
  }

  .menu #root-list {
    padding: 0px;
  }

  .menu .nested-list {
    padding-left: 20px;
  }


  #sidebar {
    float: left;
    min-width: 270px;
    max-width: 270px;
    height: 100vh;
    background-color: #343334;
    /* background-image: -webkit-linear-gradient(258deg, #477c96 50%, #43779c 100%);
    background-image: -o-linear-gradient(258deg, #477c96 50%, #43779c 100%);
    background-image: linear-gradient(348deg, #477c96 50%, #43779c 100%); */
  }

  #branch {
    float: left;
    width: calc(100% - (var(--header-padding)*2));
    text-align: center;
    color: white;
    padding: var(--header-padding);
    background-color: #343334;
  }

  .show {
    display:inherit !important;
  }
  .nested > ul {
    padding-left:10px;
    display:none;
  }

  #add-wrapper {
    float:left;
    width:100%;
    margin-top:400px;
  }

  #add-category {
    float:left;
    width:100%;
  }

  @media screen and (max-width: 869px) {
     #sidebar {
       position:absolute;
       left: -270px;
     }

     #main {
       width:100% !important;
     }
  }
</style>
