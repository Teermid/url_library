<template>
  <div>
    <search-link></search-link>
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
</template>


<script>
  import Panel from '@/components/Panel.vue'
  import Elements from '@/services/Elements'
  import SearchLink from '@/components/Search.vue'
  export default {
    components: {
      Panel,
      SearchLink
    },

    data () {
      return {
        elements: [{}]
      }
    },

    methods: {
      navigateTo (route) {
        this.$router.push(route)
      }
    },

    watch: {
      '$store.state.searchString': {
        immediate: true,
        async handler (value) {
          this.elements = (await Elements.getElements(value)).data
        }

      }
    }
  }
</script>


<style scoped>

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
