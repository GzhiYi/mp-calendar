const DAY_NUM = 42
const WEEK_DAY_NUM = 7
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
    allDays: [],
    selectedDate: '',
    today: ''
  },
  ready() {
    const now = new Date()
    this.setCalendar(this.parseTime(now, '{y}-{m}'))
    this.setData({
      selectedDate: this.parseTime(now, '{y}-{m}-{d}'),
      today: this.parseTime(now, '{y}-{m}-{d}')
    })
    console.log(this.data.selectedDate)
  },
  methods: {
    setCalendar(dateStr) {
      console.log('dateStr', dateStr)
      const self = this
      const selectDate = new Date(dateStr)
      const dateSplit = dateStr.split('-')
      const thisYear = dateSplit[0]
      const thisMonth = dateSplit[1]
      let tempWeek = new Date(`${self.parseTime(selectDate, '{y}-{m}-')}01`).getDay()
      const tMonthFirstDayWeek = tempWeek === 0 ? WEEK_DAY_NUM : tempWeek
      let lastMonthOrigin = [...Array(self.getMonthDayNum(selectDate.getFullYear(), selectDate.getMonth())).keys()]
      let thisMonthOrigin = [...Array(self.getMonthDayNum(selectDate.getFullYear(), selectDate.getMonth() + 1)).keys()]
      let nextMonthOrigin = [...Array(self.getMonthDayNum(selectDate.getFullYear(), selectDate.getMonth() + 2)).keys()]
      let lastMonthFinal = [...lastMonthOrigin].splice(lastMonthOrigin.length - (tMonthFirstDayWeek - 1), lastMonthOrigin.length)
      let nextMonthFinal = [...nextMonthOrigin].splice(0, DAY_NUM - lastMonthFinal.length - thisMonthOrigin.length)
      const pickDate = self.parseTime(selectDate, '{y}-{m}')
      this.mapMonth(thisMonthOrigin, thisYear, Number(thisMonth))
      self.setData({
        pickDate,
        pickDateDisplay: self.parseTime(selectDate, '{y}年{m}月'),
        lastMonth: this.mapMonth(lastMonthFinal, thisYear, Number(thisMonth) - 1),
        thisMonth: this.mapMonth(thisMonthOrigin, thisYear, Number(thisMonth)),
        nextMonth: this.mapMonth(nextMonthFinal, thisYear, Number(thisMonth) + 1),
        tMonthFirstDayWeek,
        allDays: [...lastMonthFinal, ...thisMonthOrigin, ...nextMonthFinal]
      })
      console.log(self.data)
    },
    mapMonth(dayArr, year, month) {
      return dayArr.map(item => {
        const date = `${year}-${month < 10 ? `0${month}` : month}-${(item + 1) < 10 ? `0${item + 1}` : item + 1}`
        const week = new Date(date).getDay()
        return {
          dateNumber: item + 1,
          date,
          week: week === 0 ? 7 : week
        }
      })
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
      const d = new Date(year, month, 0)
      return d.getDate()
    },
    control(event) {
      const { mode } = event.currentTarget.dataset
      const { pickDate } = this.data
      let dateArr = pickDate.split('-')
      let oldMonth = Number(dateArr[1])
      let oldYear = Number(dateArr[0])
      let newDate = ''
      switch(mode) {
        case 'pre':
          newDate = oldMonth === 1 ? `${oldYear - 1}-12` : `${oldYear}-${oldMonth - 1 < 10 ? `0${oldMonth - 1}` : oldMonth - 1}`
          break;
        case 'reset':
          newDate = new Date()
          this.setData({
            selectedDate: this.parseTime(new Date(), '{y}-{m}-{d}')
          })
          break;
        case 'next':
          newDate = oldMonth === 12 ? `${oldYear + 1}-01` : `${oldYear}-${oldMonth + 1 < 10 ? `0${oldMonth + 1}` : oldMonth + 1}`
          break;
      }
      this.setCalendar(this.parseTime(new Date(newDate), '{y}-{m}'))
      wx.vibrateShort()
    },
    onPickDay(event) {
      console.log(event)
      const { day } = event.currentTarget.dataset
      
      this.setData({
        selectedDate: day.date
      })
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
