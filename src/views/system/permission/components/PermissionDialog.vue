<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :destroy-on-close="true"
    width="500px"
  >
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :model="permissionData"
    >
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="permissionData.type">
          <el-radio :label="0">目录</el-radio>
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <template #label>
          <span>{{ permissionData.type !== 2 ? '菜单' : '按钮' }}名称</span>
        </template>
        <el-input
          v-model="permissionData!.name"
          placeholder="请填写名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon" v-if="permissionData.type !== 2">
        <el-select v-model="permissionData.icon" clearable filterable>
          <el-option
            v-for="item in iconsList"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
            <div class="flex-align-center">
              <el-icon size="20" class="m-r-10">
                <component :is="item.value"></component>
              </el-icon>
              {{ item.value }}
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sortValue">
        <el-input-number
          v-model="permissionData.sortValue"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item :prop="permissionData.type !== 2 ? 'path' : ''">
        <template #label>
          <span>
            <el-tooltip
              content="访问的路由地址，如：`/system/user`"
              placement="top"
            >
              <el-icon size="14">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
            路由地址
          </span>
        </template>
        <el-input v-model="permissionData.path" placeholder="请输入路由地址" />
      </el-form-item>
      <el-form-item
        :prop="permissionData.type !== 2 ? 'component' : ''"
        label="组件路径"
      >
        <template #label>
          <span>
            <el-tooltip
              content="访问的组件路径，如：`/system/user/index`，默认在`views`目录下"
              placement="top"
            >
              <el-icon size="14">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
            组件路径
          </span>
        </template>

        <el-input
          v-model="permissionData.component"
          placeholder="请输入组件路径"
        />
      </el-form-item>
      <el-form-item prop="perms" v-if="permissionData.type === 2">
        <el-input
          v-model="permissionData.perms"
          placeholder="请输入按钮权限标识"
          maxlength="100"
        />
        <template #label>
          <span>
            <el-tooltip
              content="控制器中定义的权限字符，如：bnt.sysRole.list"
              placement="top"
            >
              <el-icon size="14">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
            按钮权限
          </span>
        </template>
      </el-form-item>
      <el-form-item label="高亮菜单" prop="type">
        <template #label>
          <span>
            <el-tooltip
              content="需要高亮的path，如：`/system/user/index`，默认在`views`目录下, (通常用作详情页高亮父级菜单)"
              placement="top"
            >
              <el-icon size="14">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
            高亮菜单
          </span>
        </template>
        <el-input
          v-model="permissionData.activeMenu"
          placeholder="请输入需要高亮菜单的组件路径"
        />
      </el-form-item>
      <el-form-item label="状态" prop="type">
        <el-radio-group v-model="permissionData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否隐藏" prop="type">
        <el-radio-group v-model="permissionData.isHide">
          <el-radio :label="0">显示</el-radio>
          <el-radio :label="1">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit(ruleFormRef)"
        :loading="loading"
      >
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { PermissionListInterfaceRes } from '@/api/system/types'
interface DialogProps {
  rowData?: PermissionListInterfaceRes
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

let permissionData = ref<PermissionListInterfaceRes>(
  {} as PermissionListInterfaceRes,
)
const iconsList = computed(() => {
  return Object.keys(ElementPlusIconsVue).map((key) => {
    return {
      value: key,
      label: key,
    }
  })
})
const rules = reactive({
  name: [{ required: true, message: '请填写名称' }],
  code: [{ required: true, message: '请填写权限值' }],
})

const dialogVisible = ref(false)
// dialog标题
const title = ref<string>()
const loading = ref<boolean>(false)

// props定义
const dialogProps = ref<DialogProps>()
// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  const row: any = params.rowData
  permissionData.value = row
  title.value = getDialogTitle(params)
  dialogProps.value = params
  dialogVisible.value = true
}
// 初始化dialog标题
const getDialogTitle = (params: DialogProps): string => {
  return params.rowData?.id ? '编辑' : '新增'
}
const ruleFormRef = ref<FormInstance>()

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value?.api!(permissionData.value)
      ElMessage.success({ message: `${title.value}成功！` })
      dialogProps.value?.getTableList!()
      dialogVisible.value = false
      loading.value = false
      // 重置表单
      resetForm(formEl)
    } catch (error) {
      loading.value = false
      console.log(error)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
