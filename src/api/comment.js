/**
 * @Description: 获取评论请求
 * @Version: V1.0
 * @Date: 2021-03-03
 * @Author: Tmp
 */
import request from '@/utils/request.js'
export const getComments = (params) => {
  /* 获取文章评论列表 */
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

export const addCommentLike = (target) => {
  /* 添加对评论或回复点赞 */
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

export const deleteCommentLike = (target) => {
  /* 删除对评论或回复点赞 */
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}

export const addComment = data => {
  /* 添加评论或者评论回复 */
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
