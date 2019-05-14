<template>
  <div class="admin">
      <!-- 顶部 -->
      <div class="top">
          <img src="../assets/img/superadminLogo.jpg" alt="" class="logo">
              后台管理系统
              <span class="info">
                <img src="../assets/img/userWhite.jpg" alt="">
                {{$store.state.adminUser}}欢迎登录
                <img src="../assets/img/exit.jpg" alt="" class="exit" @click="exitLogin">
              </span>
      </div>
      <!-- 内容部分 -->
      <div class="content">
          <!-- 左边树形控件 -->
            <div class="left">
                <el-tree class="tree" :data="data" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"></el-tree>
            </div>
            <!-- 右边 -->
            <div class="right">
                <router-view></router-view>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
        //左边树形菜单绑定数据
        data: [
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
                ]
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
                    {
                        label: '商城产品管理',
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
        ],
        //左边树形菜单配置
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  methods:{
        //点击树形菜单
        handleNodeClick(data) {
            let _this = this;
            //console.log(data,data.label);
            switch(data.label){
                case "代理商管理":
                case "开通代理":
                    _this.$router.push({path:"/openUp"});
                break;
                case "管理代理":
                    _this.$router.push({path:"/manageAgent"});
                break;
                case "EMT申请审核":
                case "待审批":
                    _this.$router.push({path:"/agentApplyEMT"});
                break;
                case "历史审批":
                    _this.$router.push({path:"/historyApply"});
                break;
                case "客户信息":
                    _this.$router.push({path:"/userInfo"});
                break;
                case "认权明细查询":
                    _this.$router.push({path:"/rightDetails"});
                break;
                case "众筹明细查询":
                    _this.$router.push({path:"/crowdfundingDetails"});
                break;
                case "发展明细查询":
                    _this.$router.push({path:"/developDetails"});
                break;
                case "客户风控":
                    _this.$router.push({path:"/risk"});
                break;
                case "客户层级图":
                    _this.$router.push({path:"/userHierarchy"});
                break;
                case "EMT认权数据":
                    _this.$router.push({path:"/emtRight"});
                break;
                case "EMT众筹数据":
                    _this.$router.push({path:"/emtCrowdfunding"});
                break;
                case "客户分布管理":
                    _this.$router.push({path:"/userDistribution"});
                break;
                case "EMT认权产品管理":
                    _this.$router.push({path:"/manageRight"});
                break;
                case "EMT众筹产品管理":
                    _this.$router.push({path:"/manageCrowdfunding"});
                break;
                case "商城产品管理":
                    _this.$router.push({path:"/manageCommodity"});
                break;
                case "提取EMT申请审批":
                    _this.$router.push({path:"/auditWithdraw"});
                break;
                case "历史审批查询":
                    _this.$router.push({path:"/historyAudit"});
                break;
            }
        },
        //退出登录
        exitLogin(){
            let _this = this;
            _this.$store.dispatch('exitLogin');
            // console.log(_this.$store.state.adminLogin,_this.$store.state.adminUser);
            _this.$router.push({
                path:"/adminLogin",
            });
        }
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.admin{
    width: 100%;
    height: 97vh;
    overflow-y: hidden;
    overflow-x: hidden;
    margin: 0 auto;   
    border-bottom: .0625rem solid #D7D7D7;
}
/* 顶部内容 */
.top{
    background-color: #447ED9;
    padding: .625rem;
    color: #FFFFFF;
    font-size: 1.5625rem;
    position: relative;
}
/* 顶部logo */
.logo{
    width: 11.25rem;
    height: 2.5rem;
    vertical-align: middle;
}
/* 用户信息 */
.info{
    display: inline-block;
    position: absolute;
    right: 1.25rem;
    font-size: 1rem;
}
/* 用户信息人性logo */
.info img{
    width:1.75rem ;
    height: 1.75rem;
    vertical-align: bottom;
    padding:0  .5rem;
}
/* 退出图标 */
.exit{
    width: 1.5rem !important;
    height: 1.5rem !important;
    cursor: pointer;
}
/* 内容部分 */
.content{
    display: flex;
    height: 100%;
    width: 100%;
}
/* 左边样式 */
.left{
    flex: 1.4;
    border-left: .0625rem solid #D7D7D7;
    border-right: .3125rem solid #447ED9;
}
/* 选中导航条的样式 */
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #447ED9;
    color: white;
}
/* 右边样式 */
.right{
    flex: 8;
}
</style>
