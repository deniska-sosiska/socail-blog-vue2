<template>
  <v-app-bar
    app
    color="blue lighten-2"
    flat
  >
    <v-container class="py-0 justify-center justify-md-space-between fill-height" width="100%">
      <v-list-item-avatar 
        v-if="!accountData.avatar"
        class="mr-4 d-none d-md-block"
        color="blue"
        size="32"
      ></v-list-item-avatar>

      <VueAvatar v-else :userAvatar="accountData.avatar" class="d-none d-md-block"/>

      <h2 style="color: #fff;">Travel Blog</h2>

      <div class="d-none d-md-block">
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
      </div>

    </v-container>

    <v-btn class="pa-0 d-md-none showMenu"
      @click="isShowLinks()"
    >
      {{ showLinks ? "Close" : "Menu" }}
    </v-btn>

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

    computed:  mapGetters(['showLinks', 'accountData', 'loadingMainPage']),

    methods: {
      isShowLinks() {
        this.$store.commit("isShowLinks")
      },
      routerPush() {
        this.$router.push({ 
          name: 'Authorization',
          params: { flag: false }
        }).catch(()=>{})
      }
    }
  }
</script>

<style scoped>
  .buttons {
    width: 200px;
  }
  .showMenu {
    position: absolute;
    right: 12px;
    z-index: 100;
  }
</style>