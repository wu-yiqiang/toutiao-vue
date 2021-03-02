<template>
  <div class="">
     <van-icon :color="value === -1 ?  '': 'orange'" :name=" value === -1 ? 'good-job-o': 'good-job'" :loading="loading" @click="onLike"/>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { addLike, deleteLike } from '@/api/acticle'
export default {
  name: '',
  components: {},
  // 定义属性
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [Number, String],
      require: true
    },
    articleId: {
      type: [Number, String, Object],
      requre: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onLike () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 添加点赞
          await addLike(this.articleId)
        } else {
          // 删除点赞
          await deleteLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast({ message: status === 1 ? '点赞成功！' : '取消点赞成功！', duration: 500 })
      } catch (error) {
        this.$toast({ message: '点赞操作失败！', duration: 500 })
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
