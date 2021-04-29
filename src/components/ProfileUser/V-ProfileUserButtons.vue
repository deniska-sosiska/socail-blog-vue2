<template>
  <div class="buttons">
    
    <v-btn
      @click="triggerInputClick()"
    > Change avatar </v-btn>

    <v-btn
      @click="deleteUserAvatar()"
    > Delete avatar </v-btn>

    <input type="file" style="display: none" ref="avatarBtn" accept="image/*" @change="changeUserAvatar()">

  </div>
</template>

<script>

  export default {
    name: "ProfileUserButtons",
    props: {
      userID: {
        type: String
      }
    },

    methods: {
      triggerInputClick() {
        this.$refs.avatarBtn.click()
      },

      changeUserAvatar() {
        const bodyFormData = new FormData()
        const file = this.$refs.avatarBtn

        bodyFormData.append('avatar', file.files[0])
        this.$store.dispatch("changeAvatarAndUpdateUser", { userID: this.userID, bodyFormData })
      },

      deleteUserAvatar() {
        const bodyFormData = new FormData()
        // const file = this.fallBackSrc
        const file = ''
        bodyFormData.append('avatar', file)
        this.$store.dispatch("changeAvatarAndUpdateUser", { userID: this.userID, bodyFormData })
      }
    }
  }
</script>

<style scoped>
  .buttons {
    padding: 15px;
    width: 100%;
    border: 5px solid #ccc;

    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-wrap: wrap;
    
  }
  .buttons > button {
    width: 45%;
  }
  button {
    letter-spacing: normal
  }

  @media (max-width: 1264px) {
    .buttons > button {
      width: 95%;
    }
  }
</style>