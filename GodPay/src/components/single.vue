<template>
  <div class="single">
      <!-- single单曲页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="众筹">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- 单曲图片部分 -->
        <div class="midTop picture"> 
            <img src="../assets/img/单曲-02.png" alt="">
        </div>
        <div class="midBottom">
            <dl>
                <dt>
                    <img src="../assets/img/单曲_画板 1.png" alt="">
                </dt>
                <dd>
                    <p><span class="blue">中文名：</span>&nbsp;&nbsp;艾蕾莎·贝丝·摩儿</p>
                    <p><span class="blue">外文名：</span>&nbsp;&nbsp;Alecia Beth Moore</p>
                    <p><span class="blue">别&nbsp;&nbsp;&nbsp;名：</span>&nbsp;&nbsp;Pink、粉红佳人</p>
                    <p><span class="blue">国&nbsp;&nbsp;&nbsp;籍：</span>&nbsp;&nbsp;美国</p>
                    <p><span class="blue">生&nbsp;&nbsp;&nbsp;日：</span>&nbsp;&nbsp;1979/09/08</p>
                </dd>
            </dl>
            <p class="text">
                Pink通过摇滚、抒情、疯克、灵魂、名谣等各种曲风表
                现不愿被定位任何特定范畴的理念，不过深受朋克摇滚
                影响的她还是秉持朋克摇滚所强调的挑战权威、坦率直
                的特质而创作出来的，无论以什么样的曲风来包
                装，她对音乐、对生命赤裸裸的热情都是毫无保留的。
            </p>
            <div class="btn">
                <mt-button type="default">一季单曲</mt-button>
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
  name: 'single',
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
/* .single>>>.single{
    background: url("../assets/img/众筹2.png") 33px 7px no-repeat !important;
    background-size: 1.4375rem !important;
} */
/* 整体样式 */
.single{
    height: 96vh;
    background-color: #F2F2F2;
    overflow-y: hidden;
}
/* 头部样式 */
.single>>>.mint-header{
    height: 50px;
    margin-bottom: 10px;
}
/* 头部文字样式 */
.single>>>.mint-header-title{
    font-size: 18px;
}
/* picture样式 */
.single>>>.picture{
    text-align: center;
}
/* picture 图片部分整体样式 */
.single>>>.picture img{
    width: 80vw;;
    height: 30vh;
    margin: 0 auto;
    padding:10px 10px 0 10px;
}
/* 图文详情部分中间部分下边的样式 */
.single>>>.midBottom{
    width: 82vw;
    height: 48vh;
    margin: .625rem auto;
    text-align: center;
    font-size: .75rem;
    background-color: white;
    padding-top: .9375rem;
}
/* dl-dt-dd图片样式 */
.single>>>dt img{
    width: 6.875rem;
    height: 6.875rem;
}
/* dl样式 */
.single>>>dl{
    margin: 0;
}
/* dt/dd样式 */
.single>>>dt,dd{
    display: inline-block;
    margin: 0;
    text-align: left;
    padding-left: .6rem
}
/* 蓝色字体 */
.single>>>.blue{
    color: #3FA5E8
}
/* 图文详情文字部分样式 */
.single>>>.midBottom .text{
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
.single>>>.btn button{
    font-size: 13px;
    margin: 0 auto;
    padding: 10px 50px;
    color: #009FE8;
    background-color: #F2F2F2;
    box-shadow: none;
}
</style>
