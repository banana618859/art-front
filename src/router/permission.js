/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-23 11:39:20
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-27 13:06:43
 */

import router from "./index.js"
import store from '../store' //引入store

function getStoreFromLocal(name) {
    let strData = window.localStorage.getItem(name);
    let data = JSON.parse(strData);
    if(data){
        setTimeout(()=>{
            store.commit('saveFlushId',Date.now()+'');
        },100)
    }
    store.commit('saveUserInfo',data);

}
// 回填个人登录信息
getStoreFromLocal('userInfo')

// 路由守卫
router.beforeEach((to,from,next)=>{
     // console.log('to,from,next:',to.path,store.state.userInfo)

    if(to.path!='/login'){
         // console.log('user-roles:',to.path);
        // 此处要检查是否登录
        // next()
        // return;
        if(!store.state.userInfo){
             // console.log('未登录')
            // 路由到登录页
            next('/login')
        }else{
             // console.log('登录了')
            
            // 导航到首页
            next()
            // 根据角色名，查看权限
            // 用户登录时，将其相关权限也同步请求回来
            // let role = loginStatus.myRight;
            //  // console.log('role:',role);

        }
        
        // 若登录了，检查是否有权限查看
    }else{
         // console.log('to.path:登录页-放行',to.path)
        next()
    }
    // if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
    //     if (sessionStorage['username']) {
    //         next();
    //     }else{
    //         next({
    //             path:"/login",
    //             query:{
    //                 redirect:to.fullPath
    //             }
    //         });
    //     }

    // }else{
    //     next()
    // }
});

export default router;