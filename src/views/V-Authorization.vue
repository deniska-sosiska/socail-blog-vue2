<template>
  <v-col>
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
    margin-top: 100px;
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
</style>