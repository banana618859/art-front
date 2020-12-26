<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-31 09:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-26 21:49:32
-->
<template>
  <div>
    <p class="h50">
      <el-button style="float: right; margin-top: 10px;" @click="addRole" type="success" size="mini">增加</el-button>
      角色列表：</p>
    <el-table
      :data="allRole" border size="mini" style="flex: 1;width: 100%;">
      <el-table-column
      type="index"
      width="50"></el-table-column>
      <el-table-column prop="name" label="角色名" width="120"></el-table-column>
      
      <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button @click="editRow(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delRow(scope.row)" type="text" size="small">
                <span class="redColor">删除</span>
              </el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="isAdd? '新增角色': '修改角色'"
      class="myDialog blueHead"
      :visible.sync="showRight"
      :close-on-click-modal="false"
      width="50%">
      <div style="padding: 0 15px;">
        <p v-if="isAdd">
          角色名称：
          <el-input style="width: 250px;" v-model="currentRole.name"></el-input>
        </p>
        <p v-else>当前角色：{{currentRole.name}}</p>
        <div style="max-height: 460px; overflow: auto; margin-top: 10px;">
          <rightBox 
            :allRight="currentRole.roleRight"
            @pageSelect="pageSelectFun"
            >
          </rightBox>
        </div>
        <p style="text-align: right; margin-bottom: 15px; margin-top: 5px;">
          <el-button @click="showRight = false">取 消</el-button>
          <el-button v-if="isAdd" type="primary" @click="saveRight(currentRole)">确 定</el-button>
          <el-button v-else type="primary" @click="updateRole(currentRole)">修 改</el-button>
        </p>
      </div> 
    </el-dialog>
  </div>
</template>

