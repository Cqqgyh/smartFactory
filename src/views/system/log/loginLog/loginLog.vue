<template>
  <el-card>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getSysLoginLogList"
      :initParam="initParam"
    ></ProTable>
  </el-card>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import ProTable from '@/components/ProTable/src/ProTable.vue'
import { SysLoginLogInterfaceRes } from '@/api/system/types'
import { getSysLoginLogList } from '@/api/system'

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref<InstanceType<typeof ProTable>>()

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '序号', width: 80 },
  {
    prop: 'username',
    label: '登录用户',
    width: 150,
    search: {
      el: 'input',
      props: { placeholder: '请输入登录用户' },
    },
  },
  { prop: 'ipaddr', label: '登录IP' },
  {
    prop: 'status',
    label: '操作状态',
    width: 120,
    render: ({ row }: { row: SysLoginLogInterfaceRes }) => {
      return <span>{row.status === 1 ? '成功' : '失败'}</span>
    },
  },
  { prop: 'msg', label: '提示信息', width: 120 },
  {
    prop: 'operatingTime',
    label: '登陆时间',
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
    render: ({ row }: { row: SysLoginLogInterfaceRes }) => {
      return <span>{row.createTime}</span>
    },
  },
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
</script>
