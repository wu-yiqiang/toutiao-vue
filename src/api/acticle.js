import request from '@/utils/request'
export const getArticles = (params) => {
  // 获取推荐模块文章列表内容
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
