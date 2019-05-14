<template>
  <div class="userDistribution">
      <!-- <div class="search">
          <el-input v-model="searchPhone" placeholder="请输入手机号查询"></el-input>
          <img src="../assets/img/seach.jpg" alt="" class="searchIcon">
      </div> -->
      <template>
        <el-table highlight-current-row ref="multipleTable" :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"  style="width: 100%" :header-cell-style="{'background-color':'#447ED9','color':'white','text-align':'center'}" :cell-style="{'text-align':'center'}"  >
            <el-table-column label="层级" width="70">
                <template slot-scope="scope">{{ scope.row.num}}</template>
            </el-table-column>
            <el-table-column prop="power_nums" label="认权人数" width="150"></el-table-column>
            <el-table-column prop="crowdfunding_nums" label="众筹人数" width="150"></el-table-column>
            <el-table-column prop="total_nums" label="合计人数" width="150" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="power_total_quantity" label="认权EMT" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="crowdfunding_total_quantity" label="众筹EMT" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="total_quantity" label="合计EMT" width="180" show-overflow-tooltip> </el-table-column>
        </el-table>
        <div class="paging">
            <el-pagination :page-size="pagesize"  layout="prev, pager, next" :total="nums" @current-change="changePage"></el-pagination>
        </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'userDistribution',
  data () {
    return {
        searchPhone:"",//搜索的手机号
        tableData3: [],//分层用户表格
        pagesize:7,//每页数据量
        // pageCount:11,//最大页码数
        nums:0,//数据总数量
        currentPage:1,//当前页
    }
  },
  methods:{
      //改变当前页
      changePage(val){
          let _this =this;
          ////console.log('当前页：'+val);
          _this.currentPage = val;
      },
     //获取层级用户信息
     getHierarchyUser(){
         let _this = this;
         let api = '/super_control_users';
         _this.axios.get(api).then(res=>{
             console.log(res);
             _this.tableData3 = res.data.result;
             _this.tableData3.sort((a,b)=>{
                 return a.num - b.num
             });
             _this.nums = _this.tableData3.length;

         });
     }
  },
  mounted(){
      let _this = this;
      _this.getHierarchyUser();//获取分层用户信息
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.userDistribution{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    padding-top: 1.25rem;
}
/* 搜索部分 */
/* .userDistribution>>>.search{
    background-color: rgba(68, 126, 217, 1);
    width:83% !important;
    margin: 0 auto;
    height:8vh ;
    line-height: 8vh;
    padding:.125rem 0;
    position: relative;
    font-size: .8125rem;
    color: white;
} */
/* 输入框样式 */
/* .userDistribution>>>.search .el-input{
    width: 40%;
    margin:0 1.875rem;
    margin-right: 30%;
}
.userDistribution>>>.search input{
    height: 1.875rem;
    line-height: 1.875rem;
} */
/* 搜索图标 */
/* .userDistribution>>>.searchIcon{
    position: absolute;
    top: 1.4375rem;
    left: 26.25rem;
    width: 1.1875rem;
    height: 1.1875rem;
} */
/* 表格 */
.el-table{
    width:82% !important;
    height: 62vh;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 2.5rem;
    border: .0625rem solid rgba(215, 215, 215, 1);
}
/* 单元格的样式 */
.userDistribution>>>.el-table .cell{
    line-height: 2rem;
}
/* 消除表格下面分割线 */
.el-table::before{
    display: none;
}
/* 表格内容部分 */
.userDistribution>>>.el-table__body-wrapper{
    overflow-x: hidden;
}
/* 分页 */
.userDistribution>>>.paging{
    text-align: right;
    margin-right: 8%;
}
</style>
