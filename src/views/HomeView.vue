<template lang="pug">
v-row#home
  v-col(class="list-area mt-16 rounded-xl" elevation="8" cols="4")
    p(class="title font-weight-black text-center text-lg-h4 text-sm-h5")  ★ &nbsp &nbsp ★ &nbsp LIST &nbsp &nbsp ★ &nbsp &nbsp ★
    v-row(class="my-6")
      v-icon(class="align-center my-lg-3 mx-4" color="deep-purple") mdi-calendar-check
      p(class="font-weight-light text-deep-purple list-title text-sm-h6 text-lg-h4 w-75") {{ currentText }}
    v-row(class="my-6")
      v-icon(class="align-center my-lg-3 mx-4" color="deep-purple") mdi-alarm
      h1(class="font-weight-light text-deep-purple list-title text-sm-h6 text-lg-h4 w-75")  {{ currentTime }}
  v-col(cols="12" class="mt-lg-4")
    v-btn(v-if="status !== 1" icon="mdi-play" variant="text" class=" bg-purple-accent-4 mr-lg-4" @click="startTimer")
    v-btn(v-if="status === 1" icon="mdi-pause" variant="text" class=" bg-deep-purple-accent-1 mr-lg-4" @click="pauseTimer")
    v-btn(v-if="currentItem.length > 0" icon="mdi-skip-next" variant="text" class="bg-deep-purple-accent-1 mr-lg-4" @click="finishTimer")
</template>

<script setup>
import { ref, computed } from 'vue'
import { useListStore } from '@/stores/list'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

const list = useListStore()
const { currentItem, items, timeleft } = storeToRefs(list)
const { start, countdown, finish } = list

const settings = useSettingsStore()
const { selectedAlarmFile, notify } = storeToRefs(settings)

// 0 = 停止
// 1 = 倒數中
// 2 = 暫停
const status = ref(0)

let timer = 0
const startTimer = () => {
  if (status.value === 0 && items.value.length > 0) {
    start()
  }
  if (currentItem.value.length > 0) {
    status.value = 1
    timer = setInterval(() => {
      countdown()
      if (timeleft.value === 0) {
        finishTimer()
      }
    }, 1000)
  }
}
const pauseTimer = () => {
  status.value = 2
  clearInterval(timer)
}
const finishTimer = () => {
  clearInterval(timer)
  status.value = 0
  const audio = new Audio()
  audio.src = selectedAlarmFile.value
  audio.play()
  if (notify.value) {
    // eslint-disable-next-line
    const notification = new Notification('事項完成', {
      body: currentText.value,
      icon: '../../public/img/kuromi_witch.png'
    })
  }
  finish()
  if (items.value.length > 0) {
    startTimer()
  }
}

const currentText = computed(() => {
  return currentItem.value.length > 0 ? currentItem.value : items.value.length > 0 ? '點擊開始' : '沒有事項'
})
const currentTime = computed(() => {
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})
</script>

<style lang="css" src="../assets/css/style.css" scoped></style>
