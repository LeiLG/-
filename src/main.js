// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入mint-ui
import MintUi from  'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUi)

//引入echarts

import echarts from 'echarts'

Vue.prototype.$echarts = echarts


//引入jquery
import $ from 'jquery'
Vue.prototype.$=$

//引入axios
import  axios from 'axios'
Vue.prototype.$axios=axios
axios.defaults.baseURL='http://guokaikaio.vicp.cc/admin/api/'

//引入vuex
import store from './vuex/store'

//引入qs
import qs from 'qs'
Vue.prototype.$qs=qs


Vue.config.productionTip = false;

//全局子组件声明
import floot from './components/publiccomp/floot.vue'
Vue.component('FlootVue',floot)
import header from './components/publiccomp/header.vue'
Vue.component('HeaderVue',header)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
