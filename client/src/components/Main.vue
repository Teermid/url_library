<template>
  <div>
    <CreateElement></CreateElement>
    <Sidebar></Sidebar>

    <div id="main">
      <search></search>
      <!-- Future components -->
      <div id="content-header" class="content-wrapper">
        <div v-model="category" id="content-header-category"> {{ category }} </div>
        <div id="content-header-filters"> Filters</div>
      </div>

      <list></list>

    </div>
  </div>

</template>

<script>
  import Sidebar from '@/components/Sidebar.vue'
  import Search from '@/components/Search.vue'
  import List from '@/components/List.vue'
  import CreateElement from '@/components/CreateElement.vue'

  export default {
    components: {
      Sidebar,
      Search,
      List,
      CreateElement
    },
    data () {
      return {
        search: '',
        category: this.$store.getters.getCategoryFilter
      }
    },

    watch: {
      '$store.state.categoryFilter': {
        // this.$store.getters.getCategoryFilter
        async handler (value) {
          this.category = value
        }
      }
    }
  }
</script>


<style>

  #main {
    width: calc(100% - 270px);
    float: left;
    background-color: #FAFAFA;
  }

  .content-wrapper {
    float: left;
    width:100%;
  }

  #content-header-category {
    float: left;
    padding: 30px 40px;
  }

  #content-header-filters {
    float: right;
    padding: 30px 40px;
    text-align: center;
  }
</style>
