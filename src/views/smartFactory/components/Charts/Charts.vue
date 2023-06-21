<template>
  <!--      图表-->
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup lang="ts">
import 'echarts'
import VChart from 'vue-echarts'
defineProps({
  option: {
    type: Object,
    default: () => ({}),
    required: true,
  },
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 40vh;
}
</style>
