<template>
  <div class="crowdfunding">
      <!-- crowdfunding众筹页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="众筹">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- 单曲部分 -->
        <div class="single">
            <h5>单曲</h5> 
            <div>
                <mt-swipe :auto="5000">
                    <mt-swipe-item>
                        <img src="../assets/img/02.png" alt="" class="swipeImg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../assets/img/01.jpg" alt="" class="swipeImg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../assets/img/03.jpg" alt="" class="swipeImg">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <!-- 专辑部分 -->
        <div class="Album">
            <h5>专辑</h5> 
            <div>
                <mt-swipe :auto="5000">
                    <mt-swipe-item>
                        <img src="../assets/img/02.png" alt="" class="swipeImg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../assets/img/01.jpg" alt="" class="swipeImg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../assets/img/03.jpg" alt="" class="swipeImg">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <!-- 创作人部分 -->
        <div class="composer">
            <h5>创作人</h5> 
            <div>
                <mt-swipe :auto="5000">
                    <mt-swipe-item>
                        <img src="../assets/img/02.png" alt="" class="swipeImg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../assets/img/01.jpg" alt="" class="swipeImg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../assets/img/03.jpg" alt="" class="swipeImg">
                    </mt-swipe-item>
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
  name: 'crowdfunding',
  data () {
    return {
        searchValue:"",//搜索值
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
/* 默认选中众筹 */
/* .crowdfunding>>>.crowdfunding{
    background: url("../assets/img/众筹2.png") 33px 7px no-repeat !important;
    background-size: 1.4375rem !important;
} */
/* 头部样式 */
.crowdfunding>>>.mint-header{
    height: 50px;
    margin-bottom: .625rem;
}
/* 头部文字样式 */
.crowdfunding>>>.mint-header-title{
    font-size: 18px;
}
/* 全局轮播图样式 */
.crowdfunding>>>.mint-swipe-items-wrap{
    height: 130px;
}
/* 全局轮播图上标题的样式 */
.crowdfunding>>>h5{
    margin: 0 0 .375rem 0;
    font-weight: 400;
    font-size: .8125rem;
    color: #00A4EA;
}
/* 全局轮播中被选中图片的下标定位样式 */
.crowdfunding>>>.mint-swipe-indicator.is-active{
    background-color: #00A4EA;
}
/* single、Album、composer部分整体样式 */
.crowdfunding>>>.single,.Album,.composer{
    width: 86%;
    margin: 0 auto;
    background-color: #F2F2F2;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
}

/* 轮播外层元素样式 */
.crowdfunding>>>.mint-swipe-items-wrap > div{
    text-align: center;
}
/* 轮播图片的样式 */
.crowdfunding>>>.swipeImg{
    width: 17.1875rem;
    height:7.5rem;
} 
/* 全局轮播中被选中图片的下标定位样式 */
.crowdfunding>>>.mint-swipe-indicator{
    width: .25rem;
    height: .25rem;
    bottom: -0.25rem;
}
</style>
