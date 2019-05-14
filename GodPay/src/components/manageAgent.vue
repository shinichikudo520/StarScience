<template>
  <div class="manageAgent">
      <template>
        <el-table highlight-current-row ref="multipleTable" :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"  style="width: 100%" @selection-change="handleSelectionChange" :header-cell-style="{'background-color':'#447ED9','color':'white'}" :cell-class-name="cellStyle">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="序号" width="170">
                <template slot-scope="scope">{{ scope.$index + 1 + (currentPage - 1) * pagesize }}</template>
            </el-table-column>
            <el-table-column prop="agent_name" label="代理商用户名" width="170"></el-table-column>
            <el-table-column prop="agent_uphone" label="代理商手机号" width="170"></el-table-column>
            <el-table-column prop="agent_time" label="创建时间" width="170" show-overflow-tooltip> </el-table-column>
            <el-table-column label="状态" width="170">
                <template slot-scope="scope">
                    <span>{{ scope.row.operation }}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="bottom">
            <div class="btnGroup">
                <el-button type="warning" plain @click="pauseAgent">暂停</el-button>
                <el-button type="danger" plain @click="freezeAgent">冻结</el-button>
                <el-button type="primary" plain @click="recoverAgent">恢复</el-button>
            </div>
            <div class="paging">
                <el-pagination :page-size="pagesize"  layout="prev, pager, next" :total="nums" @current-change="changePage"></el-pagination>
            </div>
        </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'manageAgent',
  data () {
    return {
        tableData3: [],//获取代理商信息列表 
        multipleSelection: [],//选项
        pagesize:7,//每页数据量
        // pageCount:11,//最大页码数
        nums:0,//数据总数量
        currentPage:1,//当前页

    }
  },
  methods:{
      //最后一列单元格样式
      cellStyle({row, column, rowIndex, columnIndex}){
        //   console.log(row,columnIndex);
          if(columnIndex == 5 && row.operation == "进行中"){//最后一列：进行状态
            return 'lastState underway'
          }
          else if(columnIndex == 5 && row.operation == "已暂停"){//最后一列：进行状态
            return 'lastState paused'
          }
          else if(columnIndex == 5 && row.operation == "已冻结"){//最后一列：进行状态
            return 'lastState freezed'
          }
      },
      //选中项
      handleSelectionChange(val) {
          let _this = this;
        //   //console.log(val);
          this.multipleSelection = val.map(item=>{
              return item.agent_uphone
          });
      },
      //改变当前页
      changePage(val){
          let _this =this;
          //console.log('当前页：'+val);
          _this.currentPage = val;
      },
      //处理时间
      formatDate(date){
           //处理时间
            date = new Date(date);
            date =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + (date.getHours()<10?'0'+ date.getHours(): date.getHours()) + ':' + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':' + (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())
            return date 
      },
      //获取代理商信息列表
      getAgentList(){
          let _this = this;
          let api = '/agent_operation_show';
          _this.axios.get(api).then(res=>{
            //   console.log(res);
            _this.tableData3 = res.data;
            _this.tableData3.forEach(item=>{
                item.agent_time = _this.formatDate(item.agent_time);
            });
            _this.nums = _this.tableData3.length;//获取总条数
          });
      },
      //暂停代理商业务
      pauseAgent(){
          let _this = this;
          let api = '/agent_suspend';
          console.log('选择的暂停',_this.multipleSelection);
          _this.axios.post(api,{
              agent_uphone:_this.multipleSelection
          }).then(res=>{
            //   console.log(res);
            if(res.data == '已暂停'){
                _this.$message({
                message: '暂停成功',
                type: 'success'
                });

            }else{
                _this.$message.error(res.data);
            }
            _this.getAgentList();//刷新代理商列表
          });
      },
      //冻结代理商业务
      freezeAgent(){
          let _this = this;
          let api = '/agent_frozen';
          console.log('选择的冻结',_this.multipleSelection);
          _this.axios.post(api,{
              agent_uphone:_this.multipleSelection
          }).then(res=>{
            //   console.log(res);
            if(res.data == '已冻结'){
                _this.$message({
                message: '冻结成功',
                type: 'success'
                });

            }else{
                _this.$message.error(res.data);
            }
            _this.getAgentList();//刷新代理商列表
          });
      },
      
      //恢复代理商业务
      recoverAgent(){
          let _this = this;
          let api = '/agent_recovery';
          console.log('选择的恢复',_this.multipleSelection);
          _this.axios.post(api,{
              agent_uphone:_this.multipleSelection
          }).then(res=>{
            //   console.log(res);
            if(res.data == '已恢复'){
                _this.$message({
                message: '恢复成功',
                type: 'success'
                });

            }else{
                _this.$message.error(res.data);
            }
            _this.getAgentList();//刷新代理商列表
          });
      }
  },
  mounted(){
      let _this = this;
      _this.getAgentList();//获取代理商列表
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.manageAgent{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    padding: 1.25rem;
    /* text-align: center; */

}
/* 表格 */
.el-table{
    width: 70.4% !important;
    height: 62vh;
    margin: 0 auto;
    overflow: hidden;
    border: .0625rem solid rgba(215, 215, 215, 1);
    margin-bottom: 2.5rem;
}
/* 消除表格下面分割线 */
.el-table::before{
    display: none;
}
/* 状态列 */
.lastState span{
    display: inline-block;
    padding:  .3125rem .625rem;
    font-size: .75rem;
    border-radius: .3125rem;
    color: white;
}
/* 状态列：进行中 */
.underway span{
    background-color: #447ED9;
}
/* 状态列：已暂停 */
.paused span{
    background-color:  #FF9800;
}
/* 状态列：已冻结 */
.freezed span{
    background-color: #E51C23;
}
/* 底部 */
.bottom{
    text-align: right;
}
/* 按钮组 */
.btnGroup{
    display: inline-block;
}
/* 分页 */
.manageAgent>>>.paging{
    display: inline-block;
    margin-top: 2%;
    margin-right: 14%;
}
</style>
