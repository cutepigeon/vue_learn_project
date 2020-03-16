//服务端入口文件
const express=require("express")
const app=express()
app.set('secret','fdjslfff')
app.use(express.json())//引用这个才能使用 async 和 await
app.use(require('cors')())//跨域模块
app.use('/uploads',express.static(__dirname+'/uploads'))//静态文件托管，使uploads文件能通过uploads访问
app.use('/admin',express.static(__dirname+'/admin'))
app.use('/',express.static(__dirname+'/web'))
// const x=require('./routes/admin/test')  个人测试模块
// x.test1()
// x.use(app)
require('./plugins/db')(app)
require('./routes/admin/index')(app)//引入中间件，并传入参数,一种写法，将use可以放在中间件中
require('./routes/web/index')(app)
app.get('/',(req,res) => res.send("<h1>hello World<h1>"))
app.listen(3000,()=>{
    console.log("3000 are served")
});
