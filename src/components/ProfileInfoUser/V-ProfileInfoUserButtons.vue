<template>
  <div class="buttons">
    
    <v-btn
      @click="triggerInputClick()"
    > Change avatar </v-btn>

    <v-btn
      @click="deleteUserAvatar()"
    > Delete avatar </v-btn>

    <input type="file" style="display: none" ref="avatarBtn" accept="image/*" @change="change()">

  </div>
</template>

<script>
  // import { changeAvatar } from "@/services/profile.service.js"

  export default {
    name: "ProfileInfouserButtons",
    props: {
      userID: {
        type: String
      },
      fallBackSrc: {
        type: String
      }
    },

    methods: {
      triggerInputClick() {
        this.$refs.avatarBtn.click()
        
      },

      change() {
        const bodyFormData = new FormData()
        const file = this.$refs.avatarBtn

        bodyFormData.append('avatar', file.files[0])
        this.$store.dispatch("changeAvatarAndUpdateUser", { userID: this.userID, bodyFormData })
      }
    }
  }
</script>

<style scoped>
  .buttons {
    padding: 15px 0px ;
    width: 100%;
    border: 5px solid #ccc;
  }
  .buttons > button:first-child {
    margin-right: 5px;
    margin-left: 15px;
  }
</style>