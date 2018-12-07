<template>
  <div class="admin">
      <!-- 左边树形控件 -->
      <div class="left">
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <!-- 右边 -->
      <div class="right">
          right
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
                    }
                ]
            }, 
            {
                label: '客户管理',
                children: [
                    {
                        label: '客户个人信息',
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
                ]
            },
            {
                label: '申请审核',
                children: [
                    {
                        label: '确认准许',
                    }, 
                    {
                        label: '拒绝申请',
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
        //点击树形菜单
        handleNodeClick(data) {
            console.log(data);
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
    height: 100%;
    overflow-x: hidden;
    margin: 0 auto;
    display: flex;
}
/* 左边样式 */
.left{
    flex: 2;
}
/* 右边样式 */
.right{
    flex: 8;
}
</style>
