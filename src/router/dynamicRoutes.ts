import router from '@/router/index'
import { LOGIN_URL } from '@/config/config'
import { ElNotification } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { useAuthStore } from '@/store/modules/auth'
import { staticRoutes, notFoundRouter } from '@/router/constantRoutes'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const userStore = useUserStore()
  const authStore = useAuthStore()

  try {
    // 1.请求用户信息，携带路由权限信息
    await userStore.GetInfoAction()

    // 2.判断当前用户有没有菜单权限
    if (!authStore.authRouterList.length) {
      ElNotification({
        title: '无权限访问',
        message: '当前账号无任何菜单权限，请联系系统管理员！',
        type: 'warning',
        duration: 3000,
      })
      userStore.setToken('')
      router.replace(LOGIN_URL)
      return Promise.reject('No permission')
    }
    // 3.扁平化路由数组
    const flatAuthRouterList = getFlatMenuList(authStore.authRouterList)
    // 4.添加动态路由
    flatAuthRouterList.forEach((item: any) => {
      item.children && delete item.children
      if (item.component && typeof item.component == 'string') {
        item.component = modules['/src/views' + item.component + '.vue']
      }
      if (item.meta.isFull) {
        router.addRoute(item)
      } else {
        router.addRoute('LAYOUT', item)
      }
    })
    // 5.添加notFound路由
    router.addRoute(notFoundRouter)
    // 6.处理subMenu数据,静态路由和动态路由拼接，过滤isHide=true的路由
    const menuList = getMenuList([
      ...staticRoutes,
      ...authStore.authRouterList,
    ] as unknown as Menu.MenuOptions[])
    authStore.setAuthMenuList(menuList)
  } catch (error) {
    // 当按钮 || 菜单请求出错时，重定向到登陆页
    userStore.setToken('')
    router.replace(LOGIN_URL)
    return Promise.reject(error)
  }
}

/**
 * @description menu过滤
 */
function getMenuList(menuList: Menu.MenuOptions[]) {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))

  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getMenuList(item.children))
    return !item.meta?.isHide
  })
}
/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
function getFlatMenuList(menuList: Menu.MenuOptions[]): Menu.MenuOptions[] {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.flatMap((item) => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : []),
  ])
}
