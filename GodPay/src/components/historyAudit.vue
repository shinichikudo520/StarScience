<template>
  <div class="historyAudit">
      <div class="search">
          <el-input v-model="searchPhone" placeholder="请输入手机号查询" @keyup.native="filterInfo(0)"></el-input>
          <img src="../assets/img/seach.jpg" alt="" class="searchIcon" @click="filterInfo(0)">
          <span>筛选：</span>
          <el-checkbox-group v-model="filtrate" @change="filterInfo(1)">
            <el-checkbox label="已同意"></el-checkbox>
            <el-checkbox label="已拒绝"></el-checkbox>
        </el-checkbox-group>
      </div>
      <template>
        <el-table id="historyAuditTable" highlight-current-row ref="multipleTable" :data="showTable.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"  style="width: 100%" :header-cell-style="{'background-color':'#447ED9','color':'white','text-align':'center'}" :cell-style="{'text-align':'center'}" :cell-class-name="cellStyle" :header-cell-class-name="lastHead" @header-click='handleTable'>
            <el-table-column label="序号" width="100">
                <template slot-scope="scope">{{ scope.$index + 1 + (currentPage - 1) * pagesize }}</template>
            </el-table-column>
            <el-table-column prop="uphone" label="手机号" width="210"></el-table-column>
            <!-- <el-table-column prop="user_name" label="申请用户名" width="180"></el-table-column> -->
            <el-table-column prop="order_quantity" label="申请数量" width="210" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="serial_number" label="流水单号" width="210" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="order_time" label="审批时间" width="210" show-overflow-tooltip> </el-table-column>
            <el-table-column label="导出表格" width="219" >
                <template slot-scope="scope">
                    <span>{{ scope.row.operation }}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="paging">
            <el-pagination :page-size="pagesize"  layout="prev, pager, next" :total="nums" @current-change="changePage"></el-pagination>
        </div>
    </template>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'historyAudit',
  data () {
    return {
        searchPhone:"",//搜索的手机号
        filtrate:[],//复选的筛选条件
        tableData3: [],//储存所有历史记录数据
      showTable:[],//用于显示内容的表格
      currentPage:1,//当前页
        pagesize:7,//每页数据量
        // pageCount:11,//最大页码数
        nums:0,//数据总数量
    }
  },
  methods:{
      //最后一列的表头
      lastHead({row, column, rowIndex, columnIndex}){
          //console.log(row,columnIndex);
          if(columnIndex == 6 ){//最后一列：进行状态
            return 'lastHead'
          }
      },
      //最后一列单元格样式
      cellStyle({row, column, rowIndex, columnIndex}){
        //   console.log(columnIndex,row);
          if(columnIndex == 6 && row.operation == "已同意"){//最后一列：进行状态
            return 'lastState agree'
          }
          else if(columnIndex == 6 && row.operation == "已拒绝"){//最后一列：进行状态
            return 'lastState refuse'
          }
      },
      //改变当前页
      changePage(val){
          let _this =this;
          //console.log('当前页：'+val);
          _this.currentPage = val;//改变当前页
      },
      //表头点击
      handleTable(column){
          let _this = this;
            // console.log(column)
            if(column.label == '导出表格'){
                _this.exportExcel();
            }
      },
      //导出表格
      exportExcel () {
         /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#historyAuditTable'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '用户提现EMT历史审批记录.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
     },
     //筛选
    filterInfo(filterType){
        let _this = this;
        if(filterType == 0){//过滤手机号
            console.log('过滤手机号码');
            if(_this.searchPhone == ""){
                _this.showTable = _this.tableData3;
                return
            }
            _this.showTable = _this.tableData3.filter(item=>{
                return item.uphone.indexOf(_this.searchPhone) > -1
            });
        }else{//过滤状态
            console.log(_this.filtrate)
            if(_this.filtrate.length == 0){
                _this.showTable = _this.tableData3;//清空状态选择
                return
            }
            //console.log(_this.filtrate);
            _this.showTable = _this.tableData3.filter(item=>{
                return item.operation == _this.filtrate[0] || item.operation == _this.filtrate[1]
            });
            
        }
        
    },
    //处理时间
    formatDate(date){
        //处理时间
        date = new Date(date);
        date =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        return date 
    },
    //获取历史审批记录
    getHistoryAudit(){
        let _this = this;
        let api = '/super_Cash_withdrawal_history';
        _this.axios.get(api).then(res=>{
            console.log(res);
            _this.tableData3 = res.data;
            _this.tableData3.forEach(item=>{
                item.order_time = _this.formatDate(item.order_time);
            });
            _this.showTable = _this.tableData3;//处理数据后转移到用于显示数据的数组中
        });

    }
     
  },
  mounted(){
      let _this = this;
      _this.getHistoryAudit();//获取历史用户提现申请列表
  },
  watch:{
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
.historyAudit{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    padding-top: 1.25rem;
}
/* 搜索部分 */
.historyAudit>>>.search{
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
.historyAudit>>>.search .el-input,.search .el-checkbox-group{
    width: 15%;
    display: inline-block;
    /* position: absolute;
    right: 0%; */
    margin-left: 0%;
}
/* 输入框样式 */
.historyAudit>>>.search .el-input{
    width: 40%;
    margin:0 1.875rem;
    margin-right: 30%;
}
.historyAudit>>>.search input{
    height: 1.875rem;
    line-height: 1.875rem;
}
/* 搜索图标 */
.historyAudit>>>.searchIcon{
    position: absolute;
    top: 1.4375rem;
    left: 27.8125rem;
    width: 1.1875rem;
    height: 1.1875rem;
}
/* 搜索部分复选框 */
.historyAudit>>>.el-checkbox{
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
/* 消除表格下面分割线 */
.el-table::before{
    display: none;
}
/* 表格内容部分 */
.historyAudit>>>.el-table__body-wrapper{
    overflow-x: hidden;
}
/* 同意按钮 */
.historyAudit>>>.agreeBtn{
    background-color: rgba(68, 126, 217, 1);
}
/* 最后一列表头 */
.historyAudit>>>.lastHead{
    /* font-size: .75rem !important;
    background-image: url('../assets/img/exit.jpg');
    background-position: 7.375rem .8125rem;
    background-repeat: no-repeat;
    background-size: 1.25rem; */
    cursor: pointer;
    font-size: 1.0625rem;
}
/* 状态列 */
.lastState span{
    display: inline-block;
    padding:  .3125rem .625rem;
    font-size: .75rem;
    border-radius: .3125rem;
    color: white;
}
/* 状态列：已同意 */
.agree span{
    background-color: rgba(68, 126, 217, 1);
}
/* 状态列：已拒绝 */
.refuse span{
    background-color: rgba(229, 28, 35, 1);
}
/* 分页 */
.historyAudit>>>.paging{
    text-align: right;
    margin-right: 5%;
}
</style>
