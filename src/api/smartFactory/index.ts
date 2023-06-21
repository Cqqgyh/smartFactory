import http from '@/utils/http'
import {
  AccidentInfoInterfaceRes,
  FactoryInfoInterfaceRes,
} from '@/api/smartFactory/types'
/**
 * @description 获取工厂信息
 */
export function getFactoryInfo() {
  return http.get<FactoryInfoInterfaceRes[]>(`/admin/factory/info`)
}
/**
 * @description 获取当天事故信息
 */
export function getAccidentInfo() {
  return http.get<AccidentInfoInterfaceRes[]>(`/admin/accident/info`)
}
