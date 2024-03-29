<template>
  <div class="d-flex  align-center body" >
    <div class=" picker_btn" >
      <div class="text">
        {{ hour }}
      </div>
    </div>
    <span style="font-size: 45px"> : </span>
    <div class=" picker_btn" >{{ minute }}</div>
  </div>
</template>
<script setup>


import {onMounted, ref} from "vue";

const props = defineProps({
  time: {
    type: String,
    required: true
  }
})

const hour = ref('00')
const minute = ref('00')

onMounted(() => {
  let list = props.time.split(':')
  hour.value = list.at(0)
  minute.value = list.at(1)
})

</script>

<style scoped>

.body :hover {
  cursor: pointer;
}

.picker_btn{
  height: 70px;
  font-size: 45px;
  opacity: 1 !important;
  border-radius: 10px !important;
  padding-left: 15px;
  padding-right: 15px;
  border-style: solid !important;
  border-color: #00668C !important;
  border-width: 3px !important;
  background-color: #C2E8FF !important;
}

.text{
  display: flex;
  align-items: center;
}

</style>
