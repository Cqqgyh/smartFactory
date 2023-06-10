import { constructMockData } from '@/mock/mock'
import { AxiosRequestConfig } from 'axios'
import { dayjs } from 'element-plus'
import Mock from 'mockjs'
import { DateType } from '@/enums/constEnums'

/**
 * @description 网站流量模块 mock
 * @param config
 */
export const websiteTrafficRes = (config: AxiosRequestConfig<any>) => {
    const { dateRange, type, dateType } = JSON.parse(config.data)
    const titleMap = {
        [DateType.Day]: ['今日', '昨日', '日环比', '周环比'],
        [DateType.Week]: ['本周', '上周', '周环比', '月环比'],
        [DateType.Month]: ['本月', '上月', '月环比', '年环比'],
    }
    // 计算需要多少天的数据
    const [startDate, endDate] = dateRange
    const diffDays = dayjs(endDate).diff(startDate, 'day') + 1
    //#region <生成overviewDataList>
    // 生成overviewDataList
    let overviewDataList = [
        {
            type,
            title: titleMap[dateType as DateType][0],
            pv: Mock.Random.integer(0, 1000),
            uv: Mock.Random.integer(0, 1000),
            uid: Mock.Random.integer(0, 1000),
            avgVisitTime: Mock.Random.integer(0, 1000),
            maxOnline: Mock.Random.integer(0, 1000),
        },
        {
            title: titleMap[dateType as DateType][1],
            pv: Mock.Random.integer(0, 1000),
            uv: Mock.Random.integer(0, 1000),
            uid: Mock.Random.integer(0, 1000),
            avgVisitTime: Mock.Random.integer(0, 1000),
            maxOnline: Mock.Random.integer(0, 1000),
        },
    ]
    overviewDataList = [
        ...overviewDataList,
        {
            title: titleMap[dateType as DateType][2],
            pv: `${(
                ((overviewDataList[0].pv - overviewDataList[1].pv) /
                    overviewDataList[1].pv) *
                100
            ).toFixed(2)}%`,
            uv: `${(
                ((overviewDataList[0].uv - overviewDataList[1].uv) /
                    overviewDataList[1].uv) *
                100
            ).toFixed(2)}%`,
            uid: `${(
                ((overviewDataList[0].uid - overviewDataList[1].uid) /
                    overviewDataList[1].uid) *
                100
            ).toFixed(2)}%`,
            avgVisitTime: `${(
                ((overviewDataList[0].avgVisitTime - overviewDataList[1].avgVisitTime) /
                    overviewDataList[1].avgVisitTime) *
                100
            ).toFixed(2)}%`,
            maxOnline: `${(
                ((overviewDataList[0].maxOnline - overviewDataList[1].maxOnline) /
                    overviewDataList[1].maxOnline) *
                100
            ).toFixed(2)}%`,
        },
        {
            title: titleMap[dateType as DateType][3],
            pv: '',
            uv: '',
            uid: '',
            avgVisitTime: '',
            maxOnline: '',
        },
    ]
    //#endregion
    //#region <生成flowDataList数据>
    // 生成flowDataList数据
    const flowDataList = Array.from({ length: diffDays }).map((item, index) => {
        return {
            type,
            date: dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
            pv: Mock.Random.integer(0, 1000),
            uv: Mock.Random.integer(0, 1000),
            uid: Mock.Random.integer(0, 1000),
            avgVisitTime: Mock.Random.integer(0, 1000),
            maxOnline: Mock.Random.integer(0, 1000),
        }
    })
    //如果是请求的当日数据，则需要修改当日的数据为对应的当日数据
    console.log(
        'DateType.Day.toString() === dateType',
        DateType.Day,
        dateType,
        DateType.Day === dateType,
    )
    if (DateType.Day === dateType) {
        const targetDate = flowDataList.find(
            (item) => item.date === dayjs().format('YYYY-MM-DD'),
        )
        if (targetDate) {
            targetDate.uv = overviewDataList[0].uv
            targetDate.pv = overviewDataList[0].pv
            targetDate.uid = overviewDataList[0].uid
            targetDate.avgVisitTime = overviewDataList[0].avgVisitTime
            targetDate.maxOnline = overviewDataList[0].maxOnline
        }
    }
    //#endregion
    return constructMockData({
        overviewDataList,
        flowDataList,
    })
}
