<template>
<div>

    <!-- GRID -->
    <div v-if="$store.getters.getGrid" id="grid-content-body">
      <div class="grid-content-link" v-for="el in elements" :key="el.id">
        <a v-bind:href="el.link" target="_blank"><div class="grid-content-link-image" v-bind:style="{ backgroundImage: 'url(' + el.imageURL + ')'}"></div></a>
        <div class="grid-content-link-info">
          <div class="grid-content-link-info-icon"><img v-bind:src="el.iconURL"></div>
          <div class="grid-content-link-info-title">{{ el.title }}</div>
          <div class="grid-content-link-info-description">{{ el.description }}</div>
          <div class="grid-content-link-info-settings" @click="navigateTo({name:'edit', params: {element_id:el.id}})"> edit </div>
        </div>
      </div>
    </div>

    <!-- LIST -->
    <div v-if="!$store.getters.getGrid" id="list-content-body">
      <div class="list-content-link" v-for="el in elements" :key="el.id">
        <div class="list-content-link-icon"><img v-bind:src="el.iconURL"></div>
        <div class="list-content-link-info">
          <div class="list-content-link-info-title">{{ el.title }}</div>
          <div class="list-content-link-info-description">{{ el.description }}</div>
        </div>
        <div class="list-content-link-settings" @click="navigateTo({name:'edit', params: {element_id:el.id}})"> edit </div>
      </div>
    </div>


</div>
</template>

<script>
import Elements from '@/services/Elements'

export default {
  data () {
    return {
      elements: [{}],
      categories: [{}],
      userID: this.$store.getters.getUserID,
      categoryFilter: '',
      searchValue: '',
      sortBy: this.$store.getters.getSortBy
    }
  },

  async beforeMount () {
    console.log('before mount ->' + this.sortBy)
    this.getElements('All', false, null, this.userID, this.sortBy)
  },

  methods: {
    async getElements (cat, isSearch, searchVal, userID, sortBy) {
      this.elements = (await Elements.getElements(cat, isSearch, searchVal, userID, sortBy)).data
      console.log(this.elements)
    },

    navigateTo (route) {
      this.$router.push(route)
    }
  },

  watch: {
    '$store.state.searchString': {
      // this.searchValue = this.$store.getters.getSearchString
      async handler (value) {
        this.searchValue = value
        this.getElements(null, 'true', this.searchValue, this.userID, this.sortBy)
      }
    },

    '$store.state.categoryFilter': {
      // this.$store.getters.getCategoryFilter
      async handler (value) {
        this.categoryFilter = value
        this.getElements(this.categoryFilter, 'false', null, this.userID, this.sortBy)
      }
    },

    '$store.state.sortBy': {
      async handler (value) {
        this.sortBy = value
        let searchValue = this.searchValue || null
        let isSearch = 'true'
        if (searchValue === null) {
          isSearch = 'false'
        }
        this.getElements(this.categoryFilter, isSearch, searchValue, this.userID, this.sortBy)
      }
    },

    '$store.state.refreshElements': {
      async handler () {
        this.getElements(this.categoryFilter, 'false', null, this.userID, this.sortBy)
      }
    }
  }
}
</script>

<style>

:root {
  --content-body-width: calc(100% - 40px);
  --content-body-height: calc(100vh - 150px);
  --box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  --grid-content-info-height: calc(100% - 20px);
  --grid-content-info-width: calc(100% - 20px);

  --font-color: #acacac;
  --text-align: left;
  --font-size-title: 14px;
  --font-size-description: 14px;

  --list-element-height: 55px;


}


  #grid-content-body {
    width: var(--content-body-width);
    height: var(--content-body-height);
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
    grid-auto-rows: 240px;
    padding: 0 20px 0px 20px;
    overflow-y: scroll;
  }

  .grid-content-link {
    overflow: hidden;
    /* -webkit-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.15);
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.15); */

    box-shadow: var(--box-shadow);
    webkit-box-shadow: var(--box-shadow);
  }

  .grid-content-link-image {
    /* display: none; */
    width:100%;
    height: calc(100% - 60px);
    background-position: top;
    background-repeat: no-repeat;
    background-size:cover;
  }

  .grid-content-link-info {
    width:var(--grid-content-info-height);
    height:var(--grid-content-info-width);
    background-color: white;
    padding: 12px 10px 10px 10px;
    transition: all .3s ease-in-out;
    /* transition-timing-function: cubic-bezier(0, 1, 0.5, 1); */
  }

  .grid-content-link-info:hover {
    margin-top: -180px;
   }

  .grid-content-link-info-icon {
    width:32px;
    height: 32px;
    float:left;
  }

  .grid-content-link-info-icon > img {
    width:100%;
    height: 100%;
  }

  .grid-content-link-info-title {
    float:left;
    width:calc(100% - 50px);
    font-size:var(--font-size-title);
    margin-left: 10px;
    text-align: left;
  }

  .grid-content-link-info-description {
    float:left;
    width:100%;
    font-size:var(--font-size-description);
    margin-top: 20px;
    color: var(--font-color);
    text-align: var(--text-align);
  }

  .grid-content-link-info-settings {
    width:100%;
    float:left;
    margin-top:60px;
    font-size: 12px;
    color: var(--font-color);
    cursor:pointer;
  }

  /* --------------------------------------------- */

  #list-content-body {
    width: var(--content-body-width);
    height: var(--content-body-height);
    display:flex;
    flex-direction:column;
    padding: 0 20px 0px 20px;
    overflow-y: scroll;
  }

  .list-content-link {
    height:var(--list-element-height);
    padding:10px;
    background-color:white;
    margin-bottom:10px;
    box-shadow: var(--box-shadow);
    webkit-box-shadow: var(--box-shadow);
  }

  .list-content-link-icon {
    width:32px;
    height: 32px;
    float: left;
    margin-top:calc( ((var(--list-element-height))/2) - 16px);
    margin-left: 10px;
    margin-right: 10px;
  }

  .list-content-link-icon > img {
    height: 100%;
    width: 100%;
  }

  .list-content-link-info {
    width: 90%;
    height:var(--list-element-height);
    float:left;
  }

  .list-content-link-info-title {
    text-align: left;
    height: calc((var(--list-element-height))/3);
    width:100%;
    float:left;
    font-size:14px;
    text-align: left;
  }

  .list-content-link-info-description {
    height: 40px;
    width:100%;
    float:left;
    font-size:14px;
    color: var(--font-color);
    text-align: var(--text-align);
  }

  .list-content-link-settings {
    float:right;
    width: 30px;
    display: none
  }

</style>
