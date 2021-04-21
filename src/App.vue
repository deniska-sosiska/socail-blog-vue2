<template>
  <v-app id="inspire">
    <VueHeader />

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>

          <VueFirstColumn  />

          <router-view v-if="!loading"></router-view>
          <VuePreLoader v-else />

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import VueHeader from "./components/V-Header"
  import VueFirstColumn from "./components/V-FirstColumn"

  import { mapGetters, mapActions } from "vuex"

  export default {
    name: "App",
    components: {
      VueHeader,
      VueFirstColumn
    },

    computed: {
      ...mapGetters(['loading'])
    },

    created() {
      localStorage.removeItem("accountData")
      const token = localStorage.token ? localStorage.token : ''

      if (token) {
        this.checkAuthUser(token)
      } else {
        if (this.$router.currentRoute.name != "Posts") 
          this.$router.push({ name: "Posts" })
      }
    },

    methods: {
      ...mapActions(['checkAuthUser'])
    }
  };
</script>

<style >
  .card {
    margin-bottom: 30px;
  }
  .links {
    width: 100%;
    height: 100%;
    text-decoration: none;
  }
</style>