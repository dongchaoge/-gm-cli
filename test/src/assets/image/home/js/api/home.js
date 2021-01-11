import query from './query'

// 首页相关接口

// 获取金价行情
export function getPriceTrend (data, cb, errcb) {
  const _data = Object.assign(
    {
      // type: 'month',
      noToken: true,
      from: 'app',
      startId: 0,
      _queryUrl: 'https://stapi.jjh9999.com/qtquto/qt/getTrendAsTime'
    },
    data
  )
  return query(false, _data, cb, errcb, 'get')
}
// 获取店铺详情
export function getShopInfo (data, cb, errcb) {
  return query('/itrade/sp/shop/getAllInfo', data, cb, errcb)
}
// 获取店铺商品列表
export function getShopGoodsList (data, cb, errcb) {
  return query('/itrade/sp/goods/list', data, cb, errcb)
}
// 获取店铺商品详情
// export function getShopGoodDetail (data, cb, errcb) {
//   return query('/itrade/sp/goods/detail', data, cb, errcb)
// }

// 用户登录
export function login (data, cb, errcb) {
  data.noToken = true
  return query('/itrade/user/login', data, cb, errcb)
}
// 通过微信openId获取用户信息
export function getUserInfoByOpenId (data, cb, errcb) {
  return query('/itrade/user/getUserInfoByOpenId', data, cb, errcb)
}
// 绑定用户微信
export function bindWeChat (data, cb, errcb) {
  return query('/itrade/user/bindWeChat', data, cb, errcb)
}
