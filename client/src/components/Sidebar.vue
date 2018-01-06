<template>
  <nav class="menu">
  <ul>
    <li v-model="category" @click="displayCategory" value="All">all</li>
    <li v-model="category" @click="displayCategory" value="Technology">Technology</li>
    <li v-model="category" @click="displayCategory" value="Cooking">Cooking
      <!-- <ul v-if="displayed">
        <li><a href="#">sub-category 1</a></li>
        <li><a href="#">sub-category 2</a></li>
        <li><a href="#">sub-category 3</a></li>
      </ul> -->
    </li>
    <li v-model="category" @click="displayCategory" value="Employment">Employment</li>
    <li v-model="category" @click="displayCategory" value="Fails">Fails</li>
  </ul>
</nav>
</template>


<script>
  export default {
    data () {
      return {
        displayed: false,
        category: ''
      }
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
