const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    title:{type:String},
    article:{type:String},
    banners:{type:String},
    enterPage:{type:String}
})
module.exports=mongoose.model('IndexArticle',Schema)