<template>
  <div>
    <ProTable
      ref="proTable"
      :columns="columns"
      :requestApi="getSysRoleUserList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader="scope">
        <el-button
          v-auth="[ButtonPermission.SysRole.Add]"
          type="primary"
          icon="Plus"
          @click="openDialog('新增')"
        >
          添加
        </el-button>
        <el-button
          v-auth="[ButtonPermission.SysRole.Remove]"
          type="danger"
          icon="Delete"
          plain
          @click="batchDelete(scope.selectedListIds)"
          :disabled="!scope.isSelected"
        >
          批量删除
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          v-auth="[ButtonPermission.SysRole.AssignAuth]"
          type="primary"
          link
          icon="UserFilled"
          @click="openDrawer('分配权限', scope.row)"
        >
          分配权限
        </el-button>
        <el-button
          v-auth="[ButtonPermission.SysRole.Update]"
          type="primary"
          link
          icon="Edit"
          @click="openDialog('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-auth="[ButtonPermission.SysRole.Remove]"
          type="primary"
          link
          icon="Delete"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <RoleDialog ref="DialogRef" />
    <DoleDrawer ref="DrawerRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import RoleDialog from './components/RoleDialog.vue'
import DoleDrawer from './components/RoleDrawer.vue'
import { Role } from '@/api/system/types'
import { useHandleData } from '@/hooks/useHandleData'
import {
  addSysRole,
  assignSysRolePermission,
  batchSysRole,
  deleteSysRole,
  getSysRolePermission,
  getSysRoleUserList,
  updateSysRole,
} from '@/api/system'
import { ButtonPermission } from '@/enums/constEnums'

const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 80 },
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'roleName',
    label: '角色名称',
    search: { el: 'input', props: { placeholder: '输入角色名称' } },
  },
  {
    prop: 'roleCode',
    label: '角色编码',
  },
  { prop: 'createTime', label: '创建时间', sortable: true },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

const proTable = ref()

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}

// 打开Dialog
const DialogRef = ref()
const openDialog = (title: string, rowData: Role = {} as Role) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addSysRole : updateSysRole,
    getTableList: proTable.value?.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// 打开Drawer
const DrawerRef = ref()
const openDrawer = async (title: string, rowData: Role) => {
  const params = {
    title: title,
    rowData,
    list: await getSysRolePermission(rowData!.id),
    api: assignSysRolePermission,
    getTableList: proTable.value?.getTableList,
  }
  console.log('params', params)
  DrawerRef.value.acceptParams(params)
}

// *根据id删除角色
const handleDelete = async (row: Role) => {
  await useHandleData(deleteSysRole, row.id, `删除${row.roleName}角色`)
  proTable.value?.getTableList()
}
// *批量删除用户
const batchDelete = async (ids: (string | number)[]) => {
  await useHandleData(batchSysRole, ids, '删除所选用户信息')
  proTable.value?.clearSelection()
  proTable.value?.getTableList()
}
</script>
