<template>
  <v-col 
    cols="12" md="2"
    class="d-none d-md-block showLinks"
    :class="showLinks ? 'd-block' : 'd-none'"
  >
    <v-sheet>
      <v-list>
        <v-list-item
          v-for="(item, index) in li"
          :key="index"
          class="pa-0"
          @click="closeMenu()"
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

        <!-- ====================================  -->

        <v-list-item
          class="pa-0 d-md-none"
          v-if="!accountID"
        >
          <div 
            @click="routerPushAuthorization()"
            class="links"
          >
            <v-list-item-content>
              <v-list-item-title>
                Sign In
              </v-list-item-title>
            </v-list-item-content>
          </div>
          
        </v-list-item>

        <v-list-item
          class="pa-0 d-block"
        >
          <div
            @click="routerPushProfile()"
            class="links"
          >
            <v-list-item-content>
              <v-list-item-title>
                Profile
              </v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>

        <v-list-item
          class="pa-0 d-md-none"
          v-if="accountID"
        >
          <div 
            @click="clearUser()"
            class="links"
          >
            <v-list-item-content>
              <v-list-item-title>
                Sign Out
              </v-list-item-title>
            </v-list-item-content>
          </div>
          
        </v-list-item>

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
        return this.$store.getters.accountData._id
      },
      showLinks(){ 
        return this.$store.getters.showLinks
      }
    },

    methods: {
      routerPushProfile(){
        this.closeMenu()
        this.$router.push({ name: "Profile", params: { userID: this.accountID } }).catch(()=>{})
      },
      routerPushAuthorization() {
        this.closeMenu()
        this.$router.push({ name: 'Authorization', params: { flag: false } }).catch(()=>{})
      },
      clearUser() {
        this.closeMenu()
        this.$store.commit("clearCurrentAccountData")
        this.$router.push({ name: "Posts" }).catch(() => {})
      },

      closeMenu() {
        this.$store.commit("isShowLinks")
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
    color: white;
    cursor: pointer;
  }
  .links.active {
    background: #64B5F6;
    color: white
  }
  @media (max-width: 960px) {
    .showLinks {
      position: fixed;
      z-index: 10;
      min-height: 100vh;
      padding: 0;
    }
    .showLinks > div {
      height: 100vh;
    }
  }
</style>