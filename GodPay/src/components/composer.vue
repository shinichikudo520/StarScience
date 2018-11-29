<template>
  <div class="composer">
      <!-- composer 创作人页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <mt-search v-model="searchValue" placeholder="search" ></mt-search>
    </div>
    <div class="middle">
        <!-- 轮播部分 -->
        <div class="carousel">
            <div>
                <mt-swipe :auto="5000">
                    <mt-swipe-item>1</mt-swipe-item>
                    <mt-swipe-item>2</mt-swipe-item>
                    <mt-swipe-item>3</mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <!-- 图片列表部分 -->
        <div class="imgList">
            <dl>
                <dt>
                    <img src="../assets/img/单曲-12.png" alt="">
                </dt>
                <dd>Royals</dd>
            </dl>
            <dl>
                <dt>
                    <img src="../assets/img/单曲-11.png" alt="">
                </dt>
                <dd>Royals</dd>
            </dl>
            <dl>
                <dt>
                    <img src="../assets/img/单曲-14.png" alt="">
                </dt>
                <dd>Royals</dd>
            </dl>
            <dl>
                <dt>
                    <img src="../assets/img/单曲-18.png" alt="">
                </dt>
                <dd>Royals</dd>
            </dl>
            <dl>
                <dt>
                    <img src="../assets/img/单曲-16.png" alt="">
                </dt>
                <dd>Royals</dd>
            </dl>
            <dl>
                <dt>
                    <img src="../assets/img/单曲-15.png" alt="">
                </dt>
                <dd>Royals</dd>
            </dl>
            <dl>
                <dt>
                    <img src="../assets/img/单曲-02.png" alt="">
                </dt>
                <dd>Royals</dd>
            </dl>
            <dl>
                <dt>
                    <img src="../assets/img/单曲-04.png" alt="">
                </dt>
                <dd>Royals</dd>
            </dl>
            <dl>
                <dt>
                    <img src="../assets/img/单曲-20.png" alt="">
                </dt>
                <dd>Royals</dd>
            </dl>
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
  name: 'composer',
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
/* .composer>>>.crowdfunding{
    background: url("../assets/img/众筹2.png") 33px 7px no-repeat !important;
    background-size: 1.4375rem !important;
} */
/* 整体样式 */
.composer{
    height: 97vh;
    background-color: #F2F2F2;
}
/* 头部样式 */
.composer>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 全局轮播图样式 */
.composer>>>.mint-swipe-items-wrap{
    height: 130px;
}
/* 全局轮播中被选中图片的下标定位样式 */
.composer>>>.mint-swipe-indicator.is-active{
    background-color: #00A4EA;
}
/* carousel部分整体样式 */
.composer>>>.carousel{
    width: 90%;
    margin: 0 auto;
    background-color: white;
    padding: 10px;
    margin-bottom: 10px;
}
/* 搜索框样式 */
.composer>>>.mint-search{
    height: 8vh;
    position: absolute;
    top: 1.125rem;
    left: 14.0625rem;
}
.composer>>>.mint-searchbar,.mint-searchbar-inner{
    background-color: transparent;
    padding: 0;
}
.composer>>>.mint-searchbar-inner{
    flex: 0.8;  
    border-radius: 1.25rem;
    background-color: transparent;
    border: .0625rem solid white;
    padding: 0;
    padding-left: .625rem;
}
.composer>>>.mint-searchbar-inner input{
    background-color: transparent;
}
.composer>>>.mint-searchbar-inner input::-webkit-input-placeholder{
    color: white;
}
.composer>>>.mint-searchbar-cancel{
    margin-left: .3125rem;
    display: none;
}
/* 搜索icon样式 */
.composer>>>.mint-searchbar-inner i{
    position: absolute;
    right: 2.5rem;
    color: white;
}
.composer>>>.mint-header-button{
    flex: .3;
}
/* 中间图片列表部分 */
.composer>>>.imgList{
    background-color: white;
    width: 96%;
    height: 57vh;
    margin: 0 auto;
    overflow-y: auto;
}
/* 图片列表dl样式 */
.composer>>>dl{
    display: inline-block;
    padding-left:16px;
    margin: 5px 0;
}
/* 图片列表dd样式 */
.composer>>>dd{
    margin-left: 0;
    text-align: center;
}
/* 图片列表所有图片的样式 */
.composer>>>img{
    width: 5.625rem;
    height: 5.625rem;
}
</style>
