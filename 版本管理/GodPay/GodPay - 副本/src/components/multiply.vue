<template>
<!-- 加速页面 -->
  <div class="multiply">
      <!-- 头部 -->
    <div class="top">
        <mt-header title="详情">
            <router-link to="/share" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- 默认倍化 -->
        <div class="defaultMultiply shadow" v-if="haveDefault">
            <img :src="defaultMultiply.imgUrl" alt="">
            <div>
                <span>默认倍化：<span class="weight">{{defaultMultiply.power_multiple}}</span> </span><br>
                <span class="small">{{defaultMultiply.orders_time}} &nbsp;&nbsp;&nbsp;购买于第{{defaultMultiply.user_stage}}阶段</span>
                <!-- <span class="sort">购买St Jerome`s</span> -->
            </div>
        </div>
        <div class="rightRecommend" v-if="haveSecond">
            <p >认权推荐</p>
            <div class="details">
                <table >
                    <tr class="shadow" v-for="(item,index) in secondRight" :key="index">
                        <td height='40px' class="firstTd">
                            <p class="black">{{item.subordinate_username}}</p>
                            <p class="small">{{item.subordinate_order_time}}</p>
                        </td>
                        <td>
                            <img :src="item.imgUrl" alt="">
                            <p class="small">购买于第{{item.subordinate_stage}}阶段</p>
                        </td>
                        <td  class="black percent">
                            {{item.subordinate_product_name}}
                        </td>
                    </tr>
                    <!-- <tr class="shadow">
                        <td height='40px' class="firstTd">
                            <p class="black">用户名</p>
                            <p class="small">2018-08-14</p>
                        </td>
                        <td>
                            <img src="../assets/img/order3.jpg" alt="">
                            <p class="small">购买于第一阶段</p>
                        </td>
                        <td  class="black percent">
                            购买St Jerome`s
                        </td>
                    </tr>
                    <tr class="shadow">
                        <td height='40px' class="firstTd">
                            <p class="black">用户名</p>
                            <p class="small">2018-08-14</p>
                        </td>
                        <td>
                            <img src="../assets/img/order3.jpg" alt="">
                            <p class="small">购买于第一阶段</p>
                        </td>
                        <td  class="black percent">
                            购买St Jerome`s
                        </td>
                    </tr>
                    <tr class="shadow">
                        <td height='40px' class="firstTd">
                            <p class="black">用户名</p>
                            <p class="small">2018-08-14</p>
                        </td>
                        <td>
                            <img src="../assets/img/order3.jpg" alt="">
                            <p class="small">购买于第一阶段</p>
                        </td>
                        <td  class="black percent">
                            购买St Jerome`s
                        </td>
                    </tr>
                    <tr class="shadow">
                        <td height='40px' class="firstTd">
                            <p class="black">用户名</p>
                            <p class="small">2018-08-14</p>
                        </td>
                        <td>
                            <img src="../assets/img/order3.jpg" alt="">
                            <p class="small">购买于第一阶段</p>
                        </td>
                        <td  class="black percent">
                            购买St Jerome`s
                        </td>
                    </tr> -->
                </table>
            </div>
        </div>
        <div class="crowdfundingRecommend" v-if="haveCrowdfunding">
            <p >众筹推荐</p>
            <div class="details">
                <table>
                    <tr class="shadow" v-for="(item,index) in secondCrowdfunding" :key="index">
                        <td class="firstTd" >
                            <p class="black">{{item.crowdfunding_username}}</p>
                            <p class="small">{{item.crowdfunding_time}}</p>
                        </td>
                        <td  class="black percent">
                            参与众筹{{item.crowdfunding_product}}
                        </td>
                    </tr>
                    <!-- <tr class="shadow">
                        <td class="firstTd">
                            <p class="black">用户名</p>
                            <p class="small">2018-08-14</p>
                        </td>
                        <td  class="black percent">
                            参与众筹一季单曲
                        </td>
                    </tr>
                    <tr class="shadow">
                        <td class="firstTd">
                            <p class="black">用户名</p>
                            <p class="small">2018-08-14</p>
                        </td>
                        <td  class="black percent">
                            参与众筹一季单曲
                        </td>
                    </tr>
                    <tr class="shadow">
                        <td class="firstTd">
                            <p class="black">用户名</p>
                            <p class="small">2018-08-14</p>
                        </td>
                        <td  class="black percent">
                            参与众筹一季单曲
                        </td>
                    </tr>
                    <tr class="shadow">
                        <td class="firstTd">
                            <p class="black">用户名</p>
                            <p class="small">2018-08-14</p>
                        </td>
                        <td  class="black percent">
                            参与众筹一季单曲
                        </td>
                    </tr> -->
                </table>
            </div>
        </div>
        <div class="NoData" v-if="NoData">
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
  name: 'multiply',
  data () {
    return {
        defaultMultiply:{},//默认倍化
        haveDefault:false,//有默认倍化
        isShow:false,//是否显示针对收益2倍化的内容
        secondRight:[],//第二次认权倍化的内容
        haveSecond:false,//有收益2倍化的认权用户
        secondCrowdfunding:[],//第二次众筹倍化的内容
        haveCrowdfunding:false,//有收益2倍化的众筹用户
        NoData:false,//没有任何倍化
    }
  },
  methods:{ 
      //处理时间
      formatDate(date){
           //处理时间
            date = new Date(date);
            date =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            return date
      }, 
      //获取倍化情况
      getMultiplySituation(){
          let _this = this;
          let api = '/ploidy_details';
          _this.axios.post(api,{
              uid:_this.$store.state.uid
          }).then(res=>{
              console.log(res);
              if(res.data == ""){
                _this.NoData = true;//没有任何倍化
                return
              }else{
                  _this.NoData = false;//没有任何倍化
              }

              _this.defaultMultiply = res.data.result[0][0];//默认倍化
              if(_this.defaultMultiply){
                _this.haveDefault = true;
                if(_this.defaultMultiply.user_grade){
                    _this.defaultMultiply.imgUrl = require('../assets/img/order'+_this.defaultMultiply.user_grade.substr(1)+'.jpg');
                }
              }

             

             _this.secondRight = res.data.result[1];//第二次认权倍化
             if(_this.secondRight  && _this.secondRight.length > 0){
                 _this.haveSecond = true;
                 _this.secondRight.forEach(item=>{
                    item.subordinate_order_time = _this.formatDate(item.subordinate_order_time);
                    if(item.subordinate_grade){
                        item.imgUrl = require('../assets/img/order'+item.subordinate_grade.substr(1)+'.jpg');
                    }
                });
             }
             
              _this.secondCrowdfunding = res.data.result[2];//第二次众筹倍化
             if(_this.secondCrowdfunding  && _this.secondCrowdfunding.length > 0){
                 _this.haveCrowdfunding = true;
                _this.secondCrowdfunding.forEach(item=>{
                    item.crowdfunding_time = _this.formatDate(item.crowdfunding_time);
                });
             }


             
             
             console.log('默认倍化',_this.defaultMultiply);
             console.log('第二次认权倍化',_this.secondRight);
             console.log('第二次众筹倍化',_this.secondCrowdfunding);
          });
      }
  },
  mounted(){
      let _this = this;
      _this.getMultiplySituation();//获取倍化初始情况
  },
  components:{
      barBottom,
  }
}
</script>
<style scoped>
/* 整体样式，让整体页面高度满屏 */
.multiply{
    height: 97vh;
    background-color: #FFFFFF;
    overflow-y: hidden;
    
}
/* 底部阴影样式 */
.multiply>>>.shadow{
    box-shadow: 0 .625rem 1.25rem #E7E9EB ;
}
/* 头部样式 */
.multiply>>>.mint-header{
    height: 9vh;
    color: #FFFFFF;
    background-color: transparent;
    background: rgba(0, 122, 255, 0.6);
    font-size: 1rem;
    margin-bottom: .625rem;
}
/* 中间部分设定高度 */
.multiply>>>.middle{
    height: 79vh;
    /* overflow-y: auto; */
}
/* 中间部分 */
/* 默认*/
.multiply>>>.defaultMultiply{
    position: relative;
    font-size: .9375rem;
    height:9vh;
    margin-bottom: 1.125rem;
}
/* 等级图片 */
.multiply>>>.defaultMultiply img{
    height: 5vh;
    margin: 0 .625rem;
}
.multiply>>>.defaultMultiply div{
    display: inline-block;
    height: 5vh;
}
/* 产品种类 */
.multiply>>>.defaultMultiply .sort{
    position: absolute;
    top:7px;
    right: .5625rem;
}
.multiply>>>.NoData{
    text-align: center;
    padding: 1.25rem;
    font-size: 1.125rem;
}
/* 默认的倍化数 */
.multiply>>>.defaultMultiply .weight{
    font-weight: 700;
}
/* 认权推荐/众筹推荐 */
.multiply>>>.rightRecommend,.crowdfundingRecommend{
    height: 35vh;
    overflow: hidden;
    /* margin-bottom: 1.25rem; */
}
/* 认权推荐/众筹推荐标题 */
.multiply>>>.rightRecommend>p,.crowdfundingRecommend>p{
    color: #9B9B9B;
    background-color: #F5F7F9;
    padding: .3125rem;
    margin: .3125rem;
    margin-bottom: 0;
    padding-top: .625rem;
}
/* 详细内容模块样式 */
.multiply>>>.details{
    width: 100%;
    color: #333333;
    overflow-y: auto;
    table-layout: fixed;
    height:26.8vh;
}
/* 整个推荐详情table */
.multiply>>>.details table{
    width: 100%;
}
.multiply>>>.details td{
    width: 32%;
    text-align: left;
    padding: .4375rem 0;
    height: 20%;
}
.multiply>>>.details p{
    margin: .625rem 0;
}
/* 详情中小字 */
.multiply>>>.small{
    font-size: .75rem;
    color: #333333;
}
/* 黑体加粗 */
.multiply>>>.black{
    font-size: 1.125rem;
    font-weight: 700;
}
/* 加速比例 */
.multiply>>>.percent{
    text-align: right !important;
    padding-right: 1.5625rem !important;
    font-size: .875rem;
    color: #1E1E1E;
    font-weight: 400;
}
/* 直推、间推ICON */
.multiply>>>td img{
    width: 1rem;
    height: 1rem;
    margin-top: .75rem
}
/* 第一列 */
.multiply>>>.firstTd{
    width: 40% !important;
    padding-left: .625rem !important;
}
</style>
