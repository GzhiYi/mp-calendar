Component({
  properties: {

  },
  data: {
    pickDate: '',
    pickDateDisplay: '',
    lastMonth: [],
    thisMonth: [],
    nextMonth: [],
    tMonthFirstDayWeek: 0,
    allDays: []
  },
  ready() {
    const now = new Date()
    this.setCalendar(this.parseTime(now, '{y}-{m}'))
  },
  methods: {
    setCalendar(dateStr) {
      console.log('*****', dateStr)
      const self = this
      const now = new Date(dateStr)
      console.log('%%%%%', now)
      let tempWeek = new Date(`${self.parseTime(now, '{y},{m},')}01`).getDay()
      const tMonthFirstDayWeek = tempWeek === 0 ? 7 : tempWeek
      let lastMonthOrigin = [...Array(self.getMonthDayNum(now.getFullYear(), now.getMonth())).keys()]
      let thisMonthOrigin = [...Array(self.getMonthDayNum(now.getFullYear(), now.getMonth() + 1)).keys()]
      let nextMonthOrigin = [...Array(self.getMonthDayNum(now.getFullYear(), now.getMonth() + 2)).keys()]
      let lastMonthFinal = [...lastMonthOrigin].splice(lastMonthOrigin.length - (tMonthFirstDayWeek - 1), lastMonthOrigin.length)
      let nextMonthFinal = [...nextMonthOrigin].splice(0, 42 - lastMonthFinal.length - thisMonthOrigin.length)
      console.log('lastMonthOrigin', lastMonthOrigin)
      console.log('thisMonthOrigin', thisMonthOrigin)
      console.log('nextMonthOrigin', nextMonthOrigin)
      console.log('lastMonthFinal', lastMonthFinal)
      console.log('nextMonthFinal', nextMonthFinal)
      console.log('tMonthFirstDayWeek', tMonthFirstDayWeek)
      self.setData({
        pickDate: self.parseTime(now, '{y}-{m}'),
        pickDateDisplay: self.parseTime(now, '{y}年{m}月'),
        lastMonth: lastMonthFinal,
        thisMonth: thisMonthOrigin,
        nextMonth: nextMonthFinal,
        tMonthFirstDayWeek,
        allDays: [...lastMonthFinal, ...thisMonthOrigin, ...nextMonthFinal]
      })
      console.log(self.data)
    },
    bindPickDateChange(event) {
      console.log(event)
      const { value } = event.detail
      this.setData({
        pickDate: value,
        pickDateDisplay: this.parseTime(value, '{y}年{m}月')
      })
      this.setCalendar(value)
    },
    // 获取月天数
    getMonthDayNum(year, month) {
      console.log('来吧', year, month)
      const d = new Date(year, month, 0)
      console.log('返回', d.getDate())
      return d.getDate()
    },
    parseTime(time, cFormat) {
      if (arguments.length === 0) {
        return null
      }
      const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
        return value || 0
      })
      return timeStr
    }
  }
})
