<template>
    <div>
        <div class="timeblock">
            <el-date-picker
            v-model="value"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" circle @click="searchclick"></el-button>
        </div>

      <el-table
        :data="balances"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="id"
          label="id"
          width="40">
        </el-table-column>
        <el-table-column
          prop="change"
          label="收支"
          width="60">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="余额"
          width="60">
        </el-table-column>
        <el-table-column
          prop="user_id"
          label="创建用户id"
          width="100">
        </el-table-column>    
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="280">
        </el-table-column>    
        <el-table-column
          prop="info"
          label="信息">
        </el-table-column>
      </el-table>
      <el-row style="bottom: 0px;;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 16, 20, 24]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total=this.total
          >
        </el-pagination>
      </el-row>
    </div>
  </template>
  
  <script>
  import { get } from 'echarts/lib/CoordinateSystem';


    export default {
      name: 'Balance',
      data () {
        return {
          currentDate: new Date(),
          currentPage: 1,
          pagesize: 10,
          total: 0,   
          id: 0,
          isbn:0,
          dialogModifyVisible: false,
          starttime:'',
          endtime:'',
          searchbytime:false,
          balances: [
            {
              id: 9,
              created_at: "2023-05-18T21:33:51.261129+08:00",
              user_id: 1,
              change: 58,
              balance: -319,
              operation_type: 2,
              operation_id: 4,
              info: "用户 1 销售收入 58.000000 元"
            }
          ],
          pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        }
      },
      mounted:{
        
      },
      created(){
          this.getall()
        },
      methods: {
        getall(){
          var t = new Date().getTime();
          var parames="/balances?page_size="+this.pagesize+"&page_num="+this.currentPage
          if(this.searchbytime)
            parames+="&start_time="+this.starttime+"&end_time="+this.endtime;
          parames+="&t="+t;
          console.log(parames)
          this.$axios.get(parames)
          .then(resp=>{
            console.log(resp)
            if(resp.status === 200){
              this.$message({
                message: '查询成功',
                type: 'success'
              })
              try{
                  this.balances = resp.data.balances,
                  this.total = resp.data.page_total,
                  this.tosttime(this.balances)
              }catch(e){
                console.log(e)
              }
            }else{
              this.$message({
                message: '查询失败',
                type: 'error'
              })
            }
          })
          .catch(failResponse => {
            console.log(resp)
            this.$message({
                message: '查询失败2',
                type: 'error'
              })
          })
        },
        tosttime(balances){
          for(var i=0;i<balances.length;i++)
          {
            var str = balances[i].created_at;
            var date = new Date(str).toJSON();
            var newDate=new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
            balances[i].created_at=newDate;
          }
        },
        handleCurrentChange(currentPage){
          this.currentPage = currentPage,
          this.getall()
        },
        handleSizeChange(currentSize){
          this.pagesize = currentSize,
          this.getall()
        },
        tableRowClassName({row, rowIndex}) {
        if (row.operation_type === 1) {
          return 'warning-row';
        } else if (row.operation_type === 2) {
          return 'success-row';
        }
        return '';
        },
        searchclick(){
          this.sttimetorfc(this.value[0],0)
          this.sttimetorfc(this.value[1],1)
          this.searchbytime=true
          this.currentPage = 1;
          this.getall()
          this.searchbytime=false
        },
        sttimetorfc(nowDate,i){
          let y = nowDate.getFullYear()
          let m = nowDate.getMonth()+1<10?'0'+(nowDate.getMonth()+1):(nowDate.getMonth()+1)
          let d = nowDate.getDate()<10?'0'+nowDate.getDate():nowDate.getDate()
          let hh = nowDate.getHours()<10?'0'+nowDate.getHours():nowDate.getHours();            
          let mm = nowDate.getMinutes()<10?'0'+nowDate.getMinutes():nowDate.getMinutes()
          if(i==0)
            this.starttime = y +'-' + m + '-' + d + 'T' + hh + ':' + mm + ':' + "00.000"+'%2B08:00'
          else
            this.endtime=y +'-' + m + '-' + d + 'T' + hh + ':' + mm + ':' + "00.000"+'%2B08:00'
        }
    }
  }
  </script>


   <style scoped>
   
   *{
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
   }

  .image {
    width: 80px;
    height: 120px;
    margin-left: 20px;
  }
  .elcard{
    margin-bottom: 10px;
    height: 150px;
  }
  .modifybutton{
    float: left;
  }
  .details{
    width: 50%;
    height: 120px;
    float: left;
    margin-right: 30px;
    margin-left: 20px;
    text-align: left;
    /* background-color: pink; */
  }
  .timeblock{
    text-align: left;
    padding-left: 20px;
  }
  /* .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  } */
  </style>
  
  <style>
  .el-table .warning-row {
    background: rgba(233, 39, 32, 0.059);
  }

  .el-table .success-row {
    background: #64d52717;
  }
</style>