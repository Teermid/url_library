<template>
<div>

  <!-- <div class="llistat" v-for="el in elements" :key="el.id">
    <ul>
      <li><a v-bind:href="el.link" target="_blank"><strong>{{el.title}}</strong></a></li>
      <li>{{el.description}}</li>
      <li>#{{el.category}}</li>
      <router-link tag="li" :to="{
                    name: 'edit',
                    params: {
                      element_id: el.id
                    }
                  }">edit</router-link>
    </ul>
  </div> -->

  <div id="content-body">
    <div class="content-link" v-for="el in elements" :key="el.id">
      <a v-bind:href="el.link" target="_blank"><div class="content-link-image"></div></a>
      <div class="content-link-info">
        <div class="content-link-info-icon"><img src="https://www.studentjob.es/sjes-favicon-196x196.png"></div>
        <div class="content-link-info-title">{{ el.title }}</div>
        <div class="content-link-info-description">{{ el.description }}</div>
        <div class="content-link-info-tags"></div>
        <div class="content-link-info-settings"></div>
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
      userID: this.$store.state.userID
    }
  },

  methods: {
    // navigateTo(route) {
    //   this.$router.push(route)
    // }
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
    grid-template-columns: repeat(auto-fill, minmax(295px, 1fr));
    grid-auto-rows: 240px;
    height: calc(100vh - 190px);
    padding: 0 20px 20px 20px;
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
    height: calc(100% - 65px);
    background-image: url("https://d36bmc1enj16yj.cloudfront.net/production/assets/og-logos/social/sj_es-og-social-9cfd2cb26b1ba29628c5da9a5fdae1ea2ef3c5ad1d95d4230920f79f012fab33.png");
    background-position: top;
    background-repeat: no-repeat;
    background-size:cover;
  }

  .content-link-info {
    width:calc(100% - 20px);
    height:calc(100% - 20px);
    background-color: white;
    padding:10px;
    transition: all .4s ease-in-out;
    /* transition-timing-function: cubic-bezier(0, 1, 0.5, 1); */
  }

  .content-link-info:hover {
    margin-top: -175px;
   }

  .content-link-info-icon {
    width:40px;
    height: 40px;
    float:left;
  }

  .content-link-info-icon > img {
    width:100%;
    height: 100%;
  }

  .content-link-info-title {
    float:left;
    width:calc(100% - 50px);
    font-size:15px;
    margin-left: 10px;
    text-align: justify;
  }

  .content-link-info-description {
    float:left;
    width:100%;
    font-size:14px;
    margin-top: 15px;
    color: #acacac;
    text-align: justify;

  }

</style>
