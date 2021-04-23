<template>
  <div class="post">
    <v-list-item>
      <v-list-item-avatar 
        v-if="deletedUser"
        color="grey"
        size="32"
      >
      </v-list-item-avatar>
      <VueAvatar 
        :userAvatar="user.avatar"
        v-else
      />

      <v-list-item-content>
        <v-list-item-title class="headline">{{ post.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="194"
    ></v-img>

    <v-card-text>
      {{ post.description }}
    </v-card-text>

    <v-card-actions>

      <div class="buttons">
        <router-link
          :to="'/users'"
          class="links"
        > 
          <v-btn
            text
            color="blue lighten-1"
          >Show more
          </v-btn>
        </router-link>

        <router-link :to='{ name: "Profile", params: { userID: user._id }}'>
          <v-btn
            text
            color="blue lighten-1"
          >
            Show Author
          </v-btn>
        </router-link>
      </div>
      
      <v-spacer></v-spacer>
      <v-btn icon>
        {{fullPost.likes && fullPost.likes.length}}<v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
  import { getUserByID, getPostByID } from "@/services/posts.service"
  import VueAvatar from "@/components/V-Avatar"

  export default {
    name: "VuePost",

    props: {
      post: {
        type: Object,
        default: () => ({}),
      }
    },

    components: {
      VueAvatar,
    },

    data: () => ({
      user: {},
      fullPost: {}
    }),

    computed: {
      deletedUser() {
        return (this.post.postedBy.name === 'deleted')
      }
    },

    async created() {
      this.fullPost = await getPostByID({ postID: this.post._id })
      this.user = await getUserByID({ userID: this.post.postedBy})
    }
  }
</script>