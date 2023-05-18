<template>
    <div>

      <el-row>
        <el-col :span="21" v-for="(o, index) in purchases" :key="o" :offset="1">
          <el-card :body-style="{ padding: '0px' }" class="elcard">
            <el-button type="text" class="modifybutton">
              <img :src="o.book.cover" class="image">
            </el-button>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button type="success" class="modifycss"  @click="modifyclick()" :disabled = (o.returned||o.paid)>修改</el-button>
                <el-dialog title="修改图书" :visible.sync="dialogModifyVisible">
                  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    <el-form-item label="价格">
                      <el-input v-model="sale.price"></el-input>
                    </el-form-item>
                    <el-form-item label="数量">
                      <el-input v-model="sale.quantity"></el-input>
                    </el-form-item>
                  </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="resetclick">重 置</el-button>
                      <el-button type="primary" @click="submitmodify(o.id)">修 改</el-button>
                    </div>
                </el-dialog>
                <el-button type="primary" class="returncss"  @click="returnclick(o.id)" :disabled = (o.returned||o.paid)>{{!o.returned?'退货':'已退货'}}</el-button>
                <br>
                <el-button type="warning" class="paycss"  @click="payclick(o.id)" :disabled = (o.paid||o.returned)>{{!o.paid?'付款':'已付款'}}</el-button>            
                <el-button type="danger" class="arrivecss"  @click="arriveclick(o.id)" :disabled = (!o.paid||o.arrived||o.returned)>{{!o.arrived?'到货':'已到货'}}</el-button>   

              </div>
              <div class="details">
                <div style="display: inline-block; font-size: 10px;"><strong>标题: </strong>{{o.book.title}}</div><br>
                <div style="display: inline-block; font-size: 6px;"><strong>作者: </strong>{{o.book.author}}</div><br>
                <div style="display: inline-block; font-size: 6px;"><strong>isbn: </strong>{{o.book.isbn}}</div><br>
                <div style="display: inline-block; font-size: 6px;"><strong>出版社: </strong>{{o.book.press}}</div><br>
                <div style="display: inline-block; font-size: 6px;"><strong>进货价格: </strong>{{o.price}}</div><br>     
                <div style="display: inline-block; font-size: 5px;"><strong>进本数量: </strong>{{o.quantity}}</div><br>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
      name: 'Sales',
      data () {
        return {
          currentDate: new Date(),
          currentPage: 1,
          pagesize: 10,
          total: 0,   
          id: 0,
          isbn:0,
          dialogModifyVisible: false,
          sale:{
            book_id:0,
            price:0,
            quantity:0
          },
          purchases: [
            {
                id: 1,
                created_at: "2023-05-18T11:29:28.394457+08:00",
                updated_at: "2023-05-18T11:29:28.394457+08:00",
                book_id: 4,
                user_id: 1,
                quantity: 2,
                price: 23,
                paid: false,
                arrived: false,
                returned: false,
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
            ]
        }
      },
      mounted:{
        
      },
      created(){
          this.getall()
          console.log(2)
        },
      methods: {
        getall(){
          var t = new Date().getTime();
          var parames="/purchases?page_size="+this.pagesize+"&page_num="+this.currentPage
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
                  this.purchases = resp.data.purchases,
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
          this.pagesize=currentSize,
          this.getall()
        },
        payclick(id){
            var parames = '/purchases/'+id+'/_pay';
            this.$axios.post(parames,{})
            .then(resp=>{
                console.log(resp)
                if(resp.status === 200){
                this.$message({
                    message: '支付成功',
                    type: 'success'
                })
                try{
                    this.purchases = resp.data.purchases                 
                }catch(e){
                    console.log(e)
                }
                }else{
                this.$message({
                    message: '支付失败',
                    type: 'error'
                })
                }
            })
            .catch(failResponse => {
                console.log(resp)
                this.$message({
                    message: '支付失败2',
                    type: 'error'
                })
            })
            this.getall()
            sleep(200)
            this.getall()  
        },
        returnclick(id){
            var parames = '/purchases/'+id+'/_return';
            this.$axios.post(parames,{})
            .then(resp=>{
                console.log(resp)
                if(resp.status === 200){
                this.$message({
                    message: '退货成功',
                    type: 'success'
                })
                try{
                    this.purchases = resp.data.purchases                 
                }catch(e){
                    console.log(e)
                }
                }else{
                this.$message({
                    message: '退货失败',
                    type: 'error'
                })
                }
            })
            .catch(failResponse => {
                console.log(resp)
                this.$message({
                    message: '退货失败2',
                    type: 'error'
                })
            })
            this.getall()
            sleep(200)
            this.getall()  
        },
        arriveclick(id){
            var parames = '/purchases/'+id+'/_arrive';
            this.$axios.post(parames,{})
            .then(resp=>{
                console.log(resp)
                if(resp.status === 200){
                this.$message({
                    message: '到货成功',
                    type: 'success'
                })
                try{
                    this.purchases = resp.data.purchases
                }catch(e){
                    console.log(e)
                }
                }else{
                this.$message({
                    message: '到货失败',
                    type: 'error'
                })
                }
            })
            .catch(failResponse => {
                console.log(resp)
                this.$message({
                    message: '到货失败2',
                    type: 'error'
                })
            })
            this.getall()
            sleep(200)
            this.getall()  
        },
        resetclick(){
            this.sale.price=0
            this.sale.quantity=0
        },
        modifyclick(){
            this.dialogModifyVisible = true
        },
        submitmodify(id){
            console.log(id)
            this.sale.price=parseFloat(this.sale.price)
            this.sale.quantity=parseInt(this.sale.quantity)
            this.$axios.patch('/purchases/'+id, {
                price : this.sale.price,
                quantity : this.sale.quantity
            })
            .then(resp => {
                console.log(resp)
                if (resp.status === 200) {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                })
                } else {
                this.$message({
                    message: '修改失败',
                    type: 'error'
                })
                }
            })
            .catch(failResponse => {
                this.$message({
                    message: '修改失败2',
                    type: 'error'
                })
            })
            this.dialogModifyVisible = false
            this.getall()
        }
    }
  }
  </script>
  
   <style scoped>
   *{
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
   }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    float: right;
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 80px;
    height: 120px;
    margin-left: 20px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .createbutton{
    margin-right: 40px;
    float: right;
  }
  .deletebutton{
    float: right;
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
  .purchasebutton{
    /* float: right; */
    margin-bottom: 10px;
  }
  .salebutton{
    /* float: right; */
  }
  .search{
    float: left;
    margin-left: 4%;
  }
  .modifycss{
    margin-bottom: 10px;
  }
  </style>
  
  