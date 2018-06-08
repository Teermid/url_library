<template>
  <v-dialog v-model="$store.state.editDisplay" origin="top center" max-width="500px">
    <v-card>
      <v-card-title>
         <span class="headline px-2">Editar Marcador</span>
         <v-spacer></v-spacer>
          <v-btn icon slot="activator" @click="close">
            <v-icon color="grey lighten-2">close</v-icon>
          </v-btn>
       </v-card-title>
       <v-card-text class="px-4">
         <v-form v-model="valid" ref="form" lazy-validation>

            <v-text-field
              disabled="true"
              label="Link"
              v-model="element.link"
              :rules="[v => !!v || 'Item is required']"
              required
              clearable
            ></v-text-field>

            <v-select
              label="Categoria"
              v-model="element.categories"
              :items="categories"
              item-text="name"
              chips
              clearable
              deletableChips
              multiple
            ></v-select>

            <v-text-field
              label="Títol"
              v-model="element.title"
              :rules="titleRules"
              :counter="120"
              clearable
            ></v-text-field>

            <v-text-field
              label="Descripció"
              multi-line
              rows="3"
              height="80px"
              v-model="element.description"
              :rules="descriptionRules"
              :counter="500"
              clearable
            ></v-text-field>
            <v-btn
              @click="editElement"
              depressed
              :disabled="!valid"
              :loading="loading"
              color="blue darken-1"
              class="white--text"
            >
              submit
            </v-btn>
          </v-form>

       </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Element from '@/services/Elements'
export default {
  data () {
    return {
      element: {
        userID: '',
        title: '',
        categories: null,
        link: '',
        description: ''
        // error: 'NO ERRORS'
      },
      valid: true,
      loading: false,
      linkRules: [
        v => !!v || 'Link is required'
      ],
      titleRules: [
        v => (v.length <= 120) || 'El títol no pot contindre més de 60 caracters'
      ],
      descriptionRules: [
        v => (v.length <= 500) || 'La descripció no pot contindre més de 120 caracters'
      ],
      categories: []
    }
  },

  methods: {
    async editElement () {
      await Element.editElement(this.element)
      this.$store.commit('setEditDisplay')
      this.$store.commit('setRefreshElements')
    },

    close () {
      this.$store.commit('setEditDisplay')
    }
  },
  watch: {
    '$store.state.elementByIdTrigger': {
      async handler (value) {
        try {
          this.element = (await Element.getElementById(this.$store.getters.getElementId)).data
          console.log('ElementById -> ' + this.element.categories)
        } catch (e) {
          console.log('error getting element by id')
        }
      }
    },
    '$store.state.categoriesList': {
      handler: function () {
        let categoriesTemp = this.$store.getters.getCategoriesList
        for (var i = 0; i < categoriesTemp.length; i++) {
          if (categoriesTemp[i].nestedCategories.length === 0) {
            categoriesTemp[i].nestedCategories = null
          }
        }
        this.categories = categoriesTemp
      }
    }
  }
}
</script>
