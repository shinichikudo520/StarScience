<template>
  <div class="rightDetails">
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
            <el-table-column prop="power_grade" label="认权产品" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="power_quantity" label="认权数量" width="200" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="power_time" label="认权时间" width="180" show-overflow-tooltip> </el-table-column>
            <!-- <el-table-column label="" width="180" >
                <template slot-scope="scope">
                    <span @click="checkDetails">查看明细 &gt;</span>
                </template>
            </el-table-column> -->
        </el-table>
        <div class="paging">
            <el-pagination :page-size="pagesize"  layout="prev, pager, next" :total="nums" @current-change="changePage"></el-pagination>
        </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'rightDetails',
  data () {
    return {
        searchPhone:"",//搜索的手机号
        showTable:[],//显示认权明细的列表
        tableData3: [],//认权明细查询
        currentPage:1,//当前页
        pagesize:7,//每页数据量    
        // pageCount:11,//最大页码数
        nums:0,//数据总数量
    }
  },
  methods:{
      //最后一列的表头
    //   lastHead({row, column, rowIndex, columnIndex}){
    //       //console.log(row,columnIndex);
    //       if(columnIndex == 6 ){//最后一列：进行状态
    //         return 'lastHead'
    //       }
    //   },
    //   //最后一列单元格样式
    //   cellStyle({row, column, rowIndex, columnIndex}){
    //     //   //console.log(row);
    //       if(columnIndex == 6){//最后一列：查看详情
    //         return 'lastState'
    //       }
    //   },
      //改变当前页
      changePage(val){
          let _this =this;
          //console.log('当前页：'+val);
          _this.currentPage = val;
      },
      //查看认权用户明细
    //   checkDetails(){
    //         let _this = this;
    //         const h = this.$createElement;
    //         _this.$msgbox({
    //         message: h('p',  {style: 'text-align: center'}, [
    //             h('span',null, '认权用户详情'),
    //         ]),
    //         showConfirmButton: false,
    //         });
    //   }
    //获取认权明细
    getRightDetails(){
        let _this = this;
        let api = '/super_admin_power';
        _this.axios.get(api).then(res=>{
            // console.log(res);
            _this.tableData3 = res.data.result;//获取认权明细列表
            _this.showTable = _this.tableData3;
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
      _this.getRightDetails();//获取认权明细
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
.rightDetails{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    padding-top: 1.25rem;
}
/* 搜索部分 */
.rightDetails>>>.search{
    background-color: rgba(68, 126, 217, 1);
    width:76% !important;
    margin: 0 auto;
    height:8vh ;
    line-height: 8vh;
    padding:.125rem 0;
    position: relative;
    font-size: .8125rem;
    color: white;
}
/* 输入框样式 */
.rightDetails>>>.search .el-input{
    width: 40%;
    margin:0 1.875rem;
    margin-right: 30%;
}
.rightDetails>>>.search input{
    height: 1.875rem;
    line-height: 1.875rem;
}
/* 搜索图标 */
.rightDetails>>>.searchIcon{
    position: absolute;
    top: 1.4375rem;
    left: 24.0625rem;
    width: 1.1875rem;
    height: 1.1875rem;
}
/* 表格 */
.el-table{
    width:76% !important;
    height: 62vh;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 2.5rem;
    border: .0625rem solid rgba(215, 215, 215, 1);
}
/* 单元格的样式 */
.rightDetails>>>.el-table .cell{
    line-height: 2.0625rem;
}
/* 消除表格下面分割线 */
.el-table::before{
    display: none;
}
/* 表格内容部分 */
.rightDetails>>>.el-table__body-wrapper{
    overflow-x: hidden;
}
/* 同意按钮 */
/* .rightDetails>>>.agreeBtn{
    background-color: rgba(68, 126, 217, 1);
} */
/* 状态列 */
/* .lastState span{
    display: inline-block;
    padding:  .3125rem .625rem;
    font-size: .75rem;
    border-radius: .3125rem;
    color: white;
    background-color: rgba(68, 126, 217, 1);
    cursor: pointer;
} */
/* 分页 */
.rightDetails>>>.paging{
    text-align: right;
    margin-right: 11%;
}
</style>
