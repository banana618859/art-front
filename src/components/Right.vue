<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-31 09:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-10-31 16:02:49
-->
<template>
  <div style="height: 100%; display: flex; flex-direction: column;">
    <p class="h50">权限列表：(基础权限由后台返回)</p>
    <rightBox :allRight="allRight" style="flex: 1; overflow: auto; margin-bottom: 50px;"></rightBox>

  </div>
</template>

<script>
  import rightBox from './rightBox'
  export default {
    components:{
      rightBox
    },
    data(){
      return{
        allRight:[
        {
            id: 1,
            name: '用户管理',
            icon: 'el-icon-user-solid',
            children:[
              {
                id: 11,
                name: '用户列表',
                path: '/user',
                children:[
                {
                    id: 111,
                    name: '增',
                    path: 'add',
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
              },
              {
                id: 12,
                name: '用户编辑',
                path: '/userEdit',
                children:[
                {
                    id: 121,
                    name: '增',
                    path: 'add',
                  },
                  {
                    id: 122,
                    name: '删',
                    path: 'delete',
                  },{
                    id: 123,
                    name: '改',
                    path: 'update',
                  },{
                    id: 124,
                    name: '查',
                    path: 'read',
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            name: '教务管理',
            icon: 'el-icon-s-cooperation',
            children:[
              {
                id: 21,
                name: '学生管理',
                children:[
                {
                    id: 211,
                    name: '增',
                    path: 'add',
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
                name: '教师管理',
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
              },
              {
                id: 23,
                name: '考试管理',
                children:[
                {
                    id: 231,
                    name: '增',
                    path: 'add',
                  },
                  {
                    id: 232,
                    name: '删',
                    path: 'delete',
                  },{
                    id: 233,
                    name: '改',
                    path: 'update',
                  },{
                    id: 234,
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
            children:[
              {
                id: 31,
                name: '角色列表',
                path: '/role',
                children:[
                {
                    id: 311,
                    name: '增',
                    path: 'add',
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
        ],
        allPerson: []
      }
    },
    mounted(){
      let that = this;
      this.$axios({
                  method:'get',
                  url:`${window.baseUrl}/stu`,
              }).then((res) =>{          //这里使用了ES6的语法
                  console.log('response:',res)       //请求成功返回的数据
                  that.allPerson = res.data.data;
              }).catch((error) =>{
                  console.log(error)       //请求失败返回的数据
              })
    }
  };
  </script>