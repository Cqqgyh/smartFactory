// 工厂信息
export interface FactoryInfoInterfaceRes {
  // 工厂Id
  id: number
  // 工厂名称
  name: string
  // 工厂编码
  code: string
  // 状态
  status: number
  // 备注
  remark: string // 备注
  //   温度
  temperature: number
  //   湿度
  humidity: number
  //   噪音分贝
  noise: number
  //   空气质量
  airQuality: number
  // 当日计划产值
  dayPlanOutput: number
  //   当日产值
  dayOutput: number
  // 当月计划产值
  monthPlanOutput: number
  //   当月产值
  monthOutput: number
  //   事故信息
  accidentInfoList: AccidentInfoInterfaceRes[]
}
// 事故信息
export interface AccidentInfoInterfaceRes {
  // 所属工厂
  factoryId?: number
  // 事故Id
  id: number
  // 事故开始时间
  accidentStartTime: string
  // 事故结束时间
  accidentEndTime?: string
  // 事故类型
  accidentType: number
  // 事故描述
  accidentDesc: string
  // 事故状态 0 未处理 1 已处理
  accidentStatus: number
  // 事故等级
  accidentLevel?: number
  //   事故处理人
  accidentHandler?: string
}
