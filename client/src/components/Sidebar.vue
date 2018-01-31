<template>
  <div id="sidebar">
    <div id="branch"> SAVIFY </div>
    <nav class="menu">
    <ul>
      <li v-model="category" @click="displayCategory" value="All">all</li>
      <span v-for="ca in categories" :key="ca.id">
        <li v-model="category" @click="displayCategory" v-bind:value="ca.name">{{ ca.name }}</li>
      </span>
    </ul>
  </nav>
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
</template>


<script>
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
        userID: this.$store.state.userID
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
        this.$store.dispatch('setCategoryFilter', this.category)
      },

      async addCategory () {
        this.category.userID = this.$store.state.userID
        // console.log('addCategory.vue --> ' + this.category)
        try {
          const response = await Category.addCategory(this.category)
          console.log('element added -> ' + response)
          // this.$router.push('/list')
          this.printCategories()
        } catch (e) {
          console.log(e.response)
        }
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
</style>
