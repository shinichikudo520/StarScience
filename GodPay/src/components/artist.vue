<template>
  <div class="artist">
      <!-- artist页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="Artist">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- artist部分 -->
        <div class="artistswipe">
            <mt-swipe :auto="5000">
                <mt-swipe-item>1</mt-swipe-item>
                <mt-swipe-item>2</mt-swipe-item>
                <mt-swipe-item>3</mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 标题部分 -->
        <div class="title">
            <p>小泽玛丽花</p>
        </div>
        <!-- 文章部分 -->
        <div class="artic">
            <div class="text">
                <p class="first">
                    全国50强女DJ
                </p>
                <br>
                <p class="second">
                    过摇滚、抒情、疯克、灵魂、民谣等各种曲风
                    表现不愿被定位任何特定范畴的理念，不过深
                    受朋克摇滚影响的她还是秉持朋克摇滚所强调
                    的挑战权威、坦率直言的特质而创作出来的，
                    无论以什么样的曲风来包装，她对音乐、对生
                    命赤裸裸的热情都是毫无保留的。
                </p>
                <br>
            </div>
            <div class="cutoffrule">
                <hr/>
            </div>
            <br>
            <div class="btn">
                <mt-button type="default">4000EMT GOT IT</mt-button>
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
  name: 'artist',
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
.artist{
    height: 97vh;
    background-color: #F2F2F2;
}
/* 头部样式 */
.artist>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.artist>>>.mint-header-title{
    font-size: 18px;
}
/* 中间部分设定高度 */
.artist>>>.middle{
    height: 79vh;
}
/* 全局轮播图样式 */
.artist>>>.mint-swipe-items-wrap{
    height: 130px;
}
/* 全局轮播中被选中图片的下标定位样式 */
.artist>>>.mint-swipe-indicator.is-active{
    background-color: #00A4EA;
}
/* artist轮播部分整体样式 */
.artist>>>.artistswipe{
    width: 85%;
    margin: 0 auto;
    background-color: white;
    padding: 10px;
    margin-bottom: 10px;
}
/* 中间title标题部分样式 */
.artist>>>.title p{
    text-align: center;
    color: #009FE8;
    font-size: 17px;
    font-weight: 700;
}
/* 设定artic部分的整体样式 */
.artist>>>.artic{
    font-size: 11px;
    height: 48vh;
    background-color: white;
    width: 90%;
    margin: 0 auto;
}
/* 设定artic中text文字部分的高度，超出部分有滚动条 */
.artist>>>.text{
    height: 35vh;
    overflow-y: auto;
}
/* 设定artic下每个p的样式 */
.artist>>>.artic p{
    width: 92%;
    margin: 0 auto;
    line-height: 24px;
}
/* 设定artic下first的样式 */
.artist>>>.first{
    padding-top: 25px;
    font-weight: 700;
    font-size: 14px;
}
/* 设定分割线的样式 */
.artist>>>.cutoffrule{
    width: 50%;
    margin: 0 auto;
}
/* artic部分的按钮样式 */
.artist>>>.btn{
    text-align: center;
}
.artist>>>.btn button{
    font-size: 13px;
    margin: 0 auto;
    padding: 10px 50px;
    color: #009FE8;
    background-color: #F2F2F2;
}
</style>
