/**
 * @description 工厂信息 mock
 */
import { useMockOnAny } from '@/mock/mock'
import { accidentInfoRes, factoryRes } from '@/mock/api/smartFactory/resInfo'

const mockOnAny = useMockOnAny()
/**
 * @description 工厂信息
 */
mockOnAny('/admin/factory/info', factoryRes)
/**
 * @description 事故信息
 */
mockOnAny('/admin/accident/info', accidentInfoRes)
