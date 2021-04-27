<template>
  <v-col cols="10">
    
    <VueBackRoute v-if="accountID !== userID"/>
    <v-sheet v-show="!localLoader">

      <v-row class="profile">
        <ProfileUserAvatar :user="userThatIShow" :accountID="accountID" />
        <ProfileUserInfo :user="userThatIShow" :accountID="accountID" />
      </v-row>

      <v-divider class="my-0"></v-divider>


      <v-row
        v-if="accountID === userID"
        class="profile"
      >
        <v-btn 
          width="100%"
          color="blue lighten-1"
          @click="showForm = true"        
        >
          want to create new post?
        </v-btn>
        <VueCreatePost
          v-if="accountID == userID"
          :userID="userID"
          :showForm="showForm"
          @hide-form="showForm = false"
          @updateUsersPosts="updateUsersPosts()"
        />
      </v-row>
      
    </v-sheet>

      <v-card v-for="(post, i) in postsUser" :key="i"
        max-width="90vw"
        class="mt-6 card"
      >
        <VuePost 
          :key="post._id"
          :postID="post._id"
          :showProfileTflag="true"
        />
      </v-card>

  </v-col>
</template>

<script>
  import ProfileUserAvatar from "@/components/ProfileUser/V-ProfileUserAvatar"
  import ProfileUserInfo from "@/components/ProfileUser/V-ProfileUserInfo"
  import VueCreatePost from "@/components/ProfileUser/V-CreatePost"
  import VueBackRoute from "@/components/V-BackRoute"
  import VuePost from "@/components/V-Post"


  import { getUserByID } from "@/services/posts.service"
  // import axiosApiInstance from "@/services/axiosApiInstance"
  import { mapGetters, mapActions } from "vuex"


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
      VueCreatePost,
      VueBackRoute,
      VuePost
    },

    data: () => ({
      userData: {},
      showForm: false,
      localLoader: true
    }),

    watch: {
      async $route(to) {
        this.localLoader = true
        this.userData = await getUserByID({ userID: to.params.userID })
        this.fetchAllPosts({ userID: this.userID, limit: 0 })
        this.localLoader = false
      }
    },

    computed: {
      userThatIShow() {
        if (this.accountID != this.userID) 
          return this.userData
        return this.accountData
      },

      accountID() {
        return this.$store.getters.accountData._id
      },

      postsUser() {
        let array = []
        this.posts.forEach(elem => {
          if (elem.postedBy === this.userID)
            array.push(elem)
        })
        return array
      },

      ...mapGetters(['accountData', 'posts'])
    },

    async created() {
      this.userData = await getUserByID({ userID: this.userID })
      this.fetchAllPosts({ postedBy: this.userThatIShow._id, limit: 0 })
      this.localLoader = false
    },

    methods: {
      ...mapActions(['fetchAllPosts']),
      
      updateUsersPosts() {
        this.localLoader = true
        this.fetchAllPosts({ postedBy: this.userThatIShow._id, limit: 0 })
        this.localLoader = false
      }
    }
  }
</script>

<style scoped>
  .profile {
    padding: 20px;
    margin: 0px;
  }
  .posts {
    padding: 20px;
  }
</style>