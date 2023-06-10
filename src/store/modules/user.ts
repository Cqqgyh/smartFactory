/*
 * @Author: 朽木白
 * @Date: 2023-02-06 11:02:58
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-10 15:22:05
 * @Description: 用户store
 */
import { defineStore } from 'pinia'
import { getUserInfo, logout } from '@/api/user'
import type { UserState } from './model/userModel'
import type { UserInfo, UserRes } from '@/api/user/types'
import { useAuthStore } from './auth'
import { RESEETSTORE } from '@/utils/reset'
import { userInfoRes } from '@/mock/api/user/resInfo'
export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: '',
    userInfo: null,
  }),
  actions: {
    // setToken
    setToken(token: string) {
      this.token = token
    },
    // setUserInfo
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    async GetInfoAction() {
      let data: UserRes
      // 判断是否开启mock 开启mock则使用mock数据 否则使用接口数据 为了兼容vite中没有require同步引入模式导致的在拦截器中，不能同步引入并执行而造成的错误
      if (import.meta.env?.VITE_APP_OPEN_MOCK?.toString() === 'true') {
        data = userInfoRes as unknown as UserRes
      } else {
        const res = await getUserInfo()
        data = res.data
      }
      const { avatar, buttons, name, roles, routers } = data
      const authStore = useAuthStore()
      // 存储用户信息
      this.setUserInfo({ avatar, name })
      // 存储用户权限信息
      authStore.setAuth({ buttons, roles, routers })
    },
    async Logout() {
      await logout()
      RESEETSTORE()
    },
  },
  // 设置为true，缓存state
  persist: true,
})
