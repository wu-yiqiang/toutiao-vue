<template>
  <div class="home-container">
    <div class="header not-login">
      <div class="login-btn" @click="$router.push('/login')"> 
        <img src="~@/assets/mobile.png" alt="" class="mobile-img">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <div  class="header user-info">
      <div class="base-info">
          <div class="left">
            <van-image  width="100" height="100" src="https://img01.yzcdn.cn/vant/cat.jpeg" round/>
          </div>
          <div class="right"></div>
      </div>
      <div class="date-stats"> </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"HomeIndex",
  components:{

  },
  props:{},
  data() {
    return {}
  },
  computed: {

  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less">
.home-container{
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
      background-color: black;
      padding: 76px  32px 23px;
      box-sizing: border-box;
    }
    .data-stats{
      height: 131px;
      background-color: red;
    }
  }
}
</style>