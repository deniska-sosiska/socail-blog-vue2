<template>
  <v-app-bar
    app
    color="blue lighten-2"
    flat
  >
    <v-container class="py-0 justify-sm-space-between fill-height">

      <v-list-item-avatar 
        v-if="!accountData.avatar"
        class="mr-10"
        color="blue"
        size="32"
      ></v-list-item-avatar>

      <VueAvatar v-else :userAvatar="accountData.avatar" />

      <v-responsive max-width="360">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </v-responsive>

      <template v-if="!loadingMainPage">
        <v-btn 
          v-if="!accountData.email"
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
      </template>

      <v-btn 
        v-else
        class="buttons"
      >
        <VuePreLoader
          :size="35"
          forHeader="little"
        />
      </v-btn>

    </v-container>
  </v-app-bar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VueDropDownMenu from "./V-DropDownMenu"
  import VueAvatar from "./V-Avatar"

  export default {
    name: "VueHeader",

    components: {
      VueDropDownMenu,
      VueAvatar
    },

    computed:  mapGetters(['accountData', 'loadingMainPage']),

    methods: {
      routerPush() {
        if (this.$route.fullPath != "/authorization") 
          this.$router.push({ name: 'Authorization', params: { flag: false } })
          // .catch(()=>{})
      }
    }
  }
</script>

<style scoped>
  .buttons {
    width: 200px;
  }
</style>