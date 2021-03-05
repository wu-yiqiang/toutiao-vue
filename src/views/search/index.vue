<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search v-model.trim="searchText"  placeholder="请输入搜索关键词" show-action  @search="onSearch"  @cancel="onCancel" @focus="isResultShow = false" class="search"/>
    </form>
    <!-- /搜索框 -->

    <!-- 搜索结果-->
    <SearchResult v-if="isResultShow" :search-text="searchText"></SearchResult>
    <!--搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion  v-else-if="searchText" :search-text="searchText" ></SearchSuggestion>
    <!-- 联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else :search-history="searchHistory" @clear-search-historys="searchHistory = []" @search="onSearch"></search-history>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestting.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  // 定义属性
  props: {
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制历史记录显示状态位
      searchHistory: getItem('TOUTIAO_SEARCH_HISTORYS') || [] // 搜索的历史记录
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {
    searchHistory: {
      handler (value) {
        /* 监视搜索历史记录的变化 */
        setItem('TOUTIAO_SEARCH_HISTORYS', value)
      }
    }
  },
  // 方法集合
  methods: {
    onSearch (value) {
      /* 点击搜索按键 */
      this.searchText = value
      this.searchHistory.unshift(value)
      this.searchHistory = [...new Set(this.searchHistory)]
      this.isResultShow = true
    },
    onCancel () {
      /* 取消按键 */
      // 返回到首页
      this.$router.push('/')
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
.search-container  {
  .van-search {
    position: fixed;
    top: 0;
    left:0;
    right: 0;
    background-color:#3296fa;
    z-index: 999;
    .van-field__control{
      color: #333333;
    }
    .van-search__action{
      color: #fff;
    }
  }
  .search-from{
    position: fixed;
    top: 0;
    right: 0;
    left:0;
    z-index: 1;
  }
}
</style>
