/* 频道请求模块 */
import request from '@/utils/request'

/* 导出所有频道列表 */
export const channelAllList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

/* 添加用户频道列表 */
export const addUserChannel = (channel) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
/* 删除用户频道列表 */
export const deletcUserChannel = (channelId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
