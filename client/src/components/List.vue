<template>
  <panel title="Llistat">
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      <div slot="subcontent">
        <div class="llistat" v-for="el in elements" :key="el.id">
          <ul>
            <li><a v-bind:href="el.link" target="_blank"><strong>{{el.title}}</strong></a></li>
            <li>{{el.description}}</li>
            <li>#{{el.category}}</li>
            <li @click="navigateTo({
                name: 'edit',
                params: {
                  element_id: el.id
                }
              })">edit</li>

          </ul>

        </div>

      </div>
  </panel>
</template>


<script>
  import Panel from '@/components/Panel.vue'
  import Elements from '@/services/Elements'
  export default {
    components: {
      Panel
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

    async mounted () {
      this.elements = (await Elements.getElements()).data
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