<script>
  import rightBox from './rightBox';
  import {mapState} from 'vuex';
  export default {
    computed:{
      ...mapState(['userInfo','allRight'])
    },
    components:{
      rightBox
    },
    data(){
      return{
        allCount: 0,
        currentRole:{
          name: '',
          roleRight: null
        },
        baseRight: null,
        showRight: false,
        allRole: [],
        allPerson: [],
        isAdd: false
      }
    },
    mounted(){
      this.initData();
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
            let one = JSON.parse(JSON.stringify(res.data.data[i]));
            one.roleRight = JSON.parse(one.roleRight);
            this.allRole.push(one);
          }
            // this.allRole = res.data.data;
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
      },
      initData(){
        this.baseRight = JSON.parse(JSON.stringify(this.allRight))
        for(let i=0;i<this.baseRight.length;i++){
          let page = this.baseRight[i];
          if(!page.hasOwnProperty('checked')){
            this.$set(page, 'checked', false)
          }
          // 遍历第二级
          let sonPage = page.children;
          for(let j=0;j< sonPage.length; j++){
            let pagea = sonPage[j];
            if(!pagea.hasOwnProperty('checked')){
              this.$set(pagea, 'checked', false)
            }
            // 遍历第三级
            let sunPage = pagea.children;
            for(let k=0;k< sunPage.length; k++){
              let pageb = sunPage[k];
              if(!pageb.hasOwnProperty('checked')){
                this.$set(pageb, 'checked', false)
              }
            }
          }
        }
        console.log('this.baseRight:',this.baseRight)
      },
      pageSelectFun(args){
        // console.log('pageSelect:',args);
        let secondArgs = [...args];
        // 循环，逐级修改，打勾或除勾
        let allRight = this.currentRole.roleRight;
        let currentName = ''
        if(args.length>0){
          this.loopChangeCheck(args, allRight)
        }
        // console.log('allR:',this.currentRole.roleRight);
        // 此时检查，如果儿子中有一个选中的，就选中父亲，否则去除父亲
        console.log('secondArgs:',secondArgs,args);
        if(secondArgs.length==1){
          return;
        }
        // 根据最顶级父亲，统计每个分支选中的儿子
        let realFa;
        for(let i=0;i<allRight.length;i++){
          if(allRight[i].name == secondArgs[0]){
            realFa = allRight[i];
            break;
          }
        }
        console.log('realFa:',realFa);
        let allBatch=[]
        let namePath=[];
        this.allCount=0;
            // namePath.push(realFa.name)
        this.findSon(realFa.children, namePath, allBatch);
        console.log('allBatch:',allBatch);
        // 循环所有路径
        for(let i=0;i<allBatch.length;i++){
          let oneAllLoad = allBatch[i].path;
          this.changeValue([...oneAllLoad], realFa.children, allBatch[i].count);
        }
        // 最后统计顶级父亲数量
        console.log('allCount:',this.allCount)
        realFa.checked = this.allCount>0? true:false;
      },
      changeValue(oneAllLoad, allRight, count,allCount){
        // console.log('oneAllLoad:',oneAllLoad)
        let oneVal = oneAllLoad.shift();
        for(let j=0;j<allRight.length;j++){
          let oneSonLoad = allRight[j];
          if(oneSonLoad.name == oneVal){
            // console.log('oneSonLoad.name:',oneSonLoad.name)
            if(count>0){
              oneSonLoad.checked = true;
              this.allCount += count;
            }else{
              oneSonLoad.checked = false;
            }
            if(oneAllLoad.length>0){
              this.changeValue(oneAllLoad, oneSonLoad.children, count)
            }
          }
        }
      },
      findSon(arr, namePath, allBatch){
        if(arr[0].children){
          for(let z=0;z<arr.length;z++){
            let oneB = arr[z];
            let myPath = [...namePath, oneB.name]
            this.findSon(oneB.children, myPath, allBatch)
          }
        }
        else{
          let count=0;
          for(let z=0;z<arr.length;z++){
            if(arr[z].checked){
              count++;
            }
          }
          allBatch.push({
            path: namePath,
            count
          })
        }
      },
      loopChangeCheck(args, allRight){
        let currentName = args.shift();
        // console.log('currentName:',currentName)
        for(let i=0;i<allRight.length;i++){
          if(allRight[i].name == currentName){
            // allRight[i].checked = !allRight[i].checked;
            // 判断参数是否还有
            if(args.length>0){
              this.loopChangeCheck(args, allRight[i].children);
            }else if(args.length==0){
              allRight[i].checked = !allRight[i].checked;
              if(allRight[i].children){
                this.loopSonCheck(allRight[i].children, allRight[i].checked)
              }
            }
          }
        }
      },
      loopSonCheck(arr, status){
        for(let i=0;i<arr.length;i++){
          console.log('loopSonCheck:',arr[i].name)
          arr[i].checked = status;
          if(arr[i].children){
            this.loopSonCheck(arr[i].children, status)
          }
        }
      },
      checkOnce(arr){
        // 第一次循环，看最底层是否有勾选的，组成数组
        let resultArr=[];
        for(let i=0;i<arr.length;i++){
          if(arr[i].children){
            this.checkOnceSon(arr[i].children,i,resultArr);
          }
        }
        console.log('选中结果：',resultArr)
      },
      checkOnceSon(arr,index,resultArr){
        if(arr[0].children){
          for(let i=0;i<arr.length;i++){
            this.checkOnceSon(arr[i].children,index,resultArr)
          }
        }else{
          let count=0;
          for(let i=0;i<arr.length;i++){
            if(arr[i].checked){
              count++
            }
          }
          resultArr.push(
            {
              index,
              count
            }
          )
        }
      },
      saveRight(currentRole){
        console.log('saveRight',currentRole);
        // 再在页面上展示
        let newOne = JSON.parse(JSON.stringify(currentRole))
        let newRole={}
        newRole.name = newOne.name;
        newRole.roleRight = JSON.stringify(newOne.roleRight)
        console.log('newOne',newRole)
        // 先保存到数据库
        this.$axios({
          method:'post',
          url:`${window.baseUrl}/saveRole`,
          data: newRole
        }).then((res) =>{          //这里使用了ES6的语法
            console.log('response:',res)       //请求成功返回的数据
            newRole.roleRight = JSON.parse(newRole.roleRight)
            this.allRole.push(newRole)
            this.showRight = false;
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
          this.showRight = false;
        })
      },
      updateRole(currentRole){
        console.log('updateRole',currentRole);
        let newOne = JSON.parse(JSON.stringify(currentRole))
        newOne.roleRight = JSON.stringify(newOne.roleRight)
        // 先保存到数据库
        this.$axios({
          method:'post',
          url:`${window.baseUrl}/updateRole`,
          data: newOne
        }).then((res) =>{          //这里使用了ES6的语法
            console.log('response:',res)       //请求成功返回的数据
            // newRole.roleRight = JSON.parse(newRole.roleRight)
            // this.allRole.push(newRole)
            if(res){
              this.$message({
              message: '修改成功',
              type: 'success'
            })
            }
            this.showRight = false;
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
          this.showRight = false;
          this.$message({
              message: '修改失败',
              type: 'error'
            })
        })
      },
      addRole(){
        console.log('addRole',this.baseRight);
        this.isAdd = true;
        this.showRight = true;
        this.currentRole.name= ''
        this.currentRole.roleRight = this.baseRight;
      },
      editRow(row){
        this.isAdd = false;
        this.showRight = true;
        console.log('editRow',row);
        this.currentRole = row;
      },
      delRow(row){
        console.log('delRow',row);
        this.$axios({
          method:'post',
          url:`${window.baseUrl}/delRoleById`,
          data: {
            id: row.id
          }
        }).then((res) =>{          //这里使用了ES6的语法
            console.log('response:',res,this.allRole)       //请求成功返回的数据
            for(let i=0;i<this.allRole.length;i++){
              if(this.allRole[i].id == row.id){
                this.allRole.splice(i,1);
                break;
              }
            }
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
      }
    }
  };
  </script>