<template>
  <div class="agentApplyEMT">
      <template>
        <el-table highlight-current-row ref="multipleTable" :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"  style="width: 100%" :header-cell-style="{'background-color':'#447ED9','color':'white','text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column label="序号" width="70">
                <template slot-scope="scope">{{ scope.$index + 1 + (currentPage - 1) * pagesize }}</template>
            </el-table-column>
            <!-- <el-table-column prop="account_number" label="申请用户" width="150"></el-table-column> -->
            <el-table-column prop="agent_uphone" label="申请手机号" width="180"></el-table-column>
            <el-table-column prop="allocate_quantity" label="申请数量" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="allocate_time" label="申请时间" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="serial_number" label="流水单号" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="refuseApplyEMT(scope.row.serial_number)">拒绝</el-button>
                    <el-button size="mini" type="primary" class="agreeBtn" @click="agreeApplyEMT(scope.row.serial_number,scope.row.allocate_quantity,scope.row.agent_uphone)">同意</el-button>
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
  name: 'agentApplyEMT',
  data () {
    return {
        tableData3: [],//代理商申请EMT审核列表
        pagesize:20,//每页数据量
        // pageCount:11,//最大页码数
        nums:0,//数据总数量
        currentPage:1,//当前页        
        // adminPwd:"",//管理员密码
    }
  },
  methods:{
      //改变当前页
      changePage(val){
          let _this =this;
          //console.log('当前页：'+val);
          _this.currentPage = val
      },
    //   同意或拒绝代理商申请EMT
    //   applyEMT(option){
    //       let _this = this;
    //       let refuseImg = require('../assets/img/error.jpg');
    //       let agreeImg = require('../assets/img/createSuccess.jpg');
    //       if(option == 1){//同意申请
    //         //console.log('同意申请');
    //         _this.$prompt('请输入ADMIN密码：', '提示', {
    //             confirmButtonText: '确定',
    //             cancelButtonText: '取消',
    //             lockScroll:false,
    //             }).then(({ value }) => {
    //                 //console.log('超级管理员密码',value);
    //                 let api = '';
    //                 _this.axios.post(api,{

    //                 }).then(res=>{
    //                     if(res){
    //                         _this.$alert(`
    //                             <p style="text-align:center;margin-bottom:20px;">
    //                                 <img style="width:70px;height:70px;margin:0 auto;" src="`+agreeImg+`" alt="">
    //                             </p>
    //                             <p style="text-align:center;color:rgba(68, 126, 217, 1);font-size:18px;font-weight:700;">审批成功</p>
    //                         `, '', {
    //                             dangerouslyUseHTMLString: true,
    //                             lockScroll:false,//消除模态框超出部分
    //                         }).catch(()=>{

    //                         }); 
    //                     }
    //                 });
    //             }).catch(() => {
    //             _this.$message({
    //                 type: 'info',
    //                 lockScroll:false,
    //                 message: '取消输入'
    //             });       
    //         });
    //       }else{//拒绝申请
    //         //console.log('拒绝申请');
    //         _this.$alert(`
    //             <p style="text-align:center;margin-bottom:20px;">
    //                 <img style="width:70px;height:70px;margin:0 auto;" src="`+refuseImg+`" alt="">
    //             </p>
    //             <p style="text-align:center;color:rgba(68, 126, 217, 1);font-size:18px;font-weight:700;">已拒绝申请</p>
    //         `, '', {
    //             dangerouslyUseHTMLString: true,
    //             lockScroll:false,//消除模态框超出部分
    //         }).catch(()=>{

    //         }); 
    //       }
    //   },
      //处理时间
      formatDate(date){
           //处理时间
            date = new Date(date);
            date =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + (date.getHours()<10?'0'+ date.getHours(): date.getHours()) + ':' + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':' + (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())
            return date 
      },
      //获取代理商申请EMT审核列表
      getAgentApllyEMT(){
          let _this = this;
          let api = '/agent_apply_show';
          _this.axios.get(api).then(res=>{
              console.log(res);
              _this.tableData3 = res.data;
              _this.tableData3.forEach(item=>{
                  item.allocate_time = _this.formatDate(item.allocate_time);
              });
              _this.nums = _this.tableData3.length;//获取总条数
          });
      },
      //同意申请
      agreeApplyEMT(serial_number,allocate_quantity,agent_uphone){
          let _this = this;
          let api = '/agent_apply_agree';
          allocate_quantity = parseFloat(allocate_quantity);//申请数据str => float 类型
          _this.axios.post(api,{
              serial_number,//流水单号
              allocate_quantity:allocate_quantity,//申请数量
              agent_uphone,//代理商手机号
          }).then(res=>{
            //   console.log(res);
              if(res.data == '已同意'){
                  _this.$message({
                    message: '已同意代理商申请',
                    type: 'success'
                    });
              }else{
                  _this.$message.error(res.data);
              }
              _this.getAgentApllyEMT();//刷新列表
          });
      },
      //拒绝申请
      refuseApplyEMT(serial_number){
          let _this = this;
          let api = '/agent_apply_refuse';
          _this.axios.post(api,{
              serial_number,//流水单号
          }).then(res=>{
            //   console.log(res);
              if(res.data == '已拒绝'){
                  _this.$message({
                    message: '已拒绝代理商申请',
                    type: 'success'
                    });
              }else{
                  _this.$message.error(res.data);
              }
              _this.getAgentApllyEMT();//刷新列表
          });
      },

     
  },
  mounted(){
      let _this = this;
      _this.getAgentApllyEMT();//获取代理商申请EMT审核列表
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.agentApplyEMT{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    /* overflow-x: hidden; */
    padding-top: 1.25rem;
}
/* 设置后模态框样式 :去除模态框弹出时多出的宽度*/
.el-message-box__wrapper{
    overflow: auto;
}
/* 表格 */
.el-table{
    width: 75.4% !important;
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
.agentApplyEMT>>>.el-table__body-wrapper{
    overflow-x: hidden;
}
/* 同意按钮 */
.agentApplyEMT>>>.agreeBtn{
    background-color: rgba(68, 126, 217, 1);
}
/* 分页 */
.agentApplyEMT>>>.paging{
    text-align: right;
    margin-right: 12%;
}
</style>
