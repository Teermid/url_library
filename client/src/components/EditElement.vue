<template>
  <v-dialog v-model="$store.state.editDisplay" origin="top center" max-width="500px">
    <v-card>
      <v-card-title class="px-4">
        <img class="customIcon" src="../../css/svg/edit_icon.svg">
        <span class="headline px-2">{{ text.header }}</span>
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
            ></v-text-field>

            <v-select
              :label="text.category"
              v-model="element.categories"
              :items="categories"
              item-text="name"
              item-value="_id"
              chips
              clearable
              deletableChips
              multiple
            ></v-select>

            <v-text-field
              :label="text.title"
              rows="5"
              v-model="element.title"
              :rules="titleRules"
              :counter="100"
              clearable
            ></v-text-field>

            <v-text-field
              :label="text.description"
              multi-line
              rows="5"
              height="80px"
              v-model="element.description"
              :rules="descriptionRules"
              :counter="1000"
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
              {{ text.edit }}
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
      text: {
        header: null,
        url: null,
        category: null,
        title: null,
        description: null,
        edit: null,
        snackbar: {
          edited: null
        }
      },
      element: {
        userID: '',
        title: '',
        categories: null,
        url: '',
        description: ''
        // error: 'NO ERRORS'
      },
      valid: true,
      loading: false,
      titleRules: null,
      descriptionRules: null,
      categories: []
    }
  },

  async beforeMount () {
    this.text.header = this.$store.getters.getContent.popups.editBookmark.header
    this.text.url = this.$store.getters.getContent.popups.editBookmark.url
    this.text.category = this.$store.getters.getContent.popups.editBookmark.category
    this.text.title = this.$store.getters.getContent.popups.editBookmark.title
    this.text.description = this.$store.getters.getContent.popups.editBookmark.description
    this.text.edit = this.$store.getters.getContent.popups.editBookmark.edit
    this.text.snackbar.edited = this.$store.getters.getContent.snackbars.edited
    this.titleRules = [
      v => (!v || v.length <= 100) || this.$store.getters.getContent.errors.addBookmark.title
    ]
    this.descriptionRules = [
      v => (!v || v.length <= 1000) || this.$store.getters.getContent.errors.addBookmark.description
    ]
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
        } catch (e) {
          console.log('error getting element by id')
        }
      }
    },
    '$store.state.customCategories': {
      handler (value) {
      // this.categories = this.$store.getters.getCustomCategories
        this.categories = value
      }
    }
  }
}
</script>
