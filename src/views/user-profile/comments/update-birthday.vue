<template>
  <div class="update-birthday">
    <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="$emit('close')" @confirm="onConfirm"/>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  components: {},
  // 定义属性
  model: {},
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2050, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onConfirm () {
      this.$toast.loading({ message: '日期修改中', forbidClick: true, duration: 0 })
      try {
        const localBirthday = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfile({ birthday: localBirthday })
        // 更新视图
        this.$emit('input', localBirthday)
        // 关闭弹窗
        this.$emit('close')
        // 提示成功
        this.$toast.success({ message: '更新日期成功！', duration: 500 })
      } catch (error) {
        this.$toast({ message: '更新日期失败', duration: 500 })
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='less' scoped>
</style>
