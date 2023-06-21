import { constructMockData } from '@/mock/mock'
import { dayjs } from 'element-plus'
import Mock from 'mockjs'

/**
 * @description 工厂信息块 mock
 */
export const factoryRes = () => {
  const data = Array.from({ length: 12 }).map((item, index) => {
    return {
      // 工厂Id
      id: index + 1,
      // 工厂名称
      name: 'GuiGu-厂房' + String(index + 1).padStart(3, '0'),
      // 工厂编码
      code: Mock.Random.string('number', 6),
      // 状态
      status: Mock.Random.integer(0, 1),
      // 备注
      remark: '', // 备注
      //   温度
      temperature: Mock.Random.integer(20, 35),
      //   湿度
      humidity: Mock.Random.integer(20, 35),
      //   噪音分贝
      noise: Mock.Random.integer(0, 150),
      //   空气质量
      airQuality: Mock.Random.integer(0, 100),
      //   当日产值
      dayOutput: Mock.Random.integer(1000000 / 2, 1000000),
      // 当日计划产值
      dayPlanOutput: 1000000,
      //   当月产值
      monthOutput: Mock.Random.integer((1000000 * 30) / 2, 1000000 * 30),
      // 当月计划产值
      monthPlanOutput: 1000000 * 30,
      //   事故信息
      accidentInfoList:
        Mock.Random.integer(0, 100) > 15
          ? []
          : [
              {
                // 所属工厂
                factoryId: index + 1,
                // 事故Id
                id: Mock.Random.string('number', 6),
                // 事故开始时间
                accidentStartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                // 事故结束时间
                accidentEndTime: '',
                // 事故类型
                accidentType: '器械故障',
                // 事故描述
                accidentDesc: `${Mock.Random.integer(1, 10)}号机器故障`,
                // 事故状态 0 未处理 1 已处理
                accidentStatus: 0,
                // 事故等级
                accidentLevel: 1,
                //   事故处理人
                accidentHandler: '',
              },
            ],
    }
  })
  return constructMockData(data)
}
/**
 * @description 事故信息 mockg
 */
export const accidentInfoRes = () => {
  const data = Array.from({ length: 6 })
    .map((item, index) => {
      const accidentStatus = Mock.Random.integer(0, 10) < 2 ? 0 : 1
      return {
        // 所属工厂
        factoryId: Mock.Random.integer(1, 12),
        // 事故Id
        id: Mock.Random.string('number', 6),
        // 事故开始时间
        accidentStartTime: dayjs()
          .add(index, 'hour')
          .format('YYYY-MM-DD HH:mm:ss'),
        // 事故结束时间
        accidentEndTime: accidentStatus
          ? dayjs()
              .add(index + Mock.Random.integer(1, 5), 'hour')
              .format('YYYY-MM-DD HH:mm:ss')
          : '',
        // 事故类型
        accidentType: '器械故障',
        // 事故描述
        accidentDesc: `${Mock.Random.integer(1, 10)}号机器故障`,
        // 事故状态 0 未处理 1 已处理
        accidentStatus: accidentStatus,
        // 事故等级
        accidentLevel: 1,
        //   事故处理人
        accidentHandler: '@name',
      }
    })
    .reverse()
  return constructMockData(data)
}
