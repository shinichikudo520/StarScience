<template>
<!-- right页面 -->
  <div class="right">
      <!-- 头部 -->
    <div class="top">
        <mt-header title="详情">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- V1图片部分 -->
        <div class="rightImg">
            <img :src="imgUrl" alt="">
            <!-- require('../assets/img/'+sort+'detailImg.jpg') -->
        </div>
        <!-- 文字部分 -->
        <div class="text">
            <!-- 标题部分 -->
            <div class="title">
                <h2>
                    {{rightDetails.power_product}}产品
                    <img v-if="TrueLevelImgUrl" :src="levelImgUrl" alt="">
                    <!-- require('../assets/img/level'+sort+'@1x.jpg') -->
                </h2>
                <div>投入周期：<span class="rightnum">{{rightDetails.power_product_zhouqi}}天</span></div>
                <div>原&nbsp; 始 值：<span class="rightnum">{{rightDetails.power_product_quantity}}</span></div>
            </div>
            <!-- 文章部分 -->
            <div class="artic">
                <h3>{{rightDetails.power_product_name}}</h3>
                <ul class="black">
                    <li>
                        <div>{{rightDetails.power_product_details}}</div>
                        <!-- <div class="detailInstraction grey">
                            <div>
                                Hands-on and highly intuitive – Loupedeck’s buttons, dials and sliders ensure your eyes and hands work seamlessly together.
                            </div>
                            <div>
                                Complete control at your fingertips – adjusting and fine tuning your images and videos becomes simple.
                            </div>
                        </div> -->
                    </li>
                    <li class="grey" v-if="TrueLevelImgUrl">同一产品只能<span class="black weight">购买1次</span></li>
                </ul>
                <div class="btn">
                    <mt-button type="default" @click="showModal">立即投入</mt-button>
                </div>  
            </div>
        </div>
        <div class="getNum">
            <mt-popup v-model="agree_agreement" position="top" popup-transition="popup-fade">{{content}}</mt-popup>
        </div>
        <!-- 认权确认模态框 -->
        <div class="affirmModal">
            <mt-popup v-model="showAffirmModal" popup-transition="popup-fade">
                <p class="closeModal" @click="hiddenModal">
                    <img src="../assets/img/closeBtn.jpg" alt="">
                </p>
                <!-- 认权确认的详细信息内容 -->
                <template v-if="detailsInfo">
                    <div class="modalText">
                        <P class="who">{{rightDetails.power_product_name}}</P>
                        <p >投入{{rightDetails.power_product_quantity}}EMT</p>
                        <mt-button size="small" type="primary" @click="affirmRight" class="affirmBtn">确认</mt-button>
                    </div>
                </template>
                <!-- 输入密码 -->
                <template v-else-if="inputPwd">
                    <div class="inputPwd">
                        <p class="inPwdNum">投入{{rightDetails.power_product_quantity}}EMT</p>
                        <mt-field class="pwdInput" placeholder="请输入支付密码" type="password" :disableClear='true' v-model="affirmPwd"></mt-field>
                        <mt-button size="small" type="primary"  class="affirmPwd" @click="purchaseRight">确认投入</mt-button>
                    </div>
                </template>
                <!-- 认权成功 -->
                <template v-else-if="affirmSuccess">
                    <div class="affirmSuccess">
                        <img src="../assets/img/success.jpg" alt="">
                        <div>投入成功</div>
                        <mt-button size="small" type="primary"  class="affirSuccessBtn" @click="hiddenModal">确认</mt-button>
                    </div>
                </template>
                <!-- 认权失败 -->
                <template v-else-if="affirmError">
                    <div class="affirmError">
                        <img src="../assets/img/error.jpg" alt="">
                        <div>可用EMT不足</div>
                        <div>请充值EMT</div>
                        <mt-button size="small" type="primary"  class="affirErrorBtn" @click="hiddenModal">重试</mt-button>
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
  name: 'right',
  data () {
    return {
        sort:"v1",//认权产品的种类
        imgUrl:"",//产品图片的url
        TrueLevelImgUrl:false,//是否存在等级图
        levelImgUrl:"",//产品等级图片的url
        // upperSort:"V1",
        showAffirmModal:false,//认权确认框
        detailsInfo:false,//认权确认模态框详细信息
        inputPwd:false,//认权确认模态框输入密码
        affirmPwd:"",//认权输入的密码
        affirmSuccess:false,//认权成功
        affirmError:false,//认权失败
        rightDetails:{},//认权详情
        agree_agreement:false,//提示模态框显示
        content:"",//提示内容
    }
  },
  methods:{
        //显示认权确认模态框
        showModal(){
            let  _this = this;
            //判断是否为登录状态
            if(!_this.$store.state.isLogin){//非登录状态
                _this.$router.push({path:"/"});
                return
            }
            _this.showAffirmModal = true;
            _this.detailsInfo = true;//显示认权模态框时第一次显示的内容一定是详细信息内容
        },
        // 隐藏认权确认模态框
        hiddenModal(){
            let  _this = this;
            _this.showAffirmModal = false;
            // _this.paymentMethod = true;//关闭模态框后必须设置详情页为默认页。防止其他模态框模板内容出现
        },
        //确认认权
        affirmRight(){
            //console.log("确认详情页");
            let  _this = this;
            _this.detailsInfo = false;//点击确认后详细的信息内容消失
            _this.inputPwd = true;//然后出现输入密码框
        },
        // 确认密码
        // affirmPwdMays(){
        //     //console.log("确认密码")
        //     let  _this = this;
        //     _this.inputPwd = false;
        //     // _this.affirmSuccess = true;//确认密码后确认成功
        //     _this.affirmError = true;//确认密码后确认失败
        // },
        //确认认权成功
        affirSuccessWays(){

        },
        //确认认权失败
        affirmErrorWays(){

        },
        //加载认权产品详情信息
        getRightInfo(power_product_grade){
            let _this = this;
            
            let api = '/product_details/'+power_product_grade;
            _this.axios.get(api).then(res=>{
                //console.log(res);
                _this.rightDetails = res.data[0];
                _this.imgUrl = require('../assets/img/'+power_product_grade+'detailImg.jpg');
                _this.levelImgUrl = require('../assets/img/order'+power_product_grade.substr(1)+'.jpg');
                // _this.TrueLevelImgUrl = power_product_grade == 'v1'?power_product_grade == 'v2'?power_product_grade == 'v3':false;
                switch(power_product_grade){
                    case 'v1':
                    case 'v2':
                    case 'v3':
                        _this.TrueLevelImgUrl = true
                    break
                    default:
                        _this.TrueLevelImgUrl = false
                    break
                }
                console.log(_this.rightDetails);

            });
        },
        //购买认权产品
        purchaseRight(){
            let _this = this;  
            
            if(_this.affirmPwd == ""){//支付密码为""
                _this.agree_agreement = true;//提示用户输入手机号
                _this.content = '请先输入支付密码';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }          
            let api = '/order';
            _this.axios.post(api,{
                uid:_this.$store.state.uid,//用户等级
                key_password:_this.affirmPwd,//支付密码
                order_product:_this.sort,//产品等级
            }).then(res=>{
                //console.log(res);
                //console.log("确认购买")
                // 购买成功？？？失败？？？=》模态框
                 _this.inputPwd = false;
                 if(res.data.operation == "ok"){//购买成功
                        
                    _this.affirmSuccess = true;//确认密码后确认成功                    
                 }else{
                    _this.affirmError = true;//确认密码后确认失败
                 }
            }).catch(error=>{
                //console.log(error.response);
                let status = error.response.status;//获取状态
                if(status == 400){//报400错误
                    // _this.hiddenModal();//隐藏购买模态框
                    _this.agree_agreement = true;//提示框
                    _this.content = error.response.data[0];
                    setTimeout(() => {
                        _this.agree_agreement = false;//提示用户同意协议
                        _this.hiddenModal();//隐藏模态框
                    }, 5000);
                    return
                }
            });
        }
  },
  mounted(){
      let _this = this;
      _this.sort = _this.$route.params.sort;
      //console.log('sort',_this.sort);
      _this.getRightInfo(_this.sort);//获取产品详情信息
    //   //console.log(sort);
  },
  components:{
      barBottom,
  }
}
</script>
<style scoped>
/* 整体样式，让整体页面高度满屏 */
.right{
    height: 97vh;
    background-color: #FFFFFF;
    overflow-y: hidden;
}
/* 头部样式 */
.right>>>.mint-header{
    height: 6vh;
    margin-bottom: .1875rem;
    background-color:#FFFFFF;
    color: #030303;
    border-bottom: .0625rem solid #D7D8DA;
    font-size: 1.125rem;
}
/* 中间部分设定高度 */
.right>>>.middle{
    height: 79vh;
    overflow-y: auto;
    overflow-x: hidden;
}
/* 中间部分 */
/* 中间文字部分 */
.right>>>.middle .text{
    padding-left: .625rem;
}
/* 中间产品图片部分 */
.right>>>.middle .rightImg img{
    width: 100%;
    height: 25vh;
}
/* 产品标题title部分 */
.right>>>.middle  h2{
    margin: .3125rem 0;
    height: 4.5vh;
}
.right>>>.middle .title div{
    color: #666666;
    height:3.5vh;
}
/* 产品标题中产品的关键数 */
.right>>>.middle .title .rightnum{
    color: #1E1E1E;
}
/* 产品介绍文字部分 */
/* 文字部分标题 */
.right>>>.middle h3{
    margin: .3125rem 0;
}
.right>>>.middle h3{
    color: #666666;
    height: 4vh;
    font-weight: 400;
}
/* 文字内容详情介绍部分 */
.right>>>.middle .artic ul{
    font-size: .875rem;
    padding-left: 1.5625rem;
    margin: .1875rem 0;
    height: 30vh;
}
/* 文字内容详情介绍小字 */
.right>>>.middle .artic ul .detailInstraction{
    font-size: .75rem;
    margin: .625rem 0;
    height: 14vh;
}
/* 产品介绍中灰色字体 */
.right>>>.middle .artic .grey{
    color: #555555;
}
/* 产品介绍中黑色字体 */
.right>>>.middle .artic .black{
    color: #1E1E1E;
    padding: 0 1.25rem;
}
/* 产品介绍中加粗字体 */
.right>>>.middle .artic .weight{
    font-weight: 700;
}
/* 中间产品介绍按钮 */
.right>>>.btn{
    text-align: center;
    margin-top: 1.25rem;
    height: 8vh;
}
.right>>>.btn button{
    width: 17.5rem;
    margin: 0 auto;
    padding: 10px 50px;
    color: white;
    background-color: #007AFF;
    border-radius:1.25rem;
}
/* 60s之内勿重复验证提示框 */
.right>>>.getNum .mint-popup{
    background-color: transparent;
    color: white;
    height: 2%;
    line-height: 40px;
    border: none;
}
/* 确认认权模态框样式 */
.right>>>.mint-popup{
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
.right>>>.closeModal img{
    position: absolute;
    top: .625rem;
    right: .8125rem;
    width: 1.25rem;
    height: 1.25rem;
}
/* 模态框下所有按钮 */
.right>>>.affirmModal button{
    width: 60%;
    margin-top: 1.25rem;
    background: #007AFF ;
}
/* 详情页 */
/* 模态框详情页文字样式 */
.right>>>.modalText{
    font-size: 19px;
    padding-top: .9375rem;
}
.right>>>.modalText p{
    margin: .9375rem 0;
}
.right>>>.modalText .who{
    color:  #007AFF;
}
/* 确认密码页 */
/* 输入密码部分数量文字的样式 */
.right>>>.inPwdNum{
    color: #007AFF;
    font-size: 19px;
}
/* 输入密码部分输入框样式 */
.right>>>.pwdInput{
    background-color: transparent;
}
.right>>>.pwdInput .mint-cell-wrapper{
    width: 100% !important;
}
.right>>>.pwdInput .mint-cell-value{
    flex: 0.9 !important;
    margin: 0 auto;
}
.right>>>.pwdInput input{
    border: 1px solid #BBBBBB;
    border-radius: 5px;
    background-color: #F2F2F2;
    padding-left: 15px;
}
.right>>>.pwdInput input::-webkit-input-placeholder{
    color: #D3CDCC;
}
/* 输入密码部分按钮的样式 */
.right>>>.affirmPwd{
    padding: 0 25px;
    position: relative;
    top: .625rem;
}
/* 购入成功页或者失败页 */
/* 认权成功或者失败部分样式 */
.right>>>.affirmSuccess,.affirmError{
    color:  #007AFF;
    padding-top: 7px;
}
/* 认权成功√或者失败!图标样式 */
.right>>>.affirmSuccess img,.affirmError img{
    width: 3.75rem;
    height: 3.75rem;
    margin-bottom: .625rem;
}
/* 认权成功或者失败按钮样式 */
.right>>>.affirSuccessBtn,.affirErrorBtn{
    padding: 0 25PX;
    position: relative;
    top: .1875rem;
}
</style>
