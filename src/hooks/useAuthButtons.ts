/*
 * @Author: 朽木白
 * @Date: 2023-03-14 14:33:36
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-14 14:36:01
 * @Description: 页面按钮权限
 */

import { computed } from 'vue'
import { useAuthStore } from '@/store/modules/auth'

/**
 * @description 页面按钮权限
 * */
export const useAuthButtons = () => {
  const authStore = useAuthStore()
  const authButtons = authStore.authButtonList || []

  // 当前页按钮权限列表
  const BUTTONS = computed(() => {
    const currentPageAuthButton: { [key: string]: boolean } = {}
    authButtons.forEach((item) => (currentPageAuthButton[item] = true))
    return currentPageAuthButton
  })

  return {
    BUTTONS,
  }
}
