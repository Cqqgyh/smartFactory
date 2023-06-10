<template>
  <el-dialog v-model="dialogVisible" title="操作详情" :destroy-on-close="true">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :model="dialogData"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="操作模块">
            {{ dialogData.title }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请求地址">
            {{ dialogData.operUrl }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="登录信息">
            {{ dialogData.operIp }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请求方式">
            {{ dialogData.requestMethod }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="操作方法">
            {{ dialogData.method }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="请求参数">
            {{ dialogData.operParam }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="返回参数">
            {{ dialogData.jsonResult }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="操作状态">
            {{ dialogData.status === 1 ? '成功' : '失败' }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作时间">
            {{ dialogData.createTime }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FormInstance } from 'element-plus'
import { SysOperationLogInterfaceRes } from '@/api/system/types'
interface DialogProps {
  rowData?: SysOperationLogInterfaceRes
}

let dialogData = ref<SysOperationLogInterfaceRes>(
  {} as SysOperationLogInterfaceRes,
)

const dialogVisible = ref(false)

// props定义
const dialogProps = ref<DialogProps>()
// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  const row: any = params.rowData
  dialogData.value = row
  dialogProps.value = params
  dialogVisible.value = true
}

const ruleFormRef = ref<FormInstance>()
// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
