<template>
  <div class="infoEMT">
      <!--资讯下的EMT 页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="EMT">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- emt总数  部分 -->
        <div class="mid-top">
            <!-- 进度条模板 -->
            <div class="progress">
                <p>
                    <span class="blue">EMT募集总数</span>
                    <span class="num">200,000,000</span>
                </p>
                <p>
                    <mt-progress :value="EMTSum" :bar-height="20"></mt-progress>
                </p>
            </div>
            <!-- 进度条模板 -->
            <div class="progress">
                <p>
                    <span class="blue">优惠阶段</span>
                    <span class="num">200,000,000</span>
                </p>
                <p>
                    <mt-progress :value="discountNum" :bar-height="20"></mt-progress>
                </p>
            </div>
        </div>
        <!-- 阶段  部分 -->
        <div class="mid-bottom">
            <!-- 进度条模板 -->
            <div class="progress">
                <p>
                    <span class="blue">第一阶段</span>
                    <span class="num">5000,000</span>
                </p>
                <p>
                    <mt-progress :value="firstNum" :bar-height="20"></mt-progress>
                </p>
            </div>
            <!-- 进度条模板 -->
            <div class="progress">
                <p>
                    <span class="blue">第二阶段</span>
                    <span class="num">6000,000</span>
                </p>
                <p>
                    <mt-progress :value="secondNum" :bar-height="20"></mt-progress>
                </p>
            </div>
            <!-- 进度条模板 -->
            <div class="progress">
                <p>
                    <span class="blue">第三阶段</span>
                    <span class="num">5000,000,000</span>
                </p>
                <p>
                    <mt-progress :value="thirdNum" :bar-height="20"></mt-progress>
                </p>
            </div>
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
  name: 'infoEMT',
  data () {
    return {
        EMTSum:20,//EMT募集总数
        discountNum:40,//优惠阶段数量
        firstNum:60,//第一阶段数量
        secondNum:0,//第二阶段数量
        thirdNum:0,//第三阶段数量
    }
  },
  methods:{
        
  },
  components:{
      barBottom,
  }
}
</script>
<style scoped>
/* 默认选中认权 */
/* .infoEMT>>>.rightToRecognize{
    background: url("../assets/img/认权2.png") 33px 5px no-repeat !important;
    background-size: 1.25rem !important;
} */
/* 整体样式，让整体页面高度满屏 */
.infoEMT{
    height: 97vh;
    background-color: #F2F2F2;
    font-size: .75rem;
}
/* 整体蓝色字体 */
.infoEMT>>>.blue{
    color: #009FE8;
}
/* 数字样式 */
.infoEMT>>>.num{
    color: #828282;
    float: right;
}
/* 整体进度条样式 */
.infoEMT>>>.mt-progress-runway{
    background-color: white;
    border: .03125rem solid #BBBBBB;
    border-radius: .25rem;
}
/* 进度条进度的样式 */
.infoEMT>>>.mt-progress-progress{
    border-radius: .3125rem;
}
/* 头部样式 */
.infoEMT>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.infoEMT>>>.mint-header-title{
    font-size: 18px;
}
/* 中间部分设定高度 */
.infoEMT>>>.middle{
    height: 79vh;
}
/* 中上、中下   众筹部分 */
.infoEMT>>>.mid-top,.mid-bottom{
    background-color: white;
    width:78% ;
    margin: 0 auto;
    border-radius: .5rem;
    padding:1.5625rem;
    margin-bottom: 1.875rem;
}

</style>
