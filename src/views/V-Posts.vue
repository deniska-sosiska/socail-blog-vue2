<template>
  <v-col cols="12" md="10">
    <v-sheet class="mb-4 pa-4">
        <div class="search d-flex justify-center align-center">
          <p style="margin: 0px;">Search post: </p>
          <v-responsive max-width="360" class="mx-4">
            <v-text-field
                v-model="search"
                dense
                flat
                hide-details
                rounded
                solo-inverted
              ></v-text-field>
          </v-responsive>
        </div>
       
    </v-sheet>
    <div class="posts" v-show="!loadingContent">
      <v-card 
        v-for="(post, i) in postsThatIShow" :key="i"
        class="card"
      >
      <VuePost :key="post._id" :postID="post._id" />
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
    data: () => ({
      search: ''
    }),

    computed: {
      postsThatIShow() {
        if (this.search) {
          return this.posts.filter(elem => elem.title.toUpperCase().includes(this.search.toUpperCase()))
        }
        return this.posts
      },
      ...mapGetters(['posts', 'loadingContent']),
    },

    created() {
      this.fetchAllPosts({ limit: 0 })
    },

    methods: {
      ...mapActions(['fetchAllPosts']),
    }
  }
</script>