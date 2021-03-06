<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar title="个人中心" class="page-nav-bar" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <!-- 个人信息 -->
    <input type="file" hidden ref="file" @change="onFileChange">
    <van-cell title="头像" value="内容" is-link  @click="$refs.file.click()">
      <van-image class="avatar" :src="user.photo" round/>
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdataNameShow = true"/>
    <van-cell title="性别" :value="user.gender > 0 ? '女' : '男'" is-link @click="isUpdataGenderShow = true"/>
    <van-cell title="生日" :value="user.birthday" is-link @click="isUpdataDateShow = true"/>
    <!-- 个人信息 -->
    <!-- 编辑头像 -->
    <van-popup v-model="isUpdataPhotoShow" position="bottom" :style="{ height: '100%' }" >
      <UpdatePhoto :image="img" @close="isUpdataPhotoShow = false" v-if="isUpdataPhotoShow" @udpate-photo="user.photo = $event"></UpdatePhoto>
    </van-popup>
    <!-- /编辑头像 -->
    <!-- 编辑昵称弹出层 -->
    <van-popup v-model="isUpdataNameShow" position="bottom" :style="{ height: '100%' }" >
      <UpdateName v-model="user.name" @close="isUpdataNameShow = false" v-if="isUpdataNameShow"></UpdateName>
    </van-popup>
    <!-- /编辑昵称弹出层 -->

    <!-- 编辑性别 -->
    <van-popup v-model="isUpdataGenderShow" position="bottom" :style="{ height: '50%' }" >
      <UpdateGender v-model="user.gender" @close="isUpdataGenderShow = false" v-if="isUpdataGenderShow"></UpdateGender>
    </van-popup>
    <!-- /编辑性别 -->
    <!-- 编辑日期 -->
    <van-popup v-model="isUpdataDateShow" position="bottom" :style="{ height: '50%' }" >
      <UpdateBirthday v-model="user.birthday" @close="isUpdataDateShow = false" v-if="isUpdataDateShow"></UpdateBirthday>
    </van-popup>
    <!-- /编辑日期 -->
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { getUserProfile } from '@/api/user'
import UpdateName from './comments/update-name'
import UpdateGender from './comments/update-gender'
import UpdateBirthday from './comments/update-birthday'
import UpdatePhoto from './comments/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  // 定义属性
  model: {},
  props: {},
  data () {
    return {
      user: {}, // 用户的个人信息
      isUpdataNameShow: false, // 昵称弹出层控制位
      isUpdataGenderShow: false,
      isUpdataDateShow: false,
      isUpdataPhotoShow: false,
      img: null
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async loadUserProfile () {
      /* 获取用户的个人信息 */
      try {
        const { data } = await getUserProfile()
        this.user = data.data
        console.log(this.user)
      } catch (error) {
        this.$toast({ message: '获取用户信息失败!', duration: 500 })
      }
    },
    onFileChange () {
      /* 上传文件 */
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdataPhotoShow = true
      this.$refs.file.value = ''
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadUserProfile()
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
.user-profile{
  .avatar{
    width: 60px;
    height: 60px;
  }
  .van-popup{
    background-color: #f5f7f9;
  }
}
</style>
