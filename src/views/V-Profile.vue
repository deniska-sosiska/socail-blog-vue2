<template>
  <v-col cols="10">
    <v-sheet
      class="profile"
    >
      <v-row>
        <v-col cols="5">
          <v-hover v-slot:default="{ hover }">
            <v-img 
              :src="userData.avatar ? serverUrl(userData.avatar) : fallBackSrc"
              width="100%"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out light-blue v-card--reveal display-2"
                  style="height: 20%;"
                >
                  <v-btn>
                    Change
                  </v-btn>
                </div>
              </v-expand-transition>
            </v-img>
          </v-hover>
        </v-col>

       <v-col cols="7" class="infoColumn">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline"><p id="name">{{ userData.name }}</p></v-list-item-title>
              <v-list-item-subtitle> {{ getTimeCreated(userData.dateCreated) }} </v-list-item-subtitle>
            </v-list-item-content>
         </v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">{{ userData.email }}</v-list-item-title>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, exercitationem?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, exercitationem?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, exercitationem?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, exercitationem?</p>
            </v-list-item-content>
            
         </v-list-item>

       </v-col>
      </v-row>
    </v-sheet>
  </v-col>
</template>

<script>
  import { parseTime } from "@/services/time.service"

  export default {
    name: "VueProfile",

    data: () => ({
      fallBackSrc: "https://agile.yakubovsky.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
    }),

    computed: {
      userData() {
        const data = this.$store.getters.userData 
        
        return (data === null) ? { dateCreated: new Date() } : data
      },
    },

    methods: {
      serverUrl: (url) => process.env.VUE_APP_API_URL + url,

      getTimeCreated: (timestamp) => parseTime(new Date(timestamp))
    }
  }
</script>

<style scoped>
  .profile {
    padding: 30px;
  }
  .infoColumn #name {
    font-size: 40px;
  }
  .infoColumn .headline {
    line-height: 42px;
  }
</style>