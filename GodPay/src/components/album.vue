<template>
  <div class="album">
      <!-- album专辑页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="众筹">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- 专辑图片部分 -->
        <div class="midTop picture"> 
            <img src="../assets/img/单曲-07.png" alt="">
        </div>
        <div class="midBottom">
            <dl>
                <dt>
                    <img src="../assets/img/单曲-05.png" alt="">
                </dt>
                <dd>
                    <p><span class="blue">专辑名：</span>&nbsp;&nbsp;Bilincalti</p>
                    <p><span class="blue">时&nbsp;&nbsp;&nbsp;间：</span>&nbsp;&nbsp;2008/06/08</p>
                </dd>
            </dl>
            <p class="text">
                The size of the festivals,the locations
                and the way weencourage community all
                form part of the way in which the
                Laneway team strive to present a live
                music experience like no other.
            </p>
            <div class="btn">
                <mt-button type="default">双季专辑</mt-button>
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
  name: 'album',
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
/* 默认选中众筹 */
/* .album>>>.album{
    background: url("../assets/img/众筹2.png") 33px 7px no-repeat !important;
    background-size: 1.4375rem !important;
} */
/* 整体样式 */
.album{
    height: 96vh;
    background-color: #F2F2F2;
    overflow-y: hidden;
}
/* 头部样式 */
.album>>>.mint-header{
    height: 50px;
    margin-bottom: 10px;
}
/* 头部文字样式 */
.album>>>.mint-header-title{
    font-size: 18px;
}
/* picture样式 */
.album>>>.picture{
    text-align: center;
}
/* picture 图片部分整体样式 */
.album>>>.picture img{
    width: 80vw;;
    height: 30vh;
    margin: 0 auto;
    padding:10px 10px 0 10px;
}
/* 图文详情部分中间部分下边的样式 */
.album>>>.midBottom{
    width: 82vw;
    height: 48vh;
    margin: .625rem auto;
    text-align: center;
    font-size: .75rem;
    background-color: white;
    padding-top: .9375rem;
}
/* dl-dt-dd图片样式 */
.album>>>dt img{
    width: 6.875rem;
    height: 6.875rem;
}
/* dl样式 */
.album>>>dl{
    margin: 0;
}
/* dt/dd样式 */
.album>>>dt,dd{
    display: inline-block;
    margin: 0;
    text-align: left;
    padding-left: .6rem
}
/* 蓝色字体 */
.album>>>.blue{
    color: #3FA5E8
}
/* 图文详情文字部分样式 */
.album>>>.midBottom .text{
    width: 74vw;
    text-align: left;
    margin: 0 auto;
    line-height: 1.1875rem;
    color: #888888;
}
/* 图文详情部分按钮样式 */
.album>>>.btn{
    text-align: center;
    position: absolute;
    left: 6.875rem;
    bottom:3.625rem;
}
.album>>>.btn button{
    font-size: 13px;
    margin: 0 auto;
    padding: 10px 50px;
    color: #009FE8;
    background-color: #F2F2F2;
    box-shadow: none;
}
</style>
