import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: data
  })
}

export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/* 获取用户信息 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

/* 获取频道列表 */
export const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

/* 关注用户 */
export const addFollows = (target) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}

/*  删除用户 */
export const deleteFollows = (target) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${target}`
  })
}

export const getUserProfile = () => {
  /* 获取当前用户的个人信息 */
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

export const updateUserProfile = (data) => {
  /* 编辑当前用户的个人资料 */
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

export const updateUserPhoto = (data) => {
  /* 编辑当前用户头像 */
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
