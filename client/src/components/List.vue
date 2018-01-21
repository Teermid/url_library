<template>
  <div>
    <search-link></search-link>
    <div class="left">
      <sidebar></sidebar>
      <addCategory></addCategory>
    </div>
    <div class="right">
      <panel title="Llistat">
          <div slot="subcontent">
            <div class="llistat" v-for="el in elements" :key="el.id">
              <ul>
                <li><a v-bind:href="el.link" target="_blank"><strong>{{el.title}}</strong></a></li>
                <li>{{el.description}}</li>
                <li>#{{el.category}}</li>
                <router-link
                  tag="li"
                  :to="{
                    name: 'edit',
                    params: {
                      element_id: el.id
                    }
                  }">edit</router-link>

              </ul>

            </div>

          </div>
      </panel>

    </div>


</div>
</template>

<script>
  import Panel from '@/components/Panel.vue'
  import Elements from '@/services/Elements'
  // import Category from '@/services/Category'
  import SearchLink from '@/components/Search.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import addCategory from '@/components/addCategory.vue'

  export default {
    components: {
      Panel,
      SearchLink,
      Sidebar,
      addCategory
    },

    data () {
      return {
        elements: [{}],
        categories: [{}],
        userID: this.$store.state.userID
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

<style scoped>

  .left {
    float:left;
    width: 30%;
  }

  .right {
    float:left;
    width: 70%;
  }

  ul {
    list-style: none;
    padding-left: 0px;
  }

  ul li:nth-child(3) {
    font-size: 12px;
    font-weight: bold;
  }

  ul li:nth-child(4) {
    cursor: pointer;
  }
</style>
