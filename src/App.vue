<template>
  <v-app id="inspire">
    <VueHeader />

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>

          <VueFirstColumn />

          <router-view v-if="!loading"></router-view>
          <VuePreLoader v-else :color="'#64B5F6'" />

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import VueHeader from "./components/V-Header"
  import VueFirstColumn from "./components/V-First-Column"
  import VuePreLoader from "./components/V-PreLoader"

  export default {
    name: "App",
    components: {
      VueHeader,
      VueFirstColumn,
      VuePreLoader
    },

    data: () => ({
      //
    }),

    computed: {
      loading() {
        return this.$store.getters.loading
      }
    },

    beforeCreate() {
      const token = localStorage.token ? localStorage.token : ''
      if (token) this.$store.dispatch("checkAuthUser", token)

      else {
        this.$store.commit("isLoaded")
        // if (this.$router.currentRoute.path != '/') 
        //   this.$router.push({ name: "Posts" })
      }
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