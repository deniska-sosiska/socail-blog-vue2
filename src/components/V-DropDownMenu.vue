<template>
  <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
      :offset-y="true"
    >
      <!-- :open-on-hover="true" -->

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
        >
          Menu
        </v-btn>
      </template>

      <v-list>

        <v-list-item>
          <button @click="routerPush()">
            <p>Name: {{ name }}</p>
          </button>
        </v-list-item>

        <v-list-item>
          <button @click="clearUser()">
            <p>Sign Out</p>
          </button>
        </v-list-item>

      </v-list>
    </v-menu>
</template>

<script>
  export default {
    name: "VueDropDowmMenu",

    computed: {
      name() {
        return this.$store.getters.accountData.name
      }
    },
    methods: {
      clearUser() {
        this.$store.commit("clearCurrentAccountData")
        if (this.$router.currentRoute.path != '/') 
          this.$router.push({ name: "Posts" })
      },
      routerPush() {
        if (this.$router.currentRoute.path != '/profile') 
          this.$router.push({ name: "Profile" })
      }
    }
  }
</script>

<style scoped>
  button {
    width: 100%;
    text-align: start;
  }
  .button {
    background-color: #BBDEFB;
  }
</style>