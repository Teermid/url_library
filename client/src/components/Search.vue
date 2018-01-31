<template>
  <div id="searchbar">
    <input
      v-model="search"
      type="text"
      name="search"
      placeholder="Search.."
      ></input>
  </div>

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


<style>

  #searchbar {
    float: left;
    width:100%;
  }

  #searchbar > input {
    width: calc(100% - (var(--header-padding)*2));
    padding: calc(var(--header-padding) + 1px);
    border: 0px;
    -webkit-box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2);
    -moz-box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2);
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2);
  }

</style>
