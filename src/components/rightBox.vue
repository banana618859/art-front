<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-31 09:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-11-30 09:30:54
-->
<template>
    <div>
      <ul class="rightUl">
        <li v-for="(item,index) in allRight" :key="item.name+index">
          <div class="leftOne pd-lr10 vCenter radius_tbl5">
            <el-checkbox 
              :label="item.name" name="type"
              :value="item.checked" 
              @change="pageSelect(item.name)"></el-checkbox>
          </div>
          <div class="leftFinal pd-lr10 vCenter" style="padding-top: 10px;">
            <ul class="sonRight">
              <li v-for="(subItem,index) in item.children" :key="subItem.name+index">
                <div class="leftTwo vCenter pd-lr10">
                  <el-checkbox 
                  :label="subItem.name" name="type" 
                  :value="subItem.checked"
                  @change="pageSelect(item.name,subItem.name)"></el-checkbox>
                </div>
                <div class="leftFinal pd-lr10 vCenter">
                  <ul class="sunRight">
                    <li v-for="(sunItem,index) in subItem.children" :key="sunItem.name+index">
                      <el-checkbox 
                      :label="sunItem.name" name="type"
                      :value="sunItem.checked" 
                      @change="pageSelect(item.name,subItem.name,sunItem.name)"></el-checkbox>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  
  export default {
    methods: {
      pageSelect(){
        let arr = [...arguments]
        console.log('pageSelect',arr);
        this.$emit('pageSelect',arr);
      },
    },
    props:{
      allRight: {
        type: Array,
        default: ()=>[]
      }
    },
    data() {
      return {
      };
    }
  };
</script>

<style scoped>
  .rightUl{
    min-height: 200px;
  }
  .rightUl>li{
    background-color: #eee;
    margin-bottom: 10px;
    display: flex;
  }
  .sonRight>li{
    margin-bottom: 10px;
    display: flex;
    line-height: 45px;
  }
  .sunRight>li{
    display: inline;
    margin-left:15px ;
  }
  
  .leftOne{
    width: 150px;
    background-color: #d0cfcf;
  }
  .leftTwo{
    width: 150px;
    /* border-left: 1px solid #ccc;
    border-right: 1px solid #ccc; */
    background-color: #e2e2e2;
  }
  .leftFinal{
    flex: 1;
  }
</style>