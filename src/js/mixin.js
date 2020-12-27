/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-12-25 22:37:22
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-27 12:22:18
 */
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['myRole'])
  },
  data() {
    return {
      myname: 'mixin'
    }
  },
  created() {
    //   // console.log('myRole...', this.myRole);
  },
  mounted() { },
  methods: {
    answerFun(tipText, sureBtn, cancelBtn) {
      // 提示函数
      if (!tipText) {
        tipText = '确定要删除吗？'
      }
      return new Promise((resolve, reject) => {
        this.$confirm(
          tipText,
          '提示', {
          confirmButtonText: sureBtn || '确定',
          cancelButtonText: cancelBtn || '取消',
          type: "warning"
        })
          .then(async () => {
            resolve(true);
          })
          .catch(() => {
            resolve(false);
          });
      })
    },
    getMyRight(myRoleId) {
      this.$axios.post(
        `${window.baseUrl}/getRightByRoleId`,
        { role: myRoleId }
      )
        .then((res) => {          //这里使用了ES6的语法
           // console.log('response-role:', res)       //请求成功返回的数据
          let myRight = res.data.data[0];
          myRight.roleRight = JSON.parse(myRight.roleRight)
           // console.log('myRight:', myRight);
          this.$store.commit('saveMyRole', myRight)
        }).catch((error) => {
           // console.log(error)       //请求失败返回的数据
          this.$message({
            message: '服务器发生异常！',
            type: 'error'
          })
        })
    },
    getPageRight(fatherName, pageName) {
      if (!this.myRole || !this.myRole.roleRight) {
        return
      }
      //通过方法访问
      let pageRight;
      for (let i = 0; i < this.myRole.roleRight.length; i++) {
        if (this.myRole.roleRight[i].name == fatherName) {
          let sonArr = this.myRole.roleRight[i].children;
          for (let j = 0; j < sonArr.length; j++) {
            if (sonArr[j].name == pageName) {
              pageRight = sonArr[j];
              break;
            }
          }
        }
      }
       // console.log('pageRight:', pageRight)
      return pageRight;
    }
  }
}