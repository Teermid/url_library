<template>
  <div id="sidebar">
    <div id="branch"> SAVIFY </div>
    <nav class="menu">
    <ul>
      <li v-model="category" @click="displayCategory" value="All">all</li>
      <li v-model="category" @click="displayCategory" value="Unsorted">Unsorted</li>
      <li v-for="ca in categories" :key="ca.id" v-model="category" @click="displayCategory" v-bind:value="ca.name">{{ ca.name }}</li>
    </ul>
  </nav>
  <div id="add-wrapper">
    <div id="add-category">
      <input
        v-model="category.name"
        type="text"
        name="name"
        value="name"
        placeholder="name">
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
          userID: '',
          name: ''
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
      },

      displayCategory () {
        this.displayed = !this.displayed
        this.category = event.currentTarget.getAttribute('value')
        this.$store.commit('setCategoryFilter', this.category)
      },

      async addCategory () {
        this.category.userID = this.$store.getters.getUserID
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


<style scoped>

  ul {
    list-style-type: none;
    padding: 0px;
  }

  ul li {
    cursor: pointer;
    color:white;
    text-align: center;
    padding:5px;
  }

  ul li:nth-child(2) {
    margin-bottom:20px;
  }

</style>

<style>

  .menu {
    float:left;
    width:100%;

  }

  #sidebar {
    float: left;
    min-width: 270px;
    max-width: 270px;
    height: 100vh;
    background-color: #477c96;
    background-image: -webkit-linear-gradient(258deg, #477c96 50%, #43779c 100%);
    background-image: -o-linear-gradient(258deg, #477c96 50%, #43779c 100%);
    background-image: linear-gradient(348deg, #477c96 50%, #43779c 100%);
  }

  #branch {
    float: left;
    width: calc(100% - (var(--header-padding)*2));
    text-align: center;
    color: white;
    padding: var(--header-padding);
    background-color: #4b7fa4;
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

  @media screen and (max-width: 829px) {
     #sidebar {
       position:absolute;
       left: -270px;
     }

     #main {
       width:100% !important;
     }
  }
</style>
