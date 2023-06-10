<template>
  <el-drawer
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="450px"
    :title="`${drawerProps.title}`"
  >
    <el-form label-width="100px" label-suffix=" :">
      <el-form-item label="角色名称">
        <el-input
          disabled
          v-model="drawerProps.rowData!.roleName"
          placeholder="请填写角色名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="权限列表" prop="permissionId">
        <div class="tree-border">
          <el-tree
            :check-strictly="checkStrictly"
            ref="treeRef"
            node-key="id"
            show-checkbox
            default-expand-all
            :default-checked-keys="checkedKeys"
            :data="allPermission"
            :props="defaultProps"
          />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { ElMessage, ElTree } from 'element-plus'
import { PermissionListInterfaceRes } from '@/api/system/types'
interface DrawerProps {
  title: string
  rowData?: any
  list?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

// drawer框状态
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  title: '',
})

const defaultProps = {
  children: 'children',
  label: 'name',
}
const allPermission = ref<PermissionListInterfaceRes[]>([])
const checkedKeys = ref<(string | number)[]>([])
const loading = ref<boolean>(false)
const treeRef = ref<InstanceType<typeof ElTree>>()
// 用于修复tree严格父子不关联组件的bug
const checkStrictly = ref(true)
// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  const { list } = params
  drawerProps.value = params
  drawerVisible.value = true
  allPermission.value = list.data
  checkedKeys.value = getCheckedIds(list.data)
}

// 获取选中的id
const getCheckedIds = (
  auths: PermissionListInterfaceRes[],
  initArr: (string | number)[] = [],
): (string | number)[] => {
  auths.forEach((item: PermissionListInterfaceRes) => {
    if (item.select) {
      initArr.push(item.id as number)
    }
    if (item.children) {
      getCheckedIds(item.children, initArr)
    }
  })
  // 修复tree严格父子不关联组件的bug
  nextTick(() => {
    checkStrictly.value = false
  })
  return initArr
}

const handleSubmit = async () => {
  try {
    // 获取selectdKeys
    const checkedKeys = treeRef.value?.getCheckedKeys() || []
    // 获取半选中
    const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys() || []
    const params = {
      roleId: drawerProps.value.rowData.id,
      menuIdList: [...checkedKeys, ...halfCheckedKeys],
    }
    loading.value = true
    await drawerProps.value.api!(params)
    ElMessage.success({ message: `${drawerProps.value.title}成功！` })
    drawerProps.value.getTableList!()
    drawerVisible.value = false
    // 角色分配成功，刷新当前页面
    // window.location.reload()
    loading.value = false
  } catch (error) {
    loading.value = true
    console.log(error)
  }
}

defineExpose({
  acceptParams,
})
</script>
<style lang="scss" scoped>
.tree-border {
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  border: 1px solid #dcdfe6;
  border-radius: 2.5px;
}
</style>
