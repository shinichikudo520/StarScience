<template>
  <div class="card">
      <!-- card页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="Tide card">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- card部分 -->
        <div class="cardswipe">
            <mt-swipe :auto="5000">
                <mt-swipe-item>1</mt-swipe-item>
                <mt-swipe-item>2</mt-swipe-item>
                <mt-swipe-item>3</mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 标题部分 -->
        <div class="title">
            <p>LOUPEDECK</p>
        </div>
        <!-- 文章部分 -->
        <div class="artic">
            <div class="text">
                <p class="first">
                    LOUPEDECK + LETS YOU BE MORE CREATIVE,MAKES<br/>
                    YOUR EDITING FASTER,AND ALLOWS YOU TO FACUS<br/>
                    ON WHAT'S IMPORTANT - YOUR CARFT.
                </p>
                <br>
                <p class="second">
                    Complete control at your fingertips - adjusting and<br>
                    fine tuning your images and videos becomes simple.
                </p>
                <br>
                <p class="second">
                    Hands-on and highly intuitive - Loupedeck's buttons
                </p>
                <br>
            </div>
            <div class="cutoffrule">
                <hr/>
            </div>
            <br>
            <div class="btn">
                <mt-button type="default">2000EMT GOT IT</mt-button>
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
  name: 'card',
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
/* 整体样式，让整体页面高度满屏 */
.card{
    height: 97vh;
    background-color: #F2F2F2;
}
/* 头部样式 */
.card>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.card>>>.mint-header-title{
    font-size: 18px;
}
/* 中间部分设定高度 */
.card>>>.middle{
    height: 79vh;
}
/* 全局轮播图样式 */
.card>>>.mint-swipe-items-wrap{
    height: 130px;
}
/* 全局轮播中被选中图片的下标定位样式 */
.card>>>.mint-swipe-indicator.is-active{
    background-color: #00A4EA;
}
/* card轮播部分整体样式 */
.card>>>.cardswipe{
    width: 85%;
    margin: 0 auto;
    background-color: white;
    padding: 10px;
    margin-bottom: 10px;
}
/* 中间标题部分样式 */
.card>>>.title p{
    text-align: center;
    color: #009FE8;
    font-size: 17px;
    font-weight: 700;
}
/* 设定artic部分的整体样式 */
.card>>>.artic{
    font-size: 11px;
    height: 48vh;
    background-color: white;
    width: 90%;
    margin: 0 auto;
}
/* 设定artic中text文字部分的高度，超出部分有滚动条 */
.card>>>.text{
    height: 35vh;
    overflow-y: auto;
}
/* 设定artic下每个p的样式 */
.card>>>.artic p{
    width: 92%;
    margin: 0 auto;
    line-height: 24px;
}
/* 设定artic下first的样式 */
.card>>>.first{
    padding-top: 25px;
    font-weight: 700;
    font-size: 14px;
}
/* 设定分割线的样式 */
.card>>>.cutoffrule{
    width: 50%;
    margin: 0 auto;
}
/* artic部分的按钮样式 */
.card>>>.btn{
    text-align: center;
}
.card>>>.btn button{
    font-size: 13px;
    margin: 0 auto;
    padding: 10px 50px;
    color: #009FE8;
    background-color: #F2F2F2;
}
</style>
