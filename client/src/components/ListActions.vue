<template>
  <div id="content-header" class="content-wrapper">
    <v-dialog v-model="deleteVerification" origin="top center" max-width="400px">
      <v-card class="pb-2">
        <v-card-title>
          <img class="customIcon" src="../../css/svg/delete_icon.svg">
          <span class="subheading px-2">{{ text.deleteConfirmation.header }}</span>
          <v-spacer></v-spacer>
          <v-btn icon slot="activator" @click="deleteVerification = !deleteVerification">
            <v-icon color="grey lighten-2">close</v-icon>
          </v-btn>
         </v-card-title>
        <v-card-text class="pt-3 pb-0">
          <div style="height:50px;">
            <div
              @click="deleteMult()"
              class="customButton white--text"
              id="deleteButton">
              <span v-if="!loaders.delete">{{ text.deleteConfirmation.y }}</span>
              <v-progress-circular v-if="loaders.delete" class="mt-2" :size="20" :width="2" indeterminate color="white"></v-progress-circular>
            </div>
            <div
              @click="deleteVerification = !deleteVerification"
              class="customButton"
              id="cancelButton">
              {{ text.deleteConfirmation.n }}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <div v-model="category" id="content-header-category"> {{ category }} </div>
    <div id="content-header-filters">
      <v-menu v-if="!$store.state.multSelect">
        <v-btn icon slot="activator">
          <v-icon color="grey">sort</v-icon>
        </v-btn>
        <v-card>
          <v-list>
            <v-list-tile v-for="opt in filterOptions" :disabled="opt.disabled" v-bind:class="{ active : opt.active }" @click="filterToggle(opt, false)">
              <v-list-tile-title> {{ opt.name }} </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>

      <v-menu v-if="!$store.state.multSelect">
        <v-btn icon slot="activator">
          <v-icon color="grey">view_list</v-icon>
        </v-btn>
        <v-card>
          <v-list>
            <v-list-tile v-for="opt in displayOptions" v-bind:class="{ active : opt.active }" @click="filterToggle(opt, true)">
              <v-list-tile-title> {{ opt.name }} </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>

      <v-btn icon slot="activator" @click="multSelect" v-if="!$store.state.multSelect">
        <v-icon color="grey">layers</v-icon>
      </v-btn>

      <v-btn :loading="loaders.all" slot="activator" @click="selectAll" v-if="$store.state.multSelect">{{ text.all }}</v-btn>
      <v-btn :disabled="disabled" :loading="loaders.unsort" depressed slot="activator" @click="unsort" v-if="$store.state.multSelect">{{ text.unsort }}</v-btn>
      <v-btn :disabled="disabled" depressed slot="activator" @click="deleteVerification = !deleteVerification" v-if="$store.state.multSelect">{{ text.delete }}</v-btn>
      <v-btn icon slot="activator" @click="multSelect" v-if="$store.state.multSelect">
        <v-icon color="grey">close</v-icon>
      </v-btn>

     <!-- :close-on-content-click="false" -->

      <!-- div @click="sortBy('title')">Nom</div>
      <div @click="sortBy('updatedAt')">Data</div>
      <div @click="multSelect" v-if="!select">Select</div>
      <v-menu v-if="select">
        <v-btn slot="activator">Accions</v-btn>
        <v-list>
          <v-list-tile @click="deleteMult">
            <v-list-tile-title> Eliminar </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-title> Afegir </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="multSelect">
            <v-list-tile-title> Cancelar </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->
    </div>
    <v-snackbar
      v-if="$store.state.settings.notifications"
      bottom
      right
      timeout=3000
      v-model="snackbar">
      {{ snackbarFinal }}
      <v-btn dark flat color="pink" @click.native="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
    import Elements from '@/services/Elements'
    export default {
      data () {
        return {
          text: {
            all: null,
            unsort: null,
            delete: null,
            deleteConfirmation: {
              header: null,
              y: null,
              n: null
            },
            snackbar: {
              mult: null,
              unsort: null
            }
          },
          deleteVerification: false,
          snackbarFinal: null,
          disabled: true,
          loaders: {
            all: false,
            unsort: false,
            delete: false
          },
          category: null,
          categoriesList: null,
          displayOptions: [
            {
              name: null,
              value: 'card',
              active: true
            },
            {
              name: null,
              value: 'grid',
              active: false
            },
            {
              name: null,
              value: 'list',
              active: false
            }
          ],

          filterOptions: [
            {
              name: null,
              value: 'title',
              active: false
            },
            /* {
              name: 'Z-a',
              value: ['title', -1],
              active: false
            }, */
            {
              name: null,
              value: 'date',
              active: true
            },
            /* {
              name: 'Més antics',
              value: ['timestamp', 1],
              active: false
            }, */
            {
              name: null,
              value: 'category',
              active: false
            }
          ]
        }
      },

      beforeMount () {
        this.category = this.$store.getters.getCategoryFilterDisplay
        this.categoriesList = this.$store.getters.getCategoriesList
        this.displayOptions[0].name = this.$store.getters.getContent.filters.display.card
        this.displayOptions[1].name = this.$store.getters.getContent.filters.display.grid
        this.displayOptions[2].name = this.$store.getters.getContent.filters.display.list
        this.filterOptions[0].name = this.$store.getters.getContent.filters.order.title
        this.filterOptions[1].name = this.$store.getters.getContent.filters.order.date
        this.filterOptions[2].name = this.$store.getters.getContent.filters.order.category
        this.text.all = this.$store.getters.getContent.filters.multipleSelect.all
        this.text.unsort = this.$store.getters.getContent.filters.multipleSelect.unsort
        this.text.delete = this.$store.getters.getContent.filters.multipleSelect.delete
        this.text.snackbar.mult = this.$store.getters.getContent.snackbars.deleteMult
        this.text.snackbar.unsort = this.$store.getters.getContent.snackbars.unsort
        this.text.deleteConfirmation.header = this.$store.getters.getContent.popups.deleteConfirmation.header
        this.text.deleteConfirmation.y = this.$store.getters.getContent.popups.deleteConfirmation.y
        this.text.deleteConfirmation.n = this.$store.getters.getContent.popups.deleteConfirmation.n
      },

      methods: {
        filterToggle (opt, array) {
          if (array) {
            for (var i = 0; i < this.displayOptions.length; i++) {
              this.displayOptions[i].active = false
            }
            this.$store.commit('setElementsDisplay', opt.value)
          } else {
            for (var j = 0; j < this.filterOptions.length; j++) {
              this.filterOptions[j].active = false
            }
            this.$store.commit('setSortBy', opt.value)
          }
          opt.active = true
        },

        multSelect () {
          this.$store.commit('setMultSelect')
          this.$store.commit('setSelectAll', false)
        },

        selectAll () {
          this.$store.commit('setSelectAll')
        },

        async unsort () {
          this.loaders.unsort = true
          const response = (await Elements.unsort(this.$store.getters.getSelectedArray)).data
          this.snackbarFinal = response.nModified + this.text.snackbar.unsort
          this.$store.commit('setRefreshElements')
          this.$store.commit('resetSelectedArray')
          this.loaders.unsort = false
          this.snackbar = true
        },

        async deleteMult () {
          this.loaders.delete = true
          const response = (await Elements.delete(this.$store.getters.getSelectedArray)).data
          this.snackbarFinal = response.n + this.text.snackbar.mult
          this.$store.commit('setRefreshElements')
          this.$store.commit('resetSelectedArray')
          this.loaders.delete = false
          this.deleteVerification = !this.deleteVerification
          this.snackbar = true
        }

      },

      watch: {
        '$store.state.categoryFilterDisplay': {
          async handler (value) {
            this.category = value
            this.filterOptions[2].disabled = (value === 'unsorted')
          }
        },

        '$store.state.selectedArray': {
          async handler (value) {
            this.disabled = (value.length === 0)
          }
        }
      }
    }
</script>
<style src="../../css/listActions.css"></style>
