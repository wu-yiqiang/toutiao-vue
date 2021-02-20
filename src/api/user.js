import request from "@/utils/request"


export const login = data => {
  return request({
    method: "POST",
    url: "/app/v1_0/user/followings",
    data:data
  })
}

export const SendSms = mobile => {
  return request({
    method: "GET",
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}