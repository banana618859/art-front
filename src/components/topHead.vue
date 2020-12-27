<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-31 09:00:48
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-11-30 15:22:05
-->
<template>
  <div style="height: 60px; line-height: 60px; font-size: 18px; color:#eee; background-color: #645f69; padding:0 10px; text-align: left;">
    <el-dropdown
      @command="handleCommand" 
      style="float: right; color: #eee;">
      <span class="el-dropdown-link">
        <span  v-if="userInfo" style="cursor: pointer;">
          {{userInfo.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="personCenter">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout" @click="logout" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    某某管理系统
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default{
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      handleCommand(command) {
         // console.log('click on item ' + command);
        switch(command){
          case 'logout':
            this.logout();
            break;
        }
      },
      logout(){
         // console.log('logout')
        this.$store.commit('saveUserInfo',false);
        this.$router.push('/login')
      }
    }
  }
</script>