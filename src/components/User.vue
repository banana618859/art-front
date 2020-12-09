<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-31 09:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-10 00:09:40
-->
<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <p>
      <el-button @click="toAddUser" type="primary" size="small">新增用户</el-button>
      <el-button @click="exportExcel" type="success" size="small">导出excel</el-button>
    </p>
    <div style="flex: 1;">
      <el-table
        :data="allPerson" border size="mini" height="100%" style="width: 100%;">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="username" label="姓名" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别" width="120"></el-table-column>
        
        
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="editChannel(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="delChannel(scope.row)" type="text" size="small" style="color: #ef5050;">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      style="padding-top:10px;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 30, 50]"
      layout="total, sizes, prev, pager, next"
      :total="total">
    </el-pagination>
    

    <!-- 修改用户资料 -->
    <el-dialog
      :title="isAdd ? '新增用户': '修改用户'"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="ID" v-if="!isAdd">
          <el-input v-model="form.id" :disabled="!isAdd"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" :disabled="!isAdd" placeholder="请选择角色">
            <el-option 
              :label="item.name" 
              :value="item.id"
              v-for="(item,index) in allRole" 
              :key="item.name+index">
            </el-option>
              
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="isAdd" type="primary" @click="addUser(form)">确定</el-button>
        <el-button v-else type="primary" @click="sureChange(form)">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Util from '../js/util.js';
  console.log('Util:',Util)
  export default {
    data(){
      return{
        isDisable: true,
        allPerson: [],
        dialogVisible: false,
        form: {},
        isAdd: false,
        currentPage: 1,
        pageSize: 10,
        total: 50,
        allRole: []
      }
    },
    async mounted(){
      
      let res = await this.getData(1,10);
      this.allPerson = res.data.data;
      this.total =  res.data.total;

      // 获取所有角色
      this.getAllRole();
    },
    methods:{
      getAllRole(){
        this.$axios({
            method:'get',
            url:`${window.baseUrl}/getAllRole`,
        }).then((res) =>{          //这里使用了ES6的语法
            console.log('getAllRole:',res)       //请求成功返回的数据
          this.allRole=[];
          for(let i=0;i<res.data.data.length;i++){
            let one = res.data.data[i];
            one.roleRight = JSON.parse(one.roleRight);
            this.allRole.push(one);
          }
            // this.allRole = res.data.data;
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
      },
      async exportExcel(){
        let rel = await this.getData(1,this.total);
        if(rel && rel.data && rel.data.data){
          let data = rel.data.data;
          console.log('data:',data)
          Util.exportExcel(data);
        }
        
      },
      getData(skipNum, pageSize){
        return new Promise((resolve,rej)=>{
          let that = this;
          this.$axios({
            method:'post',
            url:`${window.baseUrl}/hello`,
            data:{
              skipNum,
              pageSize
            }
          }).then((res) =>{          //这里使用了ES6的语法
              console.log('response:',res)       //请求成功返回的数据
              
              resolve(res)
          }).catch((error) =>{
              console.log(error)       //请求失败返回的数据
              resolve(false)
          })
        })
      },
      async handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        let res = await this.getData(this.currentPage,val);
        this.allPerson = res.data.data;
        this.total =  res.data.total;
      },
      async handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        let res = await this.getData(val, this.pageSize);
        this.allPerson = res.data.data;
        this.total =  res.data.total;
      },
      editChannel(row){
        console.log('修改用户',row);
        this.isAdd = false;
        this.form = row;
        this.dialogVisible = true;
      },
      toAddUser(){
        this.dialogVisible = true;
        this.isAdd = true;
      },
      addUser(form){
        form.role = form.role/1;
        console.log('增加用户',form);
        let that = this;
        this.$axios({
          method:'post',
          url:`${window.baseUrl}/addUser`,
          data: form
        }).then((res) =>{          //这里使用了ES6的语法
            console.log('addUser-res:',res)       //请求成功返回的数据
            if(res && res.data && res.data.code==200){
              this.$message({
                message: '新增成功！',
                type: 'success'
              })
              this.dialogVisible=false;
              this.allPerson = res.data.data;
            }else{
              this.$message({
                message: '新增失败！',
                type: 'error'
              })
            }
            
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
      },
      delChannel(form){
        console.log('删除用户');
        let that = this;
        this.$axios({
          method:'post',
          url:`${window.baseUrl}/deleteUser`,
          data: form
        }).then((res) =>{          //这里使用了ES6的语法
            console.log('deleteUser-res:',res)       //请求成功返回的数据
            if(res && res.data && res.data.code==200){
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
              for(let i=0;i<that.allPerson.length;i++){
                if(that.allPerson[i].id == form.id){
                  that.allPerson.splice(i,1);
                  break;
                }
              }
            }else{
              this.$message({
                message: '删除失败！',
                type: 'error'
              })
            }
            
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
      },
      handleClose() {
        console.log('关闭前-会触发该函数');
      },
      sureChange(form){
        console.log('用户修改:',form);
        // 将数据提交到后台更新
        this.$axios({
          method:'post',
          url:`${window.baseUrl}/updateUser`,
          data: form
        }).then((res) =>{          //这里使用了ES6的语法
            console.log('updateUser-res:',res)       //请求成功返回的数据
            if(res && res.data && res.data.code==200){
              this.$message({
                message: '修改成功！',
                type: 'success'
              })
              this.dialogVisible = false;
            }else{
              this.$message({
                message: '修改失败！',
                type: 'error'
              })
            }
            
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
      }
    }
  };
  </script>