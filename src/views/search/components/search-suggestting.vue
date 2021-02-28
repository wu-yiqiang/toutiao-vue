<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(item, index) in suggestions" :key="index" @click="$emit('search', text)">
      <div slot="title" v-html="hightlight(item)">
      </div>
    </van-cell>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { getSearchSuggestions } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  // 定义属性
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      suggestions: [],
      htmlStr: '<span style="color:red">asad<span>'
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {
    searchText: {
      // 监视从父组件上传下来的数据
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 1000),
      immediate: true
    }
  },
  // 方法集合
  methods: {
    async loadSearchSuggestions (q) {
      /* 获取搜素建议返回的数据 */
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('获取搜索建议失败！')
      }
    },
    hightlight (text) {
      /* 将搜索建议字符进行高亮显示 */
      const Str = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, Str)
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
.search-suggestion{
  /deep/ span.active{
    color: red;
  }
}
</style>
