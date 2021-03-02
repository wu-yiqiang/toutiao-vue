<template>
  <van-button class="follow-btn" round size="small" v-if="isFollowed" @click="onFollows" :loading="loading">已关注</van-button>
  <van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" v-else @click="onFollows" :loading="loading">关注</van-button>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { addFollows, deleteFollows } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  // 定义属性
  props: {
    isFollowed: {
      type: Boolean,
      require: true
    },
    userId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data () {
    return {
      loading: false // 显示关注显示控制位
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onFollows () {
      /* 取消/添加关注 */
      this.loading = true
      try {
        if (this.isFollowed) {
          // 取消关注
          await deleteFollows(this.userId)
        } else {
          // 添加关注
          await addFollows(this.userId)
        }
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (error) {
        let message = '添加/取消关注失败！'
        if (error.response && error.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false
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
