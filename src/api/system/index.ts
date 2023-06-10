/*
 * @Author: cqq 945327638@qq.com
 * @Date: 2023-05-24 14:39:06
 * @LastEditors: cqq 945327638@qq.com
 * @LastEditTime: 2023-05-26 18:47:06
 * @FilePath: \listen-to-books-admin\src\api\system\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from '@/utils/http'
import {
  AssignPermissionInterfaceReq,
  AssignRolesInterfaceReq,
  DeptInterfacesRes,
  PageResponseInterface,
  PermissionListInterfaceRes,
  PostInterfacesRes,
  Role,
  RoleListParamsInterfaceReq,
  SysLoginLogListParamsInterfaceReq,
  SysOperationLogListParamsInterfaceReq,
  SysPostListParamsInterfaceReq,
  SysUserInterfaceRes,
  SysUserListParams,
  UserRolesListInterfaceRes,
} from '@/api/system/types'
/**
 * @description 获取后台用户分页列表(带搜索)
 * @param params
 */
export function getSysUserList(params: SysUserListParams) {
  return http.get<PageResponseInterface<SysUserInterfaceRes>>(
    `/admin/system/sysUser/${params.pageNum}/${params.pageSize}`,
    {
      username: params.username,
      roleId: params.roleId,
      postId: params.postId,
      deptId: params.deptId,
    },
  )
}
/**
 * @description 更新用户状态
 * @param id
 * @param status
 */
export function updateSysUserStatus(id: number, status: number) {
  return http.get(`/admin/system/sysUser/updateStatus/${id}/${status}`)
}
/**
 * @description 获取全部角色列表
 */
export function getSysRoleList() {
  return http.get<Role>(`/admin/system/sysRole/findAll`)
}
/**
 * @description 获取全部岗位列表
 */
export function getSysPostList() {
  return http.get<PostInterfacesRes[]>(`/admin/system/sysPost/findAll`)
}
/**
 * @description 获取全部部门节点
 */
export function getSysDeptTree() {
  return http.get<DeptInterfacesRes[]>(`/admin/system/sysDept/findNodes`)
}
/**
 * @description 新增用户
 */
export function addSysUser(params: SysUserInterfaceRes) {
  return http.post(`/admin/system/sysUser/save`, params)
}
/**
 * @description 更新用户
 */
export function updateSysUser(params: SysUserInterfaceRes) {
  return http.put(`/admin/system/sysUser/update`, params)
}
/**
 * @description 删除用户
 * @param id
 */
export function deleteSysUserById(id: number | string) {
  return http.delete(`/admin/system/sysRole/remove/${id}`)
}
/**
 * @description:   获取某个用户的所有角色
 * @param {string} userId
 */
export function getUserRolesListByUserId(userId: string | number) {
  return http.get<PageResponseInterface<UserRolesListInterfaceRes>>(
    `/admin/system/sysRole/toAssign/${userId}`,
  )
}
/**
 * @description: 批量删除用户
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchSysUser(ids: string[]) {
  return http.delete<PageResponseInterface<any>>(
    `/admin/system/sysRole/batchRemove`,
    ids,
  )
}
/**
 * @description:   给某个用户分配角色
 * @param {AssignRolesInterfaceReq} params
 */
export function assignSysUserRoles(params: AssignRolesInterfaceReq) {
  // Post方法传递get参数的方式需要下面这么写
  return http.post(`/admin/system/sysRole/doAssign`, params)
}
/**
 * @description 获取后台用户分页列表(带搜索)
 * @param params
 */
export function getSysRoleUserList(params: RoleListParamsInterfaceReq) {
  return http.get<PageResponseInterface<Role>>(
    `/admin/system/sysRole/${params.pageNum}/${params.pageSize}`,
    { roleName: params.roleName },
  )
}
/**
 * @description 查看某个角色权限列表
 * @param roleId
 */
export function getSysRolePermission(roleId: string | number) {
  return http.get<PageResponseInterface<PermissionListInterfaceRes[]>>(
    `admin/system/sysMenu/toAssign/${roleId}`,
  )
}
/**
 * @description 给某个角色分配权限
 * @param data
 */
export function assignSysRolePermission(data: AssignPermissionInterfaceReq) {
  return http.post(`/admin/system/sysMenu/doAssign`, data)
}
/**
 * @param roleData
 */
export function addSysRole(roleData: Role) {
  return http.post(`/admin/system/sysRole/save`, roleData)
}

/**
 * @description 修改角色
 * @param roleData
 */
export function updateSysRole(roleData: Role) {
  return http.put(`/admin/system/sysRole/update`, roleData)
}
/**
 * @description 删除角色
 * @param { string } id
 * @returns {<PageRes<any>>}
 */
