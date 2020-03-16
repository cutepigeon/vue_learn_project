const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    name:{type:String },
    avatar:{type:String},//头像地址
    banner:{type:String},//背景图
    title:{type:String},//类似疾风剑豪
    delay:{type:String },
    cost:{type:String },
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],//类似战士
    scores:{
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String},
    }], //技能相关
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description:{type:String}
    }]
    })
module.exports=mongoose.model('Hero',Schema,"heroes")