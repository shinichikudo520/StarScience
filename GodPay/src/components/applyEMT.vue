<template>
  <div class="applyEMT">
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
  name: 'applyEMT',
  data () {
    return {
        //左边树形菜单绑定数据
        data: [
            {
                label: '申请EMT',
                children: [
                    {
                        label: '向上级申请EMT',
                    },
                    {
                        label: '向代理商申请EMT',
                    }
                ]
            }, 
            {
                label: '客户EMT余额',
                children: [
                    {
                        label: 'EMT认权',
                    },
                    {
                        label: 'EMT众筹',
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
            console.log(data);
        }
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.applyEMT{
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
