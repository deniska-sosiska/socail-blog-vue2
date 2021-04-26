<template>
  <v-col cols="10">

    <!-- <VuePreLoader v-show="loadingContent" /> -->
    <div class="posts" v-show="!loadingContent">
      <v-card v-for="(post, i) in posts" :key="i"
        max-width="90vw"
        class="mx-auto card"
      >
      <VuePost :postID="post._id" />
      </v-card>
    </div>
  </v-col>
</template>

<script>
  import VuePost from "@/components/V-Post"
  import { mapActions, mapGetters } from "vuex"

  export default {
    name: "VuePosts",

    components: {
      VuePost
    },

    computed: mapGetters(['posts', 'loadingContent']),

    created() {
      this.fetchAllPosts()
    },

    methods: {
      ...mapActions(['fetchAllPosts']),
    }
  }
</script>