<template>
  <input
    v-model="search"
    type="text"
    name="search"
    placeholder="Search.."
    ></input>
</template>

<script>
  export default {
    data () {
      return {
        search: ''
      }
    },

    watch: {
      search (value) {
        this.$store.dispatch('setSearchString', value)
        console.log(this.$store.state.searchString)
      }
    },

    methods: {
    }
  }
</script>


<style scoped>
</style>
