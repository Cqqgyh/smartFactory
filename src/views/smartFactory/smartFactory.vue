<template>
  <FullScreenDragArrangement :layout="layout">
    <template #0>
      <Header>GuiGu工厂可视化系统</Header>
    </template>
    <template #1>
      <Panel title="警告信息" border-color="#f67474">
        <template #title>
          <span style="color: #f67474">警告信息</span>
        </template>
        <el-scrollbar>
          <el-row v-for="item in warningInfoList" :key="item.id">
            <el-text type="danger">
              {{
                `${item.factoryName}：${item.accidentType} - ${item.accidentDesc}`
              }}
            </el-text>
          </el-row>
        </el-scrollbar>
      </Panel>
    </template>
    <template #2>
      <Panel title="当天产出">
        <Charts style="height: 40vh" :option="planOption"></Charts>
      </Panel>
    </template>
    <template #3>
      <Panel title="生产计划">
        <el-scrollbar height="9vh">
          <el-row>
            <el-text type="success" size="large">
              今日计划总产量：{{ outputValue.dayPlanOutput }}
            </el-text>
          </el-row>
          <el-row>
            <el-text type="success" size="large">
              今日实时总产量：{{ outputValue.dayOutput }}
            </el-text>
          </el-row>
          <el-row>
            <el-text type="success" size="large">
              完成度：{{
                outputValue.dayOutput
                  ? (
                      (outputValue.dayOutput / outputValue.dayPlanOutput) *
                      100
                    ).toFixed(2) + '%'
                  : ''
              }}
            </el-text>
          </el-row>
          <el-row>
            <el-text type="success" size="large">今日良品率：98%</el-text>
          </el-row>
        </el-scrollbar>
      </Panel>
    </template>
    <template #4>
      <Panel title="当天事故">
        <el-scrollbar max-height="40vh">
          <el-timeline style="padding-top: 0.1rem">
            <el-timeline-item
              v-for="(item, index) in accidentInfoList"
              :key="index"
              :color="item.accidentStatus ? '#0bbd87' : ''"
            >
              <div class="element accident-wrapper">
                <el-row>
                  <el-text :type="item.accidentStatus ? 'primary' : 'danger'">
                    {{
                      `事故状态: ${
                        item.accidentStatus ? '已处理完成' : '未处理完成'
                      }`
                    }}
                  </el-text>
                </el-row>
                <el-row>
                  <el-text type="primary">
                    {{ `事故发生时间: ${item.accidentStartTime}` }}
                  </el-text>
                </el-row>
                <el-row v-if="item.accidentEndTime">
                  <el-text type="primary">
                    {{ `事故结束时间: ${item.accidentEndTime}` }}
                  </el-text>
                </el-row>
                <el-row>
                  <el-text type="warning">
                    {{ `事故等级: ${item.accidentLevel}级事故` }}
                  </el-text>
                </el-row>
                <el-row>
                  <el-text type="warning">
                    {{ `事故类型: ${item.accidentType}` }}
                  </el-text>
                </el-row>
                <el-row>
                  <el-text type="danger">
                    {{ `事故内容:  ${item.accidentDesc}` }}
                  </el-text>
                </el-row>
                <el-row>
                  <el-text type="success">
                    {{ `事故处理人: ${item.accidentHandler}` }}
                  </el-text>
                </el-row>
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </Panel>
    </template>
    <Sence ref="senceRef" :factoryInfoList="factoryInfoList"></Sence>
  </FullScreenDragArrangement>
</template>

<script setup lang="tsx">
import Header from '@/views/smartFactory/components/Header/Header.vue'
import Sence from '@/views/smartFactory/components/Sence/Sence.vue'
import Panel from '@/views/smartFactory/components/Panel/Panel.vue'
import Charts from '@/views/smartFactory/components/Charts/Charts.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  AccidentInfoInterfaceRes,
  FactoryInfoInterfaceRes,
} from '@/api/smartFactory/types'
import { ElMessage } from 'element-plus'
import { getAccidentInfo, getFactoryInfo } from '@/api/smartFactory'
import FullScreenDragArrangement from '@/components/FullScreenDragArrangement/FullScreenDragArrangement.vue'
//#region <计划>
const planOption = ref({
  color: ['#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        interval: 0, // 设置为0表示强制显示所有标签
        rotate: 45, // 设置旋转角度
      },
      data: [
        '厂房001',
        '厂房002',
        '厂房003',
        '厂房004',
        '厂房005',
        '厂房006',
        '厂房007',
        '厂房008',
        '厂房009',
        '厂房010',
        '厂房011',
        '厂房012',
      ],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '产量',
      type: 'bar',
      barWidth: '60%',
      data: computed(() => {
        // 找到最小的dayOutput
        const minDayOutput =
          !factoryInfoList.value.length ||
          factoryInfoList.value.reduce((pre, cur) => {
            return pre.dayOutput < cur.dayOutput ? pre : cur
          }).dayOutput
        // 最小的dayOutput设置颜色
        return factoryInfoList.value.map((item) => {
          const itemStyle =
            item.dayOutput === minDayOutput ? { color: '#FFBF00' } : {}
          return {
            name: '',
            value: item.dayOutput,
            itemStyle,
          }
        })
      }),
    },
  ],
})
//#endregion

