const auth2=options=>{
    const User=require('../modules/User')
    const jwt=require('jsonwebtoken')
    const assert=require('http-assert')
    return async(req,res,next)=>{
        const token=String(req.headers.authorazation || '').split(' ').pop()
        assert(token,401,'请先登录')
        const {id}=jwt.verify(token,req.app.get('secret2'))
        assert(id,401,'请先登录')
        const user=await User.findById(id)
        assert(user,401,'请先登录')
        await next()
    }
}
module.exports=auth2