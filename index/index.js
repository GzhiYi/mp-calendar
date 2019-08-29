const app = getApp()

Page({
  data: {

  },
  onLoad: function () {},
  onPickDateChange(event) {
    console.log('parent onPickDateChange', event)
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
