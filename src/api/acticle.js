import request from '@/utils/request'
export const getArticles = (params) => {
  // 获取文章列表
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

export const getArticleById = (articleId) => {
  // 获取文章详细信息
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

export const addCollect = (target) => {
  // 收藏文章
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

export const deleteCollect = (target) => {
  // 取消收藏文章
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}

export const addLike = (target) => {
  // 对文章点赞
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}

export const deleteLike = (target) => {
  // 取消对文章点赞
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}
