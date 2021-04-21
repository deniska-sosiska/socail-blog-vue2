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
    
    <p
      class="errMess"
      :class="errorMessageFlag ? 'active': '' "
    >{{ errorMessage }}</p>

    <div class="buttons">
      <v-btn
        @click="registrationORauthorization()"
      >Submit</v-btn>

      <v-btn
        @click="resetForm()"
      >Reset form</v-btn>

      <v-btn
        @click="$router.push({ name: 'Posts' })" 
      >Cansel</v-btn>
    </div>

  </v-form>
</template>

<script>
  import { mapActions } from 'vuex'
  import axiosApiInstance from "@/services/axiosApiInstance"

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
      errorMessage: '',
      errorMessageFlag: false,
      defaultErr: "All fields must be filled",

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
        if (this.nameForm == "Sign In") {
          (!this.email || !this.password) ?  
            this.showError(this.defaultErr)
            : this.authorization()
        }
        else if (this.nameForm == "Sign Up") {
          (!this.login || !this.email || !this.password) ?
            this.showError(this.defaultErr)
            : this.registration()
        }
      },

      async authorization() {
        try {
          const res = await axiosApiInstance({
            url: `/auth`,
            data: { 
              email: this.email,
              password: this.password
            },
            method: "POST"
          })

          await this.getAccountDataByToken(res.token)
          this.$router.push({ name: "Posts" })

          this.resetForm()
        }
        catch(err) {
          console.error('Error in: components/V-Form/authorization(): ', err)
          this.showError(err.errorMessage)
        }
      },

      async registration() {
        try {
          await axiosApiInstance({
            url: `/users`,
            data: {
              name: this.login,
              email: this.email,
              password: this.password
            },
            method: "post"
          })

          const resAuth = await axiosApiInstance({
            url: `/auth`,
            data: { 
              email: this.email,
              password: this.password
            },
            method: "POST"
          })

          this.getAccountDataByToken(resAuth.token)
          this.$router.push({ name: "Posts" })

          this.resetForm()
        }
        catch(err) {
          console.error('Error in: components/V-Form/registration(): ', err)
          this.showError(err.errorMessage)
        }
      },
      
      showError(err) {
        this.errorMessage = err
        this.errorMessageFlag = true
        
        setTimeout(() => {
          this.errorMessageFlag = false
        }, 3200);
      },

      resetForm() {
        this.login = this.password = this.email = ''
      },
      ...mapActions(['getAccountDataByToken'])
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
    margin-left: 25px;
  }

  .errMess {
    height: 25px;
    visibility: hidden;
    color: red;
    text-align: center;
  }
  .errMess.active {
    visibility: visible;
  }
</style>