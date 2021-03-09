import Toast from './Toast'
const obj = {}

obj.install = function(Vue) {
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //2.new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastContrustor()
  //3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  // 将toast组件的内容添加到body中
  Vue.prototype.$toast = toast
  //这里的$toast指代的是toast对象
}

export default obj