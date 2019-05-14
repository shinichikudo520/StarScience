<template>
  <div class="recommendDetails">
      <div class="search">
          <el-input v-model="searchPhone" placeholder="请输入手机号查询" @keyup.native="filterInfo(0)"></el-input>
          <img src="../assets/img/seach.jpg" alt="" class="searchIcon" @click="filterInfo(0)">
          <span>筛选：</span>
          <el-checkbox-group v-model="filtrate" @change="filterInfo(1)">
            <el-checkbox label="直推"></el-checkbox>
            <el-checkbox label="间推"></el-checkbox>
        </el-checkbox-group>
      </div>
      <template>
        <el-table highlight-current-row ref="multipleTable" :data="showTable.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"  style="width: 100%" :header-cell-style="{'background-color':'#447ED9','color':'white','text-align':'center'}" :cell-style="{'text-align':'center'}" >
            <el-table-column label="序号" width="70">
                <template slot-scope="scope">{{ scope.$index + 1 + (currentPage - 1) * pagesize }}</template>
            </el-table-column>
            <el-table-column prop="subordinate_uphone" label="手机号" width="180"></el-table-column>
            <el-table-column prop="subordinate_username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="subordinate_grade" label="产品" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="subordinate_quantity" label="产品数量" width="200" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="subordinate_time" label="推荐时间" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="subordinate" label="推荐关系" width="180" ></el-table-column>
        </el-table>
        <div class="paging">
            <el-pagination :page-size="pagesize"  layout="prev, pager, next" :total="nums" @current-change="changePage"></el-pagination>
        </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'recommendDetails',
  data () {
    return {
        searchPhone:"",//搜索的手机号
        filtrate:[],//复选的筛选条件
        showTable:[],//显示推荐明细列表
        tableData3: [],//推荐明细列表
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
          //console.log('当前页：'+val);
          _this.currentPage = val;
      },
      //推荐明细
      getReommendDetails(){
          let _this = this;
          let userPhone = _this.$route.params.userPhone;
          if(!userPhone){
              return
          }
          console.log(userPhone);
          let api = '/super_spread_details';
          _this.axios.post(api,{
              uphone:userPhone
          }).then(res=>{
              console.log(res);
              _this.tableData3 = res.data.result;
              _this.tableData3.forEach(item=>{
                  if(item.lowersubordinate_uphone){
                      item.subordinate_uphone = item.lowersubordinate_uphone;
                      item.subordinate_username = item.lowersubordinate_username;
                      item.subordinate_grade = item.lowersubordinate_grade;
                      item.subordinate_time = item.lowersubordinate_time;
                      item.subordinate_quantity = item.lowersubordinate_quantity;
                      item.subordinate = item.lowersubordinate;
                  }
              });
              _this.showTable = _this.tableData3;

          });
      },
      //查找代理商
        filterInfo(filterType){
            let _this = this;
            if(filterType == 0){//过滤手机号
                if(_this.searchPhone == ""){
                    _this.showTable = _this.tableData3;
                    return
                }
                _this.showTable = _this.tableData3.filter(item=>{
                    return item.subordinate_uphone.indexOf(_this.searchPhone) > -1
                });
            }else{//过滤状态
                if(_this.filtrate.length == 0){
                    _this.showTable = _this.tableData3;//清空状态选择
                    return
                }
                console.log(_this.filtrate);
                _this.showTable = _this.tableData3.filter(item=>{
                    return item.subordinate == _this.filtrate[0] || item.subordinate == _this.filtrate[1] 
                });
                
            }
            
        }
     
  },
  mounted(){
      let _this = this;
      _this.getReommendDetails();//获取推荐明细
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
.recommendDetails{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    padding-top: 1.25rem;
}
/* 搜索部分 */
.recommendDetails>>>.search{
    background-color: rgba(68, 126, 217, 1);
    width:90% !important;
    margin: 0 auto;
    height:8vh ;
    line-height: 8vh;
    padding:.125rem 0;
    position: relative;
    font-size: .8125rem;
    color: white;
}
.recommendDetails>>>.search .el-input,.search .el-checkbox-group{
    width: 15%;
    display: inline-block;
    /* position: absolute;
    right: 0%; */
    margin-left: 0%;
}
/* 输入框样式 */
.recommendDetails>>>.search .el-input{
    width: 40%;
    margin:0 1.875rem;
    margin-right: 30%;
}
.recommendDetails>>>.search input{
    height: 1.875rem;
    line-height: 1.875rem;
}
/* 搜索图标 */
.recommendDetails>>>.searchIcon{
    position: absolute;
    top: 1.4375rem;
    left: 27.8125rem;
    width: 1.1875rem;
    height: 1.1875rem;
}
/* 搜索部分复选框 */
.recommendDetails>>>.el-checkbox{
    color: white;
}
/* 表格 */
.el-table{
    width:90% !important;
    height: 62vh;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 2.5rem;
    border: .0625rem solid rgba(215, 215, 215, 1);
}
/* 单元格的样式 */
.recommendDetails>>>.el-table .cell{
    line-height: 2.0625rem;
}
/* 消除表格下面分割线 */
.el-table::before{
    display: none;
}
/* 表格内容部分 */
.recommendDetails>>>.el-table__body-wrapper{
    overflow-x: hidden;
}
/* 分页 */
.recommendDetails>>>.paging{
    text-align: right;
    margin-right: 5%;
}
</style>
