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
        class="buttons"
        @click="routerPush()"
      >
        Sign In/Sign Up
      </v-btn>

      <div
        v-else
        class="buttons"
      >
        <VueDropDownMenu />
      </div>

    </v-container>
  </v-app-bar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VueDropDownMenu from "./V-DropDownMenu"

  export default {
    name: "VueHeader",

    components: {
      VueDropDownMenu
    },

    computed: mapGetters(['userData']),

    methods: {
      routerPush() {
        if (this.$router.currentRoute.path != '/auth') 
          this.$router.push({ name: 'PageAuthorization' })
      }
    }
  }
</script>

<style scoped>
  .buttons {
    width: 150px;
  }
</style>