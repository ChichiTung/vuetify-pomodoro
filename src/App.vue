<template lang="pug">
v-app
  v-app-bar(elevation="8")
    v-app-bar-title(
class="title font-weight-black text-h5 text-lg-h4") KURODORO
    v-spacer
    v-btn( class="v-bar-btn" icon="mdi-home" variant="text" to="/" )
    v-btn( class="v-bar-btn" icon="mdi-format-list-bulleted" variant="text" to="/list")
    v-btn( class="v-bar-btn" icon="mdi-cog" variant="text" to="/settings")
    v-btn( class="v-bar-btn" :icon="notify ? 'mdi-bell' : 'mdi-bell-off'" variant="text" @click="toggleNotify")
  v-main
    v-container
      router-view(v-slot="{ Component }")
        //- 換頁保留元件不被銷毀
        //- 設定 include 指定要保留的元件
        keep-alive(include="HomeView")
          //- 動態元件，將元件以 is 傳入
          component(:is="Component")
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
const settings = useSettingsStore()
const { notify } = storeToRefs(settings)
const { toggleNotify } = settings
</script>

<style lang="css" src="./assets/css/style.css" scoped></style>
