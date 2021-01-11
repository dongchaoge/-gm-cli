import { Toast } from 'vant'
// 节流
export function throttle (fn, delay = 30) {
  let ctx
  let args
  let previous = Date.now()
  const later = function () {
    fn.apply(ctx, args)
  }
  return function () {
    ctx = this
    args = arguments
    const now = Date.now()
    const diff = now - previous - delay
    if (diff >= 0) {
      previous = now
      setTimeout(later, delay)
    }
  }
}

// 成功提示弹窗
export function success (msg, time) {
  Toast.success(msg)
}
// 失败提示弹窗
export function err (msg, time) {
  Toast.fail(msg)
}
// 感叹号提示窗
export function sigh (msg, time) {
  Toast.fail(msg)
}

// 格式化数据,正数加“+”
export function filterPlusOrMinus (num) {
  if (num === '' || num === undefined) {
    return '--'
  }
  return `${num}`.includes('-') ? num : `+${num}`
}
// 格式化价格,小数点后2位
export function filterPrice (num, bit = 2) {
  if (!num) return '--'
  const value = (+num).toFixed(bit)
  return isNaN(value) ? '--' : value
}
// 格式化数量,小数点后3位
export function filterNumber (num, bit = 3) {
  if (!num) return num
  const value = (+num).toFixed(bit)
  return isNaN(value) ? 0 : +value
}
// 千分隔
export function milliFormat (num, count) {
  if (!num || isNaN(num)) {
    if (count) {
      const num = 0
      return num.toFixed(count)
    }
    if (num === 0) {
      return 0
    }
    return '--'
  }
  if (!count && count !== 0) {
    count = 2
  }
  num = (+num).toFixed(count)
  const [integer, decimal] = num.split('.')
  let value = integer.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  if (decimal) {
    value = `${value}.${decimal}`
  }
  return value
}
// 数字转中文
export function digitalToUppercase (n) {
  n = +n
  if (isNaN(n)) {
    return '-'
  }
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [
    ['元', '万 ', '亿'],
    ['', '拾', '佰', '仟']
  ]
  const head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(+(n * 10 * Math.pow(10, i)).toFixed(2)) % 10] +
      fraction[i]
    ).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  s = s.replace(/undefined/g, 0)
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  )
}
export const clone = function copy (copyObj) {
  const type = Object.prototype.toString.call(copyObj)
  if (~['[object Array]', '[object Object]'].indexOf(type)) {
    const target = type === '[object Array]' ? [] : {}
    for (const key in copyObj) {
      target[key] = copy(copyObj[key])
    }
    return target
  }
  return copyObj
}
export function formatDate (date, format) {
  if (!date) {
    return ''
  }
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    date = new Date(date.replace(/-/g, '/'))
  }
  var paddNum = function (num) {
    num += ''
    return num.replace(/^(\d)$/, '0$1')
  }
  // 指定格式字符
  var cfg = {
    yyyy: date.getFullYear(), // 年 : 4位
    yy: date
      .getFullYear()
      .toString()
      .substring(2), // 年 : 2位
    M: date.getMonth() + 1, // 月 : 如果1位的时候不补0
    MM: paddNum(date.getMonth() + 1), // 月 : 如果1位的时候补0
    d: date.getDate(), // 日 : 如果1位的时候不补0
    dd: paddNum(date.getDate()), // 日 : 如果1位的时候补0
    h: date.getHours(), // 时
    hh: paddNum(date.getHours()), // 时
    mm: paddNum(date.getMinutes()), // 分
    ss: paddNum(date.getSeconds()) // 秒
  }
  format || (format = 'yyyy-MM-dd hh:mm:ss')
  return format.replace(/([a-z])(\1)*/gi, function (m) {
    return cfg[m]
  })
}

export function json2str (json) {
  if (typeof json === 'string') {
    return json
  }
  try {
    return JSON.stringify(json)
  } catch (e) {
    return json
  }
}

export function str2json (str) {
  if (!str) {
    return {}
  }
  if (typeof str === 'object') {
    return str
  }
  try {
    return JSON.parse(str)
  } catch (e) {
    return {}
  }
}

export function copyText (text) {
  const input = document.createElement('input')
  input.setAttribute('readonly', 'readonly')
  input.setAttribute('value', text)
  document.body.appendChild(input)
  input.setSelectionRange(0, 9999)
  input.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    success('复制成功')
  } else {
    err('复制失败')
  }
  document.body.removeChild(input)
}
