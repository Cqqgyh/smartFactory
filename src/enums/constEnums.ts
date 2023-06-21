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
