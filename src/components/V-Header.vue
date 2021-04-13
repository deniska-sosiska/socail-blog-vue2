<template>
  <v-app-bar
    app
    color="blue lighten-2"
    flat
  >
    <v-container class="py-0 justify-sm-space-between fill-height">
      <v-avatar
        class="mr-10"
        color="grey darken-1"
        size="32"
      ></v-avatar>

      <v-responsive max-width="360">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </v-responsive>

      <v-btn
        @click="push()"
      >
        Sign In/Sign Up
      </v-btn>

    </v-container>
  </v-app-bar>
</template>

<script>
  export default {
    methods: {
      push() {
        this.$router.push({ name: 'PageAuthorization' })
      }
    }
  }
</script>