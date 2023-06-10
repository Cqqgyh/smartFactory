<template>
  <section class="app-mian-height">
    <router-view v-slot="{ Component, route }" v-if="isShow">
      <transition appear name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'

export default defineComponent({
  setup() {
    const settingsStore = useSettingsStore()
    const isShow = ref(true)
    watch(
      () => settingsStore.refresh,
      () => {
        isShow.value = false
        nextTick(() => {
          isShow.value = true
        })
      },
    )
    return { isShow }
  },
})
</script>

<style scoped lang="scss">
.app-mian-height {
  min-height: $base-app-main-height;

  // padding: 20px;
  background-color: inherit;
}
</style>
