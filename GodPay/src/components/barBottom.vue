<template>
  <div class="barBottom">
    <!-- <div class="bottom"> -->
        <mt-tabbar v-model="barBottom">
            <mt-tab-item id="外卖">
                <img slot="icon" src="../assets/img/rightToRecognize.png">
                认权
            </mt-tab-item>
            <mt-tab-item id="订单">
                <img slot="icon" src="../assets/img/crowdfunding.png">
                众筹
            </mt-tab-item>
            <mt-tab-item id="发现">
                <img slot="icon" src="../assets/img/information .png">
                资讯
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="../assets/img/personalcenter.png">
                个人中心
            </mt-tab-item>
        </mt-tabbar>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'rightToRecognize',
  data () {
    return {
        barBottom:"",//底部导航选中的选项
    }
  },
  methods:{
        
  }
}
</script>
<style scoped>
/* 底部导航条样式 */
.barBottom>>>.mint-tabbar,.mint-tabbar > .mint-tab-item.is-selected{
    background-color: #00A4EA;
    color: black;
}
</style>
