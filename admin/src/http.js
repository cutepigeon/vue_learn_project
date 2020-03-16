import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http=axios.create({
    //从写死的变成动态的,前者本地开发使用，后者在域名后使用
    baseURL:process.env.VUE_APP_API_URL || '/admin/api'
    // baseURL:'http://localhost:3000/admin/api'
})
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(localStorage.token){
    config.headers.Authorization='Bearer '+localStorage.token//传递授权信息,Bearer类型
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
http.interceptors.response.use(res=>{//拦截器
    return res
},err=>{
    if(err.response.data.message){ 
    Vue.prototype.$message({
        type:'error',
        message:err.response.data.message
    })
    if(err.response.status===401){//如果后端传来的是401错误，则跳转到登录页
       router.push('/login')
    }
   return Promise.reject(err)
}
})//拦截，如果未报错，正常返回，报错启用err
export default http//导出变量后到main中引用