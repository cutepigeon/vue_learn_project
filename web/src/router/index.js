import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
//lol
import { Home, HomePage, Article, Hero } from '../views/LOL'
//我的文章
import { MyArticleIndex, Categories, ArticleCatalog, MyArticleMain } from '../views/myArticle'
//动物之森
import { AnimalIndex, IndexPage } from '../views/animalForest'
//vip
import { VipLogin, LoginPage, Register } from '../views/vip'
//个人信息
import { Message, AccountManage, ManagePage } from '../views/Person'
import {Nickname} from '../views/Person/AccountMessage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/vip/login', name: 'vipLogin', component: VipLogin, props: true, meta: { isPublic: true },
    children: [{ path: '/', component: LoginPage },
    { path: '/vip/register', component: Register }]
  },
  {
    path: '/',
    component: Main,
  },
  //个人信息页面
  { path: '/person/message', component: Message },
  {
    path: '/account/management', component: AccountManage,
    children: [{
      path: '/', component: ManagePage,
    }]
  },
  {
    path:'/Nickname',component:Nickname
  },
  //英雄联盟
  {
    path: '/lol/index', component: Home,
    children: [
      { path: '/', name: 'HomePage', component: HomePage },
      { path: '/articles/:id', name: 'articles', component: Article, props: true },
    ]
  },
  { path: '/heroes/:id', name: 'heroes', component: Hero, props: true },
  //我的文章
  {
    path: '/myArticle/index', component: MyArticleIndex,
    children: [
      { path: '/', component: Categories },
      { path: '/articleCatalog/:id', name: 'article', component: ArticleCatalog, props: true },
      { path: '/myArticleMain/:id', component: MyArticleMain, props: true }
    ]
  },
  //动物之森
  {
    path: '/animalForest/index', component: AnimalIndex,
    children: [
      { path: '/', component: IndexPage }
    ]
  },


]
const router = new VueRouter({
  routes
})
// router.beforeEach((to,from,next)=>{
//   if(!to.meta.isPublic && !localStorage.token){
//     return next('/vip/login')
//   }
//   next()
// })

export default router
