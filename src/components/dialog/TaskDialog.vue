<template>
  <v-dialog v-model="props.show" max-width="500" persistent>

    <template v-slot:default="{ isActive }">
      <v-card :title="props.title" class="pa-1" style="border-radius: 1.75rem">

        <v-card-text>
          <v-divider />
          <v-textarea v-model="text" variant="plain" auto-grow readonly></v-textarea>
          <v-divider />
        </v-card-text>


        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn-group rounded="pill">
            <v-btn
                text="OK"
                @click="eventEmits('onExit')"
            ></v-btn>
          </v-btn-group>

        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
// import {load} from 'js-toml';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: Object,
    required: true
  },
  show: {
    type: Boolean,
    default: false,
    required: false
  }
})

const eventEmits = defineEmits(['onExit'])


const text = computed(()=>{
  return JSON.stringify(props.content,null,'\t')
})




</script>

<style scoped>

</style>
