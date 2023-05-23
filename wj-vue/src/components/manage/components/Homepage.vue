<template>
    <div>
        <h2>数据总览</h2>
        <el-row :gutter="20">
        <el-col :span="5">
            <div>
                <el-tag effect="dark" size="medium " style="width: 120px; height: 40px; padding-top: 6px; font-size: 24px;">书籍数量</el-tag>
                <br>
                <el-tag effect="plain" size="medium " style="width: 120px; height: 40px; padding-top: 6px; font-size: 24px;">{{ book_count }}</el-tag>
            </div>
        </el-col>
        <el-col :span="5">
            <div>
                <el-tag effect="dark" size="medium " style="width: 120px; height: 40px; padding-top: 6px; font-size: 24px;">购买数量</el-tag>
                <br>
                <el-tag effect="plain" size="medium " style="width: 120px; height: 40px; padding-top: 6px; font-size: 24px;">{{ purchase_count }}</el-tag>
            </div>
        </el-col>
        <el-col :span="5">
            <div>
                <el-tag effect="dark" size="medium " style="width: 120px; height: 40px; padding-top: 6px; font-size: 24px;">销售数量</el-tag>
                <br>
                <el-tag effect="plain" size="medium " style="width: 120px; height: 40px; padding-top: 6px; font-size: 24px;">{{ sale_count }}</el-tag>
            </div>
        </el-col>
        <el-col :span="5">
            <div>
                <el-tag effect="dark" size="medium " style="width: 120px; height: 40px; padding-top: 6px; font-size: 24px;">流水数量</el-tag>
                <br>
                <el-tag effect="plain" size="medium " style="width: 120px; height: 40px; padding-top: 6px; font-size: 24px;">{{ balance_count }}</el-tag>
            </div>
        </el-col>
        <el-col :span="4">
            <div>
                <el-tag effect="dark" size="medium " style="width: 120px; height: 40px; padding-top: 6px; font-size: 24px;">用户数量</el-tag>
                <br>
                <el-tag effect="plain" size="medium " style="width: 120px; height: 40px; padding-top: 6px; font-size: 24px;">{{ user_count }}</el-tag>
            </div>
        </el-col>
        </el-row>
    </div>
  </template>
  
  <script>

    export default {
      name: 'Homepage',
      data () {
        return {
            balance_count:0,
            book_count:0,
            purchase_count:0,
            sale_count:0,
            user_count:0
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
          var parames="/meta"
          parames+="?t="+t;
          console.log(parames);
          this.$axios.get(parames)
          .then(resp=>{
            if(resp.status === 200){
              this.$message({
                message: '查询成功',
                type: 'success'
              })
              console.log(resp.data.balance_count)
              try{
                console.log(resp.data.balance_count)
                this.balance_count=resp.data.balance_count,
                this.book_count=resp.data.book_count,
                this.purchase_count=resp.data.purchase_count,
                this.sale_count=resp.data.sale_count,
                this.user_count=resp.data.user_count
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
        }
    }
  }
  </script>


<style lang="scss">
  .like {
    cursor: pointer;
    font-size: 25px;
    display: inline-block;
  }
</style>


<style scoped >

   *{
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
   }

</style>