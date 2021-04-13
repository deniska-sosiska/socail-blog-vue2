<template>
   <v-col>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="name"
        :counter="25"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
    </v-form>
   </v-col>
</template>

<script>
  export default {
    data: () => ({
      cuontLetters: 25,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || `Name must be less than ${this.cuontLetters} characters`,
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }) 
  }
</script>