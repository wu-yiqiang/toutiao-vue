import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem} from "@/utils/storage.js"
Vue.use(Vuex)
const TOKEN_KEY="toutiao_user"
export default new Vuex.Store({
  state: {
    //存储用户数据信息，token
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(TOKEN_KEY,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
