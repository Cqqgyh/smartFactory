/*
 * @Author: cqq 945327638@qq.com
 * @Date: 2023-06-02 11:24:21
 * @LastEditors: cqq 945327638@qq.com
 * @LastEditTime: 2023-06-03 23:12:27
 * @FilePath: \InvestmentAdmin\src\mock\api\user\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useMockOnAny } from '@/mock/mock'
import { loginInfoRes, userInfoRes } from '@/mock/api/user/resInfo'
const mockOnAny = useMockOnAny()
// 登陆
mockOnAny('/admin/system/securityLogin/login', loginInfoRes)
// 获取用户信息
mockOnAny('/admin/system/index/info', userInfoRes)
// 退出登陆
mockOnAny('/admin/system/index/logout', {})
