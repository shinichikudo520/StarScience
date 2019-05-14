<template>
  <div class="emtRight">
      <template>
        <el-table highlight-current-row ref="multipleTable" :data="tableData3" tooltip-effect="dark"  style="width: 100%" :header-cell-style="{'background-color':'#447ED9','color':'white','text-align':'center'}" :cell-style="{'text-align':'center'}"  >
            <el-table-column prop="power_stage_name" label="募集阶段" width="120"></el-table-column>
            <el-table-column prop="power_quantity" label="募集总数量" width="155"></el-table-column>
            <el-table-column prop="power_pending_return_qiantity" label="待返总数" width="155"></el-table-column>
            <el-table-column prop="numbers" label="投入客户总数" width="120" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="Subordinate" label="直推总数" width="120" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="LowerSubordinate" label="间推总数" width="120" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="agent_numbers" label="代理商总数" width="120" show-overflow-tooltip> </el-table-column>
x            <el-table-column prop="agents_refuse_numbers" label="审核拒绝代理商总数" width="165" show-overflow-tooltip> </el-table-column>

        </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: 'emtRight',
  data () {
    return {
        tableData3: [],//获取信息列表
    }
  },
  methods:{
     //获取信息
     getRightData(){
         let _this = this;
         let api = '/super_power';
         _this.axios.get(api).then(res=>{
            //  console.log(res);
            _this.tableData3 = res.data.restult;
         });
     }
  },
  mounted(){
      let _this = this;
      _this.getRightData();//获取信息
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.emtRight{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    padding-top: 1.25rem;
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
.emtRight>>>.el-table .cell{
    line-height: 2rem;
}
/* 消除表格下面分割线 */
.el-table::before{
    display: none;
}
/* 表格内容部分 */
.emtRight>>>.el-table__body-wrapper{
    overflow-x: hidden;
}
</style>
