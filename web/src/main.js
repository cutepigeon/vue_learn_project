import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'
import './assets/scss/style.scss'
import './assets/scss/homeStyle.scss'
import './assets/scss/_variables.scss'
import './assets/scss/articleStyle.scss'
import './assets/scss/heroStyle.scss'

import './assets/iconfont/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import http from './http';
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false
//
Vue.component('m-card',Card)
Vue.component('m-list-card',ListCard)
Vue.prototype.$http=http
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
