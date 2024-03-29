<template>
  <div class="pa-4 text-center">

    <v-btn
        color="primary"
        density="default"
        icon="mdi-plus"
        size="large"
        style="position:absolute; bottom: 24px;right: 24px">

      <v-icon icon="mdi-plus"></v-icon>

      <v-dialog activator="parent" max-width="500" persistent>
        <template v-slot:default="{ isActive }">
          <v-card class="pa-1" style="border-radius: 1.75rem;background-color:rgb(250,253,253);">
            <v-card-title class="d-flex justify-space-between align-center">
              <div class="text-h5 text-medium-emphasis ps-2">
                添加任务
              </div>
              <v-btn
                  icon="mdi-close"
                  variant="text"
                  @click="isActive.value = false"
              ></v-btn>
            </v-card-title>

            <v-divider class="mb-4"></v-divider>

            <v-card-text>
              <div class="d-flex justify-center">
                <m-time :key="task.time" :time="task.time" class="pr-3" @click="picker.open()"/>
              </div>

              <div class="d-flex justify-center align-center pt-3" style="height: 80px">
                <v-text-field v-model="task.name" label="任务名" variant="outlined"></v-text-field>
                <div style="padding-bottom: 22px;margin-left: 10px;">
                  <task-list-dialog @task-selected="handleTask" :key="refreshKey"/>
                </div>
              </div>




              <div class="pt-1" style="min-height: 32px">

                <v-chip v-for="i in task.content.tasks" :key="i" color="primary" size="large" style="margin: 4px"
                        label
                        variant="outlined">
                  {{ chips[i.type] }}
                </v-chip>

              </div>


            </v-card-text>

            <v-divider class="mt-2"></v-divider>

            <v-card-actions class="my-2 d-flex justify-end">
              <v-btn
                  class="text-none"
                  rounded="xl"
                  text="取消"
                  @click="isActive.value = false"
              ></v-btn>

              <v-btn
                  class="text-none"
                  color="primary"
                  rounded="xl"
                  text="确定"
                  variant="flat"
                  @click="addTask(task,isActive)"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-btn>

  </div>
  <time-picker ref="picker" @accept="time=>task.time = time"/>
</template>

<script setup>

import {defineEmits, ref} from "vue";
import TaskListDialog from "./TaskListDialog.vue";
import {chips} from "../../utils/types.js";
import {notify} from "../../utils/util.js";
import TimePicker from "../TimePicker.vue";
import MTime from "../MTime.vue";

const eventEmits = defineEmits(['task-add'])
const picker = ref(null)
const refreshKey = ref(0)
const task = ref({
  name: '',
  time: '00:00',
  content: {tasks: []}
})

const addTask = (task, isActive) => {
  console.log(task)

  if (!task.content.tasks.length) {
    notify('请至少选择一个子任务')
    return
  }

  if (!task.name.length) {
    notify('请输入任务名')
    return
  }

  eventEmits('task-add', task)
  isActive.value = false
}


function handleTask(taskList) {
  task.value.content.tasks = taskList
  console.log(task.value)
  refreshKey.value += 1
}


</script>

<style scoped>

</style>
