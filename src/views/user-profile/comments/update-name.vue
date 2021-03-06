<template>
  <div class="update-name">
    <van-nav-bar title="设置昵称" left-text="取消" right-text="确定" @click-left="$emit('close')" @click-right="onConfirm" />
    <div class="filed">
      <van-field v-model.trim="localName" rows="2"  autosize  type="textarea" maxlength="7" placeholder="请输输入昵称" show-word-limit/>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
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
      localName: this.value
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
        const localName = this.localName
        if (!localName.length) {
          this.$toast({ message: '昵称不能为空!', duration: 500 })
        }
        await updateUserProfile({ name: localName })
        // 更新视图
        this.$emit('input', localName)
        // 关闭弹窗
        this.$emit('close')
        // 提示成功
        this.$toast.success({ message: '更新昵称成功！', duration: 500 })
      } catch (error) {
        this.$toast({ message: '更新昵称失败', duration: 500 })
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
.update-name{
  .van-nav-bar{
  /deep/ .van-nav-bar__content{
      background-color: #fff !important;
      .van-nav-bar__title{
        color: #000 !important;
      }
    }
  }
  .filed{
    padding: 20px;
  }
}
</style>
