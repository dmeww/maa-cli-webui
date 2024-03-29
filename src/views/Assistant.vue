<template>
  <v-window-item :value="value" class="h-100 overflow-auto">
    <v-container>
      <div style="font-size: 130%;padding-bottom: 14px;">
        设备截图
      </div>

      <v-img
          :src="`${Config.server}/device/screencap?t=${time}`"
          aspect-ratio="16/9"
          cover
          style="box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px  rgba(0, 0, 0, 0.12)"
          width="100%">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
                color="grey-lighten-4"
                indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>


      <v-divider :thickness="6" color="info" style="margin-top: 10px;margin-bottom: 10px;"></v-divider>



    </v-container>

    <v-btn color="primary"
           density="default"
           :icon="cap?'mdi-pause':'mdi-play'"
           size="large"
           style="position:absolute; bottom: 24px;right: 24px"
            @click="useCap">
    </v-btn>
  </v-window-item>
</template>

<script setup>
defineProps({
  value: {
    type: Number,
    required: true
  }
})

import Config from "../utils/config.js";
import {notify} from "../utils/util.js";
import {ref} from "vue";

const time = ref(0)
let timer

const cap = ref(false)

const useCap = () => {
  cap.value = !cap.value

  if (cap.value) {
    timer = setInterval(() => {
      time.value += 1
    }, 2000)
  } else {
    clearInterval(timer)
  }

}


</script>

<style scoped>

</style>
