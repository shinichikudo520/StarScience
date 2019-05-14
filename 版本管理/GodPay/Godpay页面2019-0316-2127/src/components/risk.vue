<template>
  <div class="risk">
      <template>
        <el-table highlight-current-row ref="multipleTable" :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark"  style="width: 100%" @selection-change="handleSelectionChange" :header-cell-style="{'background-color':'#447ED9','color':'white','text-align':'center'}" :cell-style="{'text-align':'center'}" :cell-class-name="cellStyle">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="序号" width="112">
                <template slot-scope="scope">{{ scope.$index + 1 + (currentPage - 1) * pagesize }}</template>
            </el-table-column>
            <el-table-column prop="user_uphone" label="手机号" width="180"></el-table-column>
            <el-table-column prop="user_username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="user_time" label="创建时间" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column label="状态" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.user_operation }}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="bottom">
            <div class="btnGroup">
                <el-button type="warning" plain @click="controlUser('暂停')">暂停</el-button>
                <el-button type="danger" plain @click="controlUser('冻结')">冻结</el-button>
                <el-button type="primary" plain @click="controlUser('恢复')">恢复</el-button>
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
  name: 'risk',
  data () {
    return {
        tableData3: [],//用户信息
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
          //console.log(row);
          if(columnIndex == 5 && row.user_operation == "进行中"){//最后一列：进行状态
            return 'lastState underway'
          }
          else if(columnIndex == 5 && row.user_operation == "已暂停"){//最后一列：进行状态
            return 'lastState paused'
          }
          else if(columnIndex == 5 && row.user_operation == "已冻结"){//最后一列：进行状态
            return 'lastState freezed'
          }
      },
      //选中项
      handleSelectionChange(val) {
          let _this = this;
        //   console.log(val);
          _this.multipleSelection = val.map(item=>{
              return item.user_uphone
          });
          console.log(_this.multipleSelection);

      },
      //改变当前页
      changePage(val){
          let _this =this;
          //console.log('当前页：'+val);
          _this.currentPage = val;
      },
      //获取用户信息
      getUserInfo(){
          let _this = this;
          let api = '/super_user_control';
          _this.axios.get(api).then(res=>{
              console.log(res);
              _this.tableData3 = res.data.result;//获取用户信息
              _this.nums = _this.tableData3.length;//获取总条数
          });
      },
        //风控用户
        controlUser(type){
            let _this = this;
            console.log(_this.multipleSelection);
            let api = '/super_user_change_operation';
            _this.axios.post(api,{
                'operation':type,
                'uphone':_this.multipleSelection,
            }).then(res=>{
                // console.log(res);
                if(res.data.result.length > 0){//操作成功
                    _this.$message({
                    message: '操作成功',
                    type: 'success'
                    });
                }else{
                    _this.$message({
                    message: '操作失败，请重试',
                    type: 'warning'
                    });
                }
                _this.getUserInfo();//刷新用户信息
            });

        }
  },
  mounted(){
      let _this = this;
      _this.getUserInfo();
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.risk{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    padding: 1.25rem;
    /* text-align: center; */

}
/* 表格 */
.el-table{
    width: 69% !important;
    height: 62vh;
    margin: 0 auto;
    overflow: hidden;
    border: .0625rem solid rgba(215, 215, 215, 1);
    margin-bottom: 2.5rem;
}
/* 单元格的样式 */
.risk>>>.el-table .cell{
    line-height: 1.96875rem;
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
    /* text-align: right; */
    display: inline-block;
    /* margin: 0 15% 0 auto; */
}
/* 分页 */
.risk>>>.paging{
    display: inline-block;
    margin-top: 2%;
    /* text-align: right; */
    margin-right: 14%;
}
</style>
