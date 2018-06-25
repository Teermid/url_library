<template>
  <v-dialog v-model="$store.state.elementView" origin="top center" max-width="550px">
    <div class="viewContent">
      <div class="portrait" v-bind:style="{ backgroundImage: 'url(' + element.imageURL + ')'}"></div>
      <div class="viewTitle">{{ element.title }}</div>
      <div class="viewDescription"> {{ element.description }} </div>
    </div>
  </v-dialog>
</template>

<script>
import Elements from '@/services/Elements'
export default {
  data () {
    return {
      element: null
    }
  },

  methods: {
    close () {
      this.$store.commit('displayElementView')
    }
  },

  watch: {
    '$store.state.elementView': {
      async handler (value) {
        this.element = null
        this.element = (await Elements.getElementById(this.$store.getters.getElementId)).data
      }
    }
  }
}
</script>
<style src="../../css/view.css"></style>
