<template>
  <v-col cols="12" md="10">
    <v-sheet class="mb-4 pa-4">
        <div class="search">
          <p>Search post: </p>
          <v-responsive max-width="360" class="mx-4">
            <v-text-field
              v-model="search"
              dense
              flat
              hide-details
              rounded
              solo-inverted
            ></v-text-field>
          </v-responsive>
        </div>
    </v-sheet>

     <v-sheet class="mb-4 pa-0">
       <div class="pagination">
         <div class="pagination__flex">
           <h5>Limit</h5>
           <div>
              <p
                v-for="(value, i) in limit"
                :key="i"
                @click="setCurrentLimit(value)"
                :class=' currentLimit == value ? "active": "" '
              >
                {{ value === 0 ? 'All' : value }}
              </p>
           </div>
         </div>
         <div class="pagination__flex">
           <h5>Page</h5>
           <div>
              <p 
                v-for="(value, i) in page"
                :key="i"
                @click="setCurrentPage(value)"
                :class=' currentPage == value ? "active": "" '
              >
                {{ value + 1 }}
              </p>
           </div>
         </div>
       </div>
     </v-sheet>
    
    <div class="posts" v-show="!loadingContent">
      <v-card 
        v-for="(post, i) in postsThatIShow" :key="i"
        class="card"
      >
      <VuePost :key="post._id" :postID="post._id" />
      </v-card>
    </div>
  </v-col>
</template>

<script>
  import VuePost from "@/components/V-Post"
  import { mapActions, mapGetters } from "vuex"

  export default {
    name: "VuePosts",

    components: {
      VuePost
    },
    data: () => ({
      search: '',
      limit: [
        5, 10, 0
      ],
      page: [
        0, 1, 2
      ],

      currentLimit: 5,
      currentPage: 0
    }),

    computed: {
      postsThatIShow() {
        if (this.search) {
          return this.posts.filter(elem => elem.title.toUpperCase().includes(this.search.toUpperCase()))
        }
        return this.posts
      },
      ...mapGetters(['posts', 'loadingContent']),
    },

    created() {
      this.fetchAllPosts({ limit: this.currentLimit })
    },

    methods: {
      setCurrentLimit(value) {
        this.currentLimit = value
        this.pagination()
      },
      setCurrentPage(value) {
        this.currentPage = value
        this.pagination()
      },

      pagination() {
        this.fetchAllPosts({ 
          limit: this.currentLimit,
          skip: this.currentPage * this.currentLimit
        })
      },
      ...mapActions(['fetchAllPosts']),
    }
  }
</script>

<style scoped>
  .search {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex: 1 0 100%;
    align-items: center;
  } 
  .search p {
    margin: 0px;
  }
  @media (max-width: 452px) {
    .search p {
      margin-bottom: 12px;
    }
  }

  .pagination {
    height: 70px;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    user-select: none;
  }
  .pagination p {
    margin: 0px 5px;
  }
  .pagination p:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .pagination__flex {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .pagination__flex > div {
    display: flex;
  }
  .pagination__flex p.active {
    color: #64b2f6
  }
</style>