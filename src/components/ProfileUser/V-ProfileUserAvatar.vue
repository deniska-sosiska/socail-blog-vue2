<template>
  <v-col cols="5">
    <v-hover v-slot:default="{ hover }">
      <v-img 
        :src="avatarUrl()"
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
            />

          </div>
        </v-expand-transition>
      </v-img>
    </v-hover>
  </v-col>
</template>

<script>
  import VueProfileUserButtons from './V-ProfileUserButtons'
  import createAvatarUrl from "@/services/Avatar.service" 

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

    methods: {
      avatarUrl() {
        return createAvatarUrl({ userAvatar: this.user.avatar })
      }
    }
  }
</script>