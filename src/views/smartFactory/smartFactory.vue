<template>
  <div ref="containerRef"></div>
</template>
<script setup lang="ts">
import { ComponentPublicInstance, onMounted, ref } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
// 导入整个 three.js核心库
import * as THREE from 'three'

const containerRef = ref<ComponentPublicInstance>()

function init() {
  //创建相机（第一个参数视野夹角0~180°，第二参数相机大小，第三、四个参数可看像素）
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10,
  )
  camera.position.z = 1

  const scene = new THREE.Scene()

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  const material = new THREE.MeshNormalMaterial()

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  //创建渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  //设置渲染器大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setAnimationLoop(animation)
  // 把渲染器放到dom中
  ;(containerRef.value as any)?.appendChild(renderer.domElement)
  // animation

  function animation(time: number) {
    mesh.rotation.x = time / 2000
    mesh.rotation.y = time / 1000
    renderer.render(scene, camera)
  }
}
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped></style>
