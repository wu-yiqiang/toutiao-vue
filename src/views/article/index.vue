<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    >
      <van-icon name="arrow-left" color="#fff" slot="left" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap" >
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo"/>
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate |  timeFormat }}</div>
          <followUser :is-followed="article.is_followed" class="follow-btn" :user-id="article.aut_id" @update-is_followed="article.is_followed = $event"></followUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content" ref="articleContentRef"></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章的评论列表 -->
        <comment-list  :source="article.art_id" @onload-success="totalComments = $event.total_count" :list="commentList" @replay-click="onReplayClick"></comment-list>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="isShow = true">写评论</van-button>
          <van-icon  name="comment-o" :info="totalComments" color="#777"/>
          <CollectArticle v-model="article.is_collected" :article-id="article.art_id"></CollectArticle>
          <LikeArticle v-model="article.attitude" :article-id="article.art_id"></LikeArticle>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
       <!-- /底部区域 -->
       <!-- 回复文章弹出层 -->
       <van-popup v-model="isShow" position="bottom" close-on-click-overlay>
          <CommentPost :target="article.art_id" @close-popup="onPostSuccess($event)"></CommentPost>
       </van-popup>
       <!--/回复文章弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArtile">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

      <!--回复评论弹出层 -->
      <van-popup v-model="IsReplayShow" position="bottom" close-on-click-overlay :style="{height: '95%'}">
        <CommentReplay :current-comment="currentComment" @close="IsReplayShow = false"></CommentReplay>
      </van-popup>
      <!--/回复评论弹出层 -->
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { getArticleById } from '@/api/acticle'
import { ImagePreview } from 'vant'
import followUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list.vue'
import CommentPost from './components/comment-post'
import CommentReplay from './components/comment-replay'
export default {
  name: 'ArticleIndex',
  components: {
    followUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReplay
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  // 定义属性
  props: {
    articleId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data () {
    return {
      article: {}, // 文章的数据
      loading: true, // 加载中的1loading状态
      errStatus: 0, // 失败状态码
      followLoding: false, // 载入控制位
      totalComments: 0,
      isShow: false, // 弹出层控制位
      commentList: [], // 评论列表
      IsReplayShow: false, // 回复评论弹出层控制位
      currentComment: {} // 当前回复对象信息
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async loadArtile () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
        // 渲染成功，获取文章中图片的ref
        setTimeout(() => {
          this.imagePreview()
        }, 0)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast({ message: '获取文章数据失败！', duration: 500 })
      }
      this.loading = false
    },
    imagePreview () {
      /* 获取数据中image的ref属性值 */
      const articleContent = this.$refs.articleContentRef
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
            onClose () {
              this.$toast('关闭')
            }
          })
        }
      })
    },
    onClickLeft (data) {
      /* 关闭文章详情页 */
      // history.back()
      this.$router.back()
    },
    onPostSuccess (data) {
      /* 发布评论后后续处理步骤 */
      // 关闭弹层
      this.isShow = false
      // 刷新视图
      this.commentList.unshift(data.new_obj)
    },
    onReplayClick (comment) {
      this.currentComment = comment
      this.IsReplayShow = true
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadArtile()
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
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
