import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/LOL/LOLHome.vue'
import HomePage from '../views/LOL/HomePage.vue'
import Article from '../views/LOL/Article.vue'
import Hero from '../views/LOL/Hero.vue'
import MyArticleIndex from '../views/myArticle/MyArticleIndex.vue'
import Categories from '../views/myArticle/Categories.vue'
import ArticleCatalog from '../views/myArticle/ArticleCatalog.vue'
import MyArticleMain from '../views/myArticle/MyArticleMain.vue'
import AnimalIndex from '../views/animalForest/Index.vue'
import IndexPage from '../views/animalForest/IndexPage.vue'
import VipLogin from '../views/vip/VipLogin.vue'
import LoginPage from '../views/vip/LoginPage.vue'
import Register from '../views/vip/Register.vue'
import Message from '../views/Person/Message.vue'
import AccountManage from '../views/Person/AccountManage.vue'
import ManagePage from '../views/Person/ManagePage.vue'
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
  {path:'/person/message',component:Message},
  {path:'/account/management',component:AccountManage,
children:[{
  path:'/'  ,component:ManagePage
}]},
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
