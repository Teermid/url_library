<template>
  <div>
    <Sidebar></Sidebar>

    <div id="main">
    <search></search>
    <!-- Future components -->
    <div id="content-header" class="content-wrapper">
      <div id="content-header-category"> Category </div>
      <div id="content-header-filters"> Filters</div>
    </div>

    <list></list>

    <!--
      <div id="content-body">
        <div class="content-link">
          <a href="https://www.google.com" target="_blank"><div class="content-link-image"></div></a>
          <div class="content-link-info">
            <div class="content-link-info-icon"><img src="https://www.studentjob.es/sjes-favicon-196x196.png"></div>
            <div class="content-link-info-title">Portal de empleo para jóvenes - Buscar trabajo | StudentJob ES</div>
            <div class="content-link-info-description">StudentJob es el portal de empleo ideal para buscar trabajo o prácticas. Encuentra tu trabajo entre cientos de ofertas disponibles. StudentJob es el portal de empleo ideal para buscar trabajo o prácticas.</div>
            <div class="content-link-info-tags"></div>
            <div class="content-link-info-settings"></div>
          </div>
        </div>
      </div> -->
    </div>
  </div>

</template>

<script>
  import Sidebar from '@/components/Sidebar.vue'
  import Search from '@/components/Search.vue'
  import List from '@/components/List.vue'
  
  export default {
    components: {
      Sidebar,
      Search,
      List
    },
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

  #main {
    width: calc(100% - 270px);
    float: left;
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
