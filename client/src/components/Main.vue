<template>
  <v-app>
    <add-bookmark></add-bookmark>
    <edit-element></edit-element>
    <edit-category></edit-category>
    <element-view></element-view>
    <settings></settings>
    <search></search>
    <sidebar></sidebar>
    <v-content v-bind:class=" { background:$store.state.sidebarDisplay } ">
      <list-actions></list-actions>
      <list></list>
    </v-content>

  </v-app>
</template>

<script>
  import Sidebar from '@/components/Sidebar.vue'
  import Search from '@/components/Search.vue'
  import List from '@/components/List.vue'
  import AddBookmark from '@/components/addBookmark'
  import EditElement from '@/components/EditElement'
  import ElementView from '@/components/ElementView'
  import ListActions from '@/components/ListActions'
  import EditCategory from '@/components/EditCategory'
  import Settings from '@/components/Settings'

  export default {
    components: {
      Sidebar,
      Search,
      List,
      AddBookmark,
      EditElement,
      ElementView,
      ListActions,
      EditCategory,
      Settings
    }
  }
</script>
