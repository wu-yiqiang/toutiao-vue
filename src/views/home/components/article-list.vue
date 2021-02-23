<template>
  <div class="article-list">
    <van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  :error.sync="error" error-text="请求失败，点击重新加载">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/acticle'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      timestamp: null, // 获取下一页的数据的事件戳
      error: false // 控制失败提示状态
    }
  },
  created () {},
  methods: {
    async onLoad () {
      /* 获取当前文章列表页面的内容 */
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { result } = data.data
        this.list.push(...result)
        this.loading = false
        if (result.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
      }
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style>

</style>
