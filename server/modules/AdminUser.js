const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    username:{type:String},
    password:{
        type:String,
        select:false,
        set(val){          
            return require('bcryptjs').hashSync(val,10)
        }//散列保存密码,不可逆
    }
})
module.exports=mongoose.model('AdminUser',Schema)