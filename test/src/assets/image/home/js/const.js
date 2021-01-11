// 金盎司转人民币
export const OZT = 31.1034768

// 所有code对应的type
const codeType = {
  // 买
  100: 'buy',
  // 卖
  200: 'sell',
  // 转入-存款
  10: 'moneyIn',
  // 转出-提款
  11: 'moneyOut',
  // 提料
  20: 'stockOut',
  // 存料
  21: 'stockIn',
  // 提料结价
  22: 'stockOutPrice',
  // 存料结价
  23: 'stockInPrice',
  // 买单交割
  30: 'deliveryIn',
  // 卖单交割
  31: 'deliveryOut'
}
Object.keys(codeType).map(key => {
  codeType[codeType[key]] = key
})

export const getCodeType = type => {
  return codeType[type]
}

// 审核状态
export const stateType = {
  1: '审核中',
  3: '待收发货',
  5: '待检验',
  7: '待收付尾款',
  9: '已驳回',
  10: '已完成'
}
// 审核状态对应的code
export const stateTypeCode = {
  1: 'ing',
  9: 'reject',
  10: 'done',
  4: 'wait'
}

// 价格的正则
export const PRICE_REG = /^[-]?\d+[.]?\d*$/
