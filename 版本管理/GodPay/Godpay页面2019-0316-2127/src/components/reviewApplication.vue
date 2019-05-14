<template>
  <div class="reviewApplication">
      <template>
        <el-table highlight-current-row ref="multipleTable" :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"  style="width: 100%" :header-cell-style="{'background-color':'#447ED9','color':'white','text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column label="序号" width="70">
                <template slot-scope="scope">{{ scope.$index+1 }}</template>
            </el-table-column>
            <el-table-column prop="user_name" label="申请用户名" width="150"></el-table-column>
            <el-table-column prop="order_quantity" label="申请数量" width="150" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="order_time" label="申请时间" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="serial_number" label="流水单号" width="200" show-overflow-tooltip> </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="refuseApply(scope.row)">拒绝</el-button>
                    <el-button size="mini" type="primary" class="agreeBtn" @click="agreeApply(scope.row)">同意</el-button>
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
export default {
  name: 'reviewApplication',
  data () {
    return {
        tableData3: [],
        pagesize:7,//每页数据量
        nums:1000,//数据总数量
        currentPage:1,//当前页
    }
  },
  mounted(){
      let _this = this;
      _this.getUserApplyEMT();//获取用户向代理商申请EMT的记录
  },
  methods:{
      //改变当前页
      changePage(val){
          let _this =this;
          //console.log('当前页：'+val);
          _this.currentPage = val;
      },
      //获取审核状态的用户申请EMT的审核记录
      getUserApplyEMT(){
          let  _this = this;
          let api = '/information_agent_display/'+_this.$store.state.agentInfo.agent_uphone;
        //   let api = '/information_agent_display/13530777957';
          _this.axios.get(api).then(res=>{
              _this.tableData3 = res.data;
              _this.nums = _this.tableData3.length;//数据总数量
              //console.log('用户申请EMT记录',_this.tableData3);
              //console.log('每页数据量',_this.pagesize,'数据总数量',_this.nums);
          });
      },
      //同意申请
      agreeApply(applyUser){
          let _this = this;
          //console.log(applyUser);
          let api = '/agent_Agree';
          _this.axios.post(api,{
              user_uid:applyUser.user_id,//申请用户uid
              agent_uphone:_this.$store.state.agentInfo.agent_uphone,//代理商手机号
            //   agent_uphone:'13530777957',//代理商手机号
              apply_quantity:applyUser.order_quantity,//申请数量
              serial_number:applyUser.serial_number,//申请流水订单号
          }).then(res=>{
              //console.log(res);
              if(res.data.agent_code == "已同意"){
                   this.$message({
                    message: '已同意申请',
                    type: 'success'
                    });
                   _this.getUserApplyEMT();
              };
          });
      },
      //拒绝申请
      refuseApply(applyUser){
          let _this = this;
          //console.log(applyUser);
          let api = '/agent_Refuse';
          _this.axios.post(api,{
              user_uid:applyUser.user_id,//申请用户uid
              agent_uphone:_this.$store.state.agentInfo.agent_uphone,//代理商手机号
            //   agent_uphone:'13530777957',//代理商手机号
              apply_quantity:applyUser.order_quantity,//申请数量
              serial_number:applyUser.serial_number,//申请流水订单号
          }).then(res=>{
              //console.log(res);
              if(res.data.agent_code == '已拒绝'){
                  _this.$message({
                    message: '已拒绝申请',
                    type: 'warning'
                    });
                _this.getUserApplyEMT();                
              }
          });
      }
     
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.reviewApplication{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    padding-top: 1.25rem;
}
/* 表格 */
.el-table{
    width: 72% !important;
    height: 64.6vh;
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
.reviewApplication>>>.el-table__body-wrapper{
    overflow-x: hidden;
}
/* 同意按钮 */
.reviewApplication>>>.agreeBtn{
    background-color: rgba(68, 126, 217, 1);
}
/* 分页 */
.reviewApplication>>>.paging{
    text-align: right;
    margin-right: 13%;
}
</style>
