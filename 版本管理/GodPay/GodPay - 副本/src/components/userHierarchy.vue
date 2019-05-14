<template>
  <div class="userHierarchy">
        <!-- 左边树形控件 -->
        <div class="left">
            <!-- @node-click="handleNodeClick" 点击事件-->
            <el-tree class="tree" :data="data" :props="defaultProps" @node-click="handleNodeClick"  :highlight-current="true"></el-tree>
        </div>
  </div>
</template>

<script>
export default {
  name: 'userHierarchy',
  data () {
    return {
        //左边树形菜单绑定数据
        data: [
            {
                label:"GodPay",
                children:[
                    {
                        label: '代理商管理',
                        children: [
                            {
                                label: '开通代理',
                            },
                            {
                                label: '管理代理',
                            },
                            {
                                label: 'EMT申请审核',
                                children:[
                                    {
                                        label:'待审批',
                                    },
                                    {
                                        label:'历史审批',
                                    }
                                ],
                            }
                        ],
                    }, 
                    {
                        label: '客户管理',
                        children: [
                            {
                                label: '客户信息',
                            },
                            {
                                label: '认权明细查询',
                            },
                            {
                                label: '众筹明细查询',
                            },
                            {
                                label: '发展明细查询',
                            },
                            {
                                label: '客户风控',
                            },
                            {
                                label: '客户层级图',
                            },
                        ]
                    }, 
                    {
                        label: '平台数据管理',
                        children: [
                            {
                                label: 'EMT认权数据',
                            }, 
                            {
                                label: 'EMT众筹数据',
                            },
                            {
                                label: '客户分布管理',
                            },
                        ]
                    },
                    {
                        label: '产品管理',
                        children: [
                            {
                                label: 'EMT认权产品管理',
                            }, 
                            {
                                label: 'EMT众筹产品管理',
                            },
                        ]
                    },
                    {
                        label: '账务管理',
                        children: [
                            {
                                label: '提取EMT申请审批',
                            }, 
                            {
                                label: '历史审批查询',
                            }, 
                        ]
                    },
                ]
            }
        ],
        //左边树形菜单配置
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  methods:{
        // //点击树形菜单
        handleNodeClick(data) {
            let _this = this;
            console.log(data,data.label);
            // switch(data.label){
            //     case "代理商管理":
            //     case "开通代理":
            //         _this.$router.push({path:"/openUp"});
            //     break;
            //     case "管理代理":
            //         _this.$router.push({path:"/manageAgent"});
            //     break;
            //     case "EMT申请审核":
            //     case "待审批":
            //         _this.$router.push({path:"/agentApplyEMT"});
            //     break;
            //     case "历史审批":
            //         _this.$router.push({path:"/historyApply"});
            //     break;
            //     case "客户信息":
            //         _this.$router.push({path:"/userInfo"});
            //     break;
            //     case "认权明细查询":
            //         _this.$router.push({path:"/rightDetails"});
            //     break;
            //     case "众筹明细查询":
            //         _this.$router.push({path:"/crowdfundingDetails"});
            //     break;
            //     case "发展明细查询":
            //         _this.$router.push({path:"/developDetails"});
            //     break;
            //     case "客户风控":
            //         _this.$router.push({path:"/risk"});
            //     break;
            //     case "客户层级图":
            //         // _this.$router.push({path:"/userHierarchy"});
            //     break;
            //     case "EMT认权数据":
            //         _this.$router.push({path:"/emtRight"});
            //     break;
            //     case "EMT众筹数据":
            //         _this.$router.push({path:"/emtCrowdfunding"});
            //     break;
            //     case "客户分布管理":
            //         _this.$router.push({path:"/userDistribution"});
            //     break;
            //     case "EMT认权产品管理":
            //         _this.$router.push({path:"/manageRight"});
            //     break;
            //     case "EMT众筹产品管理":
            //         _this.$router.push({path:"/manageCrowdfunding"});
            //     break;
            //     case "提取EMT申请审批":
            //         _this.$router.push({path:"/auditWithdraw"});
            //     break;
            //     case "历史审批查询":
            //         _this.$router.push({path:"/historyAudit"});
            //     break;
            // }
        },
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.userHierarchy{
    width: 100%;
    height: 97vh;
    overflow-y: hidden;
    overflow-x: hidden;
    margin: 0 auto;   
    border-bottom: .0625rem solid #D7D7D7;
}
/* 左边样式 */
.left{
    border-left: .0625rem solid #D7D7D7;
}
/* 选中导航条的样式 */
/* .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #447ED9;
    color: white;
} */
</style>
