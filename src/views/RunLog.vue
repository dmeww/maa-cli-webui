<template>
  <v-window-item :value="value" class="h-100 overflow-auto">
    <v-skeleton-loader :loading="loading" style="height: 100%;display:block;background-color:rgb(250,253,253);"
      type="table">
      <v-container style="background-color: rgb(250,253,253)">

        <div class="d-flex justify-space-between" style="font-size: 130%;padding-bottom: 14px;">
          <div>
            运行日志
          </div>
          <div></div>
        </div>

        <v-card variant="elevated" :title="`运行状态: ${status ? `正在运行 ${name}` : '空闲中'}`"
          style="border-radius: 12px;background-color:rgb(250,253,253);">
          <v-divider style="padding-bottom: 15px;" />
          <div style="height: 100%;width: 100%;display: flex;align-items: center;justify-content: space-between;">

            <div style="width: 100%;padding-left: 10px;">
              <v-chip color="secondary">
                队列任务 {{ len }}
              </v-chip>
            </div>

          </div>


          <v-container style="padding-bottom: 24px;">
            <div v-if="status">
              <v-chip v-for="i in task.content.tasks" :key="i" color="primary" size="large" style="margin: 4px"
                variant="outlined" @click="() => { }">
                {{ chips[i.type] }}
              </v-chip>
            </div>
          </v-container>

        </v-card>

        <v-card variant="elevated"
          style="height: 100%;margin-top: 15px;padding-bottom: 15px;border-radius: 12px;background-color:rgb(250,253,253);"
          title="运行日志">
          <v-divider />
          <v-container style="overflow: auto;padding-top: 0;">
            <v-textarea v-model="log" auto-grow readonly rows="6" variant="plain"></v-textarea>
          </v-container>

        </v-card>


      </v-container>
    </v-skeleton-loader>
    <v-btn v-if="status" icon="mdi-close" size="large" color="error" @click="stop_task"
      style="position:absolute; bottom: 24px;right: 24px">
    </v-btn>
  </v-window-item>
</template>

<script setup>

import { onMounted, ref } from "vue";
import { notify } from "../utils/util.js";
import { chips } from "../utils/types.js";
import Config from "../utils/config.js";

defineProps({
  value: {
    type: Number,
    required: true
  }
})

const loading = ref(true)


const status = ref(false)

const name = ref('')
const task = ref({})
const log = ref('')
const len = ref(0)


let socket;
onMounted(async () => {
  load_status()

  init_websocket()

})


const init_websocket = () => {
  const wsURL = Config.server.replace('http', 'ws') + '/maa/run'
  try {
    socket = new WebSocket(wsURL)
  } catch (e) {
    notify("WebSocket Error:=>" + JSON.stringify(e))
    loading.value = false
    return
  }

  socket.onopen = () => {
    notify('已连接到服务器')
  }

  socket.onmessage = (message) => {
    console.log('onMessage')
    const data = JSON.parse(message.data)

    if (data.type === 'status') {
      status.value = data.content.running
      task.value = data.content.task
      len.value = data.content.len
      if (data.content.task) {
        name.value = data.content.task.name
      }
    } else {
      log.value += data.content
    }
  }

  socket.onclose = () => {
    notify('与服务器断开连接')
  }
}

const load_status = () => {
  fetch(`${Config.server}/maa/status`, {
    mode: 'cors'
  }).then(res => res.json()).then(data => {
    status.value = data.running
    task.value = data.task
    len.value = data.len
    if (data.task) {
      name.value = data.task.name
    }
  }).finally(() => {
    loading.value = false
  })
}

const stop_task = () => {
  fetch(`${Config.server}/maa/task/stop`, {
    method: "GET",
    mode: 'cors'
  }).then((res) => {
    notify(res.ok ? '成功' : '失败')
  })
}


</script>

<style scoped></style>
