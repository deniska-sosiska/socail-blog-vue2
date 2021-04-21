<template>
  <v-col cols="10">
    <v-sheet
      class="profile"
      height="440px"
    >
    <v-row>

      <ProfileUserAvatar :user="userThatIShow"/>
      <ProfileUserInfo :user="userThatIShow"/>
    </v-row>

    </v-sheet>
  </v-col>
</template>

<script>
  import ProfileUserAvatar from "@/components/ProfileUser/V-ProfileUserAvatar"
  import ProfileUserInfo from "@/components/ProfileUser/V-ProfileUserInfo"


  export default {
    name: "VueProfile",

    components: {
      ProfileUserAvatar,
      ProfileUserInfo
    },

    computed: {
      userThatIShow() {
        return this.$store.getters.accountData 
      },
    },
  }
</script>

<style scoped>
  .profile {
    padding: 30px;
  }
</style>