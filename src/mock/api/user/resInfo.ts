/*
 * @Author: cqq 945327638@qq.com
 * @Date: 2023-06-02 14:29:11
 * @LastEditors: cqq 945327638@qq.com
 * @LastEditTime: 2023-06-02 18:26:39
 * @FilePath: \InvestmentAdmin\src\mock\api\user\resInfo.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { constructMockData } from '@/mock/mock'

// 登陆信息
export const loginInfoRes = constructMockData({
  token: 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ',
})
// 用户信息
export const userInfoRes = constructMockData({
  buttons: [],
  roles: [],
  name: '@name',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  routers: [
    {
      path: '/system/user',
      component: '',
      alwaysShow: true,
      meta: {
        title: '系统管理',
        icon: 'Setting',
        activeMenu: '',
        isHide: true,
      },
      children: [
        {
          path: '/system/user',
          component: '/system/user/user',
          alwaysShow: false,
          meta: {
            title: '用户管理',
            icon: 'UserFilled',
            activeMenu: '',
            isHide: false,
          },
          children: null,
        },
        {
          path: '/system/role',
          component: '/system/role/role',
          alwaysShow: false,
          meta: {
            title: '角色管理',
            icon: 'UserFilled',
            activeMenu: '',
            isHide: false,
          },
          children: null,
        },
        {
          path: '/system/permission',
          component: '/system/permission/permission',
          alwaysShow: false,
          meta: {
            title: '菜单管理',
            icon: 'Menu',
            activeMenu: '',
            isHide: false,
          },
          children: null,
        },
        {
          path: '/system/department',
          component: '/system/department/department',
          alwaysShow: false,
          meta: {
            title: '部门管理',
            icon: 'Menu',
            activeMenu: '',
            isHide: false,
          },
          children: null,
        },
        {
          path: '/system/post',
          component: '/system/post/post',
          alwaysShow: false,
          meta: {
            title: '岗位管理',
            icon: 'Menu',
            activeMenu: '',
            isHide: false,
          },
          children: null,
        },
        {
          path: '/system/log',
          component: '/system/log/operationLog',
          alwaysShow: true,
          meta: {
            title: '日志管理',
            icon: 'Document',
            activeMenu: '',
            isHide: false,
          },
          children: [
            {
              path: '/system/log/operationLog',
              component: '/system/log/operationLog/operationLog',
              alwaysShow: false,
              meta: {
                title: '操作日志',
                icon: 'DocumentRemove',
                activeMenu: '',
                isHide: false,
              },
              children: null,
            },
            {
              path: '/system/log/loginLog',
              component: '/system/log/loginLog/loginLog',
              alwaysShow: false,
              meta: {
                title: '登录日志',
                icon: 'DocumentRemove',
                activeMenu: '',
                isHide: false,
              },
              children: null,
            },
          ],
        },
      ],
    },
  ],
})
