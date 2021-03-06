<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button slot="title" type='info' round size="small" icon="search" class="search-btn" router to='/search'>
        搜索
      </van-button>
    </van-nav-bar>

    <!-- 标签页滚动 -->
    <van-tabs v-model="active" animated swipeable class="channel-tab" >
        <van-tab :title="item.name" v-for="item in channels" :key="item.id">
          <!-- 文章列表组件  -->
          <keep-alive>
            <ArticleList :channel="item"></ArticleList>
          </keep-alive>
        </van-tab>
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="humburger-btn">
          <i class="iconfont icongengduo" @click="showPopup"></i>
        </div>
    </van-tabs>

    <!-- 板块弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }"  closeable round  close-icon-position="top-left"  >
      <ChannelEdit :my-channels="channels" :my-active="active" @update-active="active = $event"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/user.js'
// 文章列表组件
import ArticleList from './components/article-list.vue'
// 板块弹出层组件
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      show: false // 板块弹出层控制位
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.getChannel()
  },
  mounted () {
  },
  methods: {
    async getChannel () {
      try {
        let channels = []
        if (this.user) {
          const { data } = await getUserChannel()
          this.channels = data.data.channels
          console.log(this.channels)
        } else {
          // 未登录 判断是否有本地存储
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            channels = localChannels
          } else {
            const { data } = await getUserChannel()
            channels = data.data.channels
          }
          this.channels = channels
        }
      } catch (error) {
        this.$toast.fail('获取频道列表失败!')
      }
    },
    onUpdateActive (index, isChannelEditShow = true) {
      // 更新激活的频道项
      this.myActive = index
      // 关闭编辑频道弹层
    },
    showPopup () {
      /* 板块弹出层控制 */
      this.show = true
    }
  }
}
</script>

<style lang="less">
.home-container{
  margin-bottom: 100px;
  padding-top:174px;
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
      position: fixed;
      top:92px;
      left:0;
      right:0;
      z-index: 1;
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
