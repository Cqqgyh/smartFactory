<template>
  <div class="grid-container">
    <grid-layout
      v-model:layout="props.layout"
      :col-num="100"
      :maxRows="90"
      :row-height="10"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="false"
      :use-css-transforms="true"
      :auto-size="false"
      :margin="[0, 0]"
      @layout-created="layoutCreatedEvent"
      @layout-before-mount="layoutBeforeMountEvent"
      @layout-mounted="layoutMountedEvent"
      @layout-ready="layoutReadyEvent"
      @layout-updated="layoutUpdatedEvent"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :static="item.static"
        :minH="item.minH || 10"
        :minW="item.minW || 10"
        :maxH="item.maxH || 100"
        :maxW="item.maxW || 90"
        @resize="resizeEvent"
        @move="moveEvent"
        @resized="resizedEvent"
        @container-resized="containerResizedEvent"
        @moved="movedEvent"
        :dragAllowFrom="'.drag-flag'"
      >
        <slot :name="item.i"></slot>
        <div class="drag-flag">
          <el-icon><Plus /></el-icon>
        </div>
      </grid-item>
    </grid-layout>
    <slot></slot>
  </div>
</template>
<script setup lang="tsx">
type Layout = {
  i: string
  x: number
  y: number
  w: number
  h: number
  minH?: number
  minW?: number
  maxH?: number
  maxW?: number
  static: boolean
}
import { onMounted, PropType } from 'vue'
const props = defineProps({
  layout: {
    type: Array as PropType<Layout[]>,
  },
  resizeIgnoreFrom: {
    type: String,
    default: '',
  },
})
function moveEvent(i: string, newX: number, newY: number) {
  const msg = 'MOVE i=' + i + ', X=' + newX + ', Y=' + newY
  console.log(msg)
}
function movedEvent(i: string, newX: number, newY: number) {
  const msg = 'MOVED i=' + i + ', X=' + newX + ', Y=' + newY
  console.log(msg)
}
function resizeEvent(
  i: string,
  newH: number,
  newW: number,
  newHPx: number,
  newWPx: number,
) {
  const msg =
    'RESIZE i=' +
    i +
    ', H=' +
    newH +
    ', W=' +
    newW +
    ', H(px)=' +
    newHPx +
    ', W(px)=' +
    newWPx
  console.log(msg)
}
function resizedEvent(
  i: string,
  newX: number,
  newY: number,
  newHPx: number,
  newWPx: number,
) {
  const msg =
    'RESIZED i=' +
    i +
    ', X=' +
    newX +
    ', Y=' +
    newY +
    ', H(px)=' +
    newHPx +
    ', W(px)=' +
    newWPx
  console.log(msg)
}
function containerResizedEvent(
  i: string,
  newH: number,
  newW: number,
  newHPx: number,
  newWPx: number,
) {
  const msg =
    'CONTAINER RESIZED i=' +
    i +
    ', H=' +
    newH +
    ', W=' +
    newW +
    ', H(px)=' +
    newHPx +
    ', W(px)=' +
    newWPx
  console.log(msg)
}

function layoutCreatedEvent(newLayout: any) {
  console.log('Created layout: ', newLayout)
}
function layoutBeforeMountEvent(newLayout: any) {
  console.log('beforeMount layout: ', newLayout)
}
function layoutMountedEvent(newLayout: any) {
  console.log('Mounted layout: ', newLayout)
}
function layoutReadyEvent(newLayout: any) {
  console.log('Ready layout: ', newLayout)
}
function layoutUpdatedEvent(newLayout: any) {
  console.log('Updated layout: ', newLayout)
}
// 页面加载完成后，给每个类名为vue-resizable-handle的设置transform: translate(100%, 0) !important
function addResizeHandle() {
  setTimeout(() => {
    const resizeHandle = document.getElementsByClassName('vue-resizable-handle')
    for (let i = 0; i < resizeHandle.length; i++) {
      ;(resizeHandle[i] as HTMLElement).style.transform = 'translate(0, -100%)'
      ;(resizeHandle[i] as HTMLElement).style.backgroundColor = '#ccc'
      ;(resizeHandle[i] as HTMLElement).style.display = 'none'
      ;(resizeHandle[i] as HTMLElement).style.zIndex = '99'

      // Add hover effect to display element
      resizeHandle[i].addEventListener('mouseover', function () {
        ;(resizeHandle[i] as HTMLElement).style.display = 'block'
      })

      resizeHandle[i].addEventListener('mouseout', function () {
        ;(resizeHandle[i] as HTMLElement).style.display = 'none'
      })
    }
  }, 1000)
}
// 拖动、缩放组件显示逻辑
function dragFlagAndResizeFlagDisplayTiming() {
  const containerList = document.getElementsByClassName('vue-grid-item')
  const showClassHtmlName = ['drag-flag', 'vue-resizable-handle']
  Array.from(containerList).forEach((item) => {
    item.addEventListener('mouseover', function () {
      Array.from(item?.children || []).forEach((item2) => {
        if (showClassHtmlName.includes(item2['className'])) {
          ;(item2 as HTMLElement).style.display = 'flex'
        }
      })
    })
    item.addEventListener('mouseout', function () {
      Array.from(item?.children || []).forEach((item2) => {
        if (showClassHtmlName.includes(item2['className'])) {
          ;(item2 as HTMLElement).style.display = 'none'
        }
      })
    })
  })
}
onMounted(() => {
  dragFlagAndResizeFlagDisplayTiming()
  addResizeHandle()
})
</script>
<style scoped>
.grid-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.vue-grid-layout {
  padding: 0 !important;
  background: transparent;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #cce;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  padding: 0 8px 8px 0;
  cursor: pointer;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat bottom right;
  background-origin: content-box;
}

.vue-grid-item .drag-flag {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: none;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: #ccc;
}

.vue-grid-item .drag-flag:hover {
  display: flex;
}
</style>
