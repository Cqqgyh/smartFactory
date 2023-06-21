<template>
  <div
    class="popover"
    :style="{
      top: props.top + 'px',
      left: props.left + 'px',
      display: isShow ? 'inline-block' : 'none',
    }"
  >
    <div class="popover-title">
      {{ dataRef.name }}
    </div>
    <div class="popover-content">
      <el-row v-for="item in dataRef.content" :key="item.label">
        <el-col :span="12">{{ item.label }}</el-col>
        <el-col :span="12">{{ item.value }}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
type PropsTypes = {
  top: number
  left: number
}
type DataRefTypes = {
  name: string
  content?: { label: string; value: string | number }[]
}

const props = withDefaults(defineProps<PropsTypes>(), {
  top: 0,
  left: 0,
})

const isShow = ref(false)
const dataRef = ref({} as DataRefTypes)

const setShow = (visible: boolean, data?: any) => {
  isShow.value = visible
  if (data) dataRef.value = data
}

defineExpose({
  setShow,
})
</script>

<style scoped>
.popover {
  position: absolute;
  width: 2.5rem;
  font-size: 0.2rem;
  color: #fff;
  background-color: rgb(29 78 216 / 60%);
  border-radius: 5px;
}

.popover-title {
  padding: 12px;
  border-bottom: 1px solid #fff;
}

.popover-content {
  padding: 24px;
}
</style>
