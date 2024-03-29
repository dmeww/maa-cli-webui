<template>

  <v-window-item :value="value" class="h-100 overflow-auto">
    <v-container>
      <div style="font-size: 130%;padding-bottom: 14px;">
        定时任务
      </div>

      <v-card
          v-for="item in taskList"
          :key="item.name"
          class="mx-auto mt-1"
          color="primary"
          style="border-radius: 12px;padding: 7px"
          variant="elevated"
      >
        <v-card-item>
          <div>
            <div class="text-overline mb-1">
              <v-icon>mdi-gamepad-right</v-icon>
              TASK
            </div>
            <div class="d-flex justify-space-between text-h6 mb-1" style="color: white">
              <div>{{ item.name }}</div>
              <div> {{ item.time }}</div>
            </div>
            <div class="text-caption">
              <v-chip v-for="i in item.content.tasks" :key="i"
                      color="white"
                      style="margin: 4px"
                      variant="outlined"
                      @click="()=>{showChips.set(`${item.name}_${chips[i.type]}`,true)}">
                {{ chips[i.type] }}
                <task-dialog :content="i"
                             :show="checkShow(showChips,item.name,chips[i.type])"
                             :title="chips[i.type]"
                             @on-exit="()=>{showChips.set(`${item.name}_${chips[i.type]}`,false)}"/>
              </v-chip>
            </div>
          </div>
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              class="mr-1 mb-1"
              color="error"
              icon="mdi-delete"
              size="small"
              variant="elevated"
              @click="remove_task(item.uuid)"></v-btn>
        </v-card-actions>
      </v-card>

      <timer-task-add :key="refreshKey" @task-add="addTask"/>
      <div v-if="!taskList.length" class="d-flex justify-center align-center flex-column" style="width: 100%">
        <img alt="img" src="../assets/empty.png" width="192"/>
        <div style="font-size: 125%;text-align: center">没有定时任务</div>
      </div>


    </v-container>

  </v-window-item>


</template>

<script setup>
import {onMounted, ref} from "vue";
import TimerTaskAdd from "../components/dialog/TaskAddDialog.vue";
import TaskDialog from "../components/dialog/TaskDialog.vue";
import {chips} from "../utils/types.js";
import Config from "../utils/config.js";
import {notify, checkShow} from "../utils/util.js";

defineProps({
  value: {
    type: Number,
    required: true
  }
})

const taskList = ref([])
const showChips = ref(new Map())


const refreshKey = ref(0)

const get_timer_tasks = () => {
  fetch(Config.server + '/maa/task/timer/list',
      {
        mode: 'cors'
      })
      .then(res => {
        // console.log(res)
        return res.json()
      }).then(json => {
    taskList.value = json
    showChips.value = new Map()
  })
}

const remove_task = (uuid) => {
  fetch(Config.server + '/maa/task/timer/remove', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uuid
    })
  }).then((res) => {
    notify(res.ok ? '删除成功' : "删除失败")
  }).finally(() => {
    get_timer_tasks()
  })
}

const save_task = (task) => {
  fetch(Config.server + '/maa/task/timer/add', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  }).then((res) => {
    notify(res.ok ? '添加成功' : "添加失败:" + res.body)
  }).finally(() => {
    get_timer_tasks()
  })
}

onMounted(() => {
  get_timer_tasks()
})


const addTask = (task) => {
  refreshKey.value += 1
  save_task(task)
}


</script>
<style scoped>

</style>
