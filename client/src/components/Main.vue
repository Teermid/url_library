<template>
  <v-app>
    <add-bookmark></add-bookmark>
    <edit-element></edit-element>
    <search></search>
    <sidebar></sidebar>
    
    <v-content class="background">
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
  import ListActions from '@/components/ListActions'

  export default {
    components: {
      Sidebar,
      Search,
      List,
      AddBookmark,
      EditElement,
      ListActions
    }
  }
</script>