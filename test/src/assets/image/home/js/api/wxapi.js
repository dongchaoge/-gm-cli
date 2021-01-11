import axios from 'axios'
// 获取微信用户信息
export function getWxMpUinfoByCode (data, cb, errCallback) {
  return axios.post('https://stapi.jjh9999.com/nodebase/v1/wechat/getWxMpUinfoByCode', data).then(cb).catch(errCallback)
}
