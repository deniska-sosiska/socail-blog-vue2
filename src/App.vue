<template>
  <v-app id="inspire">
    <VueHeader />

    <v-main class="grey lighten-3" :class=" showLinks ? 'overflow-hidden' : '' ">
      <v-container class="myContainer">
        <v-row>

          <VueLinksColumnn  />

          <router-view v-show="!loadingMainPage"></router-view>
          <VuePreLoader v-show="loadingMainPage" />

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import VueHeader from "./components/V-Header"
  import VueLinksColumnn from "./components/V-LinksColumn"

  import { mapGetters, mapActions } from "vuex"

  export default {
    name: "App",
    components: {
      VueHeader,
      VueLinksColumnn
    },

    computed: mapGetters(['loadingMainPage', 'showLinks']),

    created() {
      localStorage.removeItem("accountData")
      const token = localStorage.token ? localStorage.token : ''

      if (token)
        this.getAccountDataByToken(token)
    },

    methods: mapActions(['getAccountDataByToken'])
    
  }
</script>

<style >
  @font-face {
    font-family: 'Comfortaa';
    src:url('./assets/Comfortaa-Regular.ttf');
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #2c3e50;
    font-family: "Comfortaa";
    letter-spacing: 0;
  }
  .card {
    margin-bottom: 30px;
  }
  .links {
    width: 100%;
    height: 100%;
    text-decoration: none;
  }
  a {
    text-decoration: none;
  }
</style>