const app = getApp()

Page({
  data: {

  },
  onLoad: function () {},
  onPickDateChange(value) {
    console.log('parent', value)
  },
  onControl(event) {
    console.log('parent onControl', event)
  },
  onPickDay(event) {
    console.log('parent onPickDay', event)
  },
  onRangePick(event) {
    console.log('parent onRangePick', event)
  }
})
