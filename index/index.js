const app = getApp()

Page({
  data: {

  },
  onLoad: function () {},
  onPickDateChange(value) {
    console.log('parent', value)
  },
  onControl(event) {
    console.log('parent control', event)
  },
  onPickDay(event) {
    console.log('parent pickday', event)
  }
})
