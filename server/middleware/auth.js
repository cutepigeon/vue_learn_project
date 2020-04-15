const auth= options =>{
    const assert=require('http-assert')
        const jwt=require('jsonwebtoken')
        const AdminUser=require('../modules/AdminUser')
    return async(req,res,next)=>{
        const token=String(req.headers.authorization||'').split(' ').pop()
        assert(token, 401,'请先登录')//提供token
        const {id}=jwt.verify(token,req.app.get('secret2'))
        assert(id,401,'请先登录')
        req.user=await AdminUser.findById(id)
        assert(req.user, 401 ,'请先登录')//401一般是用户错误
        await next()
     }
}
module.exports=auth