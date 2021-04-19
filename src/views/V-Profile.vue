<template>
  <v-col cols="10">
    <v-sheet
      class="profile"
    >
     <VueProfileInfouser />

    </v-sheet>
  </v-col>
</template>

<script>
  import VueProfileInfouser from '@/components/ProfileInfoUser/V-ProfileInfoUser'

  export default {
    name: "VueProfile",

    components: {
      VueProfileInfouser
    },
  }
</script>

<style scoped>
  .profile {
    padding: 30px;
  }
</style>