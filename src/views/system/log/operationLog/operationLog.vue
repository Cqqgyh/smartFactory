<template>
  <el-card>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getSysOperationLogList"
      :initParam="initParam"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          v-auth="[ButtonPermission.SysLog.OperLogList]"
          type="primary"
          link
          icon="View"
          @click="handleView(scope.row)"
        >
          查看
        </el-button>
      </template>
    </ProTable>
    <OperationDialog ref="DialogRef" />
  </el-card>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import ProTable from '@/components/ProTable/src/ProTable.vue'
import OperationDialog from './components/OperationDialog.vue'
import { SysOperationLogInterfaceRes } from '@/api/system/types'
import { getSysOperationLogList } from '@/api/system'
import { ButtonPermission } from '@/enums/constEnums'

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref<InstanceType<typeof ProTable>>()

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '序号', width: 80 },
  {
    prop: 'title',
    label: '操作模块',
    width: 150,
    search: {
      el: 'input',
      props: { placeholder: '请输入操作模块' },
    },
  },
  {
    prop: 'operName',
    label: '操作人',
    width: 150,
    search: {
      el: 'input',
      props: { placeholder: '请输入操作人' },
    },
  },
  { prop: 'businessType', label: '操作类型', width: 120 },
  { prop: 'requestMethod', label: '请求方式', width: 120 },
  { prop: 'operIp', label: '操作IP', width: 120 },
  { prop: 'method', label: '请求方法' },
  {
    prop: 'status',
    label: '操作状态',
    width: 120,
    render: ({ row }: { row: SysOperationLogInterfaceRes }) => {
      return <span>{row.status === 1 ? '成功' : '失败'}</span>
    },
  },
  {
    prop: 'operatingTime',
    label: '操作时间',
    width: 220,
    search: {
      el: 'date-picker',
      span: 2,
      props: {
        type: 'datetimerange',
        'range-separator': '至',
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        format: 'YYYY-MM-DD HH:mm:ss',
        'value-format': 'YYYY-MM-DD HH:mm:ss',
        clearable: true,
      },
    },
    render: ({ row }: { row: SysOperationLogInterfaceRes }) => {
      return <span>{row.createTime}</span>
    },
  },

  { prop: 'operation', label: '操作', fixed: 'right', width: 100 },
]

// *查询参数
const initParam = reactive({})

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}
// 打开Dialog
const DialogRef = ref()
const openDialog = (
  rowData: SysOperationLogInterfaceRes = {} as SysOperationLogInterfaceRes,
) => {
  const params = {
    rowData: { ...rowData },
  }
  console.log('params', params)
  DialogRef.value.acceptParams(params)
}
// 查看
const handleView = (row: SysOperationLogInterfaceRes) => {
  openDialog(row)
}
</script>
