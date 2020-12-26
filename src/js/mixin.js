/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-12-25 22:37:22
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-25 22:53:31
 */
import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState(['myRole'])
  },
  data() {
   return {
    myname: 'mixin'
   }
  },
  created() {
  //  console.log('myRole...', this.myRole);
  },
  mounted() {},
  methods: {
    getPageRight(fatherName,pageName){
      if(!this.myRole){
        return
      }
      //通过方法访问
      let pageRight;
      for(let i=0;i<this.myRole.roleRight.length;i++){
        if(this.myRole.roleRight[i].name == fatherName){
          let sonArr = this.myRole.roleRight[i].children;
          for(let j=0;j<sonArr.length;j++){
            if(sonArr[j].name == pageName){
              pageRight = sonArr[j];
              break;
            }
          }
        }
      }
      console.log('pageRight:',pageRight)
      return pageRight;
    }
  }
 }