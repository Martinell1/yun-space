# 图床管理工具



## 克隆项目

```shell
git clone git@github.com:Martinell1/kaijin-space.git
```



## 项目启动

```shell
//启动前端
npm start

//启动服务端
npm run server
```



## 项目说明

项目采用`React`+`Antd`+`Redux-toolkit`实现

将上传至七牛云图床的文件进行管理

项目后端即server文件内的index.js文件，采用Koa框架，只提供生成上传至七牛云所需的token的服务

前端将上传后返回的路径保存在本地，以供二次使用

同时项目不提供数据库服务，所有配置和图片保存在本地浏览器中，如有需要，可通过导入导出配置实现多端共享。



## 项目预览

### 配置页

![FkQiS3V5kOiuVk5IaCZzP6yzBtGL](http://qiniu.kaijinx.top/FkQiS3V5kOiuVk5IaCZzP6yzBtGL)

### 上传页

![FgJMy94cD2Ny4DrV4uwihEesSCQ-](http://qiniu.kaijinx.top/FgJMy94cD2Ny4DrV4uwihEesSCQ-)

### 图床页

![FtkLcuGHaARDxjnPx7FszHDGQP0q](http://qiniu.kaijinx.top/FtkLcuGHaARDxjnPx7FszHDGQP0q)

### 设置页（夜间模式）

![FiTG7VBlpT5XE2F3iAz22m1m_A6e](http://qiniu.kaijinx.top/FiTG7VBlpT5XE2F3iAz22m1m_A6e)

