import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import http from './http'
import router from './router'
import './style.css'
Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL+'/upload'
    }
  },
  methods:{
     getAuthHeaders(){
       return {
         Authorization:`Bearer ${localStorage.token|| ''}`
     }
    }
  }
})
Vue.config.productionTip = false
Vue.prototype.$http=http//将http加载到vue原型上，全局就都可用了
//定义全局能使用的方法，写法跟vue实例差不多

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