//#region <事故信息>
const accidentInfoList = ref([] as AccidentInfoInterfaceRes[])
//获取事故信息
const getAccidentInfoHandle = async () => {
  try {
    const res = await getAccidentInfo()
    accidentInfoList.value = res.data
  } catch (error) {
    console.log(error)
    ElMessage.error((error as any)?.message || 'Has Error')
  }
}
//#endregion
//#region <工厂信息>
const factoryInfoList = ref([] as FactoryInfoInterfaceRes[])
// 计算产值
const outputValue = computed(() => {
  return factoryInfoList.value.reduce(
    (pre, cur) => {
      pre.dayOutput += cur.dayOutput
      pre.dayPlanOutput += cur.dayPlanOutput
      pre.monthPlanOutput += cur.monthPlanOutput
      pre.monthOutput += cur.monthOutput
      return pre
    },
    {
      dayOutput: 0,
      dayPlanOutput: 0,
      monthPlanOutput: 0,
      monthOutput: 0,
    },
  )
})
// 计算警告信息
const warningInfoList = computed(() => {
  let warningInfoList = [] as (AccidentInfoInterfaceRes & {
    factoryName: string
  })[]
  factoryInfoList.value.forEach((item) => {
    if (item.accidentInfoList?.length) {
      ;(item.accidentInfoList as any).map((item2: any) => {
        item2.factoryName = item.name
      })
      warningInfoList.push(...(item.accidentInfoList as any))
    }
  })
  return warningInfoList
})
//获取工厂信息
const getFactoryInfoHandle = async () => {
  try {
    const res = await getFactoryInfo()
    factoryInfoList.value = res.data
  } catch (error) {
    console.log(error)
    ElMessage.error((error as any)?.message || 'Has Error')
  }
}
//#endregion
//#region <senceRef 子组件>
const senceRef = ref<InstanceType<typeof Sence>>()
// 监视工厂信息，修改模型颜色
watch(
  factoryInfoList,
  (newVal) => {
    if (senceRef.value && newVal.length) {
      newVal.forEach((item) => {
        // console.log(item)
        if (item.accidentInfoList.length) {
          senceRef.value?.changeWarningColorByName(item.name)
        } else {
          senceRef.value?.changeOriginColorByName(item.name)
        }
      })
    }
  },
  {
    immediate: true,
    deep: true,
  },
)
//#endregion
const layout = ref([
  {
    x: 0,
    y: 0,
    w: 100,
    h: 10,
    i: '0',
    static: true,
  },
  {
    x: 0,
    y: 5,
    w: 30,
    h: 20,
    i: '1',
    static: false,
  },
  {
    x: 0,
    y: 30,
    w: 30,
    h: 55,
    i: '2',
    static: false,
  },
  {
    x: 70,
    y: 5,
    w: 30,
    h: 20,
    i: '3',
    static: false,
  },
  {
    x: 70,
    y: 30,
    w: 30,
    h: 55,
    i: '4',
    static: false,
  },
])
let timer: any
onMounted(() => {
  getFactoryInfoHandle()
  getAccidentInfoHandle()
  timer = setInterval(() => {
    getFactoryInfoHandle()
    getAccidentInfoHandle()
  }, 1000 * 30)
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
body,
html {
  background-color: #000;
}

body {
  overflow: hidden;
}

.smart-factory-content {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}

.smart-factory-content-left {
  position: absolute;
  top: 1.1rem;
  left: 0.3rem;
  width: 30vw;
}

.smart-factory-content-right {
  position: absolute;
  top: 1.1rem;
  right: 0.6rem;
  width: 30vw;
}

.panel {
  margin-bottom: 0.3rem;
}

.element {
  background: linear-gradient(
    111deg,
    rgb(205 215 250 / 10%) 0%,
    rgb(61 79 240 / 10%) 100%
  );
  box-shadow: inset 0 10px 5px 0 rgb(255 255 255 / 15%),
    inset 0 -10px 5px 0 rgb(205 215 250 / 15%);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}

.accident-wrapper {
  padding: 0.1rem;
}

:deep(.el-text) {
  font-size: 0.15rem;
}
</style>
