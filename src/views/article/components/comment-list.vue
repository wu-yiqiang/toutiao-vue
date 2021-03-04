<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <CommentsItem v-for="(item, index) in list" :key="index" :title="item.content" :comment="item" @update-is_liking="item.is_liking = $event" @replay-click="$emit('replay-click', $event)"/>
  </van-list>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { getComments } from '@/api/comment.js'
import CommentsItem from './comments-item.vue'
export default {
  name: 'CommentList',
  components: {
    CommentsItem
  },
  // 定义属性
  model: {},
  props: {
    source: {
      type: [Number, String],
      require: true
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      refreshing: false,
      offset: null, // 获取下一次请求的时间戳
      limit: 10 // 每次获取的数据
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onLoad () {
      /*
       * 1.请求获取数据
       * 2.将数据添加到列表中
       * 3.将loading设置为false
       * 4.判断是否含有数据
       * 5.如果还有数据，就请求下一页数据
       * 6.没有数据就将finished设置为true
      */
      try {
        const { data } = await getComments({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        this.$emit('onload-success', data.data)
        this.list.push(...results)
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
        console.log(this.list)
      } catch (error) {
        this.toast({ message: '获取评论列表失败!', duration: 500 })
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.onLoad()
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
