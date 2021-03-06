<template>
  <div class="comment-post">
    <van-field  class="post-field"  v-model.trim="message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit/>
    <van-button class="post-btn" @click="onPost" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  inject: ['articleId'],
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '评论发布中...',
        forbidClick: true,
        Duration: 0
      })
      try {
        if (this.message) {
          const { data } = await addComment({
            target: this.target.toString(),
            content: this.message,
            art_id: this.articleId ? this.articleId.toString() : null
          })
          // 将填写的评论添加到留言中
          this.message = ''
          this.$emit('close-popup', data.data)
        }
        this.$toast.success({ message: '发布评论成功!', duration: 500 })
      } catch (error) {
        this.$toast({ message: '发布评论失败', duration: 500 })
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
