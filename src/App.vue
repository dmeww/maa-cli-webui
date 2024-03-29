<style scoped></style>
<template>
  <v-app style="height: 100%;background-color: rgb(250,253,253)">
    <v-toolbar color="primary">
      <img alt="" height="32" src="/img.png" style="margin-left: 10px;" width="32">
      <v-toolbar-title>MAA CLI WebUI</v-toolbar-title>
      <template v-slot:extension>

        <v-tabs
            v-model="tab"
            align-tabs="center"
            bg-color="primary">
          <v-tab :value="1">一键长草</v-tab>
          <v-tab :value="2">运行日志</v-tab>
          <v-tab :value="3">设备截图</v-tab>
          <v-tab :value="4">定时任务</v-tab>
          <v-tab :value="5">MAA设置</v-tab>
          <v-tab :value="6">应用设置</v-tab>
        </v-tabs>

      </template>

    </v-toolbar>
    <v-window v-model="tab" style="background-color: rgb(250,253,253)" class="h-100">
      <task-panel :value="1" @clear="refreshKey+=1" :key="refreshKey"/>
      <run-log    :value="2"/>
      <assistant  :value="3"/>
      <timer-task :value="4"/>
      <maa-setting :value="5"/>
      <app-setting :value="6"/>
    </v-window>


  </v-app>


</template>
<script setup>

import {ref} from "vue";
import TaskPanel from "./views/TaskPanel.vue";
import RunLog from "./views/RunLog.vue";
import MaaSetting from "./views/MaaSetting.vue";
import AppSetting from "./views/AppSetting.vue";
import Assistant from "./views/Assistant.vue";
import TimerTask from "./views/TimerTask.vue";

const tab = ref(null)

const refreshKey = ref(0)

</script>
