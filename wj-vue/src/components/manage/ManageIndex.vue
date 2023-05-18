<template>
    <el-container>
      <el-header class="elheader">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside class="elaside">
          <el-row class="tac">
            <el-col :span="12">
              <!-- <h5></h5> -->
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#fff"
                text-color="#0557b4"
                active-text-color="#000000">
                <el-menu-item index="1" @click="bookclk">
                  <i class="el-icon-location"></i>
                  <span slot="title">图书管理</span>
                </el-menu-item>
                <el-menu-item index="2" @click="purchaseclk">
                  <i class="el-icon-menu"></i>
                  <span slot="title">采购订单</span>
                </el-menu-item>
                <el-menu-item index="3" @click="saleclk">
                  <i class="el-icon-document"></i>
                  <span slot="title">销售记录</span>
                </el-menu-item>
                <el-menu-item index="4" @click="balanceclk">
                  <i class="el-icon-document"></i>
                  <span slot="title">流水记录</span>
                </el-menu-item>
                <el-menu-item index="5" @click="balanceclk" v-if="true">
                  <i class="el-icon-setting"></i>
                  <span slot="title" >财务管理</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>

        </el-aside>
        <el-main class="elmain">
          <el-tabs v-model="wtname" :tab-position="left" @tab-click="handleClick">
            <el-tab-pane label="" name="1"><Books></Books></el-tab-pane>
            <el-tab-pane label="" name="2"><Orders></Orders></el-tab-pane>
            <el-tab-pane label="" name="3"><Sales></Sales></el-tab-pane>
            <el-tab-pane label="" name="4"><Balance></Balance></el-tab-pane>
          </el-tabs>

          <!-- <router-view/> -->
        </el-main>
      </el-container>
    </el-container>
  </template>

<script>
  import SideMenu from './components/SideMenu'
  import Header from './components/Header'
  import Books from './components/Books'
  import Orders from './components/Orders'
  import Sales from './components/Sales'
  import Balance from './components/Balance'
  import { TabPane, Tabs } from 'element-ui'
  export default {
    name: 'ManageIndex',
    // 注释：这里的components是局部注册，只能在当前组件中使用
    components: { SideMenu, Header, Books, Orders,Sales,Balance,Tabs, TabPane },
    data () {
      return {
        tabPosition: 'left',
        dialogVisible: false,
        wtname: '1'
      }
    },
    mounted () {
    },
    watch: {
      $route (to, from) {
        this.name=this.$route.name
        // console.log(to)
        // console.log(from)
      }
    },
    methods:{
      bookclk(){
        this.wtname='1',
        console.log(wtname)
      },
      purchaseclk(){
        this.wtname='2'
      },
      saleclk(){
        this.wtname='3'
      },
      balanceclk(){
        this.wtname='4'
      }
    }
  }
</script>

<style>

  .el-header, .el-footer {
    background-color: #539cef;
    color: #ffffff;
    text-align: center;
    
    line-height: 60px;
  }
  
  .el-aside {
    /* background-color: rgb(84, 92, 100); */
    /* color: #333;s */
    text-align: center;
    /* width: 200px;s */
    /* line-height: 200px; */
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    /* line-height: 160px;s */
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
  .elheader{
    position: fixed;
    height: 60px;
    width: 100%;
    z-index: 2;
  }
  .elaside{
    position: fixed;
    width: 200px !important;
    height: 100%;
    z-index: 1;
    margin-top: 60px;
  }  
  .el-menu-vertical-demo{
    width: 200px;
    height: 100%;
    position: fixed;
    top: 60px;
    left: 0;
    background-color: #000000;
  }
  span{
    display: inline-block;
    font-size: 20px;
  }
  .elmain{
    margin-left: 200px;
    margin-top: -5px;
  }
</style>
