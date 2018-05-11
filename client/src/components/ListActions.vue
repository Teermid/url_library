<template>
  <div id="content-header" class="content-wrapper">
    <div v-model="category" id="content-header-category"> {{ category }} </div>
    <div id="content-header-filters">
      <v-menu :close-on-content-click="false">
        <v-btn icon slot="activator">
          <v-icon color="grey">filter_list</v-icon>
        </v-btn>
        <v-card>
          <v-list>
            <v-list-tile v-for="opt in displayOptions" v-bind:class="{ active : opt.active }" @click="filterToggle(opt, true)">
              <v-list-tile-title> {{ opt.name }} </v-list-tile-title>
            </v-list-tile>
          </v-list>  
          <v-divider></v-divider>    
          <v-list>
            <v-list-tile v-for="opt in filterOptions" v-bind:class="{ active : opt.active }" @click="filterToggle(opt, false)">
              <v-list-tile-title> {{ opt.name }} </v-list-tile-title>
            </v-list-tile>
          </v-list>            
        </v-card>

      </v-menu>
     
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
          select: false,
          category: this.$store.getters.getCategoryFilter,

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
              name: 'A-z',
              value: ['title', 1],
              active: true
            },
            {
              name: 'Z-a',
              value: ['title', -1],
              active: false
            },
            {
              name: 'Data (recents)',
              value: ['timestamp', -1],
              active: false
            },
            {
              name: 'Data (antics)',
              value: ['timestamp', 1],
              active: false
            }
          ]
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
          this.select = !this.select
          this.$store.commit('setMultSelect')
        },

        deleteMult () {
          Elements.deleteMult(this.$store.getters.getSelectedArray)
          this.$store.commit('setRefreshElements')
        }
      },

      watch: {
        '$store.state.categoryFilter': {
            // this.$store.getters.getCategoryFilter
          async handler (value) {
            this.category = value
          }
        }
      }
    }
</script>

<style>

  .active {
    background-color:#e5e5e5;    
  }

  #content-header-category {
    float: left;
    padding: 30px 40px;
  }

  #content-header-filters {
    float: right;
    padding: 30px 40px;
    text-align: center;
    width: fit-content;
  }

  #content-header-filters div {
    /*float:left;
    margin-left:10px;*/
  }
</style>