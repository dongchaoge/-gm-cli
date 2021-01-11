import { REDIRECT_URL, APP_ID } from '@js/config'
// 获取code
export function initWxCode (state = '') {
  // state 是获取openid 之后跳转的路由
  const url = encodeURIComponent(REDIRECT_URL)

  location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
}
