<template>
  <v-form
    ref="form"
    v-model="valid"
  >
    <p class="nameForm">{{ nameForm }}</p>

    <v-text-field
      v-if="nameForm == 'Sign Up'"
      v-model="login"
      :counter="countLetters"
      :rules="loginRules"
      label="Login"
      required
      placeholder="What is your login?"
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      placeholder="What is your E-mail?"
      required
    ></v-text-field>

    <v-text-field
    type="password"
      v-model="password"
      label="Password"
      placeholder="Your password"
      required
    ></v-text-field>

    <div class="buttons">
      <v-btn
        @click="registrationORauthorization()"
      >Submit</v-btn>

      <v-btn
        @click="login = password = email = ''"
      >Reset form</v-btn>

      <v-btn
        @click="$router.push({ name: 'Posts' })" 
      >Cansel</v-btn>
    </div>

  </v-form>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "VueForm",

    props: {
      nameForm: {
        type: String,
        Default: "Sign In"
      }
    },

    data: () => ({
      login: '',
      password: 'deniska3',
      email: 'denchikarabik@gmail.com',

      countLetters: 25,
      valid: true,

      loginRules: [
        v => !!v || 'Login is required',
        // v => (v && v.length <= 10) || `Login must be less than ${this.countLetters} characters`,
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }),

    methods: {
      registrationORauthorization() {
        if (this.nameForm == "Sign In") this.authorization()
        else if (this.nameForm == "Sign Up") this.registration()
        else console.error('Error in "registrationORauthorization": ' + 'unknown props: ' + this.nameForm)
      },

      authorization() {
        this.createCurrentUser({
          email: this.email,
          password: this.password
        })
      },

      registration() {
        this.createNewUser({
          name: this.login,
          email: this.email,
          password: this.password
        })
      },

      ...mapActions(['createCurrentUser', 'createNewUser'])
    }
  }
</script>

<style scoped>
  form {
    padding: 10px 50px;
  }
  .nameForm {
    text-align: center;
    font-size: 28px;
    margin: 10px 0px;
    outline: none;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
  button {
    margin: 25px 0px 0px 25px;
  }
</style>