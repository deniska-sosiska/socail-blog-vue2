<template>
  <v-col cols="5">
    <v-hover v-slot:default="{ hover }">
      <v-img 
        :src="user.avatar ? serverUrl(user.avatar) : fallBackSrc"
        width="100%"
        height="380px"
      >
        <v-expand-transition v-if="accountID === user._id"> 
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out light-blue v-card--reveal display-2"
            style="height: 25%"
            
          >

            <VueProfileUserButtons
              :userID="user._id"
              :fallBackSrc="fallBackSrc"
            />

          </div>
        </v-expand-transition>
      </v-img>
    </v-hover>
  </v-col>
</template>

<script>
  import VueProfileUserButtons from './V-ProfileUserButtons'

  export default {
    name: "ProfileUserAvatar",

    components: {
      VueProfileUserButtons
    },

    props: {
      user: {
        type: Object,
      },
      accountID: {
        type: String
      }
    },

    data: () => ({
      fallBackSrc: "https://agile.yakubovsky.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
    }),

    methods: {
      serverUrl: (url) =>  process.env.VUE_APP_API_URL+ url,
    }
  }
</script>