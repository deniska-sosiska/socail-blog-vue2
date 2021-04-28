<template>
  <v-col cols="12" md="10">
    <div class="message">
      <v-sheet  v-if="flag">
        <p>You must be logged in to access the {{ fromPage }} page.</p>
      </v-sheet>
    </div>

    <v-sheet
      max-width="600px"
      max-height="90vh"
      class="forms"
    >
    <div class="buttons">

      <div
        class="button"
        :class="buttonActive ? 'active' : '' "
        @click="buttonActive = true"
      ><button>Sign In</button>
      </div>

      <div 
        class="button"
        :class="!buttonActive ? 'active' : '' "
        @click="buttonActive = false"
      ><button>Sign Up</button>

      </div>

    </div>

    <VueForm
      v-if="buttonActive"
      nameForm="Sign In"
      :key="1"
    />
    
    <VueForm 
      v-else
      nameForm="Sign Up"
      :key="2"
    />
      
    </v-sheet>
  </v-col>
</template>

<script>
  import VueForm from '@/components/V-Form.vue'

  export default {
    name: "VueAuthorization",

    props: {
      fromPage: { 
        type: String,
        default: "this"
      },
      flag: {
        type: Boolean,
        default: false
      }
    },
    
    components: {
      VueForm
    },

    data: () => ({
      buttonActive: true
    }),


  }
</script>

<style scoped>
  .forms {
    padding: 0 0 15px 0;
    margin: 0 auto;
    /* margin-top: 10px; */
    border-radius: 4px !important;
  }
  .buttons {
    display: flex;
    border-radius: 0px;
    /* border: 1px solid; */
  }
  .button {
    width: 50%;
    cursor: pointer;
    text-align: center;
    padding: 16px;
  }
  .button:hover {
    background-color: #BBDEFB;
  }
  .button.active {
    background-color: #64B5F6;
  }
  .message {
    min-height: 110px;
    margin-bottom: 20px;
  }
  .message > .v-sheet {
    padding: 20px;
    text-align: center;
    font-size: 30px;
  }
</style>