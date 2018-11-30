<template>
<!-- music页面 -->
  <div class="music">
      <!-- 头部 -->
    <div class="top">
        <mt-header title="Music festival">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- 轮播部分 -->
        <div class="musicswipe">
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
        <!-- 标题部分 -->
        <div class="title">
            <p>St Jerome's Laneway Festival</p>
        </div>
        <!-- 文章部分 -->
        <div class="artic">
            <div class="text">
                <p class="first">
                    St.Jerome's Laneway Festival is about leading
                    new and revered seminal music. The festival
                    has always been interested in finding what's
                    fresh and bringing
                </p>
                <p class="first">
                    i by music lovers.
                </p>
                <br>
                <p class="second">
                    The size of the festivals,the locations
                    and the way weencourage community all
                    form part of the way in which the
                    Laneway team strive to present a live
                </p>
                <br>
            </div>
            <!-- 分割线 -->
            <div class="cutoffrule">
                <hr/>
            </div>
            <br>
            <div class="btn">
                <mt-button type="default" @click="showModal">8000EMT GOT IT</mt-button>
            </div>  
        </div>
        <!-- 认权确认模态框 -->
        <div class="affirmModal">
            <mt-popup v-model="showAffirmModal" popup-transition="popup-fade" :modal="false">
                <p class="closeModal" @click="hiddenModal">X</p>
                <!-- 认权确认的详细信息内容 -->
                <template v-if="detailsInfo">
                    <div class="modalText">
                        <p >可用EMT:10000</p>
                        <P class="who">小泽玛丽花</P>
                        <p >投入8000</p>
                        <mt-button size="small" type="primary" @click="affirmRight" class="affirmBtn">确认</mt-button>
                    </div>
                </template>
                <!-- 输入密码 -->
                <template v-else-if="inputPwd">
                    <p class="inPwdNum">投入8000</p>
                    <mt-field class="pwdInput" placeholder="password" type="password" v-model="affirmPwd"></mt-field>
                    <mt-button size="small" type="primary"  class="affirmPwd" @click="affirmPwdMays">确认</mt-button>
                </template>
                <!-- 认权成功 -->
                <template v-else-if="affirmSuccess">
                    <div class="affirmSuccess">
                        <i class="mint-toast-icon mintui mintui-field-success"></i>
                        <h2>成功</h2>
                        <mt-button size="small" type="primary"  class="affirSuccessBtn" @click="affirSuccessWays">确认</mt-button>
                    </div>
                </template>
                <!-- 认权失败 -->
                <template v-else-if="affirmError">
                    <div class="affirmError">
                        <i class="mint-toast-icon mintui mintui-field-warning"></i>
                        <h2>失败</h2>
                        <mt-button size="small" type="primary"  class="affirErrorBtn" @click="affirmErrorWays">重试</mt-button>
                    </div>
                </template>
            </mt-popup>
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
  name: 'music',
  data () {
    return {
        showAffirmModal:false,//认权确认框
        detailsInfo:true,//认权确认模态框详细信息
        inputPwd:false,//认权确认模态框输入密码
        affirmPwd:"",//认权输入的密码
        affirmSuccess:false,//认权成功
        affirmError:false,//认权失败
    }
  },
  methods:{
        //显示认权确认模态框
        showModal(){
            let  _this = this;
            _this.showAffirmModal = true;
            _this.detailsInfo = true;//显示认权模态框时第一次显示的内容一定是详细信息内容
        },
        // 隐藏认权确认模态框
        hiddenModal(){
            let  _this = this;
            _this.showAffirmModal = false;
            _this.detailsInfo = true;//关闭模态框后必须设置详情页为默认页。防止其他模态框模板内容出现

        },
        //确认认权
        affirmRight(){
            console.log("确认详情页");
            let  _this = this;
            _this.detailsInfo = false;//点击确认后详细的信息内容消失
            _this.inputPwd = true;//然后出现输入密码框
        },
        // 确认密码
        affirmPwdMays(){
            console.log("确认密码")
            let  _this = this;
            _this.inputPwd = false;
            // _this.affirmSuccess = true;//确认密码后确认成功
            _this.affirmError = true;//确认密码后确认失败
        },
        //确认认权成功
        affirSuccessWays(){

        },
        //确认认权失败
        affirmErrorWays(){

        }
  },
  components:{
      barBottom,
  }
}
</script>
<style scoped>
/* 默认选中认权 */
/* .music>>>.rightToRecognize{
    background: url("../assets/img/认权2.png") 33px 5px no-repeat !important;
    background-size: 1.25rem !important;
} */
/* 整体样式，让整体页面高度满屏 */
.music{
    height: 97vh;
    background-color: #F2F2F2;
}
/* 头部样式 */
.music>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.music>>>.mint-header-title{
    font-size: 18px;
}
/* 中间部分设定高度 */
.music>>>.middle{
    height: 79vh;
}
/* 全局轮播图样式 */
.music>>>.mint-swipe-items-wrap{
    height: 130px;
}
/* 全局轮播中被选中图片的下标定位样式 */
.music>>>.mint-swipe-indicator.is-active{
    background-color: #00A4EA;
}
/* music轮播部分整体样式 */
.music>>>.musicswipe{
    width: 85%;
    margin: 0 auto;
    background-color: white;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: .3125rem;
}
/* 中间标题部分样式 */
.music>>>.title p{
    text-align: center;
    color: #009FE8;
    font-size: 17px;
    font-weight: 700;
}
/* 设定artic部分的整体样式 */
.music>>>.artic{
    font-size: 11px;
    height: 48vh;
    background-color: white;
    width: 90%;
    margin: 0 auto;
}
/* 设定artic中text文字部分的高度，超出部分有滚动条 */
.music>>>.text{
    height: 35vh;
    overflow-y: auto;
}
/* 设定artic下每个p的样式 */
.music>>>.artic p{
    width: 92%;
    margin: 0 auto;
    line-height: 24px;
}
/* 设定artic下first的样式 */
.music>>>.first{
    padding-top: 17px;
    font-weight: 700;
    font-size: 11px;
}
/* 设定分割线的样式 */
.music>>>.cutoffrule{
    width: 50%;
    margin: 0 auto;
}
/* artic部分的按钮样式 */
.music>>>.btn{
    text-align: center;
}
.music>>>.btn button{
    font-size: 13px;
    margin: 0 auto;
    padding: 10px 50px;
    color: #009FE8;
    background-color: #F2F2F2;
}
/* 确认认权模态框样式 */
.music>>>.mint-popup{
    width: 60vw;
    height: 30vh;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #009FE8;
    border-radius: 10px;
    text-align: center;
    padding: 6px 0px;
}
/* 模态框关闭按钮样式 */
.music>>>.closeModal{
    position: absolute;
    top: -12px;
    right: 13px;
    color: #CDCCCC;
}
/* 模态框文字样式 */
.music>>>.modalText{
    font-size: 19px;
}
/* 模态框蓝色文字样式 */
.music>>>.who{
    color: #009FE8;
}
/* 模态框确认按钮样式 */
.music>>>.affirmBtn{
    padding: 0 25PX;
}
/* 模态框确认密码内容部分的样式 */
/* 输入密码部分数量文字的样式 */
.music>>>.inPwdNum{
    color: #009FE8;
    font-size: 19px;
}
/* 输入密码部分输入框样式 */
.music>>>.pwdInput .mint-cell-wrapper{
    width: 100% !important;
}
.music>>>.pwdInput .mint-cell-value{
    flex: 0.9 !important;
    margin: 0 auto;
}
.music>>>.pwdInput input{
    border: 1px solid #BBBBBB;
    border-radius: 5px;
    background-color: #F2F2F2;
    padding-left: 15px;
}
.music>>>.pwdInput input::-webkit-input-placeholder{
    color: #D3CDCC;
}
/* 输入密码部分按钮的样式 */
.music>>>.affirmPwd{
    padding: 0 25PX;
    position: relative;
    top: 30px;
}
/* 认权成功或者失败部分样式 */
.music>>>.affirmSuccess,.affirmError{
    color:  #009FE8;
    padding-top: 7px;
}
/* 认权成功√或者失败!样式 */
.music>>>.affirmSuccess .mint-toast-icon,.affirmError .mint-toast-icon{
    font-size: 54px;
}
/* 认权成功或者失败按钮样式 */
.music>>>.affirSuccessBtn,.affirErrorBtn{
    padding: 0 25PX;
    position: relative;
    top: 15px;
}

/* 轮播外层元素样式 */
.music>>>.mint-swipe-items-wrap > div{
    text-align: center;
}
/* 轮播图片的样式 */
.music>>>.swipeImg{
    width: 17.1875rem;
    height:7.5rem;
} 
/* 全局轮播中被选中图片的下标定位样式 */
.music>>>.mint-swipe-indicator{
    width: .25rem;
    height: .25rem;
    bottom: -0.25rem;
}
</style>
