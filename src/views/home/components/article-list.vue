<template>
  <div class="article-list">
    <van-pull-refresh v-model="isFreshLoading" @refresh="onRefresh" :success-text="updateDateCount" success-duration="1500">
      <van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  :error.sync="error" error-text="请求失败，点击重新加载">
        <ArticleItem v-for="(item,index) in list" :key="index" :article="item" ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/acticle'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
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
      error: false, // 控制失败提示状态
      isFreshLoading: true, // 控制下拉刷新菜单
      updateDateCount: '' // 控制每次下拉菜单时更新数据时的提示文本
    }
  },
  created () {},
  methods: {
    async onLoad () {
      /* 获取当前文章列表页面的内容 */
      // console.log(this.channel)
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const result = data.data.results
        this.list.push(...result)
        this.loading = false
        if (result.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      /* 控制下拉刷新 */
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const result = data.data.results
        const count = result.length
        this.list.unshift(...result)
        this.updateDateCount = `更新了${count}条数据`
      } catch (error) {
        this.isFreshLoading = false
        this.updateDateCount = '刷新数据失败'
      }
      this.isFreshLoading = false
    }
  }
}
</script>

<style lang="less">
.article-list{
  height: 79vh;
  overflow-y:auto;
}
</style>
