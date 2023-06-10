/* 登录接口参数类型 */
export interface LoginData {
  username: string
  password: string
}

export interface UserRes {
  userId?: string
  name: string
  avatar: string
  buttons: string[]
  roles: string[]
  routers: Menu.MenuOptions[]
}
/** 用户权限数据类型 */
export interface AuthInfo {
  buttons: string[]
  roles: string[]
  routers: Menu.MenuOptions[]
}

/* 用户信息接口返回值类型 */
export interface UserInfo {
  userId?: string
  name: string
  avatar: string
}
