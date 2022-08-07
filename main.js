import App from './App'
//导入网络请求的包
import { $http } from '@escook/request-miniprogram'
uni.$http = $http  //在uni顶级对象上挂载$http
$http.beforeRequest = function(options){
  uni.showLoading({
    title:'数据加载中...'
  })
}  
$http.afterRequest = function(){
  uni.hideLoading()
}
//基础路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

//封装弹框方法，并挂载到uni对象上
uni.$showMsg = function(title='数据请求失败！',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif