// * 分页请求参数
export interface ReqPage {
  pageNum: number
  pageSize: number
}

// * 分页响应参数
export interface PageRes<T> {
  records: T[]
  pageNum?: number
  pageSize?: number
  total: number
}
