const resource=options=>{
    return async(req,res,next)=>{
        const modelName=require('inflection').classify(req.params.resource)
        req.Model=require(`../modules/${modelName}`)
        next()//做完上面的步骤再继续
    }
}
module.exports=resource