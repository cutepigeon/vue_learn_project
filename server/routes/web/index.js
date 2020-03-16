const web=app=>{
  const router=require('express').Router()
  const mongoose=require('mongoose')
  const Category=mongoose.model('Category')
  const Article=mongoose.model('Article')
  const Hero=mongoose.model('Hero')
  const herodata=require('./heroData')
  //录入新闻,正式不会这么写，一次性录入，也可以手动录入
  router.get('/news/init',async (req,res)=>{
      const parent=await Category.findOne({
          name:"新闻分类"
      })
     const cats=await Category.find().where({
         parent:parent._id
     }).lean()//lean()取一个纯粹的js对象
     const newsTitles=["10.2&amp;10.3云顶之弈更新：六森林羁绊加入云顶", "10.2&amp;10.3版本更新公告：真实伤害 赛娜 至臻盛大登场", "艾欧尼亚和黑色玫瑰临时维护公告", "游戏环境公示及处罚名单2月14日", "关于觅心猫猫 悠米炫彩存在bug的说明", "关于觅心猫猫 悠米炫彩配图错误的说明", "2020年2月13日不停机更新公告"]

     const newsList=newsTitles.map(title=>{
        const randomCats=cats.slice(0).sort((a,b)=>Math.random()-0.5)//sort()进行排序
         return {
             categories:randomCats.slice(0,2).map(x=>x._id),//能显示却不能录入进数据库
             title:title
         }
     })
    //  await Article.deleteMany({})//以任意条件删除
    //  await Article.insertMany(newsList)
     res.send(newsList) }
   )
   //新闻列表接口
   router.get('/news/list',async(req,res)=>{
    //    const parent=await Category.findOne({
    //        name:"新闻分类"
    //    }).populate({
    //        path:"children",
    //        populate:{
    //            path:"newsList"
    //         }    
    //    }).lean()
    const parent=await Category.findOne({
        name:"新闻分类"
    })
    //聚合查询
    const cats=await Category.aggregate([
        //找到有parent的数据
        {$match:{parent:parent._id}},
        //从另外的模型中查找
        {
            $lookup:{
                //聚合名默认为是模型名小写的复数，也可以自己定义
                from:'articles',
                //本地键
                localField:'_id',
                //外键
                foreignField:'categories',
                //放置
                as:'newsList'
            }
        },
        {
            //修改数据
            $addFields:{
                //每个newsList数组只要5个数据
                 newsList:{$slice:['$newsList',5]}
            }
        }
    ])
    const subCats=cats.map(v=>v._id) 
    cats.unshift({
        name:'综合',
        newsList:await Article.find().where({
            categories:{$in:subCats}
        }).populate('categories').limit(5).lean()//categories关联查询Category里的数据
    })
    cats.map(cat=>{
        cat.newsList.map(news=>{
            news.CategoryName=(cat.name ==='综合')?news.categories[0].name:cat.name
            return news
        })
        return cat
    })
       res.send(cats)
   })
  //录入英雄
  router.get('/heroes/init',async(req,res)=>{
      for(let cat of herodata){
        //   if(cat.CategoryName==="所有英雄"){
        //       //跳过这个对象执行下轮循环代码
        //       continue;
        //   }
          //找到分类在数据库中对应数据
          const category=await Category.findOne().where({
              name:cat.CategoryName
          })
          cat.heroes.map(hero=>{
              hero.categories=[category]//智能，会提取出category对象的id，不用写成category._id
              return hero
          })
        
        await Hero.insertMany(cat.heroes)
      }
      res.send(await Hero.find())
})
//英雄列表接口
router.get('/heroes/list',async(req,res)=>{
    const parent=await Category.findOne({
        name:"英雄分类"
    })
    //聚合查询
    const cats=await Category.aggregate([
        //找到有parent的数据
        {$match:{parent:parent._id}},
        //从另外的模型中查找
        {
            $lookup:{
                //聚合名默认为是模型名小写的复数，也可以自己定义
                from:'heroes',
                //本地键
                localField:'_id',
                //外键
                foreignField:'categories',
                //放置
                as:'heroList'
            }
        },
    ])
    const subCats=cats.map(v=>v._id) 
    cats.unshift({
        name:'热门',
        heroList:await Hero.find().where({
            categories:{$in:subCats}
        }).populate('categories').limit(10).lean()//categories关联查询Category里的数据
    })
    cats.map(cat=>{
        cat.heroList.map(hero=>{
            hero.CategoryName=(cat.name ==='热门')?hero.categories[0].name:cat.name
            return hero
        })
        return cat
    })
       res.send(cats)
   })
 //文章接口
 router.get('/articles/:id',async (req,res)=>{
    const article=await Article.findById(req.params.id).lean()
    article.related=await Article.find().where({
        categories:{$in:article.categories}
    }).limit(2)

    res.send(article)
 })
 //英雄接口
 router.get('/heroes/:id',async (req,res)=>{
     const hero=await Hero.findById(req.params.id).populate("categories").lean()
     res.send(hero)
 })
  app.use('/web/api',router)
}
module.exports=web