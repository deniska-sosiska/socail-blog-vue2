<template>
  <div class="post">
    <v-skeleton-loader
      v-if="localLoader"
      type='list-item-avatar-two-line, image, list-item, actions'
    ></v-skeleton-loader>

    <div 
      v-if="!localLoader"
    >
      <v-list-item>
        <v-list-item-avatar 
          v-if="deletedUser"
          class="mr-4"
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

      <v-row
        class="px-6 pb-3"
      >
        <VueCreatePost
          :showForm="showForm"
          :postID="post._id"
          @hide-form="showForm = false"
          @update-post="updatePost()"
      />
      </v-row>

      <div class="wrapper">

        <div class="buttons">
          <v-menu
            top
            offset-y  
            close-on-click
            :max-width="150"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="blue lighten-2"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Menu
            </v-btn>
          </template>
          
          <v-list style="text-align: center">
            <v-btn
              :to='{ name: "Post", params:{ postID }}'
              :disabled="showMoreTflag"
              text
              color="blue lighten-2"
            >
              Show more
            </v-btn>
            <v-btn
              :to='{ name: "Profile", params: { userID: user._id }}'
              :disabled="deletedUser || showProfileTflag"
              text
              color="blue lighten-2"
            >
              Show Author
            </v-btn>
            <v-btn
              v-if="(accountID == user._id) && (showMoreTflag)"
              text
              @click="showForm = true"
              color="blue lighten-2"
            >
              Update Post
            </v-btn>
            <v-btn
              v-if="(accountID == user._id) && (showMoreTflag)"
              text
              @click="triggerInputClick()"
              color="blue lighten-2"
            >
              Update Image
            </v-btn>
            <input type="file" style="display: none" ref="avatarBtn" accept="image/*" @change="updateImage()">

            <v-btn
              v-if="(accountID == user._id) && (showMoreTflag)"
              text
              @click="deletePost()"
              display="none"
              color="blue lighten-2"
            >
              Delete Post
            </v-btn>
          </v-list>
        </v-menu>
        </div>
        
        <div class="icons">
          <v-btn 
            @click="setLike()"
            icon
            color="red"
          >
            {{ post.likes.length + 7 }} 
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn 
            @click="copyPath()"
            v-if="$route.name == 'Post' "
            icon
            color="blue lighten-2"
          >
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axiosApiInstance from "@/services/axiosApiInstance"
  import { getUserByID, getPostByID, setLikePost } from "@/services/posts.service"

  import VueCreatePost from "@/components/ProfileUser/V-CreatePost"
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
      VueCreatePost
    },

    data: () => ({
      user: {},
      post: {},
      localLoader: true,
      showForm: false
    }),

    computed: {
      accountID() {
        return this.$store.getters.accountData._id
      },
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



      triggerInputClick() {
        this.$refs.avatarBtn.click()
      },

      async updatePost() {
        this.localLoader = true
        this.post = await getPostByID({ postID: this.postID })  
        this.localLoader = false
      },


      async updateImage() {
        const bodyFormData = new FormData()
        const file = this.$refs.avatarBtn

        bodyFormData.append('image', file.files[0])
        this.post = await axiosApiInstance({
          url: `/posts/upload/${this.postID}`,
          method: "put",
          data: bodyFormData
        })
      },
      async deletePost() {
        await axiosApiInstance({
          url: `/posts/${this.postID}`,
          method: 'delete'
        })
        this.$router.go(-1)
      },

      async copyPath() {
        await navigator.clipboard.writeText(document.URL);
        alert('Copied!');
      },
    }
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 16px
    /* border: 1px solid */
  }
  .wrapper > .icons {
    align-self: flex-end;
    flex-shrink: 0;
    
    display: flex;
    justify-content: flex-end;
    width: 80px;
    /* border: 1px solid; */
  }
  @media (max-width: 1264px) {
    .wrapper .buttons {
      /* width: 80%; */
      /* border: 1px solid */
    }
  }
</style>