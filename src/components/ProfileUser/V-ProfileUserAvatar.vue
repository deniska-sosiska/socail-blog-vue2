<template>
  <v-col cols="12" md="5">
    <v-hover v-slot:default="{ hover }">
      <v-img 
        :src="avatarUrl()"
        class="avatar"
      >
        <v-expand-transition v-if="accountID === user._id"> 
          <div
            v-if="hover"
            class="hover d-flex transition-fast-in-fast-out light-blue v-card--reveal display-2"            
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

<style scoped>
  .avatar {
    width: 100%;
    height: 400px;
  }
  .hover {
    height: 20%;
  }


  @media (max-width: 1264px) {
    .hover {
      height: 35%;
    }
  }

  @media (max-width: 495px) {
    .avatar {
      height: 220px;
    }
    .hover {
      height: 55%;
    }
  }
</style>