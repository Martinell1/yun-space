const Koa = require('Koa')
const Router = require("koa-router")
const cors = require('koa2-cors')
const body = require('koa-body');
const qiniu = require('qiniu')
const app = new Koa()
const router = new Router()

app.use(cors({
    origin: function(ctx) { //设置允许来自指定域名请求
      return '*'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH','OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['origin','Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
}))

router.post('/getUploadToken',(ctx)=>{
    const {accessKey,secretKey,bucket} = ctx.request.body
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const options = {
      scope: bucket,
      expires: 7200
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    if(uploadToken){
      ctx.body = uploadToken
    }
})



app.use(body())

app.use(router.routes())
   .use(router.allowedMethods())
app.listen(3001,()=>{
    console.log('koa 监听 3001 端口');
})