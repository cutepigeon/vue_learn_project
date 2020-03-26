import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import HeroList2 from '../views/HeroList.1.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import MyArticleEdit from '../views/MyArticleEdit.vue'
import MyArticleList from '../views/MyArticleList.vue'
import AdsEdit from '../views/AdsEdit.vue'
import AdsList from '../views/AdsList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/login',name:'login',component:Login,meta:{isPublic:true}},
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {path:'/categories/create',component:CategoryEdit
      },
      {path:'/categories/list',component:CategoryList
      },
      {path:'/categories/edit/:id',component:CategoryEdit,props:true//props:true表示把参数都注入到CategoryEdit组件中
      },

      {path:'/items/create',component:ItemEdit
      },
      {path:'/items/list',component:ItemList
      },
      {path:'/items/edit/:id',component:ItemEdit,props:true//props:true表示把参数都注入到CategoryEdit组件中
      },

      {path:'/heroes/create',component:HeroEdit
     },
     {path:'/heroes/list',component:HeroList
     },
     {path:'/heroes/edit/:id',component:HeroEdit,props:true//props:true表示把参数都注入到CategoryEdit组件中
     },
     {
        path:'heroes/list2' ,component:HeroList2
     },

     {path:'/articles/create',component:ArticleEdit
    },
    {path:'/articles/list',component:ArticleList
    },
    {path:'/articles/edit/:id',component:ArticleEdit,props:true//props:true表示把参数都注入到CategoryEdit组件中
    },

    {path:'/myarticles/create',component:MyArticleEdit
  },
  {path:'/myarticles/list',component:MyArticleList
  },
  {path:'/myarticles/edit/:id',component:MyArticleEdit,props:true//props:true表示把参数都注入到CategoryEdit组件中
  },


    {path:'/ads/create',component:AdsEdit
  },
  {path:'/ads/list',component:AdsList
  },
  {path:'/ads/edit/:id',component:AdsEdit,props:true//props:true表示把参数都注入到CategoryEdit组件中
  },

  {path:'/admin_users/create',component:AdminUserEdit
},
{path:'/admin_users/list',component:AdminUserList
},
{path:'/admin_users/edit/:id',component:AdminUserEdit,props:true//props:true表示把参数都注入到CategoryEdit组件中
},
    ]
  },
]
const router = new VueRouter({
  routes
})
//路由守卫，进入每个路由都判断
router.beforeEach((to,from,next)=>{
     if(!to.meta.isPublic && !localStorage.token){
       return next('/login')
     }
     next()
})
export default router
