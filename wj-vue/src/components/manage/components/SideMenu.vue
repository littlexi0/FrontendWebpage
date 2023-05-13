<template>
<el-row class="tac">
  <el-col :span="12">
    <!-- <h5></h5> -->
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#bcd7f6"
      text-color="#0557b4"
      active-text-color="#000000">
      <el-menu-item index="1">
        <i class="el-icon-location"></i>
        <span slot="title">图书总览</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">采购图书</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">销售图书</span>
      </el-menu-item>
      <el-menu-item index="4" @click="clk">
        <i class="el-icon-setting"></i>
        <span slot="title" >{{activeIndex}}</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template>
  
<script>
  export default {
    name: 'SideMenu',
    data () {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      clk () {
        this.activeIndex = this.activeIndex+1
      }
    }
  }
</script>
  
<style scoped>
  .el-menu-vertical-demo{
    width: 200px;
    height: 100%;
    position: fixed;
    top: 60px;
    left: 0;
    /* background-color: #000000; */
  }
  span{
    display: inline-block;
    font-size: 20px;
  }
</style>
  
  