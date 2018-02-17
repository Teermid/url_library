<template>
<div>
  <div id="content-body">
    <div class="content-link" v-for="el in elements" :key="el.id">
      <a v-bind:href="el.link" target="_blank"><div class="content-link-image" v-bind:style="{ backgroundImage: 'url(' + el.imageURL + ')'}"></div></a>
      <div class="content-link-info">
        <div class="content-link-info-icon"><img v-bind:src="el.iconURL"></div>
        <div class="content-link-info-title">{{ el.title }}</div>
        <div class="content-link-info-description">{{ el.description }}</div>
        <div class="content-link-info-tags"></div>
        <div class="content-link-info-settings"
          @click="navigateTo({
            name:'edit',
            params: {
              element_id:el.id
            }
            })">edit</div>
      </div>
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
      userID: this.$store.getters.getUserID
    }
  },

  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },

  async beforeMount () {
    this.elements = (await Elements.getElements('All', false, null, this.userID)).data
    // this.categories = (await Category.getCategory(this.userID)).data
  },

  watch: {
    '$store.state.searchString': {
      // immediate: true,
      async handler (searchValue) {
        this.elements = (await Elements.getElements(null, 'true', searchValue, this.userID)).data
      }
    },

    '$store.state.categoryFilter': {
      // immediate: true,
      async handler (categoryValue) {
        this.elements = (await Elements.getElements(categoryValue, 'false', null, this.userID)).data
      }
    }
  }
}
</script>

<style>
  #content-body {
    /* max-width: var(--_6element-width);
    min-width: var(--_6element-width);
    width: 90%;
    margin: 20px auto;
    height: 100vh; */
    width: calc(100% - 40px);
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
    grid-auto-rows: 240px;
    height: calc(100vh - 150px);
    padding: 0 20px 0px 20px;
    overflow-y: scroll;
  }

  .content-link {
    overflow: hidden;
    -webkit-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.15);
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.15);
    /*display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    color: #ffeead;*/
  }

  .content-link-image {
    /* display: none; */
    width:100%;
    height: calc(100% - 60px);
    background-position: top;
    background-repeat: no-repeat;
    background-size:cover;
  }

  .content-link-info {
    width:calc(100% - 20px);
    height:calc(100% - 20px);
    background-color: white;
    padding:12px 10px 10px 10px;
    transition: all .3s ease-in-out;
    /* transition-timing-function: cubic-bezier(0, 1, 0.5, 1); */
  }

  .content-link-info:hover {
    margin-top: -180px;
   }

  .content-link-info-icon {
    width:32px;
    height: 32px;
    float:left;
  }

  .content-link-info-icon > img {
    width:100%;
    height: 100%;
  }

  .content-link-info-title {
    float:left;
    width:calc(100% - 50px);
    font-size:14px;
    margin-left: 10px;
    text-align: left;
  }

  .content-link-info-description {
    float:left;
    width:100%;
    font-size:14px;
    margin-top: 20px;
    color: #acacac;
    text-align: justify;
  }

  .content-link-info-settings {
    width:100%;
    float:left;
    margin-top:60px;
    font-size: 12px;
    color: #acacac;
    cursor:pointer;
  }

</style>
