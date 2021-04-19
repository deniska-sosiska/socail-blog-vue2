<template>
  <v-avatar
    class="mr-10"
    color="grey darken-1"
    size="32"
  >
    <img
      :src="miniAvatarSrc"
      alt="John"
    >
  </v-avatar>
</template>

<script>
  export default {
    name: "VueAvatar",

    props: {
      userAvatar: {
        type:String
      }
    },
       
    data: () => ({
      fallBackSrc: "https://agile.yakubovsky.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
    }),

    computed: {
      miniAvatarSrc() {
        return this.userAvatar ? 
          (this.userAvatar ? this.serverUrl(this.userAvatar) : this.fallBackSrc)
          : this.fallBackSrc
      },
    },

    methods: {
      serverUrl: (url) =>  process.env.VUE_APP_API_URL+ url,
    }
  }
</script>