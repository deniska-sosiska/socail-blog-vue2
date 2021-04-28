<template>
  <v-col cols="12" md="7" class="infoColumn">
    <div class="wrapper">
      <div class="nameItem">
        <h2 id="name">{{ user.name }}</h2>
        <p> {{ getTimeCreated(user.dateCreated) }} </p>
      </div>

      <v-divider></v-divider>

      <div class="additionalContent">
        <p>City: Zaporizhzhia</p>
        <p>Work: Developer</p>
        <p>Phone: +380631241251</p>
        <p>Email: {{ user.email }}</p>
      </div>
    </div>

    <div class="actions" v-if="accountID === user._id">
      <div
        :class="!visibility ? 'visibility' : '' "
        class="inputs"
      >
        <v-text-field
          v-model.trim="userAnswer"
          type="text"
          :label="nameInput"
          :placeholder="placeholder"
          class="textFiled"
        ></v-text-field>
        <v-btn @click="actions()"
        > OK </v-btn>
        <v-btn @click="visibility = false"
        > Cansel </v-btn>
      </div>

      <div class="buttons">
        <v-btn
          @click="changeNameBtn()"
        > Change name </v-btn>
        <v-btn
          @click="deleteUserBtn()"
        > Delete my account </v-btn>
      </div>
    </div>

  </v-col>
</template>

<script>
  import axiosApiInstance from "@/services/axiosApiInstance"

  import { mapMutations } from "vuex"
  import { parseTime } from "@/services/time.service"



  export default {
    name: "VueProfileUserInfo",

    props: {
      user: {
        type: Object
      },
      accountID: {
        type: String
      }
    },
    
    data: () => ({
      userAnswer: "",
      placeholder: "",
      nameInput: "",
      visibility: false,

      arrayNameInput: [
        "Name",
        "Delete"
      ],
      arrayPlaceholder: [
        "what is your new Name",
        "delete my account"
      ]
    }),

    methods: {
      ...mapMutations(['setCurrentAccountData', 'clearCurrentAccountData']),
      async actions() {
        if (this.nameInput == this.arrayNameInput[0]) { //if change name
          if (this.userAnswer) {
            const res = await axiosApiInstance({
              url: `/users/${this.user._id}`,
              data: { name: this.userAnswer },
              method: "patch"
            })
            this.setCurrentAccountData(res)
            this.visibility = false
          }

        } else { //if delete account
          if (this.userAnswer == this.arrayPlaceholder[1]) {
            await axiosApiInstance({
              url: `/users/${this.user._id}`,
              method: "delete"
            })

            this.$router.push({ name: "Posts" })
            this.clearCurrentAccountData()
            this.visibility = false
          }
          else {
            alert('You must type: "' + this.arrayPlaceholder[1] + '" for delete account')
          }
        }
      },

      changeNameBtn() {
        this.placeholder = this.arrayPlaceholder[0]
        this.nameInput = this.arrayNameInput[0]
        this.visibility = true
        this.userAnswer = ''
      },
      deleteUserBtn() {
        this.placeholder = 'type: "' + this.arrayPlaceholder[1] + '" for delete'
        this.nameInput = this.arrayNameInput[1]
        this.visibility = true
        this.userAnswer = ''
      },

      getTimeCreated: (timestamp) => {
        try { return parseTime(new Date(timestamp)) }
        catch(err) { return parseTime(new Date()) }
      },
    }
  }
</script>

<style scoped>
  .infoColumn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .infoColumn #name {
    font-size: 28px;
  }
  .additionalContent > p {
    font-size: 20px;
    margin: 10px 0px;
    word-wrap: break-word;
  }
  .nameItem {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
  }



  .actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* padding: 0px 14px; */
  }
  .actions > .buttons,
  .actions > .inputs {
    width: 100%;
    /* margin: 0 auto; */
  }
  .actions > .inputs {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .actions > .buttons {
    display: flex;
    justify-content: space-between;
  }

  .textFiled {
    padding-top: 0px;
    max-width: 300px
  }
  .visibility {
    visibility: hidden
  }
</style>