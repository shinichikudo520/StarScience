<template>
  <div class="personCenter">
      <!--个人中心 页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="个人中心">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- 信息  部分 -->
        <div class="mid-top">
            <dl>
                <dt>
                    <img src="../assets/img/03.jpg" alt="">
                </dt>
                <dd>
                    <p>
                        <span class="blue">XXX </span>（昵称）
                    </p>
                    <p>
                        <span class="blue">ID: </span>189 6688 1688
                    </p>
                </dd>
            </dl>
        </div>
        <!-- 总数据  部分 -->
        <div class="mid-mid">
            <table cellspacing="10">
                <tr>
                    <td class="left">转入</td>
                    <td class="blue">EMT：0.00</td>
                </tr>
                <tr>
                    <td class="left"></td>
                    <td class="blue">ETH：0.00</td>
                </tr>
                <tr>
                    <td class="left">已增益返还</td>
                    <td>
                        <!-- 进度条模板 -->
                        <div class="progress">
                            <mt-progress :value="repayHas" :bar-height="20"></mt-progress>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="left">待增益</td>
                    <td>
                        <!-- 进度条模板 -->
                        <div class="progress">
                            <mt-progress :value="repay" :bar-height="20"></mt-progress>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="left"></td>
                    <td>
                        <span class="karma">
                            业力情况
                        </span>
                    </td>
                </tr>
            </table>
        </div>
        <!-- 具体信息   部分 -->
        <div class="mid-bottom">
            <table cellspacing="10">
                <tr>
                    <td class="left">可转出</td>
                    <td class="blue">EMT：0.00</td>
                </tr>
                <tr>
                    <td class="left"></td>
                    <td class="blue">ETH：0.00</td>
                </tr>
                <tr>
                    <td class="left">增益已得</td>
                    <td class="blue">EMT：0.00</td>
                </tr>
                <tr>
                    <td class="left"></td>
                    <td class="blue">ETH：0.00</td>
                </tr>
                <tr>
                    <td class="left starTr">特权剩余</td>
                    <td>
                        <div class="star">
                            <img v-for="n in star" :key="n+'bule'" src="../assets/img/bluestar.png" :alt="n">
                            <img v-for="i in (5-star)" :key="i" src="../assets/img/star.png" :alt="i">
                        </div>
                    </td>
                </tr>
            </table>
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
  name: 'personCenter',
  data () {
    return {
        repayHas:40,//已还数量
        repay:60,//待还数量
        star:3,//特权剩余
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
/* .personCenter>>>.rightToRecognize{
    background: url("../assets/img/认权2.png") 33px 5px no-repeat !important;
    background-size: 1.25rem !important;
} */
/* 整体样式，让整体页面高度满屏 */
.personCenter{
    height: 97vh;
    background-color: #F2F2F2;
    font-size: .75rem;
}
/* 整体蓝色字体 */
.personCenter>>>.blue{
    color: #009FE8 !important;
    font-weight: 700;
}
/* 表格的样式 */
.personCenter>>>table{
    width: 90%;
}
/* 表格第一列（左边列）文字右对齐 */
.personCenter>>>.left{
    text-align: right;
    width: 35%;
    padding-right: .625rem
}
/* 整体进度条样式 */
.personCenter>>>.mt-progress-runway{
    background-color: white;
    border: .03125rem solid #BBBBBB;
    border-radius: .25rem;
}
/* 进度条进度的样式 */
.personCenter>>>.mt-progress-progress{
    border-radius: .3125rem;
}
/* 头部样式 */
.personCenter>>>.mint-header{
    height: 50px;
    margin-bottom: .625rem;
}
/* 头部文字样式 */
.personCenter>>>.mint-header-title{
    font-size: 18px;
}
/* 中间部分设定高度 */
.personCenter>>>.middle{
    height: 79vh;
}
/* 中上、中中、中下 整体部分 */
.personCenter>>>.mid-top,.mid-mid,.mid-bottom{
    background-color: white;
    width:78% ;
    margin: 0 auto;
    border-radius: .5rem;
    padding:.625rem 1.25rem;
    margin-bottom: .625rem;
    color: #828282;
}
/* 用户头像图片样式 */
.personCenter>>>.mid-top img{
    width: 6.25rem;
    height: 6.25rem;
}
/* 用户信息部分dl-dt-dd样式 */
.personCenter>>>.mid-top dl{
    overflow: hidden;
}
.personCenter>>>.mid-top dt,.mid-top dd{
    float: left;
}
.personCenter>>>.mid-top dd{
    margin: .9375rem;
}
/* 业力情况样式 */
.personCenter>>>.karma{
    background-color: #009FE8;
    color: white;
    padding: .1875rem .3125rem;
    border-radius: .25rem;
}
/* 中下部分img样式 */
.personCenter>>>.mid-bottom img{
    width:1.25rem;
    height: 1.25rem;
}
/* 调整星星那行的特殊样式 */
.personCenter>>>.star{
    margin-left: -0.25rem;
}
</style>
