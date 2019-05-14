<template>
<!-- crowdfunding页面 -->
  <div class="crowdfunding">
      <!-- 头部 -->
    <div class="top">
        <mt-header title="详情">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- crowdfunding图片部分 -->
        <div class="crowdfundingImg">
            <img :src="bigImg" alt="">
            <!-- require('../assets/img/crowdfunding'+kind+'.jpg') -->
        </div>
        <!-- 文字部分 -->
        <div class="text">
            <!-- 标题部分 -->
            <div class="title">
                <h2>
                    {{crowdfunding.crowdfunding_product_grade}}
                    <span class="smallName">
                        （{{crowdfunding.work}}）
                    </span>
                </h2>
                <div>投入周期：<span class="crowdfundingnum">{{period}}个月</span></div>
                <div>最&nbsp; 少 值：<span class="crowdfundingnum">{{crowdfunding.crowdfunding_product_quantity}}</span></div>
            </div>
            <!-- 文章部分 -->
            <div class="artic">
                <div class="productInfo">
                    <img :src="smallImg" alt="">
                    <!-- require('../assets/img/crowdfundingSmall'+kind+'.jpg') -->
                    <table>
                        <tr>
                            <td class="blue">中 文 名</td>
                            <td>{{crowdfunding.chain_name}}</td>
                        </tr>
                        <tr>
                            <td class="blue">外 文 名</td>
                            <td>{{crowdfunding.engish_name}}</td>
                        </tr>
                        <tr>
                            <td class="blue">别 &nbsp;&nbsp;&nbsp;&nbsp;名</td>
                            <td>{{crowdfunding.alias}}</td>
                        </tr>
                        <tr>
                            <td class="blue">国 &nbsp;&nbsp;&nbsp;&nbsp;籍</td>
                            <td>{{crowdfunding.nationality}}</td>
                        </tr>
                        <tr>
                            <td class="blue">出生日期</td>
                            <td>{{crowdfunding.birthday}}</td>
                        </tr>
                    </table>
                </div>
                <ul class="black">
                    <li>
                        <div>
                            {{crowdfunding.crowdfunding_product_details}}
                        </div>
                    </li>
                </ul>
                <div class="btn">
                    <mt-button type="default" @click="showModal">立即投入</mt-button>
                </div>  
            </div>
        </div>
        <div class="getNum">
            <mt-popup v-model="agree_agreement" position="top" popup-transition="popup-fade">{{content}}</mt-popup>
        </div>
        <!-- 众筹确认模态框 -->
        <div class="affirmModal">
            <mt-popup v-model="showAffirmModal" popup-transition="popup-fade">
                <p class="closeModal" @click="hiddenModal">
                    <img src="../assets/img/closeBtn.jpg" alt="">
                </p>
                <!-- 众筹确认的详细信息内容 -->
                <template v-if="detailsInfo">
                    <div class="modalText">
                        <P class="who">{{crowdfunding.crowdfunding_product_grade}}</P>
                        <mt-field class="pwdInput" placeholder="请输入购买数量" type="number" :disableClear='true' v-model="crowdfundingNum"></mt-field>
                        <mt-button size="small" type="primary" @click="affirmRight" class="affirmBtn">确认</mt-button>
                    </div>
                </template>
                <!-- 输入密码 -->
                <template v-else-if="inputPwd">
                    <div class="inputPwd">
                        <p class="inPwdNum">投入{{crowdfundingNum}}EMT</p>
                        <mt-field class="pwdInput" placeholder="请输入支付密码" type="password" :disableClear='true' v-model="affirmPwd"></mt-field>
                        <mt-button size="small" type="primary"  class="affirmPwd" @click="purchaseCrowdfunding">确认投入</mt-button>
                    </div>
                </template>
                <!-- 众筹成功 -->
                <template v-else-if="affirmSuccess">
                    <div class="affirmSuccess">
                        <img src="../assets/img/success.jpg" alt="">
                        <div>投入成功</div>
                        <mt-button size="small" type="primary"  class="affirSuccessBtn" @click="hiddenModal">确认</mt-button>
                    </div>
                </template>
                <!-- 众筹失败 -->
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
  name: 'crowdfunding',
  data () {
    return {
        kind:"3M",//产品类型
        bigImg:"",//产品大图
        smallImg:"",//产品小图
        period:"3",//周期
        crowdfunding:{},//众筹产品详情
        showAffirmModal:false,//众筹确认框
        detailsInfo:false,//众筹确认模态框详细信息
        inputPwd:false,//众筹确认模态框输入密码
        crowdfundingNum:'',//购买众筹产品的数量
        affirmPwd:"",//众筹输入的密码
        affirmSuccess:false,//众筹成功
        affirmError:false,//众筹失败
        agree_agreement:false,//提示模态框显示
        content:"",//提示内容
    }
  },
  methods:{
        //显示众筹确认模态框
        showModal(){
            let  _this = this;
            //判断是否为登录状态
            if(!_this.$store.state.isLogin){//非登录状态
                _this.$router.push({path:"/"});
                return
            }
            _this.showAffirmModal = true;
            _this.detailsInfo = true;//显示众筹模态框时第一次显示的内容一定是详细信息内容
        },
        // 隐藏众筹确认模态框
        hiddenModal(){
            let  _this = this;
            _this.showAffirmModal = false;
            // _this.paymentMethod = true;//关闭模态框后必须设置详情页为默认页。防止其他模态框模板内容出现
        },
        //确认众筹
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
        //确认众筹成功
        affirSuccessWays(){

        },
        //确认众筹失败
        affirmErrorWays(){

        },
        //获取产品详情信息
        getCrowdfundingInfo(crowdfunding_product_grade){
            let _this = this;
            let api = '/crowdfunding_details/'+crowdfunding_product_grade;
            _this.axios.get(api).then(res=>{
                _this.crowdfunding = res.data[0];//获取众筹产品详情
                _this.bigImg = require('../assets/img/crowdfunding'+crowdfunding_product_grade+'.jpg');
                _this.smallImg = require('../assets/img/crowdfundingSmall'+crowdfunding_product_grade+'.jpg');
                switch(_this.kind){
                    case '3M':
                        _this.period = 3;
                    break
                    case '6M':
                        _this.period = 6;
                    break
                    case '12M':
                        _this.period = 12;
                    break
                }
                //console.log(_this.crowdfunding );
            });
        },
        //购买众筹产品
        purchaseCrowdfunding(){
            let _this = this;
            // switch(_this.kind){
            //     case '1':
            //         _this.order_product = 3;
            //         break;
            //     case '2':
            //         _this.order_product = 6;
            //         break;
            //     case '3':
            //         _this.order_product = 12;
            //         break;
            // };
            let api = '/orderzhong';
            _this.axios.post(api,{
                key_password:_this.affirmPwd,//支付密码
                order_quantity:Number(_this.crowdfundingNum),//购买数量
                order_product:_this.kind,//购买周期
                uid:_this.$store.state.uid,//用户uid
                order_product_name:_this.crowdfunding.crowdfunding_product_name,//产品名称
            }).then(res=>{
                //console.log(res);

                //console.log("确认购买")
                // 购买成功？？？失败？？？=》模态框
                 _this.inputPwd = false;
                 if(res.data.operation == "ok"){//购买成功
                    _this.affirmSuccess = true;//确认密码后确认成功
                 }else{//购买失败
                    _this.affirmError = true;//确认密码后确认失败
                 }
            }).catch(error=>{
                // console.log(error.response);
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
      _this.kind = _this.$route.params.kind;
      //console.log(_this.kind);
      _this.getCrowdfundingInfo(_this.kind);//获取产品详情信息
  },
  components:{
      barBottom,
  }
}
</script>
<style scoped>
/* 整体样式，让整体页面高度满屏 */
.crowdfunding{
    height: 97vh;
    background-color: #FFFFFF;
    overflow-y: hidden;
}
/* 头部样式 */
.crowdfunding>>>.mint-header{
    height: 6vh;
    margin-bottom: .1875rem;
    background-color:#FFFFFF;
    color: #030303;
    border-bottom: .0625rem solid #D7D8DA;
    font-size: 1.125rem;
}
/* 中间部分设定高度 */
.crowdfunding>>>.middle{
    height: 79vh;
    overflow-y: auto;
    overflow-x: hidden;
}
/* 中间部分 */
/* 中间文字部分 */
.crowdfunding>>>.middle .text{
    padding-left: .625rem;
}
/* 中间产品图片部分 */
.crowdfunding>>>.middle .crowdfundingImg,.middle .crowdfundingImg img{
    width: 100%;
    height: 25vh;
}
/* 产品标题title部分 */
.crowdfunding>>>.middle  h2{
    margin: .3125rem 0;
    height: 4.5vh;
}
.crowdfunding>>>.middle h2 .smallName{
    font-size: .875rem;
    font-weight: 400;
    color: #666666;
}
.crowdfunding>>>.middle .title div{
    color: #666666;
    height:3.5vh;
}
/* 产品标题中产品的关键数 */
.crowdfunding>>>.middle .title .crowdfundingnum{
    color: #1E1E1E;
}
/* 产品介绍文字部分 */
/* 产品主要信息部分 */
.crowdfunding>>>.middle .productInfo{
    display: flex;
    /* width: %; */
}
/* 产品主要信息的图片部分 */
.crowdfunding>>>.middle .productInfo img{
    width: 6.25rem;
    height: 6.25rem;
    margin: .625rem .3125rem;
}
/* 产品主要信息的蓝色字体 */
.crowdfunding>>>.middle .productInfo .blue{
    color: #4198FF;
    text-align: right;
    width: 32%;
    padding-right: .3125rem;
}
/* 产品主要信息超出部分隐藏 */
.crowdfunding>>>.middle .productInfo table{
    table-layout: fixed;
    font-size: .875rem;
    /* width: 90vw; */
}
.crowdfunding>>>.middle .productInfo td{
    width: 9.375rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* 文字内容详情介绍部分 */
.crowdfunding>>>.middle .artic ul{
    font-size: .8125rem;
    padding-left: 1.5625rem;
    margin: .1875rem 0;
    height: 18vh;
    /* color: #666666 */
}
.crowdfunding>>>.middle .artic ul li{
    margin: .5rem 0;
}
/* 产品介绍中黑色字体 */
.crowdfunding>>>.middle .artic .black{
    color: #1E1E1E;
    padding:0 1.25rem;
}
/* 中间产品介绍按钮 */
.crowdfunding>>>.btn{
    text-align: center;
    height: 8vh;
}
.crowdfunding>>>.btn button{
    width: 17.5rem;
    margin: 0 auto;
    padding: 10px 50px;
    color: white;
    background-color: #007AFF;
    border-radius:1.25rem;
}
/* 60s之内勿重复验证提示框 */
.crowdfunding>>>.getNum .mint-popup{
    background-color: transparent;
    color: white;
    height: 2%;
    line-height: 40px;
    border: none;
}
/* 确认众筹模态框样式 */
.crowdfunding>>>.mint-popup{
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
.crowdfunding>>>.closeModal img{
    position: absolute;
    top: .625rem;
    right: .8125rem;
    width: 1.25rem;
    height: 1.25rem;
}
/* 模态框下所有按钮 */
.crowdfunding>>>.affirmModal button{
    width: 60%;
    margin-top: 1.25rem;
    background: #007AFF;
}
/* 详情页 */
/* 模态框详情页文字样式 */
.crowdfunding>>>.modalText{
    font-size: 19px;
    padding-top: .9375rem;
}
.crowdfunding>>>.modalText p{
    margin: .9375rem 0;
}
.crowdfunding>>>.modalText .who{
    color:  #007AFF;
}
/* 确认密码页 */
/* 输入密码部分数量文字的样式 */
.crowdfunding>>>.inPwdNum{
    color: #007AFF;
    font-size: 19px;
}
/* 输入密码部分输入框样式 */
.crowdfunding>>>.pwdInput{
    background-color: transparent;
}
.crowdfunding>>>.pwdInput .mint-cell-wrapper{
    width: 100% !important;
}
.crowdfunding>>>.pwdInput .mint-cell-value{
    flex: 0.9 !important;
    margin: 0 auto;
}
.crowdfunding>>>.pwdInput input{
    border: 1px solid #BBBBBB;
    border-radius: 5px;
    background-color: #F2F2F2;
    padding-left: 15px;
}
.crowdfunding>>>.pwdInput input::-webkit-input-placeholder{
    color: #D3CDCC;
}
/* 输入密码部分按钮的样式 */
.crowdfunding>>>.affirmPwd{
    padding: 0 25px;
    position: relative;
    top: .625rem;
}
/* 购入成功页或者失败页 */
/* 众筹成功或者失败部分样式 */
.crowdfunding>>>.affirmSuccess,.affirmError{
    color:  #007AFF;
    padding-top: 7px;
}
/* 众筹成功√或者失败!图标样式 */
.crowdfunding>>>.affirmSuccess img,.affirmError img{
    width: 3.75rem;
    height: 3.75rem;
    margin-bottom: .625rem;
}
/* 众筹成功或者失败按钮样式 */
.crowdfunding>>>.affirSuccessBtn,.affirErrorBtn{
    padding: 0 25PX;
    position: relative;
    top: .1875rem;
}
</style>
