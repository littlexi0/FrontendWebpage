<template>
  <body>
    <div class="content">
        <div class="box">
            <div class="left">
                <div class="block">
                    <div class="text">
                        <div class="one-text">
                            <div>
                                <div class="triangle"></div>
                                <span class="maos">Books</span>
                            </div>
                            <div>platform</div>
                            <div>for manage</div>
                        </div>
                        <div class="two-text">
                            <div>一个专注于</div>
                            <div>图书管理的平台</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="login-box">
                    <div class="title">
                        <h2>系统登录</h2>
                        <img src="../assets/img/loginimg/head.png" alt="">
                        <span>请输入用户名和密码</span>
                    </div>
                    <div class="login-input">
                        <span class="input-text" >用户名</span>
                        <input type="text" class="inputs email-input" v-model="loginForm.username" >
                        <span class="input-text">密码</span>
                        <input type="password" class="inputs pwd-input" v-model="loginForm.password">
                        <button class="login-btn" @click="login">登录</button>
                        <button class="login-btn" @click="reset">清除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </body>
</template>
<script>
  export default{
    data () {
      return {
        rules: {
          username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      login () {
        var _this = this
        this.$axios
          .post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(resp => {
            // console.log(resp)
            
            if (resp.status === 200) {
              // 登录成功
              // 保存token
              window.localStorage.setItem('access', resp.data.access)
              window.localStorage.setItem('currentusername',this.loginForm.username)
              console.log(resp)
              _this.$store.commit('login')
              // 跳转到首页
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              _this.$router.replace('/manage')
            } else {

            }
          })
          .catch(failResponse => {
            console.log(resp)
            this.$message({
                message: '账号或密码错误',
                type: 'error'
              })
          })
        },
        reset () {
          this.loginForm.username = ''
          this.loginForm.password = ''
        }
      }
    }
</script>

<style scoped> 
   #paper {
    /* background:url("../assets/img/bg/eva1.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed; */
  }
   body{
     margin: 0;
   }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }


body {
  padding: 0;
  margin: 0;
}

.content {
  background-color: rgb(246, 250, 255);
  position: relative;
  width: 100vw;
  height: 100vh;
}
.content .box {
  width: 80vw;
  height: 80vh;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}
