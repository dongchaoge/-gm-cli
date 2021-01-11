import query from './query'
// 资产相关接口
// 资产页面转入,转出
export function updateFunds (data, cb, errcb) {
  return query('/itrade/asset/update/capital', data, cb, errcb)
}

// 发起交割
export function updateDelivery (data, cb, errcb) {
  return query('/itrade/delivery/save', data, cb, errcb)
}
// 发起存提料
export function updateDeposited (data, cb, errcb) {
  return query('/itrade/deposited/save', data, cb, errcb)
}
// 获取商品品种
export function getGoodsCategory (data, cb, errcb) {
  return query('/itrade/sp/goods/listGoodsCategory', data, cb, errcb)
}
// 获取存提料类型
export function getTypeCategory (data, cb, errcb) {
  if (data.type === 'in') {
    cb({
      data: [{
        name: '存料 延期结价',
        key: 21
      }, {
        name: '存料 交割定价仓',
        key: 31
      }]
    })
  } else {
    cb({
      data: [{
        name: '提料 延期结价',
        key: 20
      }, {
        name: '提料 交割定价仓',
        key: 30
      }]
    })
  }
}
// 获取用户品类下可交割重量
export function getDeliveryWeight (data, cb, errcb) {
  return query('/itrade/deposited/get/delivery-weight', data, cb, errcb)
}
// 获取用户对应品类的存提料
export function getDeposited (data, cb, errcb) {
  return query('/itrade/deposited/get/deposited', data, cb, errcb)
}
// 存提料结价
export function junctionPrice (data, cb, errcb) {
  return query('/itrade/position/junction-price', data, cb, errcb)
}
// 获取商铺交割地址列表
export function getShopAddress (data, cb, errcb) {
  return query('/itrade/sp/shop-address/list', data, cb, errcb)
}

// 获取用户资金信息，包括持仓列表
export function getAllFunds (data, cb, errcb) {
  return query('/itrade/asset/get/capital', data, cb, errcb)
}
// 获取用户资金信息，包括持仓列表
export function getBankList (data, cb, errcb) {
  return query('/itrade/bank/list/user', data, cb, errcb)
}
