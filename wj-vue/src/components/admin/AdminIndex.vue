<template>
  <!-- <el-container id="admin-body">
    <el-header style="z-index: 1;height: 80px;margin-left: -20px">
      <Header style="position: absolute;width: 98%;"></Header>
    </el-header> -->
    <!--<el-row style="height: 100%;">-->
    <!-- <el-container>
      <el-aside style="height: 112%;margin-top: -80px;width: 250px">
        
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container> -->
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main><router-view/></el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AdminMenu from './AdminMenu'
  import Header from './Header'

  export default {
    name: 'AdminIndex',
    // 注释：这里的components是局部注册，只能在当前组件中使用
    components: {AdminMenu, Header},
    data () {
      return {
        dialogVisible: false
      }
    },
    mounted () {
      this.$router.replace('/admin/dashboard')
      // this.$router.replace('/index')
    }
  }
</script>

<!-- <style scoped>
  #admin-body {
  height: 95vh;
}
</style> -->
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>