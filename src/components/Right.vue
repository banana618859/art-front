<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-31 09:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-25 21:49:03
-->
<template>
  <div style="height: 100%; display: flex; flex-direction: column;">
    <p class="h50">权限列表：(基础权限由后台返回)</p>
    <!-- <rightBox :allRight="allRight" style="flex: 1; overflow: auto; margin-bottom: 50px;"></rightBox> -->

    <div style="height: cal(100%-50px); overflow: auto;">
      <rightBox 
        :allRight="allRight"
        @pageSelect="pageSelectFun"
        >
      </rightBox>
    </div>
  </div>
</template>

<script>
  import rightBox from './rightBox'
  import {mapState} from 'vuex';
  export default {
    computed:{
      ...mapState(['allRight'])
    },
    components:{
      rightBox
    },
    data(){
      return{
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
    },
    methods:{
      pageSelectFun(page){
        console.log('pageSelect:',page);
      },
      sonPageSelectFun(page){
        console.log('sonPageSelect:',page);
      },
      sunPageSelectFun(page){
        console.log('sunPageSelect:',page);
      }
    }
  };
  </script>

  