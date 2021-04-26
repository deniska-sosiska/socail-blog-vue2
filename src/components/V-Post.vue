<template>
  <div class="post">
    <v-skeleton-loader
      v-if="localLoader"
      type='list-item-avatar-two-line, image, list-item, actions'
    ></v-skeleton-loader>

    <div class="wrapper" 
      v-if="!localLoader"
    >
      <v-list-item>
      <v-list-item-avatar 
        v-if="deletedUser"
        class="mr-10"
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
      :src="imageUrl(post.image)"
      :height="showMoreTflag ? '100%': '204' "
    ></v-img>

    <v-card-text>
      <p> {{ post.description }}</p>
      <p 
        v-if="showMoreTflag"
        class="mb-1"
      >
        {{ post.fullText }}
      </p>
    </v-card-text>

    <v-card-actions>

      <div class="buttons">
        <v-btn
          :to='{ name: "Post", params:{ postID }}'
          :disabled="showMoreTflag"
          text
          color="blue lighten-1"
        >
          Show more
        </v-btn>

        <v-btn
          :to='{ name: "Profile", params: { userID: user._id }}'
          :disabled="deletedUser || showProfileTflag"
          text
          color="blue lighten-1"
        >
          Show Author
        </v-btn>
      </div>
      
      <v-spacer></v-spacer>
      <v-btn icon  @click="setLike()">
        {{post.likes.length}}<v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn 
        @click="copyPath()"
        v-if="$route.name == 'Post' "
        icon
      >
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
    </div>
  </div>
</template>

<script>
  import { getUserByID, getPostByID, setLikePost } from "@/services/posts.service"
  import createAvatarUrl from "@/services/Avatar.service" 
  import VueAvatar from "@/components/V-Avatar"

  export default {
    name: "VuePost",

    props: {
      postID: {
        type: String
      },
      showMoreTflag: {
        type: Boolean,
        default: false
      },
      showProfileTflag: {
        type: Boolean,
        default: false
      }
    },

    components: {
      VueAvatar,
    },

    data: () => ({
      user: {},
      post: {},
      localLoader: true,
    }),

    computed: {
      deletedUser() {
        return (this.user.name === 'User deleted')
      }
    },

    async created() {
      this.post = await getPostByID({ postID: this.postID })  
      this.user = await getUserByID({ userID: this.post.postedBy })
      this.localLoader = false
    },

    methods: {
      async setLike() {
        await setLikePost({ postID: this.postID })
        this.post = await getPostByID({ postID: this.postID })  
      },
      imageUrl(url) {
        return createAvatarUrl({ userAvatar: url, bigImage: true })
      },
      async copyPath() {
        await navigator.clipboard.writeText(document.URL);
        alert('Copied!');
      }
    }
  }
</script>