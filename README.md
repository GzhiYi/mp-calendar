<p align="center">
<br><br>
  <b>📅 📅</b><br>
  <b>200行js，原生小程序日历选择组件</b><br>
  <b>支持单选、范围选择，支持重置</b><br>
  <b>支持切换月份以及日期快速选择等操作</b><br>
  <br><br><br>
  <img width="600" height="770" src="https://images.vrm.cn/2019/08/29/mp-calendar.jpeg">
</p>

## 引入方式

将仓库内的calendar文件夹复制到你项目中的component目录，随后可在app.json或组件的json中按如下引入：

```json
"usingComponents": {
  "calendar": "path_to_calendar"
}
```

文件复制并在json引入后可在任意页面wxml渲染组件：

```html
<calendar></calendar>
```

文件复制到你项目内便具备高度可定义性，因此没必要开放细节样式的接口，如果样式不符合项目要求，可直接修改`calendar.wxss`内的所有样式。避免样式污染，默认组件不共享全局样式。  

同理js也具备自定义，可以随意按项目需求进行更改。

## 基本API

*务必遵循组件日期参数格式：yyyy-mm-dd，避免出现不可预料的bug*  

日历组件具备以下api：

### 属性

| 参数       | 说明    |  类型  |  默认值  |  必填  |
| --------   | -----   | ---- |  ----  |  ----  |
| defaultSelectDate|默认选中的日期| String | 当天时间 | 否 |
| showToday| 是否在日历凸显当天（下划线）   | Boolean | true | 否 |
| mode | 日历模式，传入'range'时为范围选择   | String | '' | 否 |

### 事件

| 参数       | 说明    |  回调类型【参数值】  |  ⚠️ 注意 |
| --------   | -----   | ---- |  ----  |
| onPickDateChange|左上角日期选择事件| String【选择的日期（yyyy-mm-dd）】 | - |
| onControl| 上下月份和重置按钮点击事件 | Object【mode：'next'或'reset'或 'pre'，newDate：选择的日期（yyyy-mm-dd）】| - |
| onPickDay | 点选日期事件   | Object【date：选择的日期（yyyy-mm-dd）；dateNumber：几号；position： 'pre-month'(上个月)或''(当月)或'next-month'（下个月）；week：星期（1～7 - 周一～周日）】 |回调事件仅在mode为空时才触发|
| onRangePick | 选择的日期范围   | Array【选择起始日期数据（yyyy-mm-dd）】 |回调事件仅在mode为range时才触发|

### 工具预览

[点击此处开发工具在线预览](https://developers.weixin.qq.com/s/NaSNOYmJ7oa2)

### 问题反馈

👏欢迎提交相关问题的issue，我可以尽快进行修复处理。
