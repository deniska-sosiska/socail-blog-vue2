<template>
  <v-col cols="5">
    <v-hover v-slot:default="{ hover }">
      <v-img 
        :src="userData.avatar ? serverUrl(userData.avatar) : fallBackSrc"
        width="100%"
        height="380px"
      >
        <v-expand-transition > 
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out light-blue v-card--reveal display-2"
            style="height: 25%"
            
          >

            <VueProfileInfoUserButtons
              :userID="userData._id"
              :fallBackSrc="fallBackSrc"
            />

          </div>
        </v-expand-transition>
      </v-img>
    </v-hover>
  </v-col>
</template>

<script>
  import VueProfileInfoUserButtons from './V-ProfileInfoUserButtons'

  export default {
    name: "",

    components: {
      VueProfileInfoUserButtons
    },

    props: {
      userData: {
        type: Object,
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