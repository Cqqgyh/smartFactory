<template>
  <div
    ref="containerRef"
    id="containerRef"
    style="width: 100vw; height: 100vh"
  ></div>
  <Popover
    ref="popoverRef"
    :top="popoverTop"
    :left="popoverLeft"
    :data="popoverData"
  ></Popover>
</template>
<script setup lang="ts">
import { ComponentPublicInstance, onMounted, Ref, ref } from 'vue'
// 导入整个 three.js核心库
import * as THREE from 'three'
import { Object3D } from 'three'
import Viewer, { type Animate } from '@/modules/Viewer'
import ModelLoader from '@/modules/ModelLoder'
import Event from '@/modules/Viewer/Events'
import BoxHelperWrap from '@/modules/BoxHelperWrap'
import { checkNameIncludes, findParent } from '@/utils'
import Popover from './Popover/index.vue'

const containerRef = ref<ComponentPublicInstance>()
let viewer: Viewer
let modelLoader: ModelLoader
let boxHelperWrap: BoxHelperWrap

const popoverRef: Ref = ref(null)
const popoverTop = ref(0)
const popoverLeft = ref(0)
const popoverData = ref<any>({})
// 在模型中查找所有机架对象，并将其添加到 rackList 中
const rackList = ref([] as Object3D[])
// 加载
const init = () => {
  viewer = new Viewer('containerRef')
  // viewer.addAxis();
  // viewer.addStats();
  viewer.initRaycaster()

  modelLoader = new ModelLoader(viewer)
  // const floors = new Floors(viewer);
  // floors.addGird();

  boxHelperWrap = new BoxHelperWrap(viewer)

  viewer.emitter.on(Event.mousemove.raycaster, (list: THREE.Intersection[]) => {
    onMouseMove(list)
  })
}
const planeAnimate = (texture: any): Animate => {
  console.log(texture, 'texture')
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return {
    fun: () => {
      const count = texture.repeat.y
      if (count <= 10) {
        texture.repeat.x += 0.01
        texture.repeat.y += 0.02
      } else {
        texture.repeat.x = 0
        texture.repeat.y = 0
      }
    },
    content: viewer,
  }
}
// 加载模型
const initModel = () => {
  // 底部线条
  modelLoader.loadModelToScene('/models/plane.glb', (baseModel) => {
    const model = baseModel.gltf.scene
    model.scale.set(0.0001 * 3, 0.0001 * 3, 0.0001 * 3)
    model.position.set(0, 0, 0)
    model.name = 'plane'
    baseModel.openCastShadow()

    const texture = (baseModel.object.children[0] as any).material.map
    const fnOnj = planeAnimate(texture)
    viewer.addAnimate(fnOnj)
  })
  // 工厂 garage_factory
  modelLoader.loadModelToScene('/models/GuiGu-factory.glb', (baseModel) => {
    console.log(baseModel, '1111111')
    // 设置基础模型的缩放比例
    baseModel.setScalc(0.002)
    // 暂时注释掉旋转代码
    // baseModel.object.rotation.y = Math.PI / 2
    // 获取实际的模型对象
    const model = baseModel.gltf.scene
    model.position.set(0.5, 0, 0.5)
    // 为模型设置名称
    // model.name = 'GuiGu-厂房1'
    // model.uuid = 'GuiGu-厂房1'
    // 启用基础模型的投射阴影功能
    baseModel.openCastShadow()
    console.log('model.traverse', model.traverse)
    console.log('model', model)
    model.traverse((item: any) => {
      if (checkIsRack(item)) {
        rackList.value.push(item)
      }
      // 保存原始颜色数据，以及警告颜色
      if (item.isMesh) {
        item.material.warningColor = {
          r: 1,
          g: 0,
          b: 0,
          isColor: true,
        }
        // 保存旧的材质
        item.oldMaterial = item.material
      }
    })
    console.log(rackList.value, 'rackList------')
    // 将 rackList 中的机架设置为 viewer 的射线检测对象
    viewer.setRaycasterObjects(rackList.value)
  })
}

function checkIsRack(obj: any): boolean {
  return checkNameIncludes(obj, 'GuiGu')
}

const onMouseMove = (intersects: THREE.Intersection[]) => {
  if (!intersects.length) {
    popoverRef.value.setShow(false)
    boxHelperWrap.setVisible(false)
    return
  }
  const selectedObject = intersects[0].object || {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let selectedObjectName = ''
  const findClickModel = (object: any) => {
    if (object.name.includes('GuiGu')) {
      selectedObjectName = object.name
      return
    }
    if (object.parent) {
      findClickModel(object.parent)
    }
  }

  findClickModel(selectedObject)
  const rack = findParent(selectedObject, checkIsRack)
  if (rack) {
    boxHelperWrap.attach(rack)
    updateRackInfo(rack.name)
  }
}
const updateRackInfo = (name: string) => {
  if (name) {
    popoverRef.value.setShow(true, { name })
    const event = viewer.mouseEvent as MouseEvent
    popoverTop.value = event.y + 10
    popoverLeft.value = event.x + 10
  } else {
    popoverRef.value.setShow(false)
  }
}
// 修改颜色
const changeWarningColor = (model: Object3D) => {
  model.traverseVisible((item: any) => {
    if (item.isMesh) {
      item.material = new THREE.MeshStandardMaterial()
      item.material.color = item.oldMaterial.warningColor
    }
  })
}
// 还原成原始颜色
const changeOriginColor = (model: Object3D) => {
  model.traverse((item: any) => {
    // 修改颜色
    if (item.isMesh) {
      item.material = item.oldMaterial
    }
  })
}
onMounted(() => {
  init()
  initModel()
  // 测试修改颜色
  setTimeout(() => {
    changeWarningColor(rackList.value[0])
  }, 5000)
  // 测试还原颜色
  setTimeout(() => {
    changeOriginColor(rackList.value[0])
  }, 10000)
})
</script>

<style lang="scss" scoped></style>
