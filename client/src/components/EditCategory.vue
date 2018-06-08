<template>
  <v-dialog v-model="$store.state.editCategoryDisplay" origin="top center" max-width="500px">
    <v-card>
      <v-card-title>
         <v-spacer></v-spacer>
          <v-btn icon slot="activator" @click="close">
            <v-icon color="grey lighten-2">close</v-icon>
          </v-btn>
       </v-card-title>
       <v-card-text class="px-4">
         <v-form ref="form" lazy-validation>
           <v-text-field
             label="Name"
             v-model="category.name"
             required
             clearable
           ></v-text-field>
            <v-btn
              @click="editCategory"
              depressed
              :loading="loading"
              color="blue darken-1"
              class="white--text"
            >
              Submit
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
      category: ''
    }
  },

  methods: {
    async editCategory () {
      // alert(this.category._id + ' | ' + this.category.name)
      await Category.editCategory(this.category._id, this.category)
      this.$store.commit('setEditCategoryDisplay')
    },

    close () {
      this.$store.commit('setEditCategoryDisplay')
    }
  },
  watch: {
    '$store.state.categoryByIdTrigger': {
      async handler (value) {
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
