<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-31 09:33:52
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-15 23:58:20
-->
<template>
  <div class="login" style="width: 400px; overflow: hidden; border-radius: 5px; background-color: #eee;">
    <div style="height: 50px; line-height: 50px; text-align: center; margin-bottom: 5px; font-size: 18px; font-weight: 600; background-color: #ddd;">登录界面</div>
    <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" style="padding: 10px 10px 0;" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="ruleForm.role" placeholder="请选择角色">
          <el-option
            v-for="(item,index) in allRole" 
            :key="item.name"
            :label="item.name" 
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        allRole: [],
        ruleForm: {
          username: 'admin',
          password: 'admin',
          role: ''
        },
        rules: {
          username: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          role: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ]
        }
      };
    },
    created(){
      this.getAllRoleName()
    },
    methods: {
      getAllRoleName() {
        this.$axios.post(
          `${window.baseUrl}/getAllRoleName`
        )
        .then((res) =>{          //这里使用了ES6的语法
          console.log('response:',res)       //请求成功返回的数据
          this.allRole = res.data.data;
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
            this.$message({
                message:'服务器发生异常！',
                type:'error'
              })
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(`登录：${window.baseUrl}/login`)
            // this.$router.push('/')
            // 后台登录
            this.$axios.post(
                    `${window.baseUrl}/login`,
                    this.ruleForm,
                  ).then((res) =>{          //这里使用了ES6的语法
                  console.log('response:',res)       //请求成功返回的数据
                  if(res.data && res.data.code==200){
                    this.$store.commit('saveUserInfo',res.data.data[0])
                    this.$message({
                      message:'登录成功！',
                      type:'success'
                    })
                    this.$nextTick(()=>{
                      this.$router.push('/')
                    })
                  }else{
                    this.$message({
                      message:'用户名或者密码错误！',
                      type:'error'
                    })
                  }
                  
              }).catch((error) =>{
                  console.log(error)       //请求失败返回的数据
                  this.$message({
                      message:'服务器发生异常！',
                      type:'error'
                    })
              })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        console.log('resetForm')
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
  .login{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>