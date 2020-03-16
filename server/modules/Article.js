const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    title:{type:String},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    body:{type:String},
},{
    timestamps:true//时间戳
})
module.exports=mongoose.model('Article',Schema)