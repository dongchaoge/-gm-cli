import query from './query'
// 订单相关接口

// 发起订单
export function addOrder (data, cb, errcb) {
  return query('/itrade/order/save', data, cb, errcb)
}

// 获取订单记录列表
export function getOrderList (data, cb, errcb) {
  return query('/itrade/order/list', data, cb, errcb)
}

// 获取商品详情
export function getGoodsDetail (data, cb, errcb) {
  return query('/itrade/sp/goods/detail', data, cb, errcb)
}
