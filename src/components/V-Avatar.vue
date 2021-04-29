<template>
  <v-avatar
    class="avatar"
    color="grey darken-1"
    size="32"
  >
    <img
      :src="avatarUrl()"  
      alt="John"
    >
  </v-avatar>
</template>

<script>
  import createAvatarUrl from "@/services/Avatar.service" 

  export default {
    name: "VueAvatar",

    props: {
      userAvatar: {
        type:String
      }
    },

    methods: {
      avatarUrl() {
        return createAvatarUrl({ userAvatar: this.userAvatar })
      }
    }
  }
</script>

<style scoped>
  .avatar {
    margin-right: 15px;
  }
</style>