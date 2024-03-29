<template>
  <v-window-item :value="value" class="h-100">
    <v-container>

      <div style="font-size: 130%;padding-bottom: 14px;">
        一键长草
      </div>

      <v-card variant="elevated" class="d-flex flex-row pt-1"
              style="width: 100%;border-radius: 12px;background-color: rgb(250,253,253)">
        <v-tabs
            v-model="tab"
            color="primary"
            direction="vertical"
        >
          <v-tab v-for="item in items" :key="item.value.type" :value="item.value.type">
            <v-icon v-if="!multi[item.value.type].val" color="primary" start>
              mdi-circle-outline
            </v-icon>
            <v-icon v-else color="primary" start>
              mdi-circle-slice-8
            </v-icon>
            {{ item.label }}
          </v-tab>
        </v-tabs>
        <v-window v-model="tab" style="width: 100%;background-color: rgb(250,253,253)">

          <v-window-item :value="chipsType.StartUp">
            <v-card flat variant="elevated" style="background-color: rgb(250,253,253)">
              <v-card-text>
                <v-switch v-model="multi.StartUp.val"
                          :label="chips.StartUp"
                          color="primary"
                          inset></v-switch>

                <v-text-field v-model="switch_account"
                              label="账号切换"
                              variant="outlined"></v-text-field>

                <v-select
                    v-model="multi.StartUp.value.params.client_type"
                    :items="['Bilibili', 'Official']"
                    label="客户端"
                    style="background-color: rgb(250,253,253)"
                    variant="underlined"
                ></v-select>

                <v-switch
                    v-model="multi.StartUp.value.params.start_game_enabled"
                    color="primary"
                    label="启动客户端"
                >
                </v-switch>
              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item :value="chipsType.Recruit">
            <v-card flat style="background-color: rgb(250,253,253)">
              <v-card-text>
                <v-switch v-model="multi.Recruit.val"
                          :label="chips.Recruit"
                          color="primary"
                          inset></v-switch>
                <v-switch
                    v-model="multi.Recruit.value.params.expedite"
                    color="primary"
                    label="自动使用加急券"
                ></v-switch>
              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item :value="chipsType.Infrast">
            <v-card flat style="background-color: rgb(250,253,253)">
              <v-card-text>
                <v-switch v-model="multi.Infrast.val"
                          :label="chips.Infrast"
                          color="primary"
                          inset></v-switch>
              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item :value="chipsType.Fight">
            <v-card flat style="background-color: rgb(250,253,253)">
              <v-card-text>
                <v-switch v-model="multi.Fight.val"
                          :label="chips.Fight"
                          color="primary"
                          inset></v-switch>
                <v-text-field v-model="multi.Fight.value.params.stage"
                              label="指定关卡"
                              style="background-color: rgb(250,253,253)"
                              variant="underlined">
                </v-text-field>

                <v-switch
                    v-model="useSan"
                    color="primary"
                    label="使用理智药"
                    variant="solo"></v-switch>

              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item :value="chipsType.Mall">
            <v-card flat style="background-color: rgb(250,253,253)">
              <v-card-text>
                <v-switch v-model="multi.Mall.val"
                          :label="chips.Mall"
                          color="primary"
                          inset></v-switch>
                <v-switch
                    v-model="multi.Mall.value.params.shopping"
                    color="primary"
                    label="自动购物"></v-switch>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item :value="chipsType.Award">
            <v-card flat style="background-color: rgb(250,253,253)">
              <v-card-text>
                <v-switch v-model="multi.Award.val"
                          :label="chips.Award"
                          color="primary"
                          inset></v-switch>
              </v-card-text>
            </v-card>
          </v-window-item>


        </v-window>

      </v-card>

      <div style="width: 100%;display: flex;justify-content: center">

      </div>

    </v-container>
    <v-btn color="primary"
           density="default"
           icon="mdi-google-downasaur"
           size="large"
           style="position:absolute; bottom: 24px;right: 24px"
           @click="send">
    </v-btn>

    <v-btn icon="mdi-refresh"
           size="large"
           style="position:absolute; bottom: 100px;right: 24px"
           @click="emits('clear')">
    </v-btn>


    <v-dialog max-width="500" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn icon="mdi-plus"
               color="secondary"
               v-bind="activatorProps"
               size="large"
               style="position:absolute; bottom: 176px;right: 24px">
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="自定义任务(容易出错不建议使用)" style="border-radius: 15px">
          <v-card-text>

            <v-textarea variant="outlined" v-model="custom">

            </v-textarea>

          </v-card-text>
          <v-card-actions>
            <v-btn text="校验" variant="tonal" rounded color="success" @click="validate"></v-btn>
            <v-btn text="还原" variant="tonal" rounded color="secondary" @click="init"></v-btn>
            <v-spacer></v-spacer>
            <v-btn
                text="取消"
                rounded
                @click="isActive.value = false"
            ></v-btn>
            <v-btn
                text="确定"
                rounded
                variant="tonal"
                color="primary"
                @click="submit(isActive)"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

  </v-window-item>
