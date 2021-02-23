<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button slot="title" type='info' round size="small" icon="search" class="search-btn">
        搜索
      </van-button>
    </van-nav-bar>

    <!-- 标签页滚动 -->
    <van-tabs v-model="active" animated swipeable class="channel-tab">
        <van-tab :title="item.name" v-for="item in channels" :key="item.id">
          <!-- 文章列表组件  -->
          <ArticleList :channel="item"></ArticleList>
        </van-tab>
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="humburger-btn">
          <i class="iconfont icongengduo"></i>
        </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/user.js'
// 文章列表组件
import ArticleList from './components/article-list.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  computed: {

  },
  watch: {},
  created () {
    this.getChannel()
  },
  mounted () {},
  methods: {
    async getChannel () {
      try {
        const { data } = await getUserChannel()
        this.channels = data.data.channels
      } catch (error) {
        if (error.response.status === 507) {
          this.$toast.fail('数据库错误，获取频道列表失败!')
        }
      }
    }
  }
}
</script>

<style lang="less">
.home-container{
  margin-bottom: 100px;
  .page-nav-bar{
    background-color: #3296fa;
  }
  .van-nav-bar__title{
    max-width: unset;
  }
  .search-btn{
    width: 555px;
    height: 64px;
    color: #fff;
    background-color: #5babfb;
    border: none;
    font-size:28px;
    i.van-icon{
      font-size: 32px;
      color: #fff;
    }
  }
  /deep/ .channel-tab{
    .van-tabs__wrap{
      height: 82px;
    }
    .van-tab{
      min-width: 200px;
      border-right: 1px solid #edeff3;
      color: #777777;
      font-size:28px ;
    }
    .van-tab--active{
      color:#333333;
      font-size: 30px;
    }
    .van-tabs__nav{
      padding-bottom: 0;
    }
    .van-tabs__line{
      // 底部任务条
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder{
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .humburger-btn {
       width: 66px;
       height: 82px;
       position: fixed;
       display: flex;
       font-size: 33px;
       background-color: #fff;
       opacity: 0.902;
       justify-content: center;
       align-items: center;
       right: 0;
       i.iconfont{
         font-size: 33px;
       }
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      height: 100%;
      width: 1px;
      background-image: url('~@/assets/gradient-gray-line.png');
      background-size: cover;
    }
  }
}
</style>
