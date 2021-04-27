<template>
  <v-col cols="10">
    <VueBackRoute />
    <v-sheet>
      <VuePost 
        :postID="postID"
        :showMoreTflag="true"
      />
    </v-sheet>
  </v-col> 
</template>

<script>
  import VueBackRoute from "@/components/V-BackRoute"
  import VuePost from "@/components/V-Post"
  // setLikePost

  export default {
    name: "VueShowPost",

    props: {
      postID: {
        type: String
      }
    },

    components: {
      VuePost,
      VueBackRoute
    }
    
  }
</script>