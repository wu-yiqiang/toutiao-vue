<template>
  <div class="update-photo">
    <img :src="image" alt="" ref="img">
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="confirm">完成</div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  components: {},
  // 定义属性
  model: {},
  props: {
    image: {
      type: [String, Object],
      require: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    confirm () {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)
        console.log(data)
        this.$emit('close')
        this.$emit('udpate-photo', data.data.photo)
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
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
.update-photo{
  background: #000;
  height: 100%;
  .toolbar{
    position: fixed;
    bottom: 0;
    left:0;
    right: 0;
    display: flex;
    justify-content: space-between;
  }
  .cancel , .confirm {
    width: 300px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    color: #fff;
  }
  max-width: 100%;
  img {
    display: block;
    width: 100%;
  }
}
</style>
