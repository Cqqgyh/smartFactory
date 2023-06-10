<template>
  <div>
    <ProTable
      ref="proTable"
      :pagination="false"
      :columns="columns"
      :requestApi="getSysDeptTree"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          v-auth="[ButtonPermission.SysDept.Add]"
          type="primary"
          link
          icon="UserFilled"
          v-if="scope.row.type !== 2"
          @click="openDialog(0, scope.row)"
        >
          添加
        </el-button>
        <el-button
          v-auth="[ButtonPermission.SysDept.Update]"
          type="primary"
          link
          icon="Edit"
          @click="openDialog(1, scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-auth="[ButtonPermission.SysDept.Remove]"
          type="primary"
          link
          icon="Delete"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <DepartmentDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { useHandleData } from '@/hooks/useHandleData'
import DepartmentDialog from './components/DepartmentDialog.vue'
import {
  addSysDepartment,
  deleteSysDepartment,
  getSysDeptTree,
  updateSysDepartment,
  updateSysDepartmentStatus,
} from '@/api/system'
import { DeptInterfacesRes } from '@/api/system/types'
import { ButtonPermission } from '@/enums/constEnums'
import { useAuthButtons } from '@/hooks/useAuthButtons'
const columns = [
  { prop: 'name', label: '名称', align: 'left', width: 200 },
  { prop: 'leader', label: '部门负责人', width: 160 },
  { prop: 'phone', label: '部门电话', width: 160 },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    render: ({ row }: { row: DeptInterfacesRes }) => {
      return (
        <el-switch
          active-value={1}
          inactive-value={0}
          v-model={row.status}
          disabled={
            !useAuthButtons().BUTTONS.value[ButtonPermission.SysDept.Update]
          }
          onChange={() => updateSysDepartmentStatus(row.id, row.status)}
        ></el-switch>
      )
    },
  },
  { prop: 'createTime', label: '创建时间', sortable: true },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()
// 打开Dialog
const DialogRef = ref()
const openDialog = (
  type: number, // 0 新增 1 编辑
  rowData: DeptInterfacesRes = {} as DeptInterfacesRes,
) => {
  let initRowData = {
    leader: '',
    name: '',
    phone: '',
    id: '' as unknown as number,
  } as DeptInterfacesRes
  initRowData.parentId = rowData.id || 0
  initRowData.treePath = rowData.treePath + rowData.id + ','
  const params = {
    rowData: type == 0 ? { ...rowData, ...initRowData } : { ...rowData },
    api: type == 0 ? addSysDepartment : updateSysDepartment,
    getTableList: proTable.value?.getTableList,
  }
  console.log('params', params)
  DialogRef.value.acceptParams(params)
}
// *根据id删除部门
const handleDelete = async (row: Partial<DeptInterfacesRes> = {}) => {
  await useHandleData(deleteSysDepartment, row!.id as number, `删除${row.name}`)
  proTable.value?.getTableList()
}
</script>
