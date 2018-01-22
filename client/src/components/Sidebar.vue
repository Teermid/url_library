<template>
  <div>
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
  }

  ul li {
    cursor: pointer;
  }
  .show {
    display:inherit !important;
  }
  .nested > ul {
    padding-left:10px;
    display:none;
  }
</style>
