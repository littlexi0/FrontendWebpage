<template>
    <div>
        <div class="block">
            <span class="demonstration">带快捷选项</span>
            <el-date-picker
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
            </el-date-picker>
        </div>s

      <!-- <el-row>
        <el-col :span="21" v-for="(o, index) in sales" :key="o" :offset="1">
          <el-card :body-style="{ padding: '0px' }" class="elcard">
            <el-button type="text" class="modifybutton">
              <img :src="o.book.cover" class="image">
            </el-button>
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
          sales: [
            {
                book_id:0,
                created_at:"string",
                id:0,
                price:0,
                quantity:0,
                updated_at:"string",
                user_id:0,
                book: {
                    id: 4,
                    created_at: "2023-05-11T22:39:03.112663+08:00",
                    updated_at: "2023-05-13T12:34:00.303582+08:00",
                    user_id: 1,
                    isbn: "9787213109959",
                    title: "三体",
                    description: "",
                    author: "刘慈欣",
                    press: "浙江人民出版社",
                    published_date: "2006-01-02T23:04:05+08:00",
                    cover: "https://pic.jingyijun.xyz:8443/i/2023/05/12/645db75dbcf9c.jpg",
                    price: 0,
                    stock: 0,
                    on_sale: true
                }
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
  </style>
  
  