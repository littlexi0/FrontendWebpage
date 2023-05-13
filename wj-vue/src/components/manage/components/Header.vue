<template>
  <div class="header">
    <div class="logo"></div>
    <div class="name">图书管理系统</div>
    <el-button type="primary" @click="logout" class="logoutButton">退出</el-button>
    <div class="avatar"></div>
  </div>
</template>
  
<script>
  export default {
    name: 'Header',
    data () {
      return {
        name: 'Header'
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
      }
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
  }
  .logoutButton{
    float: right;
    margin-top: 10px;
  }
</style>
  
  