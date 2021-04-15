<template>
  <v-app-bar
    app
    color="blue lighten-2"
    flat
  >
    <v-container class="py-0 justify-sm-space-between fill-height">
      <v-avatar
        class="mr-10"
        color="grey darken-1"
        size="32"
      ></v-avatar>

      <v-responsive max-width="360">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </v-responsive>

      <v-btn
        v-if="!userData"
        @click="$router.push({ name: 'PageAuthorization' })"
      >
        Sign In/Sign Up
      </v-btn>

      <v-btn
        v-else
        @click="clearUser()"
      >
        Sign out from account
      </v-btn>

    </v-container>
  </v-app-bar>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "VueHeader",

    computed: mapGetters(['userData']),
    
    methods: {
      clearUser() {
        this.$store.commit("clearCurrentUserData")
        if (this.$router.currentRoute.path != '/') 
          this.$router.push({ name: "Posts" })
      }
    }
  }
</script>