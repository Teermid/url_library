<template>
  <v-dialog v-model="$store.state.editCategoryDisplay" origin="top center" max-width="500px">
    <v-card>
      <v-card-title class="px-4">
        <img class="customIcon" src="../../css/svg/edit_icon.svg">
        <span class="headline px-2"> {{ text.header }} </span>
        <v-spacer></v-spacer>
          <v-btn icon slot="activator" @click="close">
            <v-icon color="grey lighten-2">close</v-icon>
          </v-btn>
       </v-card-title>
       <v-card-text class="px-4">
         <v-form ref="form" lazy-validation>
           <v-text-field
             :label="text.name"
             v-model="category.name"
             :error-messages="errorText"
             required
             clearable
           ></v-text-field>
            <v-btn
              @click="editCategory"
              depressed
              :loading="loader"
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
import Category from '@/services/Category'
export default {
  data () {
    return {
      text: {
        header: null,
        name: null,
        edit: null,
        errors: {
          exist: null,
          invalid: null
        }
      },
      category: '',
      loader: false,
      error: false,
      errorText: null
    }
  },

  beforeMount () {
    this.text.header = this.$store.getters.getContent.popups.editCategory.header
    this.text.name = this.$store.getters.getContent.popups.editCategory.name
    this.text.edit = this.$store.getters.getContent.popups.editCategory.edit
    this.text.errors.exist = this.$store.getters.getContent.errors.editCategory.exist
    this.text.errors.invalid = this.$store.getters.getContent.errors.editCategory.invalid
  },

  methods: {
    async editCategory () {
      this.errorText = null
      if (this.category.name === null) {
        this.errorText = this.text.errors.invalid
      } else {
        this.loader = true
        let response = (await Category.editCategoryName(this.category)).data
        if (response.error) {
          this.errorText = this.text.errors.exist
          this.loader = false
        } else {
          this.$store.commit('setEditCategoryDisplay')
          this.$store.commit('setRefreshElements')
          this.errorText = null
          this.loader = false
        }
      }
    },

    close () {
      this.$store.commit('setEditCategoryDisplay')
    }
  },
  watch: {
    '$store.state.categoryByIdTrigger': {
      async handler (value) {
        this.errorText = null
        try {
          this.category = (await Category.getCategoryById(this.$store.getters.getCategoryId)).data
        } catch (e) {
          console.log('error getting element by id')
        }
      }
    }
  }
}
</script>
