<template>
  <div class="home-container">

    <!-- 登录状态显示用户信息 -->
    <div  v-if="user" class="header user-info">
      <div class="base-info">
          <div class="left">
            <van-image  class="avatar" :src="userInfo.photo" round fit="cover"/>
            <span class="name">{{userInfo.name}}</span>
          </div>
          <div class="right">
            <van-button round to="/user/profile">编辑资料</van-button>
          </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>

        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>

        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>

        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录状态 -->
    <div v-else  class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" class="mobile-img">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid column-num=2 class="grid-nav mb-9" clickable>
      <van-grid-item class="grid-item">
        <i  slot="icon" class="iconfont iconshoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i  slot="icon" class="iconfont iconlishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 单元格导航 -->
    <van-cell title="通知消息" is-link url="/" />
    <van-cell title="小智同学" is-link to="/" class="mb-9" />

    <!-- 退出登录 -->
    <van-cell v-if="user"  title="退出登录" class="logout-cell"  @click="onLogOut" center clickable/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {

  },
  props: {},
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {

  },
  methods: {
    onLogOut () {
      // 退出登录
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(() => {
        // 确认退出登录，清除登录信息
        this.$store.commit('setUser', null)
      }).catch(() => {
        // 取消退出登录什么也不做
      })
    },
    async loadUserInfo () {
      // 加载用户信息
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail(error.message)
      }
    }
  }
}
</script>

<style lang="less">
.home-container{
  margin-top: 0 !important;
  .header{
    height: 361px;
    background-image:url("~@/assets/banner.png");
    background-size:cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info{
    .base-info{
      height: 231px;
      padding: 76px  32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .avatar{
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border:4px solid #fff;
        }
        .name{
          font-size: 30px;
          color:#fff;
        }
      }
    }
    .data-stats{
      display: flex;
      .data-item{
        flex: 1;
        display: flex;
        height: 130px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color:#fff;
        .text{
          font-size:23px;
        }
        .count{
          font-size: 36px;
        }
      }
    }
  }
  .grid-nav{
    .grid-item{
      height: 141px;
      i.iconfont{
        font-size: 45px;
      }
      i.iconshoucang {
        color: red;
      }
      i.iconlishi{
        color: orange;
      }
      span.text{
        font-size: 28px;
      }
    }
  }
  .mb-9{
    margin-bottom: 20px;
  }
  .logout-cell{
    text-align: center;
    color: red;
  }
}
</style>
