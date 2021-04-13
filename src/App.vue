<template>
  <v-app id="inspire">
    <VueHeader />

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>

          <VueFirstColumn />
          <router-view></router-view>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import VueHeader from "./components/V-Header"
  import VueFirstColumn from "./components/V-First-Column"

  export default {
    name: "App",
    components: {
      VueHeader,
      VueFirstColumn
    },

    data: () => ({
      //
    })
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