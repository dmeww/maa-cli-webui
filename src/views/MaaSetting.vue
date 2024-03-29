<template>
  <v-window-item :value="value" class="h-100 overflow-auto">

    <v-skeleton-loader :loading="loading"
                       style="height: 100%;display:block;padding-bottom: 64px;background-color:rgb(250,253,253);"
                       type="table">
      <v-container style="padding-bottom: 0;">

        <div style="font-size: 130%;padding-bottom: 14px;">
          连接设置
        </div>

        <v-text-field v-model="adb_path" label="ADB路径" variant="outlined"></v-text-field>

        <v-text-field v-model="device" label="连接地址" variant="outlined"></v-text-field>

        <v-text-field v-model="config" label="连接配置" variant="outlined"></v-text-field>

      </v-container>

      <v-container style="padding-top: 0;">
        <div style="font-size: 130%;padding-bottom: 14px;">
          MAA设置
        </div>

        <v-card class="card"
                @click="deployment_with_pause = !deployment_with_pause"
                border
                style="display: flex;align-items: center;justify-content: center;border: thin solid #ababab;"
                text="暂停释放干员"
                variant="outlined">
          <v-switch
              v-model="deployment_with_pause"
              color="primary"
              hide-details
              inset
              style="padding-right: 20px;"></v-switch>
        </v-card>

        <v-card
            @click="kill_adb_on_exit = !kill_adb_on_exit"
            class="card"
            style="display: flex;align-items: center;justify-content: center;margin-top: 10px;border: thin solid #ababab;"
            text="退出时释放ADB"
            variant="outlined">
          <v-switch
              v-model="kill_adb_on_exit"
              color="primary"
              hide-details
              inset
              style="padding-right: 20px;"></v-switch>
        </v-card>

        <v-card
            @click="adb_lite_enabled = !adb_lite_enabled"
            class="card"
            style="display: flex;align-items: center;justify-content: center;margin-top: 10px;border: thin solid #ababab;"
            text="使用ADB Lite"
            variant="outlined">
          <v-switch
              v-model="adb_lite_enabled"
              color="primary"
              hide-details
              inset
              style="padding-right: 20px;"></v-switch>
        </v-card>

        <v-text-field v-model="touch_mode" label="触摸模式" variant="outlined" style="margin-top: 20px;"></v-text-field>


      </v-container>

    </v-skeleton-loader>
    <v-btn
        color="primary"
        density="default"
        icon="mdi-content-save-outline"
        size="large"
        style="position:absolute; bottom: 24px;right: 24px"
        @click="save">
    </v-btn>
  </v-window-item>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {notify} from "../utils/util.js";
import Config from "../utils/config.js";

defineProps({
  value: {
    type: Number,
    required: true
  }
})

// ADB连接设置
const adb_path = ref('')
const device = ref('')
const config = ref('')

// MAA 实例设置
const deployment_with_pause = ref(false)
const adb_lite_enabled = ref(false)
const kill_adb_on_exit = ref(false)
const touch_mode = ref('')

// test
const loading = ref(true)


onMounted(() => {
  fetch(`${Config.server}/maa/config/get`, {
    method: "GET",
    mode: 'cors',
  }).then((res) => res.json()).then((res) => {

    // console.log(res)

    adb_path.value = res.connection.adb_path
    device.value = res.connection.device
    config.value = res.connection.config
    deployment_with_pause.value = res.instance_options.deployment_with_pause
    adb_lite_enabled.value = res.instance_options.adb_lite_enabled
    kill_adb_on_exit.value = res.instance_options.kill_adb_on_exit
    touch_mode.value = res.instance_options.touch_mode

  }).finally(() => {
    loading.value = false
  })
})

const save = () => {

  const req = {
    connection: {
      adb_path: adb_path.value,
      device: device.value,
      config: config.value,
      type: "ADB"
    },
    instance_options: {
      deployment_with_pause: deployment_with_pause.value,
      adb_lite_enabled: adb_lite_enabled.value,
      kill_adb_on_exit: kill_adb_on_exit.value,
      touch_mode: "MAATouch"
    }
  }

  fetch(`${Config.server}/maa/config/set`, {
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  }).then((res) => {
    if (res.ok) {
      console.log(res.text())
      notify('保存成功', 1000)
    } else {
      notify('保存失败', 1000)
    }
  })


}

</script>

<style scoped>

.card :hover {
  cursor: pointer;
}

</style>
