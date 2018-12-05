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
                    <mt-swipe-item>
                        <img src="../assets/img/01.jpg" alt="" class="swipeImg">
                        <img src="../assets/img/02.png" alt="" class="swipeImg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../assets/img/03.jpg" alt="" class="swipeImg">
                        <img src="../assets/img/04.png" alt="" class="swipeImg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../assets/img/05.png" alt="" class="swipeImg">
                        <img src="../assets/img/06.png" alt="" class="swipeImg">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <!-- artist部分 -->
        <div class="artist">
            <h5>Artist</h5> 
            <div>
                <mt-swipe :auto="5000">
                    <mt-swipe-item>
                        <img src="../assets/img/03.jpg" alt="" class="swipeImg">
                        <img src="../assets/img/04.png" alt="" class="swipeImg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../assets/img/01.jpg" alt="" class="swipeImg">
                        <img src="../assets/img/02.png" alt="" class="swipeImg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../assets/img/05.png" alt="" class="swipeImg">
                        <img src="../assets/img/06.png" alt="" class="swipeImg">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <!-- music部分 -->
        <div class="music">
            <h5>Music festival</h5> 
            <div>
                <mt-swipe :auto="5000">
                    <mt-swipe-item>
                        <img src="../assets/img/05.png" alt="" class="swipeImg">
                        <img src="../assets/img/02.png" alt="" class="swipeImg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../assets/img/01.jpg" alt="" class="swipeImg">
                        <img src="../assets/img/04.png" alt="" class="swipeImg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../assets/img/03.jpg" alt="" class="swipeImg">
                        <img src="../assets/img/06.png" alt="" class="swipeImg">
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
/* 整体样式 */
.rightToRecognize{
    overflow-y: hidden;
}
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
    height: 7.8125rem;
}
.rightToRecognize>>>.mint-swipe-indicator.is-active{
    background-color: #00A4EA;
}

/* 全局轮播图上标题的样式 */
.rightToRecognize>>>h5{
    margin: 0 0 .75rem 0;
    color: #00A4EA;
}
/* card、artist、music部分整体样式 */
.rightToRecognize>>>.card,.artist,.music{
    width: 90%;
    margin: 0 auto;
    background-color: #F2F2F2;
    padding: .5rem .5rem 0;
    border-radius: 10px;
    margin-bottom: .9375rem;
}
/* 轮播外层元素样式 */
.rightToRecognize>>>.mint-swipe-items-wrap > div{
    text-align: center;
}
/* 轮播图片的样式 */
.rightToRecognize>>>.swipeImg{
    width: 9.375rem;
    height: 6.25rem;
} 
/* 全局轮播中被选中图片的下标定位样式 */
.rightToRecognize>>>.mint-swipe-indicator{
    width: .25rem;
    height: .25rem;
    bottom: .375rem;
}
</style>
