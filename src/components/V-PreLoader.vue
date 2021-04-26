<template>
  <v-col
    class="preLoader" 
    :class="forHeader"
  >
    <RingLoader
      :size="size"
      :color="'#64B5F6'"
    />
  </v-col>
</template>

<script>
  import { RingLoader } from "vue-spinners-css"

  export default {
    name: "VuePreloader",

    props: {
      size: {
        type: Number,
        default: 230
      },
      forHeader: {
        type: String,
        default: ''
      }
    },
    
    components: {
      RingLoader
    },

    created() {
      // console.log("loader")
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