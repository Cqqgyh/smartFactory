/**
 * @description 网站流量模块 mock
 */
import { useMockOnAny } from '@/mock/mock'
import { websiteTrafficRes } from '@/mock/api/template/resInfo'

const mockOnAny = useMockOnAny()
/**
 * @description 网站流量
 */
mockOnAny('/admin/websiteTraffic/dashboard/info', websiteTrafficRes)
