import query from './query'
// 我的相关接口
// 定价仓列表记录
export function getFuturesRecord (data, cb, errcb) {
  return query('/itrade/position/pricing/list', data, cb, errcb)
}
// 定价仓详情
export function getFuturesDetail (data, cb, errcb) {
  return query('/itrade/position/pricing/detail', data, cb, errcb)
}
// 未定价仓列表记录
export function getSpotRecord (data, cb, errcb) {
  return query('/itrade/position/spot/list', data, cb, errcb)
}
// 查询资金记录
export function getFundsRecord (data, cb, errcb) {
  return query('/itrade/asset/list/capital', data, cb, errcb)
}
// 查询交割记录
export function getDeliveryRecord (data, cb, errcb) {
  return query('/itrade/delivery/list', data, cb, errcb)
}
// 存提料记录
export function getDepositedRecord (data, cb, errcb) {
  return query('/itrade/deposited/list', data, cb, errcb)
}
// 仓息记录
export function getInterestRecord (data, cb, errcb) {
  return query('/itrade/asset/list/storage-interest', data, cb, errcb)
}
// 获取存提料详情
export function getDepositedRecordDetail (data, cb, errcb) {
  return query('/itrade/deposited/get/record-detail', data, cb, errcb)
}
// 获取仓息详情
export function getInterestRecordDetail (data, cb, errcb) {
  return query('/itrade/asset/get/storage-interest', data, cb, errcb)
}
// 获取资金流水-账户资产
export function getAssetList (data, cb, errcb) {
  return query('/itrade/asset/list', data, cb, errcb)
}
// 获取资金流水-账户资产
export function getStockList (data, cb, errcb) {
  return query('/itrade/deposited/list/category', data, cb, errcb)
}
// 修改密码
export function updateMyPassword (data, cb, errcb) {
  return query('/itrade/user/updateMyPassword', data, cb, errcb)
}
// 修改头像等个人信息
export function updateMyInfo (data, cb, errcb) {
  return query('/itrade/user/updateMyInfo', data, cb, errcb)
}
// 通过userCode获取用户信息
export function getUserByCode (data, cb, errcb) {
  return query('/itrade/user/getUserByCode', data, cb, errcb)
}
