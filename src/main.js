import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'

import VueLazyload from 'vue-lazyload'
//使用懒加载的插件
Vue.use(VueLazyload, {
  preLoad: 1,
  error: require('assets/images/error.jpg'),
  //懒加载的图片显示
  loading: require('assets/images/lazy.jpg'),
  attempt: 2,

})

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
