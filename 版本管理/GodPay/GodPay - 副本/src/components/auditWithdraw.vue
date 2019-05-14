<template>
  <div class="auditWithdraw">
      <template>
        <el-table highlight-current-row ref="multipleTable" :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"  style="width: 100%" @selection-change="handleSelectionChange" :header-cell-style="{'background-color':'#447ED9','color':'white','text-align':'center'}" :cell-style="{'text-align':'center'}" >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="全选" width="61">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="uphone" label="申请用户" width="120"></el-table-column>
            <el-table-column prop="order_quantity" label="申请数量" width="120" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="order_time" label="申请时间" width="150" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="serial_number" label="流水单号" width="207" show-overflow-tooltip> </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <div>
                        <el-button type="danger" plain @click="refuseWithdraw(scope.row.serial_number)">拒绝</el-button>
                        <el-button type="primary" plain @click="agreeWithdraw(scope.row.serial_number)">同意</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="bottom">
            <div class="btnGroup">
                <el-button type="danger" plain @click="refuseMultipleWithdraw">一键拒绝</el-button>
                <el-button type="primary" plain @click="agreeMultipleWithdraw">一键同意</el-button>
            </div><br>
            <div class="paging">
                <el-pagination :page-size="pagesize"  layout="prev, pager, next" :total="nums" @current-change="changePage"></el-pagination>
            </div>
        </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'auditWithdraw',
  data () {
    return {
        tableData3: [],//用户申请EMT提现列表
        multipleSelection: [],//选项
        pagesize:7,//每页数据量
        // pageCount:11,//最大页码数
        nums:0,//数据总数量
        currentPage:1,//当前页
    }
  },
  methods:{
      //选中项
      handleSelectionChange(val) {
          let _this = this;
        //   //console.log(val);
          _this.multipleSelection = val.map(item=>{
              return item.serial_number
          });
          console.log(_this.multipleSelection);
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
            date =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            return date 
      },
      //获取申请EMT提现的用户信息
      getWithdrawUser(){
          let _this = this;
          let api = '/super_Cash_withdrawal';
          _this.axios.get(api).then(res=>{
              console.log(res);
              _this.tableData3 = res.data;
              _this.tableData3.forEach(item=>{
                  item.order_time = _this.formatDate(item.order_time);
              });
              _this.nums = _this.tableData3.length;//获取总条数
          });
      },
      //通过提现
      agreeWithdraw(serial_number){
          console.log('流水单号',serial_number);
          let _this = this;
          let api = '/super_Cash_withdrawal_Agree';
          _this.axios.post(api,{
              serial_number,
          }).then(res=>{
              console.log(res);
              if(res.data == '已同意'){
                  _this.$message({
                    message: '已同意用户的提现申请',
                    type: 'success'
                    });
              }else{
                _this.$message.error('审核失败，请重新操作');
              }
             _this.getWithdrawUser();//刷新申请提现的用户信息

          });
      },
      //拒绝提现
      refuseWithdraw(serial_number){
          console.log('流水单号',serial_number);
          let _this = this;
          let api = '/super_Cash_withdrawal_refuze';
          _this.axios.post(api,{
              serial_number,
          }).then(res=>{
              console.log(res);
              if(res.data == '已拒绝'){
                  _this.$message({
                    message: '已拒绝用户的提现申请',
                    type: 'warning'
                    });
              }else{
                  _this.$message.error('审核失败，请重新操作');
              }
             _this.getWithdrawUser();//刷新申请提现的用户信息
          });
      },
      //一键同意申请
      agreeMultipleWithdraw(){
          let _this = this;
          let api = '/super_Cash_withdrawal_Agrees';
          _this.axios.post(api,{
              serial_number:_this.multipleSelection,
          }).then(res=>{
              console.log(res);
              if(res.data == '已同意'){
                  _this.$message({
                    message: '已同意用户的提现申请',
                    type: 'success'
                    });
              }else{
                _this.$message.error('审核失败，请重新操作');
              }
             _this.getWithdrawUser();//刷新申请提现的用户信息
          });
      },
      //一键拒绝申请
      refuseMultipleWithdraw(){
          let _this = this;
          let api = '/super_Cash_withdrawal_refuzes';
          _this.axios.post(api,{
              serial_number:_this.multipleSelection,
          }).then(res=>{
              console.log(res);
              if(res.data == '已拒绝'){
                   _this.$message({
                    message: '已拒绝用户的提现申请',
                    type: 'warning'
                    });
              }else{
                _this.$message.error('审核失败，请重新操作');
              }
             _this.getWithdrawUser();//刷新申请提现的用户信息
          });
      },
  },
  mounted(){
      let _this = this;
      _this.getWithdrawUser();//获取申请EMT提现的用户信息
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.auditWithdraw{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 1.25rem;
    /* text-align: center; */

}
/* 表格 */
.auditWithdraw>>>.el-table{
    width: 69.5% !important;
    height: 69vh;
    margin: 0 auto;
    overflow: hidden;
    overflow-x: hidden;
    border: .0625rem solid rgba(215, 215, 215, 1);
    margin-bottom: 2.5rem;
}
/* 消除表格下面分割线 */
.auditWithdraw>>>.el-table::before{
    display: none;
}

/* 底部 */
.auditWithdraw>>>.bottom{
    text-align: right;
}
/* 按钮组 */
.auditWithdraw>>>.btnGroup{
    display: inline-block;
    margin-right: 16%;
    /* margin-top: 0.5%; */

}
/* 分页 */
.auditWithdraw>>>.paging{
    display: inline-block;
    margin-top: 0.5%;
    margin-right: 15%;
}
</style>
