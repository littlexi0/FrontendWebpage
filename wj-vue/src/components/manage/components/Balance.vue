<template>
    <div>
        <div class="timeblock">
            <el-date-picker
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" circle></el-button>
        </div>s

      <!-- <el-row>
        <el-col :span="21" v-for="(o, index) in balances" :key="o" :offset="1">
          <el-card :body-style="{ padding: '0px' }" class="elcard">
            <div style="padding: 14px;">
              <div class="details">
                <div style="display: inline-block; font-size: 10px;"><strong>标题: </strong>{{o.book.title}}</div><br>
                <div style="display: inline-block; font-size: 6px;"><strong>作者: </strong>{{o.book.author}}</div><br>
                <div style="display: inline-block; font-size: 6px;"><strong>isbn: </strong>{{o.book.isbn}}</div><br>
                <div style="display: inline-block; font-size: 6px;"><strong>出版社: </strong>{{o.book.press}}</div><br>
                <div style="display: inline-block; font-size: 6px;"><strong>销售价格: </strong>{{o.price}}</div><br>     
                <div style="display: inline-block; font-size: 5px;"><strong>销售数量: </strong>{{o.quantity}}</div><br>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row> -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
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
          tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      
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
        value:'',
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''
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
          var parames="/sales?page_size="+this.pagesize+"&page_num="+this.currentPage
          parames+="&t="+t;
          this.$axios.get(parames)
          .then(resp=>{
            console.log(resp)
            if(resp.status === 200){
              this.$message({
                message: '查询成功',
                type: 'success'
              })
              try{
                  this.sales = resp.data.sales,
                  this.total = resp.data.page_total                  
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
        handleCurrentChange(currentPage){
          this.currentPage = currentPage,
          this.getall()
        },
        handleSizeChange(currentSize){
          this.pagesize = currentSize,
          this.getall()
        },
        tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
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
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>