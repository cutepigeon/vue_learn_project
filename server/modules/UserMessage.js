const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    nickname:{type:String},
    autograph:{type:String},
    avatar:{type:String}
})


module.exports=mongoose.model('UserMessage',Schema)