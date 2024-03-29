<template>
  <v-col cols="12" v-if="showForm">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="title"
        :rules="titleRules"
        label="Title"
        required
      ></v-text-field>

      <v-text-field
        v-model="fullText"
        :rules="fullTextRules"
        label="Full text"
        required
      ></v-text-field>

      <v-text-field
        v-model="description"
        :rules="[v => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>
      <div class="buttons d-flex justify-end flex-wrap">
          <v-btn
            :disabled="!valid"
            color="blue lighten-2"
            @click="validate"
          >
            Submit
          </v-btn>

          <v-btn
            color="blue lighten-2"
            @click="reset"
          >
            Reset Form
          </v-btn>

          <v-btn
            color="blue lighten-2"
            @click="hideForm()"
          >
            Cancel
          </v-btn>
      </div>
    </v-form>
  </v-col>
</template>

<script>
  import axiosApiInstance from "@/services/axiosApiInstance"

  export default {
    name: "VueCreatePost",

    props: {
      userID: {
        type: String,
      },
      showForm: {
        type: Boolean,
        default: false
      },
      postID: {
        type: String,
        default: ""
      }
    },

    data: () => ({
      valid: true,

      counter: 5,
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length >= 5) || `Title must be more than ${5} characters.`,
      ],


      fullText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis aliquid molestiae quos atque ipsam nobis eos nulla quaerat temporibus voluptates error tenetur, repellendus accusantium libero saepe nihil placeat. Tempora, corporis.',
      fullTextRules: [
        v => !!v || 'Full text is required',
        v => (v && v.length >= 20) || `Title must be more than ${20} characters.`,
      ],

      description: ''
    }),

    computed: {
      accountID() {
        return this.$store.getters.accountData._id
      }
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.submit()
        } 
      },
      reset () {
        this.$refs.form.reset()
      },

      hideForm() {
        this.reset()
        this.$emit("hide-form")
      },

      async submit() {
        if (this.postID) {
          try {
            await axiosApiInstance({
              url: `/posts/${this.postID}`,
              method: 'patch',
              data: {
                title: this.title,
                fullText: this.fullText,
                description: this.description
              }
            })
            this.hideForm()
            this.$emit("update-post")
            this.$emit("update-users-posts")
          } catch(err) {
            alert('Problem: "' + err.errorMessage + '"')
            this.hideForm()
          }
        }
        else {
          try {
            await axiosApiInstance({
              url: '/posts',
              method: 'post',
              data: {
                title: this.title,
                fullText: this.fullText,
                description: this.description
              }
            })
            this.hideForm()
            this.$emit("update-users-posts")
          } catch(err) {
            alert('Problem: "' + err.errorMessage + '"')
            this.hideForm()
          }
        }


      }
    },
  }
</script>

<style scoped>
  .buttons > button {
    margin-left: 15px;
    color: #fff;
    
  }
  @media (max-width: 480px) {
    .buttons > button {
      flex-basis: 100%;
      margin: 5px 0px;
    }
  }
</style>