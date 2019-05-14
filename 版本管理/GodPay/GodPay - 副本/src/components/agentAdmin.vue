<template>
  <div class="agentAdmin">
      <!-- 顶部 -->
      <div class="top">
            <el-row >
                <el-col :xs="2" :sm="3" >
                    <img src="../assets/img/superadminLogo.jpg" alt="" class="logo">
                </el-col>
                <span class="dis">代理商后台管理系统</span> 
                <span class="info">
                    <img src="../assets/img/userWhite.jpg" alt="" class="dis">
                    <span class="name">{{$store.state.agentInfo.agent_name}}</span> <span class="dis">欢迎登录</span> 
                    <img src="../assets/img/exit.jpg" alt="" class="exit" @click="exitAgentLogin">
                </span>
            </el-row>
      </div>
      <!-- 内容部分 -->
      <div class="content">
          <!-- 左边树形控件 -->
            <div class="left">
                <el-row >
                    <el-col >
                        <el-tree  class="tree" :data="data" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"></el-tree>
                    </el-col>
                </el-row>
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
  name: 'agentAdmin',
  data () {
    return {
        //左边树形菜单绑定数据
        data: [
            {
                label: '首页',
            }, 
            {
                label: 'EMT申请管理',
                children: [
                    {
                        label: '申请EMT',
                    },
                    {
                        label: '指定转账',
                    },
                    // {
                    //     label: 'EMT申请审核',
                    // },
                ]
            }, 
            {
                label: '申请状态',
            },
            {
                label: '代理商账本',
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
                case "首页":
                    _this.$router.push({path:"/agentHome"});
                break;
                case "EMT申请管理":
                case "申请EMT":
                    _this.$router.push({path:"/applyEMT"});
                break;
                case "指定转账":
                    _this.$router.push({path:"/transferAccount"});
                break;
                // case "EMT申请审核":
                //     _this.$router.push({path:"/reviewApplication"});
                // break;
                case "申请状态":
                    _this.$router.push({path:"/applicationStatus"});
                break;
                case "代理商账本":
                    _this.$router.push({path:"/accountBook"});
                break;
            }
        },
        //退出代理商登录
        exitAgentLogin(){
            let _this = this;
            _this.$store.dispatch('exitAgentLogin');
            // console.log(_this.$store.state.agentLogin,_this.$store.state.agentInfo);
            _this.$router.push({
                path:"/agentLogin"
            });
        }
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.agentAdmin{
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
/* 移动端：≤768px */
@media screen and (max-width:768px) { 
    /* 移动端隐藏的部分 */
    .dis{
        display: none;
    }
    /* 代理商名称 */
    .info{
        font-size: .625rem;
        position: absolute;
        right: -2%;
        top: 34%;
    }
    /* 退出按钮 */
    .exit{
        width: .9375rem !important;
        height: .9375rem !important;
    }
    /* 左边 */
    .agentAdmin>>>.left{
        padding-right: .3125rem;
        flex: 4;
    }
    /* 左边树形控件 */
    .agentAdmin>>>.el-tree-node__label{
        font-size:.625rem;
    }
}
</style>
