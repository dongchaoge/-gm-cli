import pako from 'pako'
if (window.WebSocket) {
} else {
  alert('请更换浏览器，该浏览器不支持WebSocket')
}
class Bus {
  constructor () {
    this.events = {}
  }
  $emit (name, ...param) {
    if (this.events[name]) {
      this.events[name].forEach(fun => {
        if (typeof fun === 'function') {
          fun(...param)
        }
      })
    }
  }
  $on (name, fun) {
    if (this.events[name]) {
      this.events[name].push(fun)
    } else {
      this.events[name] = [fun]
    }
  }
  $off (name, fun) {
    if (!this.events[name]) {
      return
    }
    if (fun) {
      this.events[name].forEach((f, i) => {
        if (f === fun) {
          this.events[name].splice(i, 1)
        }
      })
    } else {
      delete this.events[name]
    }
  }
}
// const bus = {}
const socketObj = {}
window.socketObj = socketObj
const control = {
  init (url, encryption = true) {
    const bus = new Bus()
    const thisSocket = (socketObj[url] = socketObj[url] || {
      open: false,
      ready: false
    })
    contact()
    function contact () {
      const socket = new WebSocket(url)
      socket.onopen = () => {
        console.log(url, '连接成功')
        thisSocket.open = true
        thisSocket.ready = true
        bus.$on('socket_send', data => {
          socket.send(JSON.stringify(data))
        })
        bus.$on('socket_close', () => {
          socket.close()
        })
        bus.$emit('socket_on', 'open')
      }
      socket.onmessage = res => {
        if (encryption) {
          try {
            const strData = atob(res.data)
            const charData = strData.split('').map(function (x) {
              return x.charCodeAt(0)
            })
            const binData = new Uint8Array(charData)
            const data = pako.inflate(binData, { to: 'string' })
            const msg = JSON.parse(data)
            bus.$emit('socket_on_msg', msg, url)
          } catch (e) {
            console.log(e)
            // console.log(res.data)
          }
        } else {
          try {
            const msg = JSON.parse(res.data)
            bus.$emit('socket_on_msg', msg, url)
          } catch (e) {
            console.log(e)
            // console.log(res.data)
          }
        }
      }
      socket.onerror = () => {
        console.log('连接错误')
        handleClose()
      }
      socket.onclose = () => {
        console.log('连接已关闭...')
        handleClose()
      }
    }

    function handleClose () {
      thisSocket.open = false
      clearTimeout(thisSocket.timeOut)
      bus.$off('socket_send')
      thisSocket.timeOut = setTimeout(() => {
        bus.$emit('socket_on', 'reconnection')
        contact()
      }, 5000)
    }
    return bus
  }
}
export default {
  init: control.init
}
