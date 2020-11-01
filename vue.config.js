/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-25 22:57:53
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-10-31 09:21:47
 */
var isPro = process.env.NODE_ENV === 'production';
console.log('isPro:',isPro)
module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8000,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {//配置跨域
        '/api': {
            target: 'http://localhost:7070/kkk/',//这里后台的地址模拟的;应该填写你们真实的后台接口
            ws: true,
            changOrigin: true,//允许跨域
            pathRewrite: {
                '^/api': ''//请求的时候使用这个api就可以
            }
        }
        
    }
  }

}