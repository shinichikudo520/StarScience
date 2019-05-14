<template>
  <div class="barBottom">
        <mt-tabbar v-model="barBottom">
            <!-- 首页 -->
            <mt-tab-item class="homeIcon" id="home" @click.native="toHome">
            </mt-tab-item>
            <!-- 兑换 -->
            <mt-tab-item class="exchangeIcon" id="exchange" @click.native="toExchange">
            </mt-tab-item>
            <!-- 分享 -->
            <mt-tab-item class="shareIcon" id="share" @click.native="toShare">
            </mt-tab-item>
            <!-- 我的 -->
            <mt-tab-item class="personalCenterIcon" id="personalCenter" @click.native="toPersonalCenter">
            </mt-tab-item>
        </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'barBottom',
  data () {
    return {
        barBottom:"",//底部导航选中的选项
    }
  },
  methods:{
        // 去首页部分
        toHome(){
            let _this = this;
            // document.getElementById("home").classList.add("is-selected");
            _this.$router.push({path:"/home"});
            //console.log(_this.barBottom);
        },
        // 去兑换部分
        toExchange(){
            let _this = this;
            // document.getElementById("home").classList.add("is-selected");
            _this.$router.push({path:"/shopping"});
            //console.log(_this.barBottom);
        },
        //去分享部分
        toShare(){
            let _this = this;
            //console.log('去分享部分');
            // document.getElementById("personCenter").classList.add("is-selected");
            _this.$router.push({path:"/share"});
            //console.log(_this.barBottom);
        },
        //去个人中心部分
        toPersonalCenter(){
            let _this = this;
            //console.log('去个人中心部分');
            _this.$router.push({path:"/personCenter"});
            // document.getElementById("personCenter").classList.add("is-selected");
            //console.log(_this.barBottom);
        },
  }
}
</script>
<style scoped>
.barBottom{
    width: 100%;
    height: 8vh;
    position: fixed;
    bottom: 0;
}
/* 去除a标签下划线 */
.barBottom>>>a{
    text-decoration: none;
}
/* 底部导航条样式 */
.barBottom>>>.mint-tabbar{
    border-top: .0625rem solid #E4E4E5;
}
/* 设置每个tab */
.barBottom>>>.mint-tab-item-label{
    padding-top: 35px;
}
/* 设置背景图icon */
/* 首页 */
.barBottom>>>.homeIcon{
    
    background: url("../assets/img/home.jpg") 33px 8px no-repeat;
    background-size: 1.4375rem;
}
/* 兑换 */
.barBottom>>>.exchangeIcon{
    
    background: url("../assets/img/shopping.jpg") 33px 8px no-repeat;
    background-size: 1.4375rem;
}
/* 分享 */
.barBottom>>>.shareIcon{
    background: url("../assets/img/share.jpg") 35px 7px no-repeat;
    background-size: 1.4375rem;
}
/* 我的 */
.barBottom>>>.personalCenterIcon{
    background: url("../assets/img/personCenter.jpg") 33px 5px no-repeat;
    background-size: 1.25rem;
}
</style>
