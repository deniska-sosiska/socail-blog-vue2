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

        <v-list-item-content class="d-none d-sm-block">
          <v-list-item-title class="headline">
            {{ user.email }}
          </v-list-item-title>
        </v-list-item-content>

    <v-card-actions>
      <v-btn
        class="btn"
        :to='{ name: "Profile", params: { userID: user._id } }'
        color="blue lighten-2"
        dark
      > 
        Show more 
      </v-btn>
    </v-card-actions>
    </v-list-item>

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
  .myCard {
    display: flex;
  }
  @media (max-width: 600px) {
    .v-list-item {
      flex-wrap: wrap;
    }
    .v-list-item__content {
      flex: 0 0 80%;
    }
    .v-card__actions {
      width: 100%;

      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    .v-card__actions a {
      width: 100%;
      
    }
  }
</style>
