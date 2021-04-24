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
        const newUrl = this.serverUrl(this.userAvatar)
        return this.userAvatar ? 
          ( this.imageExists(newUrl) ? newUrl : this.fallBackSrc )
          : this.fallBackSrc
        // return this.fallBackSrc
      },
    },

    methods: {
      fallback() { this.onErr = true },

      serverUrl: (url) => process.env.VUE_APP_API_URL + url,

      imageExists(image_url){

        let http = new XMLHttpRequest()
        http.open('HEAD', image_url, false)
        http.send()
        
        return http.status != 404;
      }
    }
  }
</script>