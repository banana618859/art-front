<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-31 09:00:48
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-27 13:01:20
-->
<template>
  <div style="background-color: #eee;">
    <div style="height: 50px; line-height: 50px; padding-left: 10px; color: #eee; background-color: #494747; font-size: 16px; font-weight: 600;">
      功能列表
    </div>
    <el-menu
      v-if="myRole"
      default-active="2"
      :router="openRouter"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu
        v-for="(item,index) in myRole.roleRight" 
        :key="item.name+index"
        v-if="item.checked"
        :index="item.id+''">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group v-if="item.children && item.children.length>0">
          <el-menu-item 
            v-for="(son,index) in item.children" 
            v-if="son.checked"
            :key="son.name+index"
            :index="son.path">
            {{son.name}}
          </el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>
      
    </el-menu>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default{
    computed:{
      ...mapState(['myRole'])
    },
    data(){
      return{
        openRouter: true,
        menu:[
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
                checked: true
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
                name: '列车数据',
                path: '/carManager',
                checked: true
              },
              {
                id: 22,
                name: '导入excel',
                path: '/importExcel',
                checked: true
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
                checked: true
              },
              {
                id: 32,
                name: '权限列表',
                path: '/right',
                checked: true
              }
            ]
          }
        ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
         // console.log('handleOpen:',key, keyPath);
      },
      handleClose(key, keyPath) {
         // console.log('handleClose:',key, keyPath);
      }
    }
  }
</script>

<style scoped>
  /deep/ .el-submenu .el-menu-item{
    min-width: 100px;
  }
</style>