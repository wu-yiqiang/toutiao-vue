<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" left-arrow>
      <van-icon name="close"  slot="left" @click="$router.back()"/>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field v-model="user.mobile" name="mobile"  placeholder="请输入手机号" :rules="userFormRules.mobile" type="number" maxlength="11">
          <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field  v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFormRules.code" type="number" maxlength="6">
          <i slot="left-icon" class="iconfont iconyanzhengma"></i>
          <template #button>
            <van-count-down :time="time"  format="ss s" v-if="isCountDownShow" @finsh="isCountDownShow=false"/>
            <van-button size="small" round type="default" class="send-sms-btn" @click="onSendSms" v-else>发送验证码</van-button>
          </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button  block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
 import { login,sendSms } from "@/api/user"
export default {
  name:"LoginIndex",
  data(){
    return {
      user:{
        mobile:"13911111112",
        code:"246810",
      },
      userFormRules:{
        mobile:[{ required: true, message: '请填写手机号码' },{pattern:/^1[3|5|7|8]\d{9}$/,message:"手机号码格式错误"}],
        code:[{ required: true, message: '请填写验证码'},{pattern:/^\d{6}$/,message:"验证码格式错误"}],
      },
      
      time:1000*60,   // 倒计时时长
      
      isCountDownShow:false,  //显示倒计时的显示与隐藏


    }
  },
  methods:{
    async onSubmit(values) {
       /* 提交表单 */
      //1.获取表单数据
      const user=this.user
      //2.表单验证数据
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        Duration:0,
      });

      //3.提交表单请求
     try{
        const {data}=await login(user)
        //获取用户token
        this.$store.commit("setUser",data.data)
       this.$toast.success("登录成功！")
       

     }catch(error){
       if(error.response.status === 400){
          this.$toast.fail("手机号或验证码错误！")
       }else{
          this.$toast.fail("登陆出现错误，请稍后重试！")
       }
      
     }

    },
    async onSendSms(){
      /* 发送验证码 */
      // 1.校验手机号码的有效性
     try {
       await this.$refs.loginForm.validate("mobile")
     } catch (error) {
       return console.log("验证失败",error)
     }
     
      //2.验证通过,显示倒计时
      this.isCountDownShow=true 



      //3.
      try {
        const res=await sendSms(this.user.mobile)
      } catch (error) {
        if(error.responsee.status===429){
          this.$toast("频繁发送验证码，请稍后重试！")
        }else{
          this.$toast("发送失败，请稍后重试！")
        }
      }
    }
  },
}
</script>

<style lang="less" scoped>
.login-container{
  .iconfont{
    font-size:37px;
  }
  .send-sms-btn{
    background-color: gray;
    width: 152px;
    height: 46px;
    font-size: 22px;
    line-height: 46px; 
    color: #666;
  }
  .login-btn-wrap{
    padding:53px 33px; 
  }
}
</style>