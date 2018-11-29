<template>
  <div class="rightToRecognize">
      <!-- rightToRecognize认权页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="认权">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- card部分 -->
        <div class="card">
            <h5>Tide card</h5> 
            <div>
                <mt-swipe :auto="5000">
                    <mt-swipe-item>1</mt-swipe-item>
                    <mt-swipe-item>2</mt-swipe-item>
                    <mt-swipe-item>3</mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <!-- artist部分 -->
        <div class="artist">
            <h5>Artist</h5> 
            <div>
                <mt-swipe :auto="5000">
                    <mt-swipe-item>1</mt-swipe-item>
                    <mt-swipe-item>2</mt-swipe-item>
                    <mt-swipe-item>3</mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <!-- music部分 -->
        <div class="music">
            <h5>Music festival</h5> 
            <div>
                <mt-swipe :auto="5000">
                    <mt-swipe-item>1</mt-swipe-item>
                    <mt-swipe-item>2</mt-swipe-item>
                    <mt-swipe-item>3</mt-swipe-item>
                </mt-swipe>
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
  name: 'rightToRecognize',
  data () {
    return {
        
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
/* .rightToRecognize>>>.rightToRecognize{
    background: url("../assets/img/认权2.png") 33px 5px no-repeat !important;
    background-size: 1.25rem !important;
} */
/* 头部样式 */
.rightToRecognize>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.rightToRecognize>>>.mint-header-title{
    font-size: 18px;
}
/* 全局轮播图样式 */
.rightToRecognize>>>.mint-swipe-items-wrap{
    height: 130px;
}
/* 全局轮播图上标题的样式 */
.rightToRecognize>>>h5{
    margin: 0;
    color: #00A4EA;
}
/* 全局轮播中被选中图片的下标定位样式 */
.rightToRecognize>>>.mint-swipe-indicator.is-active{
    background-color: #00A4EA;
}
/* card、artist、music部分整体样式 */
.rightToRecognize>>>.card,.artist,.music{
    width: 90%;
    margin: 0 auto;
    background-color: #F2F2F2;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
}
</style>
