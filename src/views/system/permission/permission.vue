<template>
  <div>
    <ProTable
      ref="proTable"
      :pagination="false"
      :columns="columns"
      :requestApi="getSysPermissionList"
    >
      <template #tableHeader>
        <el-button
          v-auth="[ButtonPermission.SysMenu.Add]"
          type="primary"
          icon="Plus"
          @click="openDialog(0)"
        >
          添加
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          v-auth="[ButtonPermission.SysMenu.Add]"
          type="primary"
          link
          icon="UserFilled"
          v-if="scope.row.type !== 2"
          @click="openDialog(0, scope.row)"
        >
          添加
        </el-button>
        <el-button
          v-auth="[ButtonPermission.SysMenu.Update]"
          type="primary"
          link
          icon="Edit"
          @click="openDialog(1, scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-auth="[ButtonPermission.SysMenu.Remove]"
          type="primary"
          link
          icon="Delete"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <PermissionDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import DynamicComponentBox from '@/components/DynamicComponentBox/DynamicComponentBox.vue'
import { useHandleData } from '@/hooks/useHandleData'
import PermissionDialog from './components/PermissionDialog.vue'
import {
  addSysMenu,
  deleteSysMenu,
  getSysPermissionList,
  updateSysMenu,
  updateSysPermission,
} from '@/api/system'
import { PermissionListInterfaceRes } from '@/api/system/types'
import { ElMessage } from 'element-plus'
import { ButtonPermission } from '@/enums/constEnums'
import { useAuthButtons } from '@/hooks/useAuthButtons'

const columns = [
  { prop: 'name', label: '名称', align: 'left', width: 150 },
  {
    prop: 'icon',
    label: '图标',
    render: ({ row }: { row: PermissionListInterfaceRes }) => {
      return row.icon ? (
        <el-icon size="14">
          <DynamicComponentBox is={row.icon} />
        </el-icon>
      ) : (
        ''
      )
    },
  },
  { prop: 'perms', label: '按钮权限标识', width: 150 },
  { prop: 'path', label: '路由地址', width: 150 },
  { prop: 'component', label: '组件路径', width: 250 },
  { prop: 'sortValue', label: '排序' },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    render: ({ row }: { row: PermissionListInterfaceRes }) => {
      return (
        <el-switch
          active-value={1}
          inactive-value={0}
          v-model={row.status}
          disabled={
            !useAuthButtons().BUTTONS.value[ButtonPermission.SysMenu.Update]
          }
          onChange={() => updateSysPermissionStatus(row)}
        ></el-switch>
      )
    },
  },
  { prop: 'createTime', label: '创建时间' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()
// 打开Dialog
const DialogRef = ref()
const openDialog = (
  type: number, // 0 新增 1 编辑
  rowData: PermissionListInterfaceRes = {} as PermissionListInterfaceRes,
) => {
  let initRowData = {
    type: 0,
    sortValue: 1,
    isHide: 0,
    status: 1,
  } as PermissionListInterfaceRes
  initRowData.parentId = rowData.id || 0
  const params = {
    rowData: type == 0 ? { ...initRowData } : { ...rowData },
    api: type == 0 ? addSysMenu : updateSysMenu,
    getTableList: proTable.value?.getTableList,
  }
  console.log('params', params)
  DialogRef.value.acceptParams(params)
}
// *根据id删除菜单
const handleDelete = async (row: Partial<PermissionListInterfaceRes> = {}) => {
  await useHandleData(deleteSysMenu, row!.id as number, `删除${row.name}`)
  proTable.value?.getTableList()
}
// 修改更新状态
const updateSysPermissionStatus = async (row: PermissionListInterfaceRes) => {
  try {
    await updateSysPermission(row)
  } catch (error) {
    console.log(error)
    ElMessage.error((error as any)?.message || 'Has Error')
  }
}
</script>
