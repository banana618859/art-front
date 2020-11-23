/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-11-13 20:57:29
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-11-13 21:30:51
 */
var Util={
  exportExcel(arr){
      // 要导出的json数据
      // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
      let str = `ID,用户名,密码,性别,角色\n`;
      // 增加\t为了不让表格显示科学计数法或者其他格式
      for(let i = 0 ; i < arr.length ; i++ ){
        str+=arr[i].id+','+arr[i].username+','+arr[i].password+','+arr[i].sex+','+arr[i].role
        str+='\n';
      }
      // encodeURIComponent解决中文乱码
      const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      // 通过创建a标签实现
      const link = document.createElement("a");
      link.href = uri;
      // 对下载的文件命名
      link.download =  "json数据表.csv";
      link.click();
    }
  
}

export default Util;