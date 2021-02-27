import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn') // 全局使用简体中文

Vue.filter('timeFormat', value => {
  return dayjs(value).format('YYYY-DD-MM')
})
