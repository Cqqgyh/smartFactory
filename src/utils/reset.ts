/*
 * @Author: 朽木白
 * @Date: 2023-03-03 16:41:20
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-15 11:40:51
 * @Description: 重置用户信息
 */
import { useUserStore } from '@/store/modules/user'
import { useAuthStore } from '@/store/modules/auth'
export function RESEETSTORE() {
  const userStore = useUserStore()
  const authStore = useAuthStore()

  userStore.$reset()
  authStore.$reset()
  // 清除用户信息缓存
  localStorage.removeItem('app-user')
}
