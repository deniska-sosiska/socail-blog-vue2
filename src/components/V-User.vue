<template>
  <div class="card">
    <v-list-item>
      <VueAvatar :userAvatar="user.avatar" />
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ user.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ getTimeCreated(user.dateCreated) }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ user.email }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <router-link :to='{ name: "Profile", params: { userID: user._id } }'>
        <v-btn text color="blue lighten-1"> 
          Show more 
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>
    </v-card-actions>
  </div>
</template>

<script>
  import VueAvatar from "@/components/V-Avatar"
  import { parseTime } from "@/services/time.service"


  export default {
    name: "VueUser",

    props: {
      user: {
        type: Object,
        default: () => ({})
      }
    },

    components: {
      VueAvatar
    },

    methods: {
      getTimeCreated: (timestamp) => parseTime(new Date(timestamp)),
    }

  }
</script>

<style scoped>
  .card {
    display: flex;
  }
</style>
