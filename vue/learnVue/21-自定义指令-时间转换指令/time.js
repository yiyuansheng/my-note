let Time = {
  // 获取当前时间戳
  getUnix () {
    let date = new Date();
    return date.getTime()
  },
  // 获取今天0:0:0的时间戳
  getTodayUnix () {
    let date = new Date();
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  // 获取今年1月1日0点0分0秒的时间戳
  getYearUnix () {
    let date = new Date()
    date.setMonth(1)
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  // 获得标准年月日
  getLastDate (time) {
    let date = new Date(time)
    let month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
  },
  // 转换时间、
  getFormatTime (timestamp) {
    let now = this.getUnix()
    let today = this.getTodayUnix()
    let year = this.getYearUnix()
    let timer = (now - timestamp) / 1000
    let tip = ''
    if (timer <= 0){
      tip = '刚刚'
    }else if (Math.floor(timer / 60) <= 0) {
      tip = '刚刚'
    }else if (timer < 3600) {
      tip = Math.floor(timer / 60) +  '分钟前'
    }else if (timer >=3600 && (timestamp - today) >= 0 ) {
      tip = Math.floor(timer / 3600) + '小时前'
    }else if (timer / 86400 <= 31) {
      tip = Math.ceil(timer / 86400) + '天前'
    }else {
      tip = this.getLastDate(timestamp)
    }
    return tip
  }
}

Vue.directive('time', {
  bind (el, binding) {
    el.innerHTML = Time.getFormatTime(binding.value)
    el._timeout_ = setInterval(() => {
      el.innerHTML = Time.getFormatTime(binding.value)
    },60000)
  },
  unbind (el) {
    clearInterval(el._timeout_)
    delete el._timeout_
  }
})

