<template>
    <div class="datas-content"
    style="overflow: auto; height: 100%; display: flex; flex-direction: column;">
    <h2>
      故障统计
    </h2>
		<div 
			style="background-color: #eee; height: 90px; display: flex; 
			margin-bottom: 5px; padding:15px 10px 0;">
      
      <div class="searchUl">
				<ul>
					<li>
						用户名: <el-input v-model="theUserName" size="mini" style="width: 100px;"></el-input>
					</li>
					<li>
						项目名: <el-input v-model="theProjectName" size="mini" style="width: 100px;"></el-input>
					</li>
					<li>
						通道名: <el-input v-model="theChannelName" size="mini" style="width: 100px;"></el-input>
					</li>

					<li>
						产品名称: <el-input v-model="productName" size="mini" style="width: 100px;"></el-input>
					</li>
					<li>
						产品批次: <el-input v-model="productBatch" size="mini" style="width: 100px;"></el-input>
					</li>
					<li>
						产品代号: <el-input v-model="productCode" size="mini" style="width: 100px;"></el-input>
					</li>
					<li>
						产品序列号: <el-input v-model="productSerialNumber" size="mini" style="width: 100px;"></el-input>
					</li>
					<li class="time">
						<span style="width: 90px;">
							创建时间:
						</span>
						<el-date-picker
							v-model="value2"
							type="daterange"
							size="mini"
							align="right"
							unlink-panels
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@change="selectTimeChange"
							:picker-options="pickerOptions">
						</el-date-picker>
					</li>
				</ul>
				<el-button type="success" style="margin-left: 50px;" size="mini" @click="onSearch">搜索</el-button>
			</div>
		</div>
		<div style="height: 150px; display: flex; flex-direction: column; padding: 10px; border: 1px solid #ccc; margin: 10px 0;">
			<p style="height: 30px; line-height: 30px;">分析符合条件的数据，根据分类名区分统计：</p>
			<ul class="statistics">
				<li v-for="(item,index) in allKind" :key="item.name+index">
					<span style="margin-right:15px;">{{item.name}}: {{item.count}}条</span> 
					<el-button type="primary" size="mini" @click="showKindDetail">详情</el-button>
				</li>
			</ul>
		</div>
		<div style="width: 100%; flex: 1; overflow: auto; font-size: 12px;">
			<el-table
        :data="tableData"
        ref="multipleTable"
				stripe>

				<el-table-column
				type="selection"
				width="55">
				</el-table-column>
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="用户"       prop="userName"></el-table-column>
				<el-table-column label="项目名称"   prop="projectName"></el-table-column>
				<el-table-column label="通道名"     prop="channelName"></el-table-column>
				<el-table-column label="产品名称"   prop="proName"></el-table-column>
				<el-table-column label="产品代号"   prop="proCode"></el-table-column>
				<el-table-column label="产品批次"   prop="proBranch"></el-table-column>
				<el-table-column label="产品序列号" prop="inputSn"></el-table-column>
        <el-table-column label="测试结果"   prop="testResult" width="80">
					<template slot-scope="props">
						<span v-if="props.row.testResult=='NG'" style="color: red;">
							{{props.row.testResult}}
						</span>
						<span v-else>{{props.row.testResult}}</span>
					</template>
				</el-table-column>
        <el-table-column label="测试日期"   prop="testTime" width="180"></el-table-column>

				<!-- <el-table-column label="操作" width="220">
					<template slot-scope="props">
						<el-button type="primary" size="mini" @click="showRowDetail(props.row)">详细</el-button>
					</template>
				</el-table-column> -->
			</el-table>
		</div>

		<el-pagination
			@size-change="onSizeChange"
			@current-change="onCurrentChange"
			:current-page="pageNum"
			:page-sizes="pageSizeArr"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="allDataCount"
			style="height: 32px; text-align: center;"
		>
		</el-pagination>

	</div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return{
				allKind:[
				{
						name: '电阻类',
						count: 338
					},
					{
						name: '电压类',
						count: 35
					},
					{
						name: '电流类',
						count:125
					},
					{
						name: '其他类',
						count: 79
					}
				],
        theUserName: '',
        theProjectName: '',
				theChannelName: '',
				productName: '',
				productBatch: '',
				productCode: '',
				productSerialNumber: '',

        pageNum: 1,
        pageSize: 10,
        pageSizeArr: [10,20,30,50],
        allDataCount: 100,
        oneRow: {
            userName: 'admin',
						projectName: 'aa',
						channelName: 'up_0',
            proName: 'bb',
            proCode: '123',
            proBranch: '456',
            inputSn: '202008',
            testResult: 'NG',
            testTime: '2020-11-30 12:23:45'
          },
        tableData:[],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value1: '',
        value2: ''
      }
    },
    created(){
      this.initData();
    },
    methods:{
      initData(){
        for(let i=0;i<30;i++){
          let newRow = JSON.parse(JSON.stringify(this.oneRow));
          if(i/5>1){
            newRow.proName = newRow.proName+parseInt(i/5)*5
					}
					if(i%5==0){
            newRow.channelName = 'up_1'
          }
          this.tableData.push(newRow)
        }
      },
      onSizeChange(){
        console.log('onSizeChange')
      },
      onCurrentChange(){
        console.log('onCurrentChange')
      },
      selectTimeChange(){
        console.log('selectTimeChange')
      },
      onSearch(){
        console.log('onSearch')
      },
    }
  }

</script>
<style type="text/css" scoped>
	.statistics{
		margin-top: 10px;
		overflow: auto;
		flex: 1;
	}
	.statistics li{
		float: left;
		margin-right: 20px;
		margin-bottom: 10px;
	}
	.allContent{
		width: 100%;
		border: 2px solid #333;
	}

	.allContent .tableOne th{
		border: 1px solid #ccc;
	}
	.allContent tr.topHead{
		border-bottom: 1px solid #ccc;
	}
	.titleP{
		width: 100%; text-align: center;
		height: 40px; line-height: 40px; font-size: 24px;
	}
	.tableOne{
		border: none;
		border: 1px solid #ccc;
		width: 100%;
		font-size:12px;
	}
	.tableOne tr th,.tableOne tr td{
		border: 1px solid #ccc;
		font-weight: bold;
		line-height: 25px;
		padding: 0 5px;
	}
	.tableOne td{
		font-weight: 100;
		text-align: left;
	}
	.tableOnea{
		border: none;
		border-bottom: 1px solid #ccc;
		width: 100%;
	}
	.tableOnea th,.tableOnea td{
		font-weight: bold;
		line-height: 30px;
		padding: 0 5px;
	}
	.tableOnea td{
		font-weight: 100;
		text-align: left;
	}

	.se-dialog .el-dialog__body{
		margin: 0 auto;
	}
	.width300{width: 300px;}
	.searchP{
		display: flex;
	}
	.nameTitle{
		width: 80px;
		padding-right: 5px;
		text-align: right;
	}
	.searchP input,.searchP .rightText{flex:1;}
	/deep/ .el-date-editor .el-range-input{
		width: 100px;
	}
	.searchUl{overflow: auto; flex: 1;}
	.searchUl li{
		float: left;
		margin-right: 10px;
		margin-bottom: 5px;
		font-size: 12px;
	}
	.searchUl li.time{
		width: 370px;
	}
	/deep/.el-range-editor--mini .el-range-separator{
		margin-right: 15px;
	}
	/deep/.el-date-editor--daterange.el-input__inner{
		width: 300px;
	}
	/deep/.el-table td{
		padding: 6px 0;
	}
	.el-pagination{
		/* border-top:1px solid #ccc; */
	}
	.datas-ul{overflow: hidden; margin-bottom: 10px;}
	.datas-ul li{
		float: left;
		margin-right: 30px;
	}

</style>