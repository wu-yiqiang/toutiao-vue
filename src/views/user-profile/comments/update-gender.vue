<template>
  <div class="update-gender">
    <van-picker title="选择性别" show-toolbar :columns="columns" :default-index="value" @confirm="onConfirm" @cancel="$emit('close')" @change="onChange"/>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  // 定义属性
  model: {},
  props: {
    value: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onConfirm () {
      this.$toast.loading({ message: '昵称修改中', forbidClick: true, duration: 0 })
      try {
        const localGender = this.gender
        await updateUserProfile({ gender: localGender })
        // 更新视图
        this.$emit('input', localGender)
        // 提示成功
        this.$toast.success({ message: '更新性别成功！', duration: 500 })
        // 关闭弹窗
        this.$emit('close')
      } catch (error) {
        this.$toast({ message: '更新性别失败', duration: 500 })
      }
    },
    onChange (picker, value, index) {
      /* 获取改变后的值 */
      this.gender = index
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
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
