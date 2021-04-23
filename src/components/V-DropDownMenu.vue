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
            <p>Name: {{ accountData.name }}</p>
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
      accountData() {
        return this.$store.getters.accountData
      },
     
    },
    methods: {
      clearUser() {
        this.$store.commit("clearCurrentAccountData")
        if (this.$route.path != '/') 
          this.$router.push({ name: "Posts" })
      },
      routerPush() {
        // if (this.$route.name != 'Profile') 
          this.$router.push({ name: "Profile", params: { userID: this.accountData._id } }).catch(() => {})
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