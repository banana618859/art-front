/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-25 23:35:45
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-27 12:54:16
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//保证刷新页面数据不消失*
function storeLocalStore (name,data) {
  if(typeof data =='object'){
    if(data.password){
      delete data.password;
    }
    window.localStorage.setItem(name,JSON.stringify(data));
  }else{
    window.localStorage.setItem(name,data);
  }
}

export default new Vuex.Store({
  getters: {},
  state: {
    flushId: 0,
    userInfo: null,
    myRole: null,
    allRight:[
      {
          id: 1,
          name: '用户管理',
          icon: 'el-icon-user-solid',
          checked: true,
          children:[
            {
              id: 11,
              name: '用户列表',
              path: '/user',
              checked: true,
              children:[
              {
                  id: 111,
                  name: '增',
                  path: 'add',
                  checked: true,
                },
                {
                  id: 112,
                  name: '删',
                  path: 'delete',
                },{
                  id: 113,
                  name: '改',
                  path: 'update',
                },{
                  id: 114,
                  name: '查',
                  path: 'read',
                }
              ]
            }
          ]
      },
      {
        id: 2,
        name: '列车管理',
        icon: 'el-icon-s-cooperation',
        checked: true,
        children:[
          {
            id: 21,
            name: '列车列表',
            checked: true,
            path: '/carManager',
            children:[
            {
                id: 211,
                name: '增',
                path: 'add',
                checked: true,
              },
              {
                id: 212,
                name: '删',
                path: 'delete',
              },{
                id: 213,
                name: '改',
                path: 'update',
              },{
                id: 214,
                name: '查',
                path: 'read',
              }
            ]
          },
          {
            id: 22,
            name: '数据导入',
            path: '/importExcel',
            children:[
            {
                id: 221,
                name: '增',
                path: 'add',
              },
              {
                id: 222,
                name: '删',
                path: 'delete',
              },{
                id: 223,
                name: '改',
                path: 'update',
              },{
                id: 224,
                name: '查',
                path: 'read',
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: '权限管理',
        icon: 'el-icon-s-tools',
        checked: true,
        children:[
          {
            id: 31,
            name: '角色列表',
            path: '/role',
            checked: true,
            children:[
            {
                id: 311,
                name: '增',
                path: 'add',
                checked: true,
              },
              {
                id: 312,
                name: '删',
                path: 'delete',
              },{
                id: 313,
                name: '改',
                path: 'update',
              },{
                id: 314,
                name: '查',
                path: 'read',
              }
            ]
          },
          {
            id: 32,
            name: '权限列表',
            path: '/right',
            children:[
            {
                id: 321,
                name: '增',
                path: 'add',
              },
              {
                id: 322,
                name: '删',
                path: 'delete',
              },{
                id: 323,
                name: '改',
                path: 'update',
              },{
                id: 324,
                name: '查',
                path: 'read',
              }
            ]
          }
        ]
      }
    ]
  },
  mutations: {
    saveMyRole(state,data){
      state.myRole = data;
    },
    saveFlushId(state,data){
      state.flushId = data;
      console.log('object:',data);
    },
    saveUserInfo(state,data){
      state.userInfo = data;
      // 存储到localStorage
      storeLocalStore('userInfo',data)
    }
  },
  actions: {
  },
  modules: {
  },
});
