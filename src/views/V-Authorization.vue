<template>
  <v-col>
    <v-sheet
      rounded="lg"
      max-width="600px"
      max-height="90vh"
      class="forms"
    >
    <div class="buttons">

      <div
        class="button"
        :class="buttonActive ? 'active' : '' "
        @click="buttonActive = !buttonActive"
      ><button>Sign In</button>
      </div>

      <div 
        class="button"
        :class="!buttonActive ? 'active' : '' "
        @click="buttonActive = !buttonActive"
      ><button>Sign Up</button>

      </div>

    </div>

    <VueForm v-if="buttonActive" titleForm="Sign In" />
    <VueForm v-else titleForm="Sign Up" />
      
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
    })
  }
</script>

<style scoped>
  .forms {
    margin: 0 auto;
    margin-top: 100px;
  }
  .buttons {
    display: flex;
    border-radius: 8xp;
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