<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-26 11:28:55
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-10-26 14:40:58
-->
<template>
  <div>
    this is pdf!
    <button @click="exportPDF">生成pdf</button>
    <div id="view" style="padding: 20px;">
      <table class="myTable" width="100%">
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>年龄</th>
        </tr>
        <tr v-for="(item,index) in allData" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.age}}</td>
        </tr>
      </table>
    </div>
    
  </div>
</template>

<script>

  export default{
    data(){
      return{
        allData:[
        {
            id: 1,
            name: 'tom',
            age: 10
          },
          {
            id: 2,
            name: 'tom2',
            age: 12
          }
        ]
      }
    },
    methods:{
      exportPDF() {
        
        var target = document.getElementById('view');
        target.style.background = "#FFFFFF";
       
         // console.log('target:',target)
        html2canvas(target, {
          onrendered:function(canvas) {
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;
             // console.log('进来这了---')
            //一页pdf显示html页面生成的canvas高度;
            var pageHeight = contentWidth / 592.28 * 841.89;
            //未生成pdf的html页面高度
            var leftHeight = contentHeight;
            //页面偏移
            var position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            var imgWidth = 595.28;
            var imgHeight = 592.28/contentWidth * contentHeight;

            var pageData = canvas.toDataURL('image/jpeg', 1.0);

            var pdf = new jsPDF('', 'pt', 'a4');

            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
            } 
            else {
                while(leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if(leftHeight > 0) {
                      pdf.addPage();
                    }
                }
            }
            pdf.save("content12.pdf");
          }
        })
        
      }
    }
  }
</script>

<style scoped>
  .myTable{
    border: 1px solid #ccc;
  }
  .myTable td{
    border: 1px solid #ccc;
  }
</style>