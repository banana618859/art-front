<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-31 09:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-10-31 12:32:12
-->
<template>
  <div>
    <p class="h50">
      <el-button style="float: right; margin-top: 10px;" @click="addRole" type="success" size="mini">增加</el-button>
      角色列表：</p>
    <el-table
      :data="allRole" border size="mini" style="flex: 1;width: 100%;">
      <el-table-column prop="id" label="序号" width="120"></el-table-column>
      <el-table-column prop="name" label="角色名" width="120"></el-table-column>
      
      <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button @click="editChannel(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delChannel(scope.row)" type="text" size="small">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  
  export default {
    data(){
      return{
        allRole: [
        {
            id:1,
            name: '教务主任'
          },
          {
            id:2,
            name: '老师'
          },
          {
            id:3,
            name: '学生'
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
    },
    methods:{
      addRole(){
        console.log('addRole')
      }
    }
  };
  </script>