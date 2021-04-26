<template>
  <v-row
    v-if="accountID === userID"
    class="profile"
  >
    <v-col cols="12">
      <v-btn width="100%">
        want to create new post?
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: "VueCreatePost",

    props: {
      userID: {
        type: String,
      }
    },

    computed: {
      accountID() {
        return this.$store.getters.accountData._id
      },
    }
  }
</script>