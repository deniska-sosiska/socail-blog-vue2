<template>
  <v-col>
    <v-card 
      v-show="!loadingContent"
      v-for="(user, index) in userList"
      :key="index"
      max-width="90vw"
      class="mx-auto"
    >
      <VueUser :user="user"/>
    </v-card>
    
  </v-col>
</template>

<script>
  import axiosApiInstance from "@/services/axiosApiInstance"

  import VueUser from "@/components/V-User"
  import { mapMutations ,mapGetters } from "vuex"

  export default {
    name: "VueUsers",

    components: {
      VueUser
    },

    computed: mapGetters(['userList', 'loadingContent']),

    methods: mapMutations(['setUserList', 'isLoadingContent']),

    async created() {
      this.isLoadingContent()
      try {
        const res = await axiosApiInstance({
          url: `/users`,
          method: "get"
        })
        this.setUserList(res)
      } catch (err){
        console.error("Error in: Views/V-Users.vue/created(): ", err)
      } finally {
        // setTimeout(() => {
          this.isLoadingContent()
        // }, 200)
      }
    }
  }
</script>

