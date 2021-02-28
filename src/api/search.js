import request from '@/utils/request.js'

export const getSearchSuggestions = (q) => {
  /* 获取搜索建议 */
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSearchResults = params => {
  /* 获取搜索结果 */
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
