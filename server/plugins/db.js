const mdb =app=>{
    const mongoose=require("mongoose")//引用数据库
    mongoose.connect('mongodb://localhost:27017/node-vue-moba',{
    useNewUrlParser:true,
    useUnifiedTopology: true 
    })
    mongoose.connection.on('connected',function(){
        console.log('connect')
    })
    require('require-all')(__dirname+'/../modules')
}


module.exports=mdb