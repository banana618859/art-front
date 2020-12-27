<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-11-21 19:58:51
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-26 20:38:46
-->
<template>
  <div>
    <p>导入Excel数据</p>
    <el-form 
      :model="ruleForm"
      size="mini" ref="ruleForm" style="padding: 10px 10px 0;"
      label-width="120px" class="demo-ruleForm" enctype="multipart/form-data">
      <el-form-item label="选择导入excel路径" prop="excelPath">
        <el-input v-model="ruleForm.excelPath" @change.native="inputChange" type="file" name="file"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="importData('ruleForm')">上传</el-button>
      </el-form-item>
    </el-form>
    <!-- <form enctype="multipart/form-data" method="post" action="/api/excelImport">    
      选择Excel表格：<input type="file" name="file"/><br/>    
      <input type="submit" value="上传"/>
    </form> -->
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    computed:{
      ...mapState(['userInfo'])
    },
    data() {
      return {
        ruleForm: {
          excelPath: ''
        },
        theFile: ''
      }
    },
    methods: {
      inputChange(e){
        // event
         // console.log('上传文件：',e)
        this.theFile = e.target.files[0]
      },
      importData() {
        // 上传文件
        //声明一个FormDate对象
        let formData = new FormData();
        //把文件信息放入对象中
        formData.append("file", this.theFile);
        formData.append("owner", this.userInfo.id);
        //  // console.log(FormData.get("multipartFile"));
        var config={
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        this.$axios.post(
          `${window.baseUrl}/importExcelbb`,
          formData,config
        ).then((res) => {          //这里使用了ES6的语法
           // console.log('response:', res)       //请求成功返回的数据
          if (res.data && res.data.code==200) {
            this.$message({
              message: '上传成功！',
              type: 'success'
            })
            
          } else {
            this.$message({
              message: '上传错误！',
              type: 'error'
            })
          }

        }).catch((error) => {
           // console.log(error)       //请求失败返回的数据
          this.$message({
            message: '服务器发生异常！',
            type: 'error'
          })
        })
      }
    }
  }
</script>