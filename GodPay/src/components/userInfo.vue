<template>
  <div class="userInfo">
      <div class="search">
          <el-input v-model="searchPhone" placeholder="请输入手机号查询" @keyup.native="filterInfo"></el-input>
          <img src="../assets/img/seach.jpg" alt="" class="searchIcon" @click="filterInfo">
      </div>
      <template>
        <el-table highlight-current-row ref="multipleTable" :data="showTable.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"  style="width: 100%" :header-cell-style="{'background-color':'#447ED9','color':'white','text-align':'center'}" :cell-style="{'text-align':'center'}"  >
            <el-table-column label="序号" width="70">
                <template slot-scope="scope">{{ scope.$index + 1 + (currentPage - 1) * pagesize }}</template>
            </el-table-column>
            <el-table-column prop="uphone" label="手机号" width="180"></el-table-column>
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="wallt_address" label="钱包地址" width="280" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="power_grade" label="认权" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="crowdfunding_count" label="众筹" width="180" show-overflow-tooltip> </el-table-column>
        </el-table>
        <div class="paging">
            <el-pagination :page-size="pagesize"  layout="prev, pager, next" :total="nums" @current-change="changePage"></el-pagination>
        </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data () {
    return {
        searchPhone:"",//搜索的手机号
        showTable:[],//用于显示用户信息的列表：查询功能
        tableData3: [],//用户信息列表
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
        // console.log('当前页：'+val);
            _this.currentPage = val;
      },
      //获取用户信息
      getUserInfo(){
          let _this = this;
          let api = '/super_admin_user';
          _this.axios.get(api).then(res=>{
            //   console.log(res);
            _this.tableData3 = res.data.result;//获取用户信息
            _this.showTable = _this.tableData3;//处理数据后转移到用于显示数据的数组中
              console.log(_this.showTable);
          });
      },
      //筛选
    filterInfo(){
        let _this = this;
        // console.log('过滤手机号码');
        if(_this.searchPhone == ""){
            _this.showTable = _this.tableData3;
            return
        }
        _this.showTable = _this.tableData3.filter(item=>{
            return item.uphone.indexOf(_this.searchPhone) > -1
        });
    
        
    },
     
  },
  mounted(){
      let _this = this;
      _this.getUserInfo();//获取用户信息
  },
  watch:{
      //改变显示列表总条数，从而改变分页页数
      showTable(value){
          let _this = this;
          _this.nums = value.length;//监控showTable，获取数据总条数
      }
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.userInfo{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    padding-top: 1.25rem;
}
/* 搜索部分 */
.userInfo>>>.search{
    background-color: rgba(68, 126, 217, 1);
    width:83% !important;
    margin: 0 auto;
    height:8vh ;
    line-height: 8vh;
    padding:.125rem 0;
    position: relative;
    font-size: .8125rem;
    color: white;
}
/* 输入框样式 */
.userInfo>>>.search .el-input{
    width: 40%;
    margin:0 1.875rem;
    margin-right: 30%;
}
.userInfo>>>.search input{
    height: 1.875rem;
    line-height: 1.875rem;
}
/* 搜索图标 */
.userInfo>>>.searchIcon{
    position: absolute;
    top: 1.4375rem;
    left: 26.25rem;
    width: 1.1875rem;
    height: 1.1875rem;
}
/* 表格 */
.el-table{
    width:83.2% !important;
    height: 62vh;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 2.5rem;
    border: .0625rem solid rgba(215, 215, 215, 1);
}
/* 单元格的样式 */
.userInfo>>>.el-table .cell{
    line-height: 2rem;
}
/* 消除表格下面分割线 */
.el-table::before{
    display: none;
}
/* 表格内容部分 */
.userInfo>>>.el-table__body-wrapper{
    overflow-x: hidden;
}
/* 分页 */
.userInfo>>>.paging{
    text-align: right;
    margin-right: 8%;
}
</style>
