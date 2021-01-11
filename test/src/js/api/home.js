import query from './query'

// 获取首页信息
export function getHomeInfo (data, cb, errcb) {
  return query('/getHomeInfo', data, cb, errcb)
}
