import axios from 'axios'
import bus from '@bus'
import { err } from '@util'
import { BASE_URL } from '@js/config'
import cookie from '@js/cookie'
const timeOut = 1000 * 15
export default function query (
  functionName,
  data = {},
  cb = () => {},
  errcb = () => {},
  httpType = 'post',
  then = false
) {
  let queryUrl = `${BASE_URL}${functionName}`
  if (data._queryUrl) {
    // 如果是外部接口
    queryUrl = data._queryUrl
    delete data._queryUrl
  }
  if (data.noLoading) {
    delete data.noLoading
  } else if (!then) {
    bus.$emit('showLoading')
  }
  const option = {
    data,
    method: httpType,
    url: queryUrl,
    timeout: timeOut,
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  }
  if (!data.noToken && cookie.getItem('X-JWT')) {
    option.headers['X-JWT'] = cookie.getItem('X-JWT')
  } else {
    delete data.noToken
  }
  if (data.setHeaders) {
    option.headers = Object.assign(option.headers, data.setHeaders)
  }

  if (httpType === 'get') {
    // get和head方法不能有body
    const body = Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&')
    option.url = `${queryUrl}?${body}`
  }

  if (then) {
    return axios(option)
  }
  return axios(option)
    .then(res => {
      bus.$emit('hideLoading')
      if (!res || !res.data || res.data.code !== 200) {
        console.log('queryErroe', res)
        // 登出
        if ([-10001].includes(res.data.code)) {
          console.log('api loginOut')
          err('用户信息发生改变，请重新登录，1秒后将自动登出')
          setTimeout(() => {
            bus.$emit('loginOut')
          }, 1500)
          return
        }
        err(res.data.code === 500 ? '服务器维护中...' : res.data.msg)
        if (errcb) errcb(res.data)
        return
      }
      if (cb) cb(res.data)
      return res.data
    })
    .catch(res => {
      bus.$emit('hideLoading')
      console.log('queryCatch::', res)
      // err('服务器未响应，请稍后再试。')
      if (errcb) errcb(res)
    })
}
