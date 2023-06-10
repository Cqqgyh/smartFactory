<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getSysUserList"
      :initParam="initParam"
    >
      <template #tableHeader="scope">
        <el-button
          v-auth="[ButtonPermission.SysUser.Add]"
          type="primary"
          icon="Plus"
          @click="openDrawer('新增')"
        >
          添加
        </el-button>
        <el-button
          v-auth="[ButtonPermission.SysUser.Remove]"
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
          v-auth="[ButtonPermission.SysUser.AssignRole]"
          type="primary"
          link
          icon="UserFilled"
          @click="openDrawer('分配角色', scope.row)"
        >
          分配角色
        </el-button>
        <el-button
          v-auth="[ButtonPermission.SysUser.Update]"
          type="primary"
          link
          icon="Edit"
          @click="openDrawer('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-auth="[ButtonPermission.SysUser.Remove]"
          type="primary"
          link
          icon="Delete"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx">
import { computed, onMounted, reactive, ref } from 'vue'
import { ColumnProps, EnumProps } from '@/components/ProTable/src/types'
import UserDrawer from './components/UserDrawer.vue'
import { useHandleData } from '@/hooks/useHandleData'
import { ElMessage } from 'element-plus'
import {
  addSysUser,
  assignSysUserRoles,
  batchSysUser,
  deleteSysUserById,
  getSysDeptTree,
  getSysPostList,
  getSysRoleList,
  getSysUserList,
  getUserRolesListByUserId,
  updateSysUser,
  updateSysUserStatus,
} from '@/api/system'
import {
  DeptInterfacesRes,
  PostInterfacesRes,
  Role,
  SysUserInterfaceRes,
} from '@/api/system/types'
import { ButtonPermission } from '@/enums/constEnums'
import { useAuthButtons } from '@/hooks/useAuthButtons'
// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *查询参数
const initParam = reactive({})

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}

// *新增、编辑、分配角色
const drawerRef = ref()
const openDrawer = async (
  title: string,
  rowData: Partial<SysUserInterfaceRes> = {} as SysUserInterfaceRes,
) => {
  let params = {
    title,
    rowData: { ...rowData },
    list:
      title === '分配角色'
        ? await getUserRolesListByUserId(rowData!.id || '')
        : [],
    api:
      title === '新增'
        ? addSysUser
        : title === '编辑'
        ? updateSysUser
        : assignSysUserRoles,
    getTableList: proTable.value?.getTableList,
    postList: title !== '分配角色' ? postList.value : [],
    deptList: title !== '分配角色' ? deptList.value : [],
  }
  console.log(params)
  drawerRef.value.acceptParams(params)
}

// *根据id删除用户
const handleDelete = async (row: SysUserInterfaceRes) => {
  if (row?.username === 'admin') {
    ElMessage({
      type: 'warning',
      message: `系统用户不允许删除`,
    })
    return
  }
  await useHandleData(
    deleteSysUserById,
    row.id as number,
    `删除${row.username}用户`,
  )
  proTable.value?.getTableList()
}

// *批量删除用户
const batchDelete = async (ids: string[]) => {
  await useHandleData(batchSysUser, ids, '删除所选用户信息')
  proTable.value?.clearSelection()
  proTable.value?.getTableList()
}
// 岗位列表
const postList = ref([] as PostInterfacesRes[])
// 获取全部岗位列表
const getPostList = async () => {
  try {
    const res = await getSysPostList()
    postList.value = res.data
  } catch (error) {
    console.log(error)
    ElMessage.error((error as any)?.message || 'Has Error')
  }
}
// 部门列表
const deptList = ref([] as DeptInterfacesRes[])
// 获取全部部门列表
const getDeptList = async () => {
  try {
    const res = await getSysDeptTree()
    deptList.value = res.data
  } catch (error) {
    console.log(error)
    ElMessage.error((error as any)?.message || 'Has Error')
  }
}
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 80 },
  { type: 'index', label: '序号', width: 80 },
  {
    prop: 'username',
    label: '用户名',
    width: 120,
    search: { el: 'input', props: { placeholder: '输入用户名' } },
  },
  {
    prop: 'roleId',
    label: '角色',
    width: 150,
    enum: getSysRoleList,
    isShow: false,
    fieldNames: { label: 'roleName', value: 'id' },
    search: { el: 'select', props: { placeholder: '请选择角色' } },
  },
  {
    prop: 'postId',
    label: '岗位',
    width: 150,
    isShow: false,
    enum: computed(() => {
      return postList.value || []
    }) as unknown as EnumProps[],
    fieldNames: { label: 'name', value: 'id' },
    search: { el: 'select', props: { placeholder: '请选择岗位' } },
  },
  {
    prop: 'deptId',
    label: '部门',
    width: 150,
    isShow: false,
    enum: computed(() => {
      return deptList.value || []
    }) as unknown as EnumProps[],
    fieldNames: { label: 'name', value: 'id' },
    search: {
      el: 'tree-select',
      props: {
        placeholder: '请选择部门',
      },
    },
  },
  { prop: 'name', label: '用户昵称', width: 70 },
  { prop: 'phone', label: '手机', width: 120 },
  { prop: 'postName', label: '岗位', width: 70 },
  { prop: 'deptName', label: '部门', width: 100 },
  {
    prop: 'roleName',
    label: '所属角色',
    width: 100,
    render: ({ row }) => {
      return row.roleList.map((item: Role) => (
        <el-tag key={item.id} class="flex-wrap m-r-10 m-t-5">
          {item.roleName}
        </el-tag>
      ))
    },
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    render: ({ row }) => {
      return (
        <el-switch
          active-value={1}
          inactive-value={0}
          v-model={row.status}
          disabled={
            !useAuthButtons().BUTTONS.value[ButtonPermission.SysMenu.Update]
          }
          onChange={() => updateSysUserStatus(row.id, row.status)}
        ></el-switch>
      )
    },
  },
  { prop: 'createTime', label: '创建时间', sortable: true },
  { prop: 'updateTime', label: '更新时间', sortable: true, width: 200 },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]
onMounted(() => {
  getPostList()
  getDeptList()
})
</script>