export function deleteSysRole(id: string | number) {
  return http.delete(`/admin/system/sysRole/remove/${id}`)
}
/**
 * @description: 批量删除角色
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchSysRole(ids: (string | number)[]) {
  return http.delete<PageResponseInterface<any>>(
    `/admin/system/sysRole/batchRemove`,
    ids,
  )
}
/**
 * @description 获取权限菜单列表
 * @returns
 */
export function getSysPermissionList() {
  return http.get<PermissionListInterfaceRes[]>(
    `/admin/system/sysMenu/findNodes`,
  )
}
// 修改更新权限菜单
export function updateSysPermission(data: PermissionListInterfaceRes) {
  return http.put(`/admin/system/sysMenu/update`, data)
}
/**
 * @description 新增菜单
 * @returns
 * @param data
 */
export function addSysMenu(data: PermissionListInterfaceRes) {
  return http.post(`/admin/system/sysMenu/save`, data)
}

/**
 * @description 修改菜单
 * @returns
 * @param data
 */
export function updateSysMenu(data: PermissionListInterfaceRes) {
  return http.put(`/admin/system/sysMenu/update`, data)
}
/**
 * @description 删除菜单
 * @param { string } id
 * @returns
 */
export function deleteSysMenu(id: string | number) {
  return http.delete(`/admin/system/sysMenu/remove/${id}`)
}
/**
 * @description 更新部门状态
 * @param id
 * @param status
 */
export function updateSysDepartmentStatus(id: number, status: number) {
  return http.get(`/admin/system/sysDept/updateStatus/${id}/${status}`)
}
/**
 * @description 新增部门
 * @returns
 * @param data
 */
export function addSysDepartment(data: DeptInterfacesRes) {
  return http.post(`/admin/system/sysDept/save`, data)
}
/**
 * @description 修改更新部门
 * @returns
 * @param data
 */
export function updateSysDepartment(data: DeptInterfacesRes) {
  return http.put(`/admin/system/sysDept/update`, data)
}
/**
 * @description 删除部门
 * @param { string } id
 * @returns
 */
export function deleteSysDepartment(id: string | number) {
  return http.delete(`/admin/system/sysDept/remove/${id}`)
}
/**
 * @description 获取后台岗位分页列表(带搜索)
 * @param params
 */
export function getSysPostListPaginate(params: SysPostListParamsInterfaceReq) {
  return http.get<PageResponseInterface<PostInterfacesRes[]>>(
    `/admin/system/sysPost/${params.pageNum}/${params.pageSize}`,
    {
      name: params.name,
      postCode: params.postCode,
      status: params.status,
    },
  )
}
/**
 * @description 更新岗位状态
 * @param id
 * @param status
 */
export function updateSysPostStatus(id: number, status: number) {
  return http.get(`/admin/system/sysPost/updateStatus/${id}/${status}`)
}
/**
 * @description 新增部门
 * @returns
 * @param data
 */
export function addSysPost(data: PostInterfacesRes) {
  return http.post(`/admin/system/sysPost/save`, data)
}
/**
 * @description 修改更新部门
 * @returns
 * @param data
 */
export function updateSysPost(data: PostInterfacesRes) {
  return http.put(`/admin/system/sysPost/update`, data)
}
/**
 * @description 删除部门
 * @param { string } id
 * @returns
 */
export function deleteSysPostById(id: string | number) {
  return http.delete(`/admin/system/sysPost/remove/${id}`)
}
/**
 * @description 获取后台操作日志列表(带搜索)
 * @param params
 */
export function getSysOperationLogList(
  params: SysOperationLogListParamsInterfaceReq,
) {
  return http.get<PageResponseInterface<SysUserInterfaceRes[]>>(
    `/admin/system/sysOperLog/${params.pageNum}/${params.pageSize}`,
    {
      title: params.title,
      operName: params.operName,
      createTimeBegin: params.operatingTime && params.operatingTime[0],
      createTimeEnd: params.operatingTime && params.operatingTime[1],
    },
  )
}
/**
 * @description 获取后台登陆日志列表(带搜索)
 * @param params
 */
export function getSysLoginLogList(params: SysLoginLogListParamsInterfaceReq) {
  return http.get<PageResponseInterface<SysUserInterfaceRes[]>>(
    `/admin/system/sysLoginLog/${params.pageNum}/${params.pageSize}`,
    {
      username: params.username,
      createTimeBegin: params.operatingTime && params.operatingTime[0],
      createTimeEnd: params.operatingTime && params.operatingTime[1],
    },
  )
}
