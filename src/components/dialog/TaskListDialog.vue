<template>

  <v-btn
         class="text-none"
         color="primary"
         size="large"
         variant="flat">
    选择

    <v-dialog activator="parent" max-width="500" persistent>

      <template v-slot:default="{ isActive }">

        <v-card style="border-radius: 1.75rem;background-color:rgb(250,253,253);">
          <v-card-title>
            任务
          </v-card-title>
          <v-divider />
          <v-card-text class="d-flex flex-row" style="background-color:rgb(250,253,253);">
            <v-tabs
                v-model="tab"
                bg-color="white"
                direction="vertical"
                style="background-color:rgb(250,253,253);"
            >
              <v-tab v-for="item in items" :key="item.value.type" :value="item.value.type" >
                <v-icon v-if="!multi[item.value.type].val" color="primary" start>
                  mdi-circle-outline
                </v-icon>
                <v-icon v-else color="primary" start>
                  mdi-circle-slice-8
                </v-icon>
                {{ item.label }}
              </v-tab>
            </v-tabs>
            <v-window v-model="tab" style="width: 100%;background-color:rgb(250,253,253);">

              <v-window-item :value="chipsType.StartUp" style="background-color:rgb(250,253,253);">
                <v-card flat>
                  <v-card-text>
                    <v-switch v-model="multi.StartUp.val"
                              :label="chips.StartUp"
                              color="primary"
                              inset></v-switch>

                    <v-select
                        v-model="multi.StartUp.value.params.client_type"
                        :items="['Bilibili', 'Official']"
                        label="客户端"
                        variant="solo"
                    ></v-select>

                    <v-text-field v-model="switch_account"
                              label="账号切换"
                              variant="outlined"></v-text-field>

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
                <v-card flat>
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
                <v-card flat>
                  <v-card-text>
                    <v-switch v-model="multi.Infrast.val"
                              :label="chips.Infrast"
                              color="primary"
                              inset></v-switch>
                  </v-card-text>
                </v-card>
              </v-window-item>

              <v-window-item :value="chipsType.Fight">
                <v-card flat>
                  <v-card-text>
                    <v-switch v-model="multi.Fight.val"
                              :label="chips.Fight"
                              color="primary"
                              inset></v-switch>
                    <v-text-field v-model="multi.Fight.value.params.stage"
                                  label="指定关卡"
                                  variant="solo">
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
                <v-card flat>
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
                <v-card flat>
                  <v-card-text>
                    <v-switch v-model="multi.Award.val"
                              :label="chips.Award"
                              color="primary"
                              inset></v-switch>
                  </v-card-text>
                </v-card>
              </v-window-item>


            </v-window>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn size="large" rounded="xl" @click="isActive.value = false">
              取消
            </v-btn>
            <v-btn size="large"  color="primary" variant="flat"
                   rounded="xl" @click="save(isActive)">
              确定
            </v-btn>
          </v-card-actions>

        </v-card>
      </template>


    </v-dialog>


  </v-btn>


</template>

<script setup>

import {defineEmits, ref, watch} from "vue";
import {chips, chipsType, items} from "../../utils/types.js";


const tab = ref('')
const select = ref([])


const useSan = ref(false)

const switch_account = ref('')

watch(switch_account, () => {
  console.log('onchange', switch_account.value)
  multi.value.StartUp.value.params['account_name'] = switch_account.value
  if (!switch_account.value.length) {
    delete multi.value.StartUp.value.params['account_name']
  }
})

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

const eventEmits = defineEmits(['task-selected'])


const save = (isActive) => {
  for (let key in multi.value) {
    if (multi.value[key].val) {
      select.value.push(multi.value[key].value)
    }
  }

  eventEmits('task-selected', select.value)

  isActive.value = false
}


</script>

<style scoped>

</style>
