const use = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../modules/AdminUser')
    const router = express.Router({
        mergeParams: true//使路由能使用动态参数
    })
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)// 发送给客户端
        console.log(req.body)
    })

    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)//发送给客户端
    })
    router.delete('/delete/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })//发送给客户端
    })
    //中间件
    const authMiddleware = require('../../middleware/auth')//登录校验
    const resourceMiddleware = require('../../middleware/resource')//寻找模型
    //资源列表
    router.get('/', async (req, res) => {
        //  const modelName=require('inflection').classify(req.params.resource)//classify为每个String对象添加了分类支持。
        //这里将复数的categories转化为Category
        //const Model=require(`../../modules/${modelName}`)
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        if(req.Model.modelName === 'MyArticle'){
            queryOptions.populate='categories'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(400)
        //limit限制条数,populate限制字段，字段限制后，不但本体是对象，里面的parent查出来也是一个对象(不然是一串id)，里面有和该id相关联的完整数据
        res.send(items)// 发送给客户端
    })
    //资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)//发送给客户端
    })
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    //关于图片上传
    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'//dirname是绝对地址,dest存储图片路径
    })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {//upload.single接收前端参数
        const file = req.file//运用中间件，将file添加到req上
        //修改url地址为域名让别人也可以访问
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    //登录接口
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body//解构赋值
        //通过用户名找用户
        const user = await AdminUser.findOne({ username }).select('+password')//模型设置了不取出password，所以这里得写select+
        assert(user, 422, '用户不存在')
        // 相当 if(!user){
        //      return res.status(422).send({
        //          message:"用户不存在"
        //      })//状态码422
        //  }
        //密码校验
        const isValid = require('bcryptjs').compareSync(password, user.password)//compareSync明文密文比较,返回值boolean
        assert(isValid, 422, '密码错误')
        //返回token
        const token = jwt.sign({ id: user._id }, app.get('secret2'))//参数是加密的字段
        res.send({ token })
    })
    //错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}
module.exports = use