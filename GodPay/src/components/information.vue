<template>
  <div class="information">
      <!-- information页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="资讯">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">

    </div>
    <div class="bottom">
        <bar-bottom></bar-bottom>
    </div>
  </div>
</template>

<script>
import barBottom from './barBottom.vue'
export default {
  name: 'information',
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
/* .information>>>.rightToRecognize{
    background: url("../assets/img/认权2.png") 33px 5px no-repeat !important;
    background-size: 1.25rem !important;
} */
/* 整体样式，让整体页面高度满屏 */
.information{
    height: 97vh;
    background-color: #F2F2F2;
    overflow-y: hidden;
}
/* 头部样式 */
.information>>>.mint-header{
    height: 50px;
}
/* 头部文字样式 */
.information>>>.mint-header-title{
    font-size: 18px;
}
/* 中间部分设定高度 */
.information>>>.middle{
    height: 84vh;
    background: url("../assets/img/资讯背景.png") 0 0 no-repeat;
    background-size: 100% 100%;
}
</style>
