<template>
  <div id="content-header" class="content-wrapper">
    <div v-model="category" id="content-header-category"> {{ category }} </div>
    <div id="content-header-filters">
      <v-menu v-if="!$store.state.multSelect">
        <v-btn icon slot="activator">
          <v-icon color="grey">filter_list</v-icon>
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

      <v-btn slot="activator" @click="selectAll" v-if="$store.state.multSelect">Tots</v-btn>

      <v-menu v-if="$store.state.multSelect" :close-on-content-click="false" min-width="200px">
        <v-btn depressed slot="activator">Afegir a</v-btn>
        <v-list>
          <v-list-tile v-for="ca in categoriesList" @click="addMult(ca)">
            <v-list-tile-title> {{ ca.name }} </v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-tile>
            <v-checkbox :label="`Eliminar actuals`" v-model="checkbox"></v-checkbox>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn depressed slot="activator" @click="deleteMult" v-if="$store.state.multSelect">Eliminar</v-btn>

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
  </div>
</template>

<script>
    import Elements from '@/services/Elements'
    export default {
      data () {
        return {
          search: '',
          Object: [],
          category: this.$store.getters.getCategoryFilter,
          categoriesList: this.$store.getters.getCategoriesList,
          displayOptions: [
            {
              name: 'Tarjetes',
              value: 'card',
              active: true
            },
            {
              name: 'Quadricula',
              value: 'grid',
              active: false
            },
            {
              name: 'Llista',
              value: 'list',
              active: false
            }
          ],

          filterOptions: [
            {
              name: 'Títol',
              value: ['title', 1],
              active: false
            },
            /* {
              name: 'Z-a',
              value: ['title', -1],
              active: false
            }, */
            {
              name: 'Data',
              value: ['timestamp', -1],
              active: true
            },
            /* {
              name: 'Més antics',
              value: ['timestamp', 1],
              active: false
            }, */
            {
              name: 'Categoria',
              value: ['category', 1],
              active: false
            }
          ],
          checkbox: false
        }
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

        itemsDisplay () {
          this.$store.commit('setGrid')
        },

        sortBy (param) {
          this.$store.commit('setSortBy', param)
        },

        multSelect () {
          this.$store.commit('setMultSelect')
          this.$store.commit('setSelectAll', false)
        },

        selectAll () {
          this.$store.commit('setSelectAll', true)
        },

        deleteMult () {
          Elements.deleteMult(this.$store.getters.getSelectedArray)
          this.$store.commit('setRefreshElements')
          this.$store.commit('resetSelectedArray')
        },

        addMult (ca) {
          Elements.addMult(this.$store.getters.getSelectedArray, ca._id)
          this.$store.commit('setRefreshElements')
          this.$store.commit('resetSelectedArray')
        }
      },

      watch: {
        '$store.state.categoryFilter': {
          async handler (value) {
            this.category = value
            if (value === 'All') {
              this.filterOptions[2].disabled = false
            } else {
              this.filterOptions[2].disabled = true
            }
          }
        }
      }
    }
</script>
<style src="../../css/listActions.css"></style>
