<template>
<!-- 加速页面 -->
  <div class="accelarate">
      <!-- 头部 -->
    <div class="top">
        <mt-header title="进度">
            <router-link to="/share" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <table class="details" v-if="haveAccelarateInfo">
            <tr class="shadow" v-for="(item,index) in accelarateInfo" :key="index">
                <td class="firstTd">
                    <p class="black">{{item.subordinate_username}}</p>
                    <p class="small">{{item.subordinate_order_time}}</p>
                </td>
                <td>
                    <img :src="item.imgType" alt="">
                    <p class="small">购买{{item.subordinate_grade}}产品</p>
                </td>
                <td  class="black percent">
                    + {{item.subordinate_rate * 100}} %
                </td>
            </tr>
        </table>
        <div v-else class="NoData">
            暂无数据
        </div>
    </div>
    <div class="bottom">
        <bar-bottom></bar-bottom>
    </div>
  </div>
</template>

<script>
import barBottom from './barBottom.vue'
export default {
  name: 'accelarate',
  data () {
    return {
        accelarateInfo:[],//加速详情信息
        haveAccelarateInfo:false,//是否有加速情况
    }
  },
  methods:{  
      //获取加速情况信息
      getAccelarate(){
          let _this = this;
          let api = '/speed_details';
          _this.axios.post(api,{
              uid:_this.$store.state.uid
          }).then(res=>{
                _this.accelarateInfo = res.data.result[0].concat(res.data.result[1]);
                // console.log(_this.accelarateInfo);
                if(_this.accelarateInfo.length > 0){//存在加速用户
                    _this.haveAccelarateInfo = true;//存在加速用户，显示加速详情表
                    _this.accelarateInfo.forEach(item=>{
                        
                        if(item.subordinate_rate){//直推
                            //console.log('直推用户');
                            item.imgType = require('../assets/img/directDrive.jpg');
                        }
                        if(item.lowersubordinate_rate){//间推
                            //console.log('间推用户');
                            item.imgType = require('../assets/img/betweenThePush.jpg');
                            item.subordinate_grade = item.lowersubordinate_grade
                            item.subordinate_order_time = item.lowersubordinate_order_time
                            item.subordinate_rate = item.lowersubordinate_rate
                            item.subordinate_username = item.lowersubordinate_username

                        }
                    });
                }else{
                    _this.haveAccelarateInfo = false;//存在加速用户，显示加速详情表
                    // _this.
                }
              //console.log(_this.accelarateInfo);
          });
      }
  },
  mounted(){
      let _this = this;
      _this.getAccelarate();//初始化加速信息
  },
  components:{
      barBottom,
  }
}
</script>
<style scoped>
/* 整体样式，让整体页面高度满屏 */
.accelarate{
    height: 97vh;
    background-color: #FFFFFF;
    overflow-y: hidden;
    
}
/* 底部阴影样式 */
.accelarate>>>.shadow{
    box-shadow: 0 .625rem 1.25rem #E7E9EB ;
}
/* 头部样式 */
.accelarate>>>.mint-header{
    height: 9vh;
    color: #FFFFFF;
    background-color: transparent;
    background: rgba(0, 122, 255, 0.6);
    font-size: 1rem;
    margin-bottom: .625rem;
}
/* 中间部分设定高度 */
.accelarate>>>.middle{
    height: 79vh;
    overflow-y: auto;
}
.accelarate>>>.NoData{
    text-align: center;
    padding: 1.25rem;
    font-size: 1.125rem;
}
/* 中间部分 */
/* 详细内容 */
.accelarate>>>.details{
    width: 100%;
    color: #333333;
}
.accelarate>>>.details td{
    width: 32%;
    text-align: left;
    padding: .4375rem 0;
}
.accelarate>>>.details p{
    margin: .625rem 0;
}
/* 详情中小字 */
.accelarate>>>.small{
    font-size: .75rem;
}
/* 黑体加粗 */
.accelarate>>>.black{
    font-size: 1.125rem;
    font-weight: 700;
}
/* 加速比例 */
.accelarate>>>.percent{
    text-align: right !important;
    padding-right: 1.5625rem !important;
}
/* 直推、间推ICON */
.accelarate>>>td img{
    width: 2.125rem;
    height: 1rem;
    margin-top: .75rem
}
/* 第一列 */
.accelarate>>>.firstTd{
    width: 40% !important;
    padding-left: .625rem !important;
}
</style>
