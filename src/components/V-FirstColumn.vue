<template>
  <v-col cols="2">
    <v-sheet rounded="lg">
      <v-list>
        <!-- <v-list-item-group v-model="item" color="primary"> -->
          <v-list-item
            v-for="(item, index) in li"
            :key="index"
            class="pa-0"
          >
            <router-link 
              :to="item.link"
              class="links"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </router-link>

          </v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item
            class="pa-0"
          >
            <div
              @click="routerPush()"
              class="links"
            >
              <v-list-item-content>
                <v-list-item-title>
                  Profile
                </v-list-item-title>
              </v-list-item-content>
            </div>
            
          </v-list-item>
        <!-- </v-list-item-group> -->

      </v-list>
    </v-sheet>
    </v-col>
</template>

<script>

  export default {
    name: "VueMenuColumn",

    data: () => ({
      li: [
        {
          text: 'HomePage',
          link: '/',
        },
        {
          text: 'Users',
          link: '/users',
        }
      ]
    }),

    computed: {
      accountID(){ 
        // console.log(this.$store.getters.accountData._id)
        return this.$store.getters.accountData._id
      }
    },

    methods: {
      routerPush(){
        this.$router.push({ name: "Profile", params: { userID: this.accountID } }).catch(()=>{})
      }
    }
  }
</script>

<style scoped>
  .links {
    color: black;
    padding: 0px 16px;
    outline: none;
  }
  .links:hover {
    background: #64B5F6;
    color: white
  }
  .links.active {
    background: #64B5F6;
    color: white
  }

</style>