<template>
  <div class="comment-replay">
    <van-nav-bar :title="`${currentComment.reply_count}条回复`" class="navbar"> <van-icon name="close" slot="left" color="#000" @click="$emit('close')"/></van-nav-bar>
    <!-- 当前评论项 -->
    <CommentItem :comment="currentComment"></CommentItem>
    <!-- 当前评论项 -->

    <!-- 评论的回复列表 -->
    <div class="scroll-wrap">
      <van-cell title="全部回复" />
      <CommentList :source="currentComment.com_id"  type="c"></CommentList>
    </div>
    <!-- /评论的回复列表 -->

    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button size='mini' round class="post-btn">写评论</van-button>
    </div>
    <!-- /发布评论 -->
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import CommentItem from './comments-item'
import CommentList from './comment-list'
export default {
  name: 'CommentReplay',
  components: {
    CommentItem,
    CommentList
  },
  // 定义属性
  model: {},
  props: {
    currentComment: {
      type: Object,
      require: true
    }
  },
  data () {
    return {}
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
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
.comment-replay {
  /deep/ .van-nav-bar__content{
    padding-top: 30px;
    background-color: #fff !important;
    .van-nav-bar__title{
      color: #000 !important;
    }
    .van-nav-bar__left{
      padding-top: 30px;
    }
  }
  .scroll-wrap{
    position: fixed;
    top:92px;
    left:0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
  }
  .post-wrap{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top:1px solid #d8d8d8 ;
    .post-btn{
      width: 60%;
    }
  }
}
</style>
