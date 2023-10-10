<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useTheme } from './hooks/useTheme'
// 初始化主题配置
const { initTheme } = useTheme()
console.log(
  '%c Welcome to 智慧工厂! ',
  'color:#1e80ff;font-size:20px;background:#fff;padding:8px;',
)
initTheme()
</script>
