<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button round type="danger" plain size="mini" class="edit-btn" @click="showEdit">{{isedit ?  "完成" : "编辑"}}</van-button>
    </van-cell>
    <!-- 我的频道宫格板块 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item  v-for="(item,index) in myChannels" :key="index"  class="grid-item">
        <van-icon slot="icon" name="clear"  @click="onMyChannellick(item, index)" v-show="isedit  && !fixItem.includes(item.id)"></van-icon>
        <span slot="text" :class="{ active: index === myActive }" class="text">{{item.name}}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐列表 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!-- 频道推荐宫格板块 -->
    <van-grid :gutter="10" class="recommend-item">
      <van-grid-item v-for="(value, index) in recommendChannels" :key="index" icon="plus" class="grid-item" :text="value.name" @click="addChannel(value)"/>
    </van-grid>
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { channelAllList, addUserChannel, deletcUserChannel } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  components: {},
  // 定义属性
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    myActive: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allchannels: [], // 所有频道
      isedit: false, // 删除按键的显示与隐藏
      fixItem: [0] // 固定不要删除的频道
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      /* 推荐频道数据 */
      const channels = []
      this.allchannels.forEach(channel => {
        // 遍历所有频道，并将属于个人频道的数据剔除，并返回剩下的频道
        const ret = this.myChannels.find(mychannel => {
          return mychannel.id === channel.id
        })
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async loadAllChannels () {
      /* 获取所有用户的频道列表 */
      try {
        const { data } = await channelAllList()
        this.allchannels = data.data.channels
      } catch (error) {
        this.$toast('获所有频道失败！')
      }
    },
    async addChannel (channelName) {
      /* 为添加用户频道 */
      this.myChannels.push(channelName)
      // 数据持久化
      if (this.user) {
        // 用户已登录状态,将请求接口放在线上
        try {
          await addUserChannel({
            id: channelName.id,
            seq: this.myChannels.length
          })
        } catch (error) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录，将数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    showEdit () {
      /* 删除按键的显示与隐藏 */
      this.isedit = !this.isedit
    },
    onMyChannellick (channel, index) {
      /* 删除用户频道 */
      if (this.isedit) {
        if (this.fixItem.includes(channel.id)) {
          return
        }
        this.myChannels.splice(index, 1)
        if (index <= this.myActive) {
          this.$emit('update-active', index - 1, true)
        }
        // 数据持久化
        this.deleteChannel(channel)
      } else {
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (channel) {
      /* 将删除的数据 */
      try {
        if (this.user) {
          // 已登录，将数据更新到线上
          await deletcUserChannel(channel.id)
        } else {
          // 未登录将数据存储到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        this.$toast('删除用户列表失败，请稍后重试')
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadAllChannels()
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
.channel-edit{
  padding:85px 0;
  .title-text{
    font-size: 32px;
    color: #333;
  }
  .edit-btn{
    width: 104px;
    height: 48px;
    font-size: 26px;
    color:#f85959;
    border:1px solid #f85959;
  }
  /deep/ .grid-item{
    width: 160px;
    height: 86px;
    .van-grid-item__content{
      background-color: #f4f5f6;
      white-space: nowrap;
      display: flex;
      flex-direction: row;
      justify-content:center;
      align-items: center;
      .van-grid-item__icon-wrapper{
        position: unset;
      }
      .van-grid-item__text, .text{
        font-size: 28px;
        color:#222;
        margin-top:0;
      }
      .active  {
        color:red;
      }
      .van-icon-clear{
        position:absolute;
        top: -10px;
        right:-10px;
        color: #cacaca;
        z-index: 2;
        font-size: 30px;
      }
      .van-grid-item__icon{
        font-size: 24px;
        margin-right:15px;
      }
      .van-grid-item__text{
        font-size: 28px;
        color:#222;
        margin-top: 0;
      }
    }
  }
}
</style>