</template>

<script setup>
import {ref, watch} from "vue";
import {chips, chipsType, items} from '../utils/types.js'
import {notify} from "../utils/util.js";
import Config from "../utils/config.js";

defineProps({
  value: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['clear'])

const tab = ref(null)
const select = ref([])

const useSan = ref(false)

watch(useSan, () => {
  if (useSan.value) {
    multi.value.Fight.value.params.medicine = 999
    multi.value.Fight.value.params.expiring_medicine = 999
  } else {
    delete multi.value.Fight.value.params['medicine']
    delete multi.value.Fight.value.params['expiring_medicine']
  }
})

const multi = ref({
  "StartUp": {
    val: false,
    value: items[0].value
  },
  "Recruit": {
    val: false,
    value: items[1].value
  },
  "Infrast": {
    val: false,
    value: items[2].value
  },
  "Fight": {
    val: false,
    value: items[3].value
  },
  "Mall": {
    val: false,
    value: items[4].value
  },
  "Award": {
    val: false,
    value: items[5].value
  }
})

const switch_account = ref('')

watch(switch_account, () => {
  console.log('onchange', switch_account.value)
  multi.value.StartUp.value.params['account_name'] = switch_account.value
  if (!switch_account.value.length) {
    delete multi.value.StartUp.value.params['account_name']
  }
})

const send = () => {

  for (let key in multi.value) {
    if (multi.value[key].val) {
      select.value.push(multi.value[key].value)
    }
  }

  if (select.value.length === 0) {
    notify('你必须选中至少一个任务', 1000)
    return
  }

  fetch(`${Config.server}/maa/task/add`, {
    mode: 'cors',
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: '即时任务',
      content: {
        tasks: select.value
      }
    })
  }).then((res) => {
    if (res.ok) {
      notify('提交成功', 1000)
      res.json().then(json => {
        console.log(json)
      })
    }
  })
  select.value = []
}


const custom = ref('{"name":"自定义任务","content":{"tasks":[]}}')

const init = ()=>{
  custom.value = '{"name":"自定义任务","content":{"tasks":[]}}'
}
const validate = () => {
  let result
  try {
    result = JSON.parse(custom.value)
  } catch (err) {
    console.log(custom.value)
    console.log(err)
    notify('格式错误,请检查JSON格式')
    return
  }
  custom.value = JSON.stringify(result)
  notify('JSON格式正确')
}

const submit = (isActive)=>{
  let result
  try {
     result = JSON.parse(custom.value)
  }catch (err){
    notify('JSON 格式错误')
    return
  }
  if (result.content.tasks && result.content.tasks.length === 0){
    notify('请至少含有一个任务')
    return;
  }
  if (result.name && result.name.length ===0){
    notify('请填写任务名')
    return;
  }

  fetch(`${Config.server}/maa/task/add`, {
    mode: 'cors',
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(result)
  }).then((res) => {
    if (res.ok) {
      notify('提交成功', 1000)
      isActive.value = false
    }
  })

}



</script>

<style scoped>

</style>
