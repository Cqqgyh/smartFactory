/*
 * @Author: cqq 945327638@qq.com
 * @Date: 2023-05-23 10:34:35
 * @LastEditors: cqq 945327638@qq.com
 * @LastEditTime: 2023-05-26 18:48:05
 * @FilePath: \listen-to-books-admin\src\enums\constEnums.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function getLabelByValue(
  arr: {
    label: string
    value: string | number
  }[],
  value: string,
): string {
  const item = arr.find((item) => item.value === value)
  return item ? item.label : ''
}
// 展示数据 汇总0 PC端 1 移动端 2
export enum ShowType {
  All = 0,
  PC = 1,
  WAP = 2,
}
export const ShowTypeMap = [
  { label: '汇总', value: ShowType.All },
  { label: 'PC', value: ShowType.PC },
  { label: 'WAP', value: ShowType.WAP },
]
// 日期类型
export enum DateType {
  Day = 0,
  Week = 1,
  Month = 2,
}
// 活跃类型 0留存 2活跃
export enum LivenessType {
  Retain = 0,
  Active = 1,
}
// 按钮权限
export const ButtonPermission = {
  // 用户管理
  SysUser: {
    List: 'bnt.sysUser.list',
    Add: 'bnt.sysUser.add',
    Update: 'bnt.sysUser.update',
    Remove: 'bnt.sysUser.remove',
    AssignRole: 'bnt.sysUser.assignRole',
  },
  // 角色管理
  SysRole: {
    List: 'bnt.sysRole.list',
    Add: 'bnt.sysRole.add',
    Update: 'bnt.sysRole.update',
    Remove: 'bnt.sysRole.remove',
    AssignAuth: 'bnt.sysRole.assignAuth',
  },
  // 菜单管理
  SysMenu: {
    List: 'bnt.sysMenu.list',
    Add: 'bnt.sysMenu.add',
    Update: 'bnt.sysMenu.update',
    Remove: 'bnt.sysMenu.remove',
  },
  // 部门管理
  SysDept: {
    List: 'bnt.sysDept.list',
    Add: 'bnt.sysDept.add',
    Update: 'bnt.sysDept.update',
    Remove: 'bnt.sysDept.remove',
  },
  // 岗位管理
  SysPost: {
    List: 'bnt.sysPost.list',
    Add: 'bnt.sysPost.add',
    Update: 'bnt.sysPost.update',
    Remove: 'bnt.sysPost.remove',
  },
  // 操作日志
  SysLog: {
    OperLogList: 'bnt.sysOperLog.list',
    LoginLogList: 'bnt.sysLoginLog.list',
  },
}
// 性别 0 男 1 女
export enum GenderType {
  male = 0,
  female = 1,
}
// 性别
export const GenderTypeMap = [
  { label: '男', value: GenderType.male },
  { label: '女', value: GenderType.female },
]
// 教育类型
export enum EducationType {
  BACHELOR_AND_ABOVE = 0,
  JUNIOR_COLLEGE = 1,
  HIGH_SCHOOL = 2,
  JUNIOR_HIGH_SCHOOL = 3,
  ELEMENTARY_SCHOOL = 4,
}
// 教育类型
export const EducationTypeMap = [
  { label: '本科及以上', value: EducationType.BACHELOR_AND_ABOVE },
  { label: '大专', value: EducationType.JUNIOR_COLLEGE },
  { label: '高中', value: EducationType.HIGH_SCHOOL },
  { label: '初中', value: EducationType.JUNIOR_HIGH_SCHOOL },
  { label: '小学', value: EducationType.ELEMENTARY_SCHOOL },
]
