<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-25 23:35:45
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-10-31 11:49:08
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

export default {
  name: 'Home',
  components: {
    topHead,
    leftBar
  },
  data(){
    return{
      
    }
  },
  mounted(){
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
