<template>
    <div>
      <div class="search">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
              <el-input v-model="formInline.searchvalue" placeholder="在此输入查询的用户id"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchSubmit" size="small">查询</el-button>
            </el-form-item>
          </el-form>
      </div>
      <div class="search">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
              <el-input v-model="formInline.deletevalue" placeholder="在此输入删除的用户id"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="deleteSubmit" size="small">删除</el-button>
            </el-form-item>
          </el-form>
      </div>

      <div class="search">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
              <el-input v-model="formInline.modifyid" placeholder="在此输入修改的用户id"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" @click="modifybtn" size="small">修改用户</el-button>
            </el-form-item>
          </el-form>
      </div>

      <el-dialog title="修改用户" :visible.sync="dialogModifyVisible">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="用户名">
            <el-input v-model="modifyuser.username"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-input v-model="modifyuser.avatar"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="modifyuser.gender"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="modifyuser.real_name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="modifyuser.password"></el-input>
          </el-form-item>
          <el-form-item label="职工编码">
            <el-input v-model="modifyuser.staff_id"></el-input>
          </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="reset">重 置</el-button>
            <el-button type="primary" @click="submitmodify()">提交</el-button>
          </div>
      </el-dialog>


      <el-button type="primary" icon="el-icon-plus" circle class="createbutton" @click="createuserclk"></el-button>

      <el-dialog title="创建用户" :visible.sync="dialogFormVisible">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="用户名*">
            <el-input v-model="createuser.username"></el-input>
          </el-form-item>
          <el-form-item label="密码*">
            <el-input v-model="createuser.password"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-input v-model="createuser.avatar"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="createuser.gender"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="createuser.real_name"></el-input>
          </el-form-item>
          <el-form-item label="职工编码">
            <el-input v-model="createuser.staff_id"></el-input>
          </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetcreate">重 置</el-button>
            <el-button type="primary" @click="submitcreate()">提交</el-button>
          </div>
      </el-dialog>

      <el-table
        :data="users"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="id"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="100">
        </el-table-column>
        <el-table-column
          prop="last_login"
          label="上次登录"
          width="200">
        </el-table-column>
        <el-table-column
          prop="register_time"
          label="注册时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="real_name"
          label="真实姓名"
          width="100">
        </el-table-column>    
        <el-table-column
          prop="is_admin"
          label="管理员"
          width="100">
        </el-table-column> 
        <el-table-column
          prop="staff_id"
          label="职工编码"
          >
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
import { parseDate } from 'echarts/lib/util/number';


    export default {
      name: 'Users',
      data () {
        return {
          currentDate: new Date(),
          currentPage: 1,
          pagesize: 10,
          total: 0,   
          id: 0,
          isbn:0,
          dialogModifyVisible: false,
          dialogFormVisible: false,
          starttime:'',
          endtime:'',
          searchbytime:false,
          users:[
            {
              avatar:"string",
              gender:"string",
              id:0,
              is_admin:'',
              last_login:"string",
              real_name:"string",
              register_time:"string",
              staff_id:"string",
              username:"string"
            }
          ],
          modifyuser:{
            avatar:"",
            gender:"",
            is_admin:'',
            password:'',
            real_name:"",
            staff_id:"",
            username:"请退出输入用户id"
          },
          createuser:{
            avatar:"",
            gender:"",
            password:'',
            real_name:"",
            staff_id:"",
            username:""
          },
          formInline:{
            searchvalue:'',
            deletevalue:'',
            modifyid:''
          },
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
          var parames="/users?page_size="+this.pagesize+"&page_num="+this.currentPage
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
                  this.users = resp.data.users,
                  this.total = resp.data.page_total,
                  this.tosttime(this.users)
                  for(var i =0 ;i<this.users.length;i++)
                  {
                    this.users[i].is_admin=this.users[i].is_admin?'是':'不是'
                  }
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
        tosttime(users){
          for(var i=0;i<users.length;i++)
          {
            var str = users[i].last_login;
            var date = new Date(str).toJSON();
            var newDate=new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
            users[i].last_login=newDate;
          }
          for(var i=0;i<users.length;i++)
          {
            var str = users[i].register_time;
            var date = new Date(str).toJSON();
            var newDate=new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
            users[i].register_time=newDate;
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
        searchSubmit(){
          var t = new Date().getTime();
          var id=parseInt(this.formInline.searchvalue)
          var parames="/users/"+id
          parames+="?t="+t;
          this.$axios.get(parames)
          .then(resp=>{
            if(resp.status === 200){
              this.$message({
                message: '查询成功',
                type: 'success'
              })
              try{
                  this.users[0] = resp.data,
                  // console.log(this.users)
                  this.total = 1
                  this.tosttime(this.users)
                  var temp=this.users[0]                
                  this.users=[temp]
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
        deleteSubmit(){
          var t = new Date().getTime();
          // var id=parseInt(this.formInline.deletevalue)
          var parames="/users/"+this.formInline.deletevalue
          parames+="?t="+t;
          this.$axios.delete(parames)
          .then(resp=>{
            if(resp.status === 204){
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              try{
                  this.getall()
              }catch(e){
                console.log(e)
              }
            }else{
              this.$message({
                message: '删除失败',
                type: 'error'
              })
            }
          })
          .catch(failResponse => {
            console.log(resp)
            this.$message({
                message: '删除失败2',
                type: 'error'
              })
          })
        },
        modifybtn(){
          this.dialogModifyVisible=true;
          if(this.formInline.modifyid=='')
          {
            this.modifyuser.avatar='';
            this.modifyuser.gender='';
            this.modifyuser.is_admin='';
            this.modifyuser.password='';
            this.modifyuser.real_name='';
            this.modifyuser.staff_id='';
            this.modifyuser.username='请退出输入用户id';
          }
          else
          {
            for(var i = 0;i<this.users.length;i++)
            {
              console.log(this.users[i].id);
              console.log(this.formInline.modifyid);
              if(this.users[i].id==parseInt(this.formInline.modifyid))
              {
                this.modifyuser.avatar=this.users[i].avatar;
                this.modifyuser.gender=this.users[i].gender;
                this.modifyuser.is_admin=this.users[i].is_admin;
                this.modifyuser.password=this.users[i].password;
                this.modifyuser.real_name=this.users[i].real_name;
                this.modifyuser.staff_id=this.users[i].staff_id;
                this.modifyuser.username=this.users[i].username;
                break;
              }
            }
          }
        },
        submitmodify(){
          // console.log(2)
          var t = new Date().getTime();
          var parames="/users/"+this.formInline.modifyid
          parames+="?t="+t;
          this.modifyuser.is_admin=this.modifyuser.is_admin=='是'?true:false;
          this.$axios.patch(parames,this.modifyuser)
          .then(resp=>{
            console.log(resp)
            if(resp.status === 200){
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              try{
                  this.getall()
                  this.dialogModifyVisible=false
              }catch(e){
                console.log(e)
              }
            }else{
              this.$message({
                message: '提交失败',
                type: 'error'
              })
            }
          })
          .catch(failResponse => {
            console.log(resp)
            this.$message({
                message: '提交失败2',
                type: 'error'
              })
          })
        },
        reset(){
          this.modifybtn();
        },
        createuserclk(){
          this.dialogFormVisible=true
          this.createuser.avatar="",
          this.createuser.avatargender="",
          this.createuser.avatarpassword='',
          this.createuser.avatarreal_name="",
          this.createuser.avatarstaff_id="",
          this.createuser.avatarusername=""
        },
        resetcreate(){
          this.createuserclk();
        },
        submitcreate(){
          var t = new Date().getTime();
          var parames="/register"
          parames+="?t="+t;
          this.$axios.post(parames,this.createuser)
          .then(resp=>{
            // console.log(resp)
            if(resp.status === 200){
              this.$message({
                message: '创建成功',
                type: 'success'
              })
              try{
                  this.getall();
                  this.dialogFormVisible=false;
              }catch(e){
                console.log(e)
              }
            }else{
              this.$message({
                message: '创建失败',
                type: 'error'
              })
            }
          })
          .catch(failResponse => {
            console.log(resp)
            this.$message({
                message: '创建失败2',
                type: 'error'
              })
          })
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
  .search{
    float: left;
  }
</style>