<template>
  <van-cell class="article-item" :to="{
      name: article,
      params: {
        articleId: article.art_id
      }
    }">
    <div class="title van-multi-ellipsis--l2" slot="title" >{{article.title}}</div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div v-for="(img, index) in article.cover.images" :key='index' class="cover-item">
          <van-image fit="cover" :src="img" class="cover-item-img"/>
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}</span>
        <span>{{article.pubdate | timeFormat}}</span>
      </div>
    </div>
    <van-image   class="right-cover" slot="default" fit="cover" v-if="article.cover.type === 1" :src="article.cover.images[0]" />
  </van-cell>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  components: {},
  // 定义属性
  data () {
    return {}
  },
  props: {
    article: {
      type: Object,
      required: true
    }
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
  mounted () {
  },
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
.article-item{
  .title{
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value{
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left:25px;
  }
  .van-image__img{
    width: 232px;
    height: 146px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span{
    font-size:22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap{
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right:4px;
      }
      .cover-item-img{
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
