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
                default-active="0"
                class="el-menu-vertical-demo"
                background-color="#fff"
                text-color="#0557b4"
                active-text-color="#000000">
                <el-menu-item index="0" @click="homepageclk">
                  <i class="el-icon-location"></i>
                  <span slot="title">主页浏览</span>
                </el-menu-item>
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
                <el-menu-item index="5" @click="users" v-if=displayuser>
                  <i class="el-icon-setting"></i>
                  <span slot="title" >用户管理</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>

        </el-aside>
        <el-main class="elmain">
          <el-tabs v-model="wtname" :tab-position="left" @tab-click="handleClick">
            <el-tab-pane label="" name="0"><Homepage ref="HomepageChild"></Homepage></el-tab-pane>
            <el-tab-pane label="" name="1"><Books ref="BooksChild"></Books></el-tab-pane>
            <el-tab-pane label="" name="2"><Orders ref="OrdersChild"></Orders></el-tab-pane>
            <el-tab-pane label="" name="3"><Sales ref="SalesChild"></Sales></el-tab-pane>
            <el-tab-pane label="" name="4"><Balance ref="BalanceChild"></Balance></el-tab-pane>
            <el-tab-pane label="" name="5"><Users ref="UsersChild"></Users></el-tab-pane>       
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
  import Users from './components/Users'
  import Homepage from './components/Homepage'
  import { TabPane, Tabs } from 'element-ui'
  export default {
    name: 'ManageIndex',
    // 注释：这里的components是局部注册，只能在当前组件中使用
    components: { SideMenu, Homepage, Header, Books, Orders,Sales,Balance,Users,Tabs, TabPane },
    data () {
      return {
        tabPosition: 'left',
        dialogVisible: false,
        wtname: '0',
        displayuser: true
      }
    },
    mounted () {
    },
    created(){
      console.log(window.localStorage.getItem('currentusername'))
      if(window.localStorage.getItem('currentusername') != 'admin')
        this.displayuser=false;
    },
    watch: {
      $route (to, from) {
        this.name=this.$route.name
        // console.log(to)
        // console.log(from)
      }
    },
    methods:{
      homepageclk(){
        this.wtname='0'
        this.$refs.HomepageChild.getall()
      },
      bookclk(){
        this.wtname='1',
        this.$refs.BooksChild.getall()
      },
      purchaseclk(){
        this.wtname='2'
        this.$refs.OrdersChild.getall()
      },
      saleclk(){
        this.wtname='3'
        this.$refs.SalesChild.getall()
      },
      balanceclk(){
        this.wtname='4'
        this.$refs.BalanceChild.getall()
      },
      users(){
        this.wtname='5'
        this.$refs.UsersChild.getall()
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
