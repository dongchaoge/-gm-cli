export const isDev = process.env.VUE_APP_NODE_ENV === 'development'
export const isTest = process.env.VUE_APP_NODE_ENV === 'test'
export const isRelease = process.env.VUE_APP_NODE_ENV === 'production'
export const uploadConfig = {
  appCode: 'ITRADE',
  queryUrl: 'https://dev-public-api.jjh9999.com/bm-base/objectStorage/getTempCredential',
  projectName: isRelease ? 'itrade-h5' : 'itrade-h5_test' // 项目名称
}
// 获取code跳转地址
export let REDIRECT_URL = ''
export let BASE_URL = ''
export let SOCKET_URL_BUSINESS = ''
if (isDev) {
  REDIRECT_URL = 'https://sj.jjh9999.com/auth4dev'
  BASE_URL = 'https://dev-itrade-api.jjh9999.com'
  SOCKET_URL_BUSINESS = 'wss://dev-itrade-api.jjh9999.com/websocket'
}
if (isTest) {
  REDIRECT_URL = 'https://sj.jjh9999.com/auth4itradetest'
  BASE_URL = 'https://test-itrade-api.jjh9999.com'
  SOCKET_URL_BUSINESS = 'wss://test-itrade-api.jjh9999.com/websocket'
}
if (isRelease) {
  REDIRECT_URL = 'https://sj.jjh9999.com/auth4itrade'
  BASE_URL = 'https://itrade-api.jjh9999.com'
  SOCKET_URL_BUSINESS = 'wss://itrade-api.jjh9999.com/websocket'
}
export const SOCKET_TOKEN = 'junit:test'
export const SOCKET_URL_PEICR = 'wss://stws.jjh9999.com/'

// 微信appId
export const APP_ID = 'wx4574520159f9de5c' // 'wxbdcc4af4cbcf5857' 金嘉汇 // wx4574520159f9de5c 宝嘉汇
// 获取APP信息
export const WX_APP_NAME = 'WXMP_BAOJIAHUI' // // WXMP_JINJIAHUI 金嘉汇 // 宝嘉汇 WXMP_BAOJIAHUI
