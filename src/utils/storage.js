

export const setItem = (key, value) => {
  /* 设置本地存储 */
  if (typeof value == "object"){
      value=JSON.stringify(value)
    }
  window.localStorage.setItem(key,value)
}



export const getItem = (key, value) => {
  /* 获取本地存储 */
  const data = window.localStorage.getItem(key)
  try {
   return JSON.parse(data)
  } catch (error) {
    return data 
  }
 
}

 

export const removeItem = (key) => {
  /* 删除本地缓存 */
  window.localStorage.removeItem(key)
}