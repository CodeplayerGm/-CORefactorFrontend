// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 跨域请求
import axios from 'axios'
// 解决axios传输数据时自动转换成json
import QS from 'qs'
// 组件框架
import ElementUi from 'element-ui'
import VueWechatTtitle from 'vue-wechat-title'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
Vue.use(ElementUi)
Vue.use(VueWechatTtitle)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:8088'
axios.defaults.withCredentials = false

Vue.prototype.$axios = axios
Vue.prototype.$qs = QS

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
