<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-31 09:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-27 12:26:15
-->
<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <p>
      <el-select v-model="form.option" placeholder="请选择活动区域">
        <el-option label="功能分类（一级系统）" value="functionkindOne"></el-option>
        <el-option label="功能分类（子系统）" value="functionkindSon"></el-option>

        <el-option label="车组号" value="catGroupNum"></el-option>
        <el-option label="车号" value="catNum"></el-option>

        <el-option label="故障等级" value="errorLevel"></el-option>
        <el-option label="故障描述" value="errorMsg"></el-option>

        <el-option label="详细方法" value="moreDesc"></el-option>
        <el-option label="处理结果" value="theResult"></el-option>

      </el-select>
      <el-input v-model.trim="inputValue" style="width: 200px;"></el-input>
      <el-button @click="search" type="success" :disabled="!canRead" size="small">搜索</el-button>
      <el-button @click="exportExcel" type="primary" :disabled="!canUpdate" size="small">导出excel</el-button>
    </p>
    <div style="flex: 1;">
      <el-table
        :data="allPerson" border size="mini" height="100%" style="width: 100%;">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column prop="functionkindOne" label="功能分类（一级系统）" width="160"></el-table-column>
        <el-table-column prop="functionkindSon" label="功能分类（子系统）" width="160"></el-table-column>
        <el-table-column prop="catGroupNum" label="车组号" width="120"></el-table-column>
        
        <el-table-column prop="catNum" label="车号" width="120"></el-table-column>
        <el-table-column prop="errorLevel" label="故障等级" width="120"></el-table-column>
        <el-table-column prop="errorMsg" label="故障描述" width="120"></el-table-column>

        <el-table-column prop="moreDesc" label="详细方法" width="120"></el-table-column>
        <el-table-column prop="theResult" label="处理结果" width="120"></el-table-column>       
        
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="editChannel(scope.row)" :disabled="!canUpdate" type="text" size="small">编辑</el-button>
                <el-button @click="delChannel(scope.row)" :disabled="!canDelete" type="text" size="small" style="color: #ef5050;">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      v-if="canRead"
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
    

  </div>
</template>

<script>
  import Util from '../js/util.js';
   // console.log('Util:',Util)
  export default {
    data(){
      return{
        fatherName: '列车管理',
        pageName: '列车列表',
        canRead: false,
        canAdd: false,
        canDelete: false,
        canUpdate: false,
        inputValue: 'sdf',
        isDisable: true,
        allPerson: [],
        dialogVisible: false,
        form: {
          option: ''
        },
        isAdd: false,
        currentPage: 1,
        pageSize: 10,
        total: 50
      }
    },
    async mounted(){
      
      let res = await this.getData(1,10);
      this.allPerson = res.data.data;
      this.total =  res.data.total;
      this.getRight()
    },
    methods:{
      getRight(){
        let pageRight = this.getPageRight(this.fatherName,this.pageName);
        // console.error('object:',pageRight);
        if(!pageRight){
          return;
        }
        for(let i=0;i<pageRight.children.length;i++){
          let one = pageRight.children[i];
          switch(one.path){
            case 'read':
              this.canRead = one.checked;
              break;
            case 'add':
              this.canAdd = one.checked;
              break;
            case 'delete':
              this.canDelete = one.checked;
              break;
            case 'update':
              this.canUpdate = one.checked;
              break;
          }
        }
         // console.error('right-car:',this.canRead,this.canAdd,this.canDelete,this.canUpdate);
      },
      search(){
         // console.log('search:',this.form,this.inputValue)
        let that = this;
          this.$axios({
            method:'post',
            url:`${window.baseUrl}/search`,
            data:{
              name: this.form.option,
              value: this.inputValue,
              skipNum: this.currentPage,
              pageSize: this.pageSize
            }
          }).then((res) =>{          //这里使用了ES6的语法
               // console.log('response:',res)       //请求成功返回的数据
              that.allPerson = res.data.data;
              that.total = res.data.total;
          }).catch((error) =>{
               // console.log(error)       //请求失败返回的数据
              
          })
      },
      async exportExcel(){
        let rel = await this.getData(1,this.total);
        if(rel && rel.data && rel.data.data){
          let data = rel.data.data;
           // console.log('data:',data)
          Util.exportExcel(data);
        }
        
      },
      getData(skipNum, pageSize){
        return new Promise((resolve,rej)=>{
          let that = this;
          this.$axios({
            method:'post',
            url:`${window.baseUrl}/search`,
            data:{
              name: this.form.option,
              value: this.inputValue,
              skipNum,
              pageSize
            }
          }).then((res) =>{          //这里使用了ES6的语法
               // console.log('response:',res)       //请求成功返回的数据
              
              resolve(res)
          }).catch((error) =>{
               // console.log(error)       //请求失败返回的数据
              resolve(false)
          })
        })
      },
      async handleSizeChange(val) {
         // console.log(`每页 ${val} 条`);
        let res = await this.getData(this.currentPage,val);
        this.allPerson = res.data.data;
        this.total =  res.data.total;
      },
      async handleCurrentChange(val) {
         // console.log(`当前页: ${val}`);
        let res = await this.getData(val, this.pageSize);
        this.allPerson = res.data.data;
        this.total =  res.data.total;
      },
      editChannel(row){
         // console.log('修改用户');
        this.isAdd = false;
        this.form = row;
        this.dialogVisible = true;
      },
      toAddUser(){
        this.dialogVisible = true;
        this.isAdd = true;
      },
      addUser(form){
         // console.log('删除用户');
        let that = this;
        this.$axios({
          method:'post',
          url:`${window.baseUrl}/addUser`,
          data: form
        }).then((res) =>{          //这里使用了ES6的语法
             // console.log('addUser-res:',res)       //请求成功返回的数据
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
             // console.log(error)       //请求失败返回的数据
        })
      },
      delChannel(form){
         // console.log('删除用户');
        let that = this;
        this.$axios({
          method:'post',
          url:`${window.baseUrl}/deleteUser`,
          data: form
        }).then((res) =>{          //这里使用了ES6的语法
             // console.log('deleteUser-res:',res)       //请求成功返回的数据
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
             // console.log(error)       //请求失败返回的数据
        })
      },
      handleClose() {
         // console.log('关闭前-会触发该函数');
      },
      sureChange(form){
         // console.log('用户修改:',form);
        // 将数据提交到后台更新
        this.$axios({
          method:'post',
          url:`${window.baseUrl}/updateUser`,
          data: form
        }).then((res) =>{          //这里使用了ES6的语法
             // console.log('updateUser-res:',res)       //请求成功返回的数据
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
             // console.log(error)       //请求失败返回的数据
        })
      }
    }
  };
  </script>