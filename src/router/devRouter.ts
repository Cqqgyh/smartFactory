/*
 * @Author: cqq 945327638@qq.com
 * @Date: 2023-06-02 08:53:51
 * @LastEditors: cqq 945327638@qq.com
 * @LastEditTime: 2023-06-03 23:13:08
 * @FilePath: \InvestmentAdmin\src\router\devRouter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @description 📚 路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
// 方便dev环境调试开发的路由
import { RouteRecordRaw } from 'vue-router'
const LAYOUT = () => import('@/layouts/index.vue')
export const devRoutes: RouteRecordRaw[] = [

]
