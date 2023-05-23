<template>
  <div class="header">
    <div class="logo"></div>
    <div class="name">图书管理系统</div>
    <el-button type="primary" @click="logout" class="logoutButton">退出</el-button>

    <div class="avatar" @click="avatarclk">
      <div class="moreinfo" v-if="moreinfovisual">
      <span style="border-bottom: 1px solid rgb(35, 168, 235);" @click="setclk">个人设置</span>
      <br>
      <span @click="logoffclk">注销账户</span>
    </div>
    </div>

    <el-dialog title="个人信息" :visible.sync="dialogModifyVisible">
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

  </div>
</template>
  
<script>
  export default {
    name: 'Header',
    data () {
      return {
        name: 'Header',
        form:{
          avatar:"https://avatars.githubusercontent.com/u/107924376?v=4"
        },
        moreinfovisual:false,
        dialogModifyVisible:false,
        cnt:0,
        modifyuser:{
            avatar:"",
            gender:"",
            password:'',
            real_name:"",
            staff_id:"",
            username:""
        }
      }
    },
    methods: {
      logout () {
        this.$message({
          message: '退出成功',
          type: 'success'
        })
        this.$store.commit('logout')
        this.$router.replace('/login')
      },
      avatarclk(){
        this.moreinfovisual=(this.cnt&1)?true:false;
        this.cnt+=1;
        console.log(this.cnt)
      },
      getall(){
          var t = new Date().getTime();
          var parames="/users/me"
          parames+="?t="+t;
          this.$axios.get(parames)
          .then(resp=>{
            console.log(resp)
            if(resp.status === 200){
              this.$message({
                message: '查询成功',
                type: 'success'
              })
              try{
                this.modifyuser.avatar=resp.data.avatar;
                this.modifyuser.gender=resp.data.gender;
                this.modifyuser.is_admin=resp.data.is_admin;
                this.modifyuser.password=resp.data.password;
                this.modifyuser.real_name=resp.data.real_name;
                this.modifyuser.staff_id=resp.data.staff_id;
                this.modifyuser.username=resp.data.username;
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
      setclk(){
        this.getall();
        this.dialogModifyVisible=true
      },
      submitmodify(){
        var t = new Date().getTime();
        var parames="/users/me"
        parames+="?t="+t;
        this.$axios.patch(parames,this.modifyuser)
        .then(resp=>{
          console.log(resp)
          if(resp.status === 200){
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            try{
              this.dialogModifyVisible=false
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
      reset(){
        this.setclk();
      },    
      logoffclk(){
          var t = new Date().getTime();
          var parames="/users/me"
          parames+="?t="+t;
          this.$axios.delete(parames)
          .then(resp=>{
            console.log(resp)
            if(resp.status === 204){
              this.$message({
                message: '注销成功',
                type: 'success'
              })
              try{
                this.logout()
              }catch(e){
                console.log(e)
              }
            }else{
              this.$message({
                message: '注销失败',
                type: 'error'
              })
            }
          })
          .catch(failResponse => {
            console.log(resp)
            this.$message({
                message: '注销失败2',
                type: 'error'
              })
          })
        },
    },
    mounted () {

    },
    created () {

    }
  }
</script>

<style scoped>
  .header{
    height: 60px;
  }
  .logo{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    float: left;
    background-image: url(https://pic.jingyijun.xyz:8443/i/2023/05/13/645f00b811c79.png);
    background-size: contain;
  }
  .name{
    font-size: 22px;
    font-weight: bold;
    float: left;
    margin-left: 42%;

    /* top: 10px; */
  }
  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    background-image: url(https://avatars.githubusercontent.com/u/107924376?v=4);
    background-size: contain;
    cursor: pointer;
  }
  .logoutButton{
    float: right;
    margin-top: 10px;
  }
  .moreinfo{
    position: relative;
    top: 40px;
    width: 120px;
    right: 40px;
    background-color: rgba(25, 187, 232, 0.619);
    color: rgb(255, 255, 255);
    border-radius: 5px;
    border: 2px solid rgb(49, 245, 245);
  }
</style>
  
  