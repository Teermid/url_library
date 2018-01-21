<template>
  <nav class="menu">
  <ul>
    <li v-model="category" @click="displayCategory" value="All">all</li>
    <span v-for="ca in categories" :key="ca.id">
      <li v-model="category" @click="displayCategory" v-bind:value="ca.name">{{ ca.name }}</li>
    </span>
  </ul>
</nav>
</template>


<script>
  import Category from '@/services/Category'
  export default {
    data () {
      return {
        displayed: false,
        category: '',
        categories: [{}],
        userID: this.$store.state.userID
      }
    },

    async beforeMount () {
      this.categories = (await Category.getCategory(this.userID)).data
    },

    methods: {
      displayCategory () {
        this.displayed = !this.displayed
        this.category = event.currentTarget.getAttribute('value')
        this.$store.dispatch('setCategoryFilter', this.category)
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
