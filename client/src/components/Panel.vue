<template>
  <div class="container">
    <div class="title">
      <h2>{{title}}</h2>
    </div>
    <div class="content">
      <slot name="content">
        <!-- Children content -->
      </slot>
      <slot name ="subcontent">
        <!-- Children content -->
      </slot>
    </div>
  </div>
</template>


<script>
  export default {
    props: [
      'title'
    ]
  }
</script>


<style scoped>
  .content p, h2 {
    text-align: center;
    padding:15px;
  }
</style>
