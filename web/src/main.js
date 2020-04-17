import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入组件
import Card from './components/LOL/Card.vue'
import ListCard from './components/LOL/ListCard.vue'
import TopBar from './components/TopBar.vue'
import ManageTopbar from './components/Person/ManageTopbar.vue'
//全局样式
import './assets/scss/style.scss'
//变量
import './assets/scss/_variables.scss'
//vip登录样式
import './assets/scss/vip/loginStyle.scss'
//测试样式
import './assets/scss/LOL/articleStyle.scss' 
import './assets/scss/LOL/heroStyle.scss'
import './assets/scss/LOL/homeStyle.scss'
//我的文章样式
import  './assets/scss/myArticleStyle/myArticleStyle.scss'
//动物之森样式
import './assets/scss/animalForestStyle/indexStyle.scss'
//首页样式
import './assets/scss/indexStyle/mainStyle.scss'
//个人信息样式
import './assets/scss/person/message.scss'
import './assets/scss/person/accountManagement.scss'

import './assets/iconfont/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
//引用element
import './plugins/element.js'
import http from './http';
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false
//
Vue.component('topbar-menu',TopBar)
Vue.component('m-card',Card)
Vue.component('m-list-card',ListCard)
Vue.component('m-topbar',ManageTopbar)
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
    },
    async fetchAvatar(){
      const res=await this.$http.get(`person/message/${localStorage.id}`)
      this.avatar=res.data.avatar
     },
     async fetchNickname(){
      const res=await this.$http.get(`person/message/${localStorage.id}`)
      this.nickname=res.data.nickname
      console.log(this.nickname)
     },
     async upPersonMessage(){
      await this.$http.post(`person/create/${localStorage.id}`, this.model)
     }
  }
})
Vue.prototype.$http=http
new Vue({
  router,
  render: r => r(App)
}).$mount('#app')
