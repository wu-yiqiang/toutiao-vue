<template>
  <div class="layout-container">
      <!-- 子路由出口 -->
      <view-router></view-router>
      <!-- 子路由出口 -->

      <!-- 标题导航栏 -->
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">
          <i slot="icon" class="toutiao toutiao-shouye"></i>
          <span class="text">首页</span>
        </van-tabbar-item>
        <van-tabbar-item icon="home-o">
          <i slot="icon" class="toutiao toutiao-wenda"></i>
          <span class="text">问答</span>
        </van-tabbar-item>
        <van-tabbar-item icon="home-o">
          <i slot="icon" class="toutiao toutiao-shipin"></i>
          <span class="text">视频</span>
        </van-tabbar-item>
        <van-tabbar-item icon="home-o">
          <i slot="icon" class="toutiao toutiao-wode"></i>
          <span class="text">我的</span>
        </van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {
  name:"layoutIndex",
  data(){
    return {
       active:0
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container{
  
}
</style>