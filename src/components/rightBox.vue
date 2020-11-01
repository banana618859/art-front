<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-31 09:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-10-31 12:25:24
-->
<template>
    <el-tree
      :data="allRight"
      show-checkbox
      node-key="id"
      ref="tree"
      highlight-current
      :check-on-click-node="clickSelect"
      :props="defaultProps">
    </el-tree>
</template>

<script>
  
  export default {
    methods: {
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    props:{
      allRight: {
        type: Array,
        default: ()=>[]
      }
    },
    data() {
      return {
        clickSelect: false,
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    }
  };
</script>