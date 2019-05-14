<template>
<!-- right页面 -->
  <div class="productDetails">
      <!-- 头部 -->
    <div class="top">
        <mt-header title="详情">
            <router-link to="/shopping" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- V1图片部分 -->
        <div class="rightImg">
            <img :src="imgUrl" alt="" class="bigimg">
        </div>
        <!-- 文字部分 -->
        <div class="text">
            <!-- 标题部分 -->
            <div class="title">
                <h2>
                    {{rightDetails.product_name}}
                </h2>
                <div>EMT：<span class="rightnum">{{rightDetails.product_price}}</span></div>
            </div>
            <!-- 文章部分 -->
            <div class="artic">
                <ul class="black">
                    <li>
                        <div>{{rightDetails.product_details}}</div>
                    </li>
                </ul>
                <img :src="imgDetails" alt="">                        
                <div class="btn">
                    <mt-button type="default" @click="toPayment">立即投入</mt-button>
                </div>  
            </div>
        </div>
        <div class="getNum">
            <mt-popup v-model="agree_agreement" position="top" popup-transition="popup-fade">{{content}}</mt-popup>
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
  name: 'productDetails',
  data () {
    return {
        // sort:"v1",//认权产品的种类
        imgUrl:"",//产品图片的url
        imgDetails:"",//产品详情图的url
        showAffirmModal:false,//认权确认框
        detailsInfo:false,//认权确认模态框详细信息
        rightDetails:{},//认权详情
        agree_agreement:false,//提示模态框显示
        content:"",//提示内容
    }
  },
  methods:{
        
        //加载产品详情信息
        getRightInfo(productId){
            let _this = this;          
            let api = '/product_details';
            _this.axios.post(api,{
                product_name_uid: productId,//商品id
            }).then(res=>{
                console.log(res);
                _this.rightDetails = res.data.result[0];
                _this.imgUrl = require('../assets/img/big'+_this.productId+'.jpg');
                _this.imgDetails = require('../assets/img/details'+_this.productId+'.jpg');

                // _this.levelImgUrl = require('../assets/img/order'+power_product_grade.substr(1)+'.jpg');

                console.log(_this.rightDetails);
            });
        },
        //去结算页
        toPayment(){
            let _this = this;
            _this.$router.push({
                path:"/payment/"+_this.productId
            });
        }
  },
  mounted(){
      let _this = this;
      _this.productId = _this.$route.params.productId;
      _this.getRightInfo(_this.productId);//获取产品详情信息
  },
  components:{
      barBottom,
  }
}
</script>
<style scoped>
/* 整体样式，让整体页面高度满屏 */
.productDetails{
    height: 97vh;
    background-color: #FFFFFF;
    overflow-y: hidden;
}
/* 头部样式 */
.productDetails>>>.mint-header{
    height: 6vh;
    margin-bottom: .1875rem;
    background-color:#FFFFFF;
    color: #030303;
    border-bottom: .0625rem solid #D7D8DA;
    font-size: 1.125rem;
}
/* 中间部分设定高度 */
.productDetails>>>.middle{
    height: 79vh;
    overflow-y: auto;
    overflow-x: hidden;
}
/* 中间部分 */
/* 中间文字部分 */
.productDetails>>>.middle .text{
    padding-left: .625rem;
}
/* 中间产品图片部分 */
.productDetails>>>.middle  img{
    width: 100%;
}
/* 产品的大图 */
.productDetails>>>.middle .bigimg{
    height: 25vh;
}
/* 产品标题title部分 */
.productDetails>>>.middle  h2{
    margin: .3125rem 0;
    /* height: 4.5vh; */
}
.productDetails>>>.middle .title div{
    color: #666666;
    height:3.5vh;
}
/* 产品标题中产品的关键数 */
.productDetails>>>.middle .title .rightnum{
    color: #1E1E1E;
}
/* 文字内容详情介绍部分 */
.productDetails>>>.middle .artic ul{
    font-size: .875rem;
    padding-left: 1.5625rem;
    margin: .1875rem 0;
    /* height: 30vh; */
}
/* 文字内容详情介绍小字 */
.productDetails>>>.middle .artic ul .detailInstraction{
    font-size: .75rem;
    margin: .625rem 0;
    height: 14vh;
}
/* 产品介绍中黑色字体 */
.productDetails>>>.middle .artic .black{
    color: #1E1E1E;
    padding: 0 1.25rem;
}
/* 中间产品介绍按钮 */
.productDetails>>>.btn{
    text-align: center;
    margin-top: 1.25rem;
    height: 8vh;
}
.productDetails>>>.btn button{
    width: 17.5rem;
    margin: 0 auto;
    padding: 10px 50px;
    color: white;
    background-color: #007AFF;
    border-radius:1.25rem;
}
/* 60s之内勿重复验证提示框 */
.productDetails>>>.getNum .mint-popup{
    background-color: transparent;
    color: white;
    height: 2%;
    line-height: 40px;
    border: none;
}
/* 确认认权模态框样式 */
.productDetails>>>.mint-popup{
    width: 60vw;
    height: 13.75rem;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #009FE8;
    border-radius: 10px;
    text-align: center;
    padding: 6px 0px;
    /* color:  #007AFF; */
}
/* 模态框关闭按钮样式 */
.productDetails>>>.closeModal img{
    position: absolute;
    top: .625rem;
    right: .8125rem;
    width: 1.25rem;
    height: 1.25rem;
}
/* 模态框下所有按钮 */
.productDetails>>>.affirmModal button{
    width: 60%;
    margin-top: 1.25rem;
    background: #007AFF ;
}
/* 详情页 */
/* 模态框详情页文字样式 */
.productDetails>>>.modalText{
    font-size: 19px;
    padding-top: .9375rem;
}
.productDetails>>>.modalText p{
    margin: .9375rem 0;
}
.productDetails>>>.modalText .who{
    color:  #007AFF;
}
/* 确认密码页 */
/* 输入密码部分数量文字的样式 */
.productDetails>>>.inPwdNum{
    color: #007AFF;
    font-size: 19px;
}
/* 输入密码部分输入框样式 */
.productDetails>>>.pwdInput{
    background-color: transparent;
}
.productDetails>>>.pwdInput .mint-cell-wrapper{
    width: 100% !important;
}
.productDetails>>>.pwdInput .mint-cell-value{
    flex: 0.9 !important;
    margin: 0 auto;
}
.productDetails>>>.pwdInput input{
    border: 1px solid #BBBBBB;
    border-radius: 5px;
    background-color: #F2F2F2;
    padding-left: 15px;
}
.productDetails>>>.pwdInput input::-webkit-input-placeholder{
    color: #D3CDCC;
}
/* 输入密码部分按钮的样式 */
.productDetails>>>.affirmPwd{
    padding: 0 25px;
    position: relative;
    top: .625rem;
}
/* 购入成功页或者失败页 */
/* 认权成功或者失败部分样式 */
.productDetails>>>.affirmSuccess,.affirmError{
    color:  #007AFF;
    padding-top: 7px;
}
/* 认权成功√或者失败!图标样式 */
.productDetails>>>.affirmSuccess img,.affirmError img{
    width: 3.75rem;
    height: 3.75rem;
    margin-bottom: .625rem;
}
/* 认权成功或者失败按钮样式 */
.productDetails>>>.affirSuccessBtn,.affirErrorBtn{
    padding: 0 25PX;
    position: relative;
    top: .1875rem;
}
</style>
