<template>
  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
  >
    <div style="">

      {{ text }}
    </div>

    <template v-slot:actions>
      <v-btn
          color="blue"
          variant="text"
          @click="snackbar = false">
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snack",
  props:{
    timeout:{
      type: Number,
      default: 2000,
      required: false
    },
    text:{
      type: String,
      required: true
    }
  },
  data(){
    return{
      snackbar: true,
    }
  }
}
</script>

<style scoped>

</style>
