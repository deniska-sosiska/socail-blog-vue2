<template>
  <v-row
    v-if="accountID === userID"
    class="profile"
  >
    <v-col cols="12">
      <v-btn 
        width="100%"
        color="blue lighten-1"
        @click="showForm = true"        
      >
        want to create new post?
      </v-btn>

      <v-form
        v-if="showForm"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="title"
          :counter="counter"
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

        <v-select
          v-model="description"
          :rules="[v => !!v || 'Item is required']"
          label="Description"
          required
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-btn
          :disabled="!valid"
          color="blue lighten-1"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>

        <v-btn
          color="blue lighten-1"
          class="mr-4"
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
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: "VueCreatePost",

    props: {
      userID: {
        type: String,
      }
    },

    data: () => ({
      showForm: false,
      valid: true,

      counter: 20,
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 20) || `Title must be less than ${20} characters.`,
      ],


      fullText: '',
      fullTextRules: [
        v => !!v || 'Full text is required',
        v => (v && v.length >= 20) || `Title must be more than ${20} characters.`,
      ],


      select: null,
      description: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    computed: {
      accountID() {
        return this.$store.getters.accountData._id
      }
    },

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

      hideForm() {
        this.showForm = false
      }
    },
  }
</script>