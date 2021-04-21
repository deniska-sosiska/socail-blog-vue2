<template>
  <v-col>
    <v-card
      v-for="(user, index) in userList"
      :key="index"
      max-width="90vw"
      class="mx-auto card"
    >
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
        <v-btn text color="blue lighten-1"> Show more </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
  import VueAvatar from "@/components/V-Avatar"
  import axiosApiInstance from "@/services/axiosApiInstance"
  import { mapMutations ,mapGetters } from "vuex"

  import { parseTime } from "@/services/time.service"

  export default {
    name: "VueUsers",

    components: {
      VueAvatar
    },

    computed: {
      ...mapGetters(['userList'])
    },

    methods: {
      ...mapMutations(['setUserList']),
      getTimeCreated: (timestamp) => parseTime(new Date(timestamp)),
    },

    async created() {
      try {
        const res = await axiosApiInstance({
          url: `/users`,
          method: "get"
        })
        this.setUserList(res)
      } catch (err){
        console.error("Error in: Views/V-Users.vue/created(): ", err)
      } finally {
        // commit("isLoaded")
      }
    }
  }
</script>

<style scoped>
  .card {
    display: flex;
  }
</style>