.content .box .left {
  background-color: rgb(172, 198, 248);
  width: 50%;
  height: 100%;
  background-image: linear-gradient(-225deg, #2cd8d5 0%, #c5c1ff 50%, #ffbac3 100%);
  background-size: 600%;
  -webkit-animation: anime 20s linear infinite;
          animation: anime 20s linear infinite;
  position: relative;
}
.content .box .left .block {
  width: 70%;
  height: 70%;
  background-color: rgba(255, 255, 255, 0.35);
  -webkit-backdrop-filter: blur(13.5px);
          backdrop-filter: blur(13.5px);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.content .box .left .block .text {
  color: #fff;
  margin: 15% 0 0 15%;
  position: relative;
}
.content .box .left .block .text .one-text {
  font-size: 50px;
  font-weight: 800;
  font-family: "Baskerville Old Face", Times, serif;
}
.content .box .left .block .text .one-text .triangle {
  width: 0px;
  height: 0px;
  border: 20px solid transparent;
  border-left-color: rgb(255, 255, 255);
  display: inline-block;
}
.content .box .left .block .text .one-text .maos {
  margin-right: -5px;
  display: inline-block;
  position: absolute;
  left: 30px;
}
.content .box .left .block .text .one-text div:last-child {
  color: rgb(22, 22, 76);
}
.content .box .left .block .text .two-text {
  margin-top: 30px;
  font-size: 20px;
  font-family: "华文细黑", Times, serif;
}
.content .box .right {
  background-color: #fff;
  width: 50%;
  height: 100%;
  position: relative;
}
.content .box .right .login-box {
  width: 70%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.content .box .right .login-box .title {
  margin-bottom: 30px;
}
.content .box .right .login-box .title img {
  width: 40px;
  height: 40px;
  margin-bottom: -1px;
}
.content .box .right .login-box .title h2 {
  font-weight: 600;
  font-size: 40px;
  display: inline;
}
.content .box .right .login-box .title span {
  color: rgb(136, 135, 154);
  display: block;
  margin-top: 10px;
}
.content .box .right .login-box .login-input .input-text {
  font-weight: 600;
  color: rgb(41, 40, 78);
}
.content .box .right .login-box .login-input .inputs {
  display: block;
  margin: 10px 0;
  width: 100%;
  height: 50px;
  border: 1px solid rgb(201, 200, 207);
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  outline: none;
  font-size: 20px;
  font-weight: 200;
}
.content .box .right .login-box .login-input .inputs:hover {
  border: 1px solid rgb(155, 181, 247);
}
.content .box .right .login-box .login-input #check-rem[type=checkbox] {
  position: relative;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.content .box .right .login-box .login-input #check-rem[type=checkbox]::after {
  position: absolute;
  top: 0;
  color: #000;
  width: 16px;
  height: 16px;
  display: inline-block;
  visibility: visible;
  padding-left: 0px;
  text-align: center;
  content: " ";
  border-radius: 3px;
}
.content .box .right .login-box .login-input #check-rem[type=checkbox]:checked::after {
  content: "✓";
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
  border: 0;
  background: linear-gradient(to right, rgb(93, 172, 250) 0%, rgb(95, 139, 250) 40%, rgb(97, 96, 251) 70%, rgb(154, 140, 252) 100%);
}
.content .box .right .login-box .login-input .selec-other .check-input {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.content .box .right .login-box .login-input .selec-other .remember-pwd {
  color: rgb(41, 40, 78);
  font-weight: 600;
  vertical-align: middle;
}
.content .box .right .login-box .login-input .selec-other .remember-pwd:hover {
  cursor: pointer;
}
.content .box .right .login-box .login-input .selec-other .forgot-pwd {
  float: right;
  background-image: linear-gradient(to right, rgb(93, 172, 250) 0%, rgb(95, 139, 250) 40%, rgb(97, 96, 251) 70%, rgb(154, 140, 252) 100%);
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  margin-top: 1px;
}
.content .box .right .login-box .login-input .selec-other .forgot-pwd:hover {
  cursor: pointer;
}
.content .box .right .login-box .login-input .login-btn {
  width: 100%;
  height: 60px;
  color: #fff;
  background: linear-gradient(to right, rgb(93, 172, 250) 0%, rgb(95, 139, 250) 40%, rgb(97, 96, 251) 70%, rgb(154, 140, 252) 100%);
  border-radius: 10px;
  border: 0;
  margin-top: 20px;
  font-size: 20px;
}
.content .box .right .login-box .login-input .login-btn:hover {
  cursor: pointer;
}
.content .box .right .login-box .divider {
  width: 100%;
  margin: 20px 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content .box .right .login-box .divider .line {
  display: inline-block;
  max-width: 45%;
  width: 45%;
  flex: 1;
  height: 1px;
  background-color: rgb(201, 202, 209);
}
.content .box .right .login-box .divider .divider-text {
  vertical-align: middle;
  margin: 0px 20px;
  line-height: 0px;
  display: inline-block;
  width: 50px;
  color: rgb(201, 202, 209);
}
.content .box .right .login-box .other-login-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content .box .right .login-box .other-login-wrapper .other-login-item {
  width: 100%;
  border: 1px solid rgb(214, 222, 228);
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  color: rgb(51, 49, 116);
}
.content .box .right .login-box .other-login-wrapper .other-login-item img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.content .box .right .login-box .other-login-wrapper .other-login-item span {
  vertical-align: middle;
}

@-webkit-keyframes anime {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes anime {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}/*# sourceMappingURL=style.css.map */

</style>
