<template>
  <div class="applicationStatus">
      <div class="search">
          <el-input v-model="searchPhone" placeholder="请输入手机号查询" @keyup.native="filterInfo(0)"></el-input>
          <img src="../assets/img/seach.jpg" alt="" class="searchIcon" @click="filterInfo(0)">
          <span class="hid">筛选：</span>
          <el-checkbox-group class="hid" v-model="filtrate" @change="filterInfo(1)">
            <el-checkbox label="审核中"></el-checkbox>
            <el-checkbox label="已同意"></el-checkbox>
            <el-checkbox label="已拒绝"></el-checkbox>
            <el-checkbox label="转账成功"></el-checkbox>
        </el-checkbox-group>
      </div>
      <template>
        <el-table id="out-table" highlight-current-row ref="multipleTable" @header-click="exportExcel" :data="showTable.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"  style="width: 100%" :header-cell-style="{'background-color':'#447ED9','color':'white','text-align':'center'}" :cell-style="{'text-align':'center'}" :cell-class-name="cellStyle" :header-cell-class-name="lastHead">
            <el-table-column label="序号"  show-overflow-tooltip class-name='col hid' >
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="agent_uphone" label="手机号"  show-overflow-tooltip class-name='col'  ></el-table-column>
            <el-table-column prop="user_name" label="申请用户名"  show-overflow-tooltip class-name='col' ></el-table-column>
            <el-table-column prop="order_quantity" label="申请数量"  show-overflow-tooltip class-name='col' > </el-table-column>
            <el-table-column prop="serial_number" label="流水单号"  show-overflow-tooltip class-name='col hid' > </el-table-column>
            <el-table-column prop="order_time" label="申请时间"  show-overflow-tooltip class-name='col' > </el-table-column>
            <el-table-column label="导出表格" show-overflow-tooltip class-name='col hid' >
                <template slot-scope="scope">
                    <span>{{ scope.row.operation }}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="paging">
            <el-pagination :page-size="pagesize" :pager-count='5'  layout="prev, pager, next" :total="nums" @current-change="changePage"></el-pagination>
        </div>
    </template>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'applicationStatus',
  data () {
    return {
        searchPhone:"",//搜索的手机号
        filtrate:[],//复选的筛选条件
        tableData3: [],//用户向代理商申请EMT的所有记录
        showTable:[],//显示列表table
        pagesize:7,//每页数据量
        // pageCount:11,//最大页码数
        nums:1000,//数据总数量
        currentPage:1,//当前页
    }
  },
  mounted(){
      let _this = this;
      _this.getUserAllApplyEMT();//获取所有
  },
  methods:{
      //处理时间
      formatDate(date){
           //处理时间
            date = new Date(date);
            date =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return date
      },
      //最后一列的表头
      lastHead({row, column, rowIndex, columnIndex}){
        //   //console.log(row,columnIndex);
          if(columnIndex == 6 ){//最后一列：进行状态
            return 'lastHead'
          }
      },
      //最后一列单元格样式
      cellStyle({row, column, rowIndex, columnIndex}){
        //   //console.log(row);
          if(columnIndex == 6 && row.operation == "已同意"){//最后一列：进行状态
            return 'lastState agree'
          }
          else if(columnIndex == 6 && row.operation == "审核中"){//最后一列：进行状态
            return 'lastState audit'
          }
          else if(columnIndex == 6 && row.operation == "已拒绝"){//最后一列：进行状态
            return 'lastState refuse'
          }else if(columnIndex == 6 && row.operation == "转账成功"){
            return 'lastState succeed'
          }
      },
      //改变当前页
      changePage(val){
          let _this =this;
          //console.log('当前页：'+val);
          _this.currentPage = val;
      },
      //获取用户申请EMT的审核记录
      getUserAllApplyEMT(){
          let  _this = this;
          let api = '/information_agent_order/'+_this.$store.state.agentInfo.agent_uphone;
        //   let api = '/information_agent_order/13530777957';
          _this.axios.get(api).then(res=>{
              _this.tableData3 = res.data;
              _this.tableData3.forEach(item=>{
                if(item.apply_time){
                    item.order_time = item.apply_time;
                    item.order_quantity = item.apply_quantity;
                    item.operation = item.agent_code;

                }
                item.order_time = _this.formatDate(item.order_time);

              });
              _this.showTable = _this.tableData3;
              _this.nums = _this.tableData3.length;//数据总数量
              console.log('用户申请EMT记录',_this.tableData3);
            //   //console.log('每页数据量',_this.pagesize,'数据总数量',_this.nums);
          });
      },
      //导出表格
      exportExcel(column,event){
        //   //console.log('导出表格',column,event);
          if(column.label == '导出表格'){
            /* generate workbook object from table */
            var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '申请EMT记录.xlsx')
            } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
            return wbout
          }
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
                return item.agent_uphone.indexOf(_this.searchPhone) > -1
            });
        }else{//过滤状态
            if(_this.filtrate.length == 0){
                _this.showTable = _this.tableData3;//清空状态选择
                return
            }
            //console.log(_this.filtrate);
            _this.showTable = _this.tableData3.filter(item=>{
                return item.operation == _this.filtrate[0] || item.operation == _this.filtrate[1] || item.operation == _this.filtrate[2] || item.operation == _this.filtrate[3]
            });
            
        }
        
    }
     
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
.applicationStatus{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    padding-top: 1.25rem;
}
/* 搜索部分 */
.applicationStatus>>>.search{
    background-color: rgba(68, 126, 217, 1);
    width:86% !important;
    margin: 0 auto;
    height:8vh ;
    line-height: 8vh;
    padding:.125rem 0;
    position: relative;
    font-size: .8125rem;
    color: white;
}
.applicationStatus>>>.search .el-input,.search .el-checkbox-group{
    width: 30%;
    display: inline-block;
}
/* 输入框样式 */
.applicationStatus>>>.search .el-input{
    margin:0 1.875rem;
    margin-right: 32%;
}
.applicationStatus>>>.search input{
    height: 1.875rem;
    line-height: 1.875rem;
}
/* 搜索图标 */
.applicationStatus>>>.searchIcon{
    position: absolute;
    top: 1.4375rem;
    left: 20.3125rem;
    width: 1.1875rem;
    height: 1.1875rem;
}
/* 搜索部分复选框 */
.applicationStatus>>>.el-checkbox{
    color: white;
}
.applicationStatus>>>.el-checkbox+.el-checkbox{
    margin-left: .3125rem;
}
/* 表格 */
.el-table{
    width:86% !important;
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
.applicationStatus>>>.el-table__body-wrapper{
    overflow-x: hidden;
}
.applicationStatus>>>.el-table .cell, .el-table th div{
    padding:0;
}
/* 同意按钮 */
.applicationStatus>>>.agreeBtn{
    background-color: rgba(68, 126, 217, 1);
}
/* 最后一列表头 */
.applicationStatus>>>.lastHead{
    font-size: .75rem !important;
    background-image: url('../assets/img/exit.jpg');
    background-position: 7.375rem .8125rem;
    background-repeat: no-repeat;
    background-size: 1.25rem;
    cursor: pointer;
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
/* 状态列：审核中 */
.audit span{
    background-color:  rgba(255, 152, 0, 1)
}
/* 状态列：已拒绝 */
.refuse span{
    background-color: rgba(229, 28, 35, 1);
}
/* 状态列：转账成功 */
.succeed span{
    background-color: #67c23a;
}
/* 分页 */
.applicationStatus>>>.paging{
    text-align: right;
    margin-right: 6%;
}
/* 适配移动端 ≤768px */
@media screen and (max-width:768px){
    /* 隐藏部分 */
    .applicationStatus>>>.hid{
        display:none ;
    }
    /* 搜索部分 */
    .applicationStatus>>>.search{
        width: 53% !important;
        margin-left: .3125rem;
    }
    .applicationStatus .search .el-input{
        margin-right: 0;
        width: 72% !important;
    }
    .applicationStatus>>>.el-input__inner{
        width: 78% !important;
    }
    /* 搜索图标 */
    .applicationStatus>>>.searchIcon{
        top:1.5625rem;
        left: 10.625rem;
    }
    /* 表格部分 */
    .applicationStatus>>>.el-table{
        width: 53% !important;
        font-size: .625rem;
        font-weight: 400;
        overflow: hidden;
        margin-left: .25rem;
        overflow-x: auto;
        height: auto;
    }    
    /* 暂无数据 */
    .applicationStatus>>>.el-table__empty-block{
     
        width: 100% !important;
    }
    /* 表格整体 */
    .applicationStatus>>>table{
        table-layout: fixed;
        width: 100% !important;
        /* display: flex; */
    }
    .applicationStatus>>>.el-table .cell{
        padding: 0;
        /* min-width: 25%; */
    }
    .applicationStatus>>>.el-table__body-wrapper{
       overflow-x: auto;
    }
    /* 分页 */
    .applicationStatus>>>.paging{
        width: 38%;
    }
}
</style>
