<template>
  <v-col>
    <v-sheet>
      <h1 style="text-align: center">Profile page will be here</h1>
      <div v-for="(value, key, index) in userData" :key="index">
        <p>{{ key }}: {{ value }}</p>
      </div>
    </v-sheet>
  </v-col>
</template>

<script>
  export default {
    computed: {
      userData() {
        return this.$store.getters.userData
      }
    },

    mounted() {
      
    }
  }
</script>
