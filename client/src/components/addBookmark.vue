 <template>
  <div>
    <v-dialog v-model="$store.state.popUpDisplay" origin="top center" max-width="500px">
      <v-card>
        <v-card-title class="px-4">
          <img class="customIcon" src="../../css/svg/add_icon.svg">
          <span class="headline px-2">{{ text.header }}</span>
          <v-spacer></v-spacer>
          <v-btn icon slot="activator" @click="close">
            <v-icon color="grey lighten-2">close</v-icon>
          </v-btn>
         </v-card-title>
         <v-card-text class="px-4 hidded" v-bind:class="{ displayed: displayData }">
           <v-form v-model="valid" ref="form" lazy-validation>
              <v-progress-circular v-if="urlLoading" class="spinner" :size="20" :width="2" indeterminate color="blue"></v-progress-circular>
              <v-text-field
                class="inputFix"
                :label="text.url"
                v-model="element.link"
                :rules="linkRules"
                required
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
                v-model="element.title"
                :rules="titleRules"
                counter="100"
                clearable
              ></v-text-field>

              <v-text-field
                :label="text.description"
                multi-line
                rows="5"
                height="80px"
                v-model="element.description"
                :rules="descriptionRules"
                counter="1000"
                clearable
              ></v-text-field>
              <v-btn
                @click="addElement"
                depressed
                :disabled="!valid"
                :loading="addLoading"
                color="blue darken-1"
                class="white--text">
                {{ this.text.add }}</v-btn>
            </v-form>
         </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-if="$store.state.settings.notifications"
      bottom
      right
      :timeout="timeout"
      v-model="snackbar">
      {{ snackbarFinal }}
      <v-btn dark flat color="pink" @click.native="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>

import element from '@/services/Elements'
import elementPolicy from '@/policies/elementPolicy'

export default {
  data () {
    return {
      text: {
        header: null,
        url: null,
        category: null,
        title: null,
        description: null,
        linkError: null,
        titleError: null,
        descriptionError: null,
        add: null,
        snackbar: {
          added: null,
          exist: null,
          nodata: null
        }
      },

      snackbarFinal: null,
      timeout: null,

      displayData: false,
      urlLoading: false,

      $_veeValidate: {
        validator: 'new'
      },
      element: {
        userID: null,
        title: null,
        categories: null,
        url: null,
        description: null,
        image: null
      },
      valid: true,
      addLoading: false,
      linkRules: null,
      titleRules: null,
      descriptionRules: null,
      lala: null,

      snackbar: false,

      categories: []

    }
  },

  async beforeMount () {
    this.categories = this.$store.getters.getCategoriesList
    this.text.header = this.$store.getters.getContent.popups.addBookmark.header
    this.text.url = this.$store.getters.getContent.popups.addBookmark.url
    this.text.category = this.$store.getters.getContent.popups.addBookmark.category
    this.text.title = this.$store.getters.getContent.popups.addBookmark.title
    this.text.description = this.$store.getters.getContent.popups.addBookmark.description
    this.text.add = this.$store.getters.getContent.popups.addBookmark.add
    this.text.snackbar.added = this.$store.getters.getContent.snackbars.added
    this.text.snackbar.exist = this.$store.getters.getContent.snackbars.exist
    this.text.snackbar.nodata = this.$store.getters.getContent.snackbars.nodata
    this.linkRules = [
      v => !!v || this.$store.getters.getContent.errors.addBookmark.link,
      v => (elementPolicy.isLink(v)) || this.$store.getters.getContent.errors.addBookmark.link_2
    ]
    this.titleRules = [
      v => (!v || v.length <= 100) || this.$store.getters.getContent.errors.addBookmark.title
    ]
    this.descriptionRules = [
      v => (!v || v.length <= 1000) || this.$store.getters.getContent.errors.addBookmark.description
    ]

    this.element.userID = this.$store.getters.getUserID
  },

  methods: {
    async addElement () {
      if (this.$refs.form.validate()) {
        this.addLoading = true
        try {
          await element.addElements(this.element)
          this.$store.commit('setPopUpDisplay')
          this.$store.commit('setRefreshElements')
          this.addLoading = false
          this.element.title = ''
          this.element.categories = ''
          this.element.url = ''
          this.element.description = ''
          this.$refs.form.reset()
          this.snackbarFinal = this.text.snackbar.added
          this.timeout = 2000
          this.snackbar = true
        } catch (e) {
          console.log(e.response)
        }
      }
    },

    close () {
      this.$store.commit('setPopUpDisplay')
      this.element.title = ''
      this.element.categories = ''
      this.element.link = ''
      this.element.description = ''
      this.$refs.form.reset()
    }
  },

  watch: {

    'element.link': async function (value) {
      this.displayData = false
      if (elementPolicy.isLink(value)) {
        // Animació loader
        this.urlLoading = true
        // Carreguem metadata
        const response = (await element.getMetadata(value)).data
        this.urlLoading = false
        if (response === true) {
          this.snackbarFinal = this.text.snackbar.exist
          this.timeout = 3000
          this.snackbar = true
        } else if (response === 'error') {
          this.snackbarFinal = this.text.snackbar.nodata
          this.timeout = 3000
          this.snackbar = true
        } else {
          this.element.url = value
          this.element.title = response.title
          this.element.description = response.description
          this.element.image = response.image
          this.displayData = true
        }
      }
    },

    '$store.state.popUpDisplay': {
      handler: function (value) {
        if (value === false) {
          this.element.title = ''
          this.element.categories = ''
          this.element.link = ''
          this.element.description = ''
          this.$refs.form.reset()
        }
      }
    },
    '$store.state.categoriesList': {
      handler: function (value) {
        this.categories = this.$store.getters.getCategoriesList
      }
    }
  }
}
</script>

<style src="../../css/add.css"></style>                                                     
