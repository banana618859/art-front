<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-25 23:35:45
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-16 00:31:23
-->
<template>
  <div class="home">
    <topHead></topHead>
    <div class="main">
      <leftBar class="leftBox"></leftBar>
      <div class="rightBox">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import topHead from '@/components/topHead.vue';
import leftBar from '@/components/leftBar.vue';
import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState(['userInfo'])
  },
  name: 'Home',
  components: {
    topHead,
    leftBar
  },
  data(){
    return{
      
    }
  },
  created(){
    // 取回来权限
    console.log('this.userInfo:',this.userInfo)
    this.getMyRight(this.userInfo.myRoleId)
  },
  methods:{
    getMyRight(myRoleId) {
        this.$axios.post(
          `${window.baseUrl}/getRightByRoleId`,
          {role: myRoleId}
        )
        .then((res) =>{          //这里使用了ES6的语法
          console.log('response-role:',res)       //请求成功返回的数据
          let myRight = res.data.data[0];
          myRight.roleRight = JSON.parse(myRight.roleRight)
          console.log('myRight:',myRight);
          this.$store.commit('saveMyRole',myRight)
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
            this.$message({
              message:'服务器发生异常！',
              type:'error'
            })
        })
      },
  }
};
</script>

<style>
  .home{
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
  }
  .main{
    flex:1;
    overflow: hidden;
    margin-top: 5px;
    display: flex;
  }
  .leftBox{
    width: 210px;
    background-color: #ddd;
    overflow: auto;
  }
  .rightBox{
    flex: 1;
    margin: 5px;
    border: 1px solid #ccc;
    padding: 5px;
  }

</style>
