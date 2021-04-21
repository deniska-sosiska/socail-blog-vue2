<template>
  <v-col cols="7" class="infoColumn">
    <v-list-item class="nameItem">
      <v-list-item-content>
        <v-list-item-title class="headline"><p id="name">{{ user.name }}</p></v-list-item-title>
        <v-list-item-subtitle> {{ getTimeCreated(user.dateCreated) }} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="my-2"></v-divider>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">City: Zaporizhzhia</v-list-item-title>
        <v-list-item-title class="headline">Work: Developer</v-list-item-title>
        <v-list-item-title class="headline">Phone: +380631241251</v-list-item-title>
        <v-list-item-title class="headline">Email: {{ user.email }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <div class="actions">
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
  .infoColumn #name {
    font-size: 40px;
    margin-bottom: 0px;
  }
  .infoColumn .headline {
    line-height: 42px;
  }
  .nameItem > .v-list-item__content {
    max-height: 70px;
    padding: 0px;
  }



  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 14px;
  }
  .actions > .buttons,
  .actions > .inputs {
    width: 100%;
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