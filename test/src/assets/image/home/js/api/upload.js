import axios from 'axios'
import { uploadConfig } from '@js/config'
import { formatDate, err } from '@util'
import cookie from '@js/cookie'
const { projectName } = uploadConfig

// 现在后台这边修改了下方式，桶这些都需要请求这个接口获取
let Bucket, Region
getTempCredential(({ data }) => {
  Bucket = data.bucket
  Region = data.region
})
// TODO
// 图片压缩
export function upload2Cos (featureName, file, cb, onProgress) {
  // featureName 功能名称
  const cos = new window.COS({
    ProgressInterval: 200, // 进度回调时间
    // 必选参数
    getAuthorization: function (options, callback) {
      getTempCredential(({ code, data }) => {
        const { credentials } = data
        callback({
          TmpSecretId: credentials.tmpSecretId,
          TmpSecretKey: credentials.tmpSecretKey,
          XCosSecurityToken: credentials.sessionToken,
          ExpiredTime: data.expiredTime // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
        })
      })
    }
  })

  // 当前日期，formatDate函数请自行创建
  const [date, time] = formatDate(new Date(), 'yyyyMMdd hhmmss').split(' ')
  // 6位随机字符串
  const randomStr = Math.random()
    .toString(36)
    .substr(2, 6)
  // 文件后缀名称 文件名不需要encode 因为腾讯会帮你encode一次
  const fileName = file.name
  const key = `${projectName}/${featureName}/${date}/${time}${randomStr}_${fileName}`

  cos.putObject(
    {
      Bucket: Bucket,
      Region: Region,
      Key: key /* 必须 */,
      Body: file /* 必须 */,
      onProgress: onProgress
    },
    function (err, data) {
      if (err) {
        console.log(err)
      } else {
        cb({
          code: 200,
          data: {
            goodsViewPath: `https://${data.Location}`
          }
        })
      }
    }
  )
}

function getTempCredential (cb) {
  const option = {
    method: 'post',
    url: `${uploadConfig.queryUrl}?appCode=${uploadConfig.appCode}`,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'X-JWT': cookie.getItem('X-JWT')
    }
  }
  axios(option).then(res => {
    if (res.data.code !== 200) {
      console.log(res.data)
      return err('获取上传服务失败')
    }
    if (cb) cb(res.data)
  })
}
