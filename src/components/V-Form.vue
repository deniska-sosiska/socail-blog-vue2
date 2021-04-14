<template>
  <v-form
    ref="form"
    v-model="valid"
  >
    <p class="titleForm">{{ titleForm }}</p>

    <v-text-field
      v-model="login"
      :counter="cuontLetters"
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
      <v-btn>
        Submit
      </v-btn>

      <v-btn
        @click="login = password = email = ''"
      >
        Reset form
      </v-btn>
      <v-btn>
        Cansel
      </v-btn>
    </div>

  </v-form>
</template>

<script>
  export default {
    props: {
      titleForm: {
        type: String,
        Default: "Sign In"
      }
    },
    data: () => ({
      login: '',
      password: '',
      email: '',

      cuontLetters: 25,
      valid: true,

      loginRules: [
        v => !!v || 'Login is required',
        v => (v && v.length <= 10) || `Login must be less than ${this.cuontLetters} characters`,
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }),
    methods: {
      resetForm() {
      }
    }
  }
</script>

<style scoped>
  form {
    padding: 10px 50px;
  }
  .titleForm {
    text-align: center;
    font-size: 28px;
    margin: 10px 0px;
    outline: none;
  }
  .buttons {
    display: flex;
    justify-content: end;
  }
  button {
    margin-left: 25px;
    margin-top: 25px;
  }
</style>