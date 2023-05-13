<template>
    <div>
      <div>
        <el-row>
          <div>
            <div class="search">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="">
                  <el-select v-model="formInline.searchtype" placeholder="书名" style="width: 100px;">
                    <el-option label="书名" value="title"></el-option>
                    <el-option label="书籍编号" value="id"></el-option>
                    <el-option label="书籍ISBN号" value="isbn"></el-option>
                    <el-option label="作者" value="author"></el-option>
                    <el-option label="出版社" value="press"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="formInline.searchvalue" placeholder="在此输入查询条件"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="searchSubmit" size="small">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-button type="primary" icon="el-icon-plus" circle class="createbutton" @click="dialogFormVisible = true"></el-button>
          </div>

          <el-dialog title="创建图书" :visible.sync="dialogFormVisible">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="标题*">
                <el-input v-model="createbook.title"></el-input>
              </el-form-item>
              <el-form-item label="封面链接">
                <el-input v-model="createbook.cover"></el-input>
              </el-form-item>
              <el-form-item label="作者*">
                <el-input v-model="createbook.author"></el-input>
              </el-form-item>
              <el-form-item label="isbn*">
                <el-input v-model="createbook.isbn"></el-input>
              </el-form-item>
              <el-form-item label="出版社*">
                <el-input v-model="createbook.press"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="createbook.description"></el-input>
              </el-form-item>
              <el-form-item label="价格">
                <el-input v-model="createbook.price"></el-input>
              </el-form-item>
            </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="reset">重 置</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
              </div>
          </el-dialog>
          
        </el-row>
      </div>

      <el-row>
        <el-col :span="21" v-for="(o, index) in books" :key="o" :offset="1">
          <el-card :body-style="{ padding: '0px' }" class="elcard">
            <el-button type="text" class="modifybutton" @click="clkmodify(o)">
              <img :src="o.cover" class="image">
            </el-button>
            <div style="padding: 14px;">

              <div class="bottom clearfix">
                <el-dialog title="创建图书" :visible.sync="dialogModifyVisible">
                  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    <el-form-item label="标题*">
                      <el-input v-model="createbook.title"></el-input>
                    </el-form-item>
                    <el-form-item label="封面链接">
                      <el-input v-model="createbook.cover"></el-input>
                    </el-form-item>
                    <el-form-item label="作者*">
                      <el-input v-model="createbook.author"></el-input>
                    </el-form-item>
                    <el-form-item label="isbn*">
                      <el-input v-model="createbook.isbn"></el-input>
                    </el-form-item>
                    <el-form-item label="出版社*">
                      <el-input v-model="createbook.press"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                      <el-input v-model="createbook.description"></el-input>
                    </el-form-item>
                    <el-form-item label="价格">
                      <el-input v-model="createbook.price"></el-input>
                    </el-form-item>
                  </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="reset">重 置</el-button>
                      <el-button type="primary" @click="submitmodify()">修 改</el-button>
                    </div>
                </el-dialog>
                <el-button type="success" class="purchasebutton" round>购买</el-button><br>
                <el-button type="primary" class="salebutton" round>出售</el-button>
                <!-- <el-button type="text" class="salebutton">操作按钮</el-button>s -->
              </div>
              <div class="details">
                <div style="display: inline-block; font-size: 10px;"><strong>标题: </strong>{{o.title}}</div><br>
                <div style="display: inline-block; font-size: 6px;"><strong>作者: </strong>{{o.author}}</div><br>
                <div style="display: inline-block; font-size: 6px;"><strong>isbn: </strong>{{o.isbn}}</div><br>
                <div style="display: inline-block; font-size: 6px;"><strong>出版社: </strong>{{o.press}}</div><br>
                <div style="display: inline-block; font-size: 5px;"><strong>描述: </strong>{{o.description}}</div><br>
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
          :total=40
          >
        </el-pagination>
      </el-row>
    </div>
  </template>
  
  <script>
    export default {
      name: 'Books',
      data () {
        return {
          currentDate: new Date(),
          currentPage: 1,
          pagesize: 10,
          total: "50",
          formInline: {
            searchtype:"",
            searchvalue:""
          },      
          id: 0,
          isbn:0,
          title:"",
          author:"",
          press:"",
          createbook: {
            author:"",
            cover:"",
            description:"",
            isbn:"",
            on_sale:true,
            press:"",
            price: 0,
            title:"",
            published_date: "2006-01-02T15:04:05Z",
            id: 0
          },
          dialogFormVisible: false,
          dialogModifyVisible: false,
          books: [
            {
              author:"刘慈欣",
              cover:'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
              created_at:"string",
              description:'文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……',
              id:0,
              isbn:"978454856465",
              on_sale:true,
              press:'重庆出版社',
              price:0,
              published_date:"string",
              stock:0,
              title:'三体',
              updated_at:"string",
              user_id:0
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
        createclk(){

        },
        getall(){
          this.$axios.get('/books',{params:{
            page_size:this.pagesize,
            page_num:this.currentPage
          }})
          .then(resp=>{
            console.log(resp)
            if(resp.status === 200){
              this.$message({
                message: '查询成功',
                type: 'success'
              })
              try{
                this.books = resp.data
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
            this.$message({
                message: '查询失败2',
                type: 'error'
              })
          })
        },
        reset(){
          this.createbook = {
            author:"",
            cover:"",
            description:"",
            isbn:"",
            on_sale:false,
            press:"",
            price:0,
            published_date:"",
            title:"",
            published_date: "2006-01-02T15:04:05Z",
            id:0
          }
        },
        submit(){
          this.dialogFormVisible = false,
          this.createbook.price=parseFloat(this.createbook.price)
          this.$axios
          .post('/books', this.createbook)
          .then(resp => {
            console.log(resp)
            if (resp.status === 201) {
              this.$message({
                message: '添加成功',
                type: 'success'
              }),5
              this.getall(),
              this.reset()
            } else {
              this.$message({
                message: '添加失败1',
                type: 'error'
              })
            }
          })
          .catch(failResponse => {
            this.$message({
                message: '添加失败2',
                type: 'error'
              })
          })
        },
        refresh(){
          
        },
        clkmodify(book){
          console.log(1)
          console.log(book)
          this.createbook.author=book.author,
          this.createbook.cover=book.cover,
          this.createbook.description=book.description,
          this.createbook.isbn=book.isbn,
          this.createbook.on_sale=book.on_sale,
          this.createbook.press=book.press,
          this.createbook.price=book.price,
          this.createbook.title=book.title,
          this.createbook.id=book.id,
          this.dialogModifyVisible = true
        },
        submitmodify(id){
          console.log(2)
          console.log(this.createbook.id)
          this.$axios.patch('/books/'+this.createbook.id, this.createbook)
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
          this.reset()
          this.getall()
        },
        handleCurrentChange(currentPage){
          this.currentPage = currentPage,
          this.getall()
        },
        handleSizeChange(currentSize){
          this.pagesize=currentSize,
          this.getall()
        },
        searchSubmit(){
          var parames="?page_size="+this.pagesize+"&page_num="+this.currentPage
          var value=this.formInline.value;
          switch (this.formInline.type) {
            case "title":
              parames+="&title"+value;
              break;
            case "title":
            parames+="&title"+value;
            break;
            case "title":
            parames+="&title"+value;
            break;
            case "title":
            parames+="&title"+value;
            break;
            case "title":
            parames+="&title"+value;
            break; 
            default:
              break;
          }
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
    width: 60%;
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
  </style>
  
  