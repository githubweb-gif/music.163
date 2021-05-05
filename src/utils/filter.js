import Vue from 'vue'

// 0000-00-00
Vue.filter('filterTime', (value) => {
  const date = new Date(Number(value))
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let dd = date.getDate()
  dd = dd < 10 ? '0' + dd : dd
  return `${year}-${month}-${dd}`
})

// 00:00
Vue.filter('formatTime', (time) => {
  if (!time) {
    return '00:00'
  }
  switch (true) {
    case time < 10:
      return `00:0${parseInt(time)}`
    case time === 60:
      return '01:00'
    case time < 60:
      return `00:${parseInt(time)}`
    case time > 60:
      if (parseInt(time % 60) < 10) {
        return `${parseInt(time / 60)}:0${parseInt(time % 60)}`
      }
      return `${parseInt(time / 60)}:${parseInt(time % 60)}`
    default:
      return '00:00'
  }
})

// 评论时间格式
Vue.filter('commentTime', (value) => {
  if (!value) {
    return ''
  }
  const time = new Date(value)
  const now = new Date()
  // const cz = now.getTime() - time.getTime()
  switch (true) {
    case time.getFullYear() === now.getFullYear() && time.getMonth() === now.getMonth() && time.getDate() === now.getDate():
      return `${time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`
    case time.getFullYear() === now.getFullYear() && time.getMonth() === now.getMonth() && time.getDate() === now.getDate() - 1:
      return '昨天'
    case now.getFullYear() === time.getFullYear():
      return `${time.getMonth() + 1}月${time.getDate()}日`
    default:
      return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
  }
})

// a/b/c/d
Vue.filter('artistName', (value) => {
  if (value && value.artists && value.artists.length > 0) {
    let str = ''
    value.artists.forEach((e) => {
      str += e.name + '/'
    })
    return str.slice(0, str.length - 1)
  }
  return ''
})

// 01
Vue.filter('index', (value) => {
  if (value < 10) {
    return `0${value}`
  } else {
    return value
  }
})

// 100万
Vue.filter('count',
  (val) => {
    if (val) {
      val = val.toString()
      switch (true) {
        case Math.ceil(val) >= 10000 && Math.ceil(val) < 100000:
          return `${val.slice(0, 1)}万`
        case Math.ceil(val) >= 100000 && Math.ceil(val) < 1000000:
          return `${val.slice(0, 2)}万`
        case Math.ceil(val) >= 1000000 && Math.ceil(val) < 10000000:
          return `${val.slice(0, 3)}万`
        case Math.ceil(val) >= 10000000 && Math.ceil(val) < 100000000:
          return `${val.slice(0, 4)}千万`
        default:
          return val
      }
    }
    return 0
  }
)
