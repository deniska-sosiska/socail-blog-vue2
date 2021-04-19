<template>
  <v-col>
    <v-card v-for="(user, index) in userList" :key="index"
      max-width="90vw"
      class="mx-auto card"
    >
      <v-list-item>
        <VueAvatar :userAvatar="user.avatar" />
        <v-list-item-content>
          <v-list-item-title class="headline"> {{ user.name }} </v-list-item-title>
          <v-list-item-subtitle> {{ getTimeCreated(user.dateCreated) }} </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title class="headline"> {{ user.email }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn
          text
          color="blue lighten-1"
        >Show more
        </v-btn>
       
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
  import VueAvatar from "@/components/V-Avatar"
  import { parseTime } from "@/services/time.service"

  export default {
    name: "VueUsers",

    components: {
      VueAvatar
    },

    computed: {
      userList() {
        return [this.$store.getters.userData, this.$store.getters.userData]
      }
    },

    methods: {
      getTimeCreated: (timestamp) => parseTime(new Date(timestamp)),
    },

    mounted() {
      // console.log("mounted")

      // this.$store.dispatch("fetchUserList")
    }
  }
</script>

<style scoped>
  .card {
    display: flex;
  }
</style>
