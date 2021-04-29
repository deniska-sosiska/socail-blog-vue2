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
        :id="hideBlock ? 'hideBlock' : '' "
        class="inputs"
      >
        <v-text-field
          v-model.trim="userAnswer"
          type="text"
          :label="nameInput"
          :placeholder="placeholder"
          class="textFiled"
        ></v-text-field>
        <div class="inputsButtons">
          <v-btn
            @click="actions()"
          >OK
          </v-btn>
          <v-btn
           @click="hideBlock = true"
          >Cansel
          </v-btn>
        </div>
      </div>

      <div class="buttons">
        <v-btn
          color="blue lighten-2"
          dark
          @click="changeNameBtn()"
        > Change name </v-btn>
        <v-btn
          color="blue lighten-2"
          dark
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
      hideBlock: true,

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
            this.hideBlock = true
          }

        } else { //if delete account
          if (this.userAnswer == this.arrayPlaceholder[1]) {
            await axiosApiInstance({
              url: `/users/${this.user._id}`,
              method: "delete"
            })

            this.$router.push({ name: "Posts" })
            this.clearCurrentAccountData()
            this.hideBlock = true
          }
          else {
            alert('You must type: "' + this.arrayPlaceholder[1] + '" for delete account')
          }
        }
      },

      changeNameBtn() {
        this.placeholder = this.arrayPlaceholder[0]
        this.nameInput = this.arrayNameInput[0]
        this.hideBlock = false
        this.userAnswer = ''
      },
      deleteUserBtn() {
        this.placeholder = 'type: "' + this.arrayPlaceholder[1] + '" for delete'
        this.nameInput = this.arrayNameInput[1]
        this.hideBlock = false
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
  }
  .actions > .buttons,
  .actions > .inputs {
    width: 100%;
  }
  .actions > .inputs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 10px;
  }
  .actions > .inputs  button {
    margin-left: 10px
  }


  .actions > .buttons {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .actions > .buttons button {
    min-width: 45%;
    margin-bottom: 10px;
  }

  .textFiled {
    padding-top: 0px;
  }

  @media (max-width: 1264px) {
    .inputsButtons {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
    }
    .actions > .inputs  button {
      width: 48%;
      margin-left: 0px 
    }
    .actions > .buttons button {
      width: 100%;
      margin-bottom: 10px;
    }
  }
  @media (max-width: 420px) {
    .infoColumn #name {
      font-size: 26px;
    }
    .additionalContent p {
      font-size: 16px;
    }
  }

  #hideBlock {
    display: none;
  }

</style>