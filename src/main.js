import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//导入less文件
import "./styles/index.less"

//导入vant所有组件
import Vant from 'vant'
import 'vant/lib/index.css'


//加载rem适配插件
import 'amfe-flexible'
      
Vue.use(Vant);





Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
