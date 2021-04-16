<template>
  <v-col
    class="preLoader" 
    :class="forHeader"
  >
    <DefaultLoader
      :size="size"
      :color="'#64B5F6'"
    />
  </v-col>
</template>

<script>
  export default {
    props: {
      size: {
        type: Number,
        default: 230
      },
      forHeader: {
        type: String,
        default: ''
      }
    } 
  }
</script>

<style scoped>
  .preLoader {
    margin-top: 100px;
    text-align: center;
  }
  .little {
    margin-top: 5px;
  }
</style>