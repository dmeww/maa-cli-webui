<template>

  <v-dialog v-model="dialog" persistent width="400">
    <v-card color="background" flat class="overflow-hidden" style="border-radius: 35px" >
      <v-card-text style="color: #434A50;font-size: 18px;">
        选择时间
      </v-card-text>
      <v-card-text class="d-flex justify-center" style="width: 100%">
        <time-picker v-model="time"
                     automatic
                     width="85%"/>
      </v-card-text>
      <v-card-actions class="pr-2">
        <v-spacer/>
        <v-btn color="primary" style="border-radius: 16px" @click="onResult">取消</v-btn>
        <v-btn color="active" style="border-radius: 16px" variant="flat" @click="onResult">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {TimePicker} from "vue-material-time-picker";
import "vue-material-time-picker/dist/style.css";
import {ref} from "vue";


const emits = defineEmits(['accept', 'updateHour', 'updateMinute'])

const time = ref('00:00')
const dialog = ref(false)

const open = () => {
  dialog.value = true
}

const onResult = () => {
  emits('accept', time.value.length ? time.value : '00:00')
  dialog.value = false
}

defineExpose({
  open
})

</script>

<style>

.picker__title {
  background-color: #BCEFF6 !important;
}

.time-picker-title {
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}

.picker__title {
  background-color: #E8EFF0 !important;
}

.time-picker-title span {
  padding-left: 2px;
  padding-right: 2px;
}

.picker__title__btn {
  border-style: solid !important;
  border-color: transparent !important;
  border-width: 3px !important;
  padding: 30px 15px 30px 15px !important;
  opacity: 1 !important;
  background-color: #DCE3E9 !important;
  border-radius: 10px !important;
  height: 78px !important;
}

.picker__title__btn--active {
  border-style: solid !important;
  border-color: #00668C !important;
  border-width: 3px !important;
  border-radius: 10px !important;
  background-color: #C2E8FF !important;
}

.time-picker-title__time {
  color: #000000 !important;
}

.time-picker-clock {
  background-color: #DCE3E9 !important;
}

.time-picker-clock__inner .time-picker-clock__item--active {
  background-color: #00668C !important;
}

.time-picker-clock__inner .time-picker-clock__hand {
  background-color: #00668C !important;
}

.time-picker-clock__inner .time-picker-clock__hand::after {
  border-color: #00668C !important;
  background-color: #00668C !important;
}

.time-picker-clock__inner .time-picker-clock__hand::before {
  border-color: #00668C !important;
  background-color: #00668C !important;
}

</style>
