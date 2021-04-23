<template>
  <v-col cols="10">
      <VueBackRoute v-if="accountID !== userID"/>
    
    <v-sheet>

      <v-row class="profile" v-show="!loadingContent">
        <ProfileUserAvatar :user="userThatIShow" :accountID="accountID" />
        <ProfileUserInfo :user="userThatIShow" :accountID="accountID" />
      </v-row>

    </v-sheet>
  </v-col>
</template>

<script>
  import ProfileUserAvatar from "@/components/ProfileUser/V-ProfileUserAvatar"
  import ProfileUserInfo from "@/components/ProfileUser/V-ProfileUserInfo"
  import VueBackRoute from "@/components/V-BackRoute"

  import { getUserByID } from "@/services/posts.service"
  // import axiosApiInstance from "@/services/axiosApiInstance"
  import { mapGetters, mapMutations } from "vuex"


  export default {
    name: "VueProfile",

    props: {
      userID: {
        type: String,
      }
    },

    components: {
      ProfileUserAvatar,
      ProfileUserInfo,
      VueBackRoute
    },

    data: () => ({
      userData: {}
    }),

    watch: {
      async $route(to) {
        this.isLoadingContent()
        this.userData = await getUserByID({ userID: to.params.userID });
        this.isLoadingContent()
      }
    },

    computed: {
      userThatIShow() {
        if (this.accountID != this.userID) {
          return this.userData
        }

        return this.accountData
      },

      accountID() {
        return this.$store.getters.accountData._id
      },

      ...mapGetters(['loadingContent', 'accountData'])
    },

    methods: {
      

      ...mapMutations(['isLoadingContent'])
    },

    async created() {
      this.isLoadingContent()
      this.userData = await getUserByID({ userID: this.userID })
      this.isLoadingContent()
    }
  }
</script>

<style scoped>
  .profile {
    padding: 20px;
    margin: 0px;
  }
</style>