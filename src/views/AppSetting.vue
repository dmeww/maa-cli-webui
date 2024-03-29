<template>
  <v-window-item :value="value" class="h-100 overflow-auto">
    <v-skeleton-loader type="table" :loading="loading"
                       style="height: 100%;display:block;background-color:rgb(250,253,253);">

      <v-container style="padding-bottom: 0;">

        <div style="font-size: 130%;padding-bottom: 14px;">
          通知设置
        </div>

        <v-select
            label="通知类型"
            :items="['gotify','console']"
            variant="outlined"
            v-model="type"
        ></v-select>

        <v-text-field v-model="url"
                      label="URL"
                      variant="outlined">
        </v-text-field>

        <v-text-field v-model="token"
                      label="Token"
                      :append-inner-icon="showToken?'mdi-eye':'mdi-eye-off'"
                      :type="showToken?'text':'password'"
                      @click:append-inner="showToken = !showToken"
                      variant="outlined"
        ></v-text-field>

      </v-container>

      <v-container>

        <div style="font-size: 130%;padding-bottom: 14px;">
          其他设置
        </div>

        <v-card
            class="card"
            style="display: flex;align-items: center;justify-content: center;margin-top: 10px;border: thin solid #ababab;"
            text="截屏图片质量"
            @click="showSlider = true"
            variant="outlined">
          <div class="pr-5">
            <v-chip color="primary">
              {{ quality }}
            </v-chip>
          </div>
        </v-card>


      </v-container>


    </v-skeleton-loader>
    <v-btn
        density="default"
        color="primary"
        size="large"
        icon="mdi-content-save-outline"
        @click="save"
        style="position:absolute; bottom: 24px;right: 24px">
    </v-btn>
  </v-window-item>

  <v-dialog
      transition="dialog-top-transition"
      style="width: 100%;margin: 0"
      v-model="showSlider"
  >
    <v-card
        class=""
        max-width="600"
        min-width="230"
        style="border-radius: 25px"
    >
      <v-toolbar
          dense
          color="primary"
          flat>
        <v-toolbar-title>
          <span class="text-subheading">截屏图片质量</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text>
        <div class="d-flex justify-center">
          <div>
          <span
              class="text-h2 font-weight-light"
              v-text="quality"
          ></span>
            <span class="subheading font-weight-light me-1">%</span>

          </div>
        </div>

        <v-slider
            v-model="quality"
            :step="1"
            max="100"
            min="10"
            track-color="grey"
        >
          <template v-slot:prepend>
            <v-btn
                icon="mdi-minus"
                size="small"
                variant="text"
                @click="quality--"
            ></v-btn>
          </template>

          <template v-slot:append>
            <v-btn
                icon="mdi-plus"
                size="small"
                variant="text"
                @click="quality++"
            ></v-btn>
          </template>
        </v-slider>
      </v-card-text>
    </v-card>
  </v-dialog>

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

const loading = ref(false)
const showToken = ref(false)
const showSlider = ref(false)

const url = ref('')
const type = ref('')
const token = ref('')

const quality = ref(0)

onMounted(() => {
  load()
})

const load = () => {
  loading.value = true
  fetch(`${Config.server}/app/config/get`, {
    mode: 'cors'
  }).then((res) => res.json()).then((json) => {
    url.value = json.webHook.url
    token.value = json.webHook.token
    type.value = json.webHook.type
    quality.value = json.quality
  }).finally(() => {
    loading.value = false
  })
}


const save = () => {
  const req = {
    quality: quality.value,
    webHook: {
      type: type.value,
      url: url.value,
      token: token.value
    }
  }
  fetch(`${Config.server}/app/config/set`, {
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
  }).finally(() => {
    load()
  })

}


</script>

<style scoped>
.card :hover {
  cursor: pointer;
}
</style>
