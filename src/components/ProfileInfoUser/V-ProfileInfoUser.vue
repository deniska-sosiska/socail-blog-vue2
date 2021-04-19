<template>
   <v-row>

    <ProfileInfoUserAvatar :userData="userData"/>

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
          <p v-for="i in 4" :key="i">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, exercitationem?</p>
        </v-list-item-content>
        
      </v-list-item>

    </v-col>
  </v-row>
</template>

<script>
  import ProfileInfoUserAvatar from "./V-ProfileInfoUserAvatar"
  import { parseTime } from "@/services/time.service"


  export default {
    name: "VueProfileInfoUser",

    components: {
      ProfileInfoUserAvatar
    },

    computed: {
      userData() {
        const data = this.$store.getters.userData 
        //решает ошибку в консоле при перезагрузке сайта, больше ничего полезного
        return (data === null) ? { dateCreated: new Date() } : data
      },
    },

    methods: {
      getTimeCreated: (timestamp) => parseTime(new Date(timestamp)),
    }
  }
</script>

<style scoped>
  .infoColumn #name {
    font-size: 40px;
    margin-bottom: 0px;
  }
  .infoColumn .headline {
    line-height: 42px;
  }
</style>