<template>
  <div class="infoCrowd">
      <!--资讯下的众筹 页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="众筹">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- 众筹总数  部分 -->
        <div class="mid-top">
            <!-- 进度条模板 -->
            <div class="progress">
                <p>
                    <span class="blue">众筹总数</span>
                    <span class="num">5000,000,000</span>
                </p>
                <p>
                    <mt-progress :value="crowdSum" :bar-height="20"></mt-progress>
                </p>
            </div>
        </div>
        <!-- 众筹分支  单曲-专辑-制作人  部分 -->
        <div class="mid-bottom">
            <!-- 进度条模板 -->
            <div class="progress">
                <p>
                    <span class="blue">单曲</span>
                    <span class="num">5000,000</span>
                </p>
                <p>
                    <mt-progress :value="singleSum" :bar-height="20"></mt-progress>
                </p>
            </div>
            <!-- 进度条模板 -->
            <div class="progress">
                <p>
                    <span class="blue">专辑</span>
                    <span class="num">6000,000</span>
                </p>
                <p>
                    <mt-progress :value="albumSum" :bar-height="20"></mt-progress>
                </p>
            </div>
            <!-- 进度条模板 -->
            <div class="progress">
                <p>
                    <span class="blue">制作人</span>
                    <span class="num">5000,000,000</span>
                </p>
                <p>
                    <mt-progress :value="producerNum" :bar-height="20"></mt-progress>
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
  name: 'infoCrowd',
  data () {
    return {
        crowdSum:20,//众筹总数
        singleSum:40,//单曲数量
        albumSum:60,//专辑数量
        producerNum:10,//制作人数量
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
/* .infoCrowd>>>.rightToRecognize{
    background: url("../assets/img/认权2.png") 33px 5px no-repeat !important;
    background-size: 1.25rem !important;
} */
/* 整体样式，让整体页面高度满屏 */
.infoCrowd{
    height: 97vh;
    background-color: #F2F2F2;
    font-size: .75rem;
    overflow-y: hidden;
}
/* 整体蓝色字体 */
.infoCrowd>>>.blue{
    color: #009FE8;
}
/* 数字样式 */
.infoCrowd>>>.num{
    color: #828282;
    float: right;
}
/* 整体进度条样式 */
.infoCrowd>>>.mt-progress-runway{
    background-color: white;
    border: .03125rem solid #BBBBBB;
    border-radius: .25rem;
}
/* 进度条进度的样式 */
.infoCrowd>>>.mt-progress-progress{
    border-radius: .3125rem;
}
/* 头部样式 */
.infoCrowd>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.infoCrowd>>>.mint-header-title{
    font-size: 18px;
}
/* 中间部分设定高度 */
.infoCrowd>>>.middle{
    height: 79vh;
}
/* 中上、中下   众筹部分 */
.infoCrowd>>>.mid-top,.mid-bottom{
    background-color: white;
    width:78% ;
    margin: 0 auto;
    border-radius: .5rem;
    padding:1.5625rem;
    margin-bottom: 3.125rem;
}

</style>
