<template>
  <div class="personCenter">
      <!--个人中心 页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="个人中心"></mt-header>
        <div class="basicInfo">
            <div class="firstInfo">
                <span>{{user.username}}</span>
                <img :src="levelImg" alt="" v-if="user.grade">
                <mt-button type="default">可购众筹{{user.surplus_buy}}次</mt-button>
            </div>
            <div class="secondInfo">
                <table>
                    <tr>
                        <td class="left">钱包地址：</td>
                        <td>
                            <span  v-if="user.wallt_address">{{user.wallt_address}}</span>
                            <span @click="toWalletAddress" v-else style="padding-left:10px;text-decoration:underline;cursor: pointer">绑定</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="left">推荐认权：</td>
                        <td class="progress">
                            <mt-progress :value="user.power_number * 100" :bar-height="5">
                            <!-- <div slot="end" class="end"></div> -->
                            </mt-progress>
                        </td>
                    </tr>
                    <tr>
                        <td class="left">推荐提现：</td>
                        <td class="progress">
                            <mt-progress :value="user.crowdfunding_number * 100" :bar-height="5">
                            <!-- <div slot="end" class="end">10</div> -->
                            </mt-progress>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="property ">
                <div class="content">
                    <img src="../assets/img/money.jpg" alt="">
                    <div class="text">我的：</div>
                    <div class="usableNum">
                        {{user.can_use_quantity}}
                    </div>
                    <div class="EMT">
                        EMT
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="middle">
        <!-- 收益部分 -->
        <div class="earnings">
            <div>
                <p>总量</p>
                <p class="num">{{user.total_quantity}}</p>
            </div>
            <div>
                <p>阶段</p>
                <p class="num">{{user.total_multiple}}</p>
            </div>
            <div>
                <p>进度</p>
                <p class="num">{{user.PushBetweenAll}}</p>
            </div>
            <div>
                <p>可提</p>
                <p class="num returnNum">{{user.returned_tatal}}</p>
            </div>
            <div class="last">
                <p>绑定</p>
                <p class="num returnNum">{{user.pending_return_tatal}}</p>
            </div>
        </div>
        <!-- EMT情况 -->
        <div class="EMTSituation">
            <table>
                <tr>
                    <td>
                        充值钱包：<br>
                        <span class="small">仅用于认权,众筹,不可提现</span>
                    </td>
                    <td class="EMTNum">
                        {{user.assets}}
                    </td>
                    <td class="blue" @click="toRecharge">
                        充值
                    </td>
                </tr>
                <tr>
                    <td>
                        提现钱包：<br>
                        <span class="small">认权初始值大于等于50%</span>
                    </td>
                    <td class="EMTNum">
                        {{user.can_extract_tatal}}
                    </td>
                    <td class="blue" @click="showModal">
                        提现
                    </td>
                </tr>
            </table>
        </div>
        <!-- 选项部分 -->
        <div class="option">
            <div class="optionDiv1" @click="toOrder">
                <!-- <img src="../assets/img/order.jpg" alt=""> -->
                我的订单<span class="more">&gt;</span>
            </div>
            <div class="optionDiv2" @click="toWalletAddress">
                <!-- <img src="../assets/img/wallet.jpg" alt=""> -->
                ETH钱包地址<span class="more">&gt;</span>
            </div>
            <div class="optionDiv3" @click="toUpdatapassword">
                <!-- <img src="../assets/img/passward.jpg" alt=""> -->
                密码管理<span class="more">&gt;</span>
            </div>
            <div class="optionDiv4" @click="toShoppingAddress">
                <!-- <img src="../assets/img/passward.jpg" alt=""> -->
                地址管理<span class="more">&gt;</span>
            </div>
            <div class="exit">
                <mt-button  type="primary" @click="exitLogin" class="affirmBtn exitBtn">退出登录</mt-button>
            </div>
        </div>
    </div>
    <div class="bottom">
        <bar-bottom></bar-bottom>
    </div>
    <div class="getNum">
        <mt-popup v-model="agree_agreement" position="top" popup-transition="popup-fade">{{content}}</mt-popup>
    </div>
    <!-- 提现确认模态框 -->
    <div class="affirmModal">
        <mt-popup v-model="showAffirmModal" popup-transition="popup-fade">
            <p class="closeModal" @click="hiddenModal">
                <img src="../assets/img/closeBtn.jpg" alt="">
            </p>
            <!-- 提现确认的详细信息内容 -->
            <template v-if="detailsInfo">
                <div class="modalText">
                    <!-- <mt-field class="pwdInput" placeholder="请输入钱包地址" type="number" v-model="walletAddress"></mt-field> -->
                    <!-- <div class="who">钱包地址：
                        <span class="address">AWJHDDUHUHBGH5678</span>
                    </div> -->
                    <mt-field class="pwdInput" placeholder="请输入提现EMT数量" :disableClear='true' type="number" v-model="withdrawData.order_quantity"></mt-field>
                    <mt-field class="pwdInput" placeholder="请输入交易密码" :disableClear='true' type="password" v-model="withdrawData.key_password"></mt-field>
                    <mt-button size="small" type="primary" @click="withdraw" class="affirmBtn">确认</mt-button>
                    
                </div>
            </template>
            <!-- 提现成功 -->
            <template v-else-if="affirmSuccess">
                <div class="affirmSuccess">
                    <img src="../assets/img/success.jpg" alt="">
                    <div>提现申请成功</div>
                    <div class="small">请前往我的订单里查看进度！</div>
                    <mt-button size="small" type="primary"  class="affirSuccessBtn" @click="hiddenModal">确认</mt-button>
                </div>
            </template>
            <!-- 提现失败 -->
            <template v-else-if="affirmError">
                <div class="affirmError">
                    <img src="../assets/img/error.jpg" alt="">
                    <div>提现申请失败</div>
                    <div class="small">可提数量不足购买原始值的50% <br>请继续努力！</div>
                    <mt-button size="small" type="primary"  class="affirErrorBtn" @click="hiddenModal">重试</mt-button>
                </div>
            </template>
        </mt-popup>
    </div>

  </div>
</template>

<script>
import barBottom from './barBottom.vue'
export default {
  name: 'personCenter',
  data () {
    return {
        user:{},//用户信息
        levelImg:"",//用户等级图
        v3Num:60,//推荐V3人数占要求人数的比例
        crowdfundingNum:40,//推荐提现人数占要求人数的比例
        showAffirmModal:false,//提现确认框
        detailsInfo:false,//提现确认模态框详细信息
        withdrawData:{
            // user:"",//提现的用户
            order_quantity:"",//提现EMT数量
            key_password:"",//交易密码
            user_id:"",//用户id
        },
        affirmSuccess:false,//提现成功
        affirmError:false,//提现失败
        agree_agreement:false,//是否同意协议提示模态框或者两次密码是否一致
        content:"",//协议或者密码不一致
    }
  },
  methods:{
        //去充值页面
        toRecharge(){
            let _this = this;
            //console.log('去充值页面');
            _this.$router.push({path:'/recharge'});
        },
        //去订单
        toOrder(){
            let _this = this;
            //console.log('去订单页面');
            _this.$router.push({path:'/order'});
        },
        //去钱包地址
        toWalletAddress(){
            let _this = this;
            //console.log('去钱包地址');
            _this.$router.push({path:'/walletAddress'});
        },
        //去密码管理
        toUpdatapassword(){
            let _this = this;
            //console.log('去密码管理');
            _this.$router.push({path:'/passwordSetting'});
        },
        //去商品地址管理
        toShoppingAddress(){
            let _this = this;
            //console.log('去商品地址管理');
            _this.$router.push({path:'/shoppingAddress'});
        },
        //显示提现确认模态框
        showModal(){
            let  _this = this;
            _this.showAffirmModal = true;
            _this.detailsInfo = true;//显示提现模态框时第一次显示的内容一定是详细信息内容
        },
        // 隐藏提现确认模态框
        hiddenModal(){
            let  _this = this;
            _this.showAffirmModal = false;
            // _this.paymentMethod = true;//关闭模态框后必须设置详情页为默认页。防止其他模态框模板内容出现
        },
        // 确认提交
        // affirmPwdMays(){
        //     //console.log("确认密码")
        //     let  _this = this;
        //     _this.detailsInfo = false;
        //     _this.affirmSuccess = true;//确认密码后确认成功
        //     // _this.affirmError = true;//确认密码后确认失败
        // },
        //确认提现成功
        affirSuccessWays(){

        },
        //确认提现失败
        affirmErrorWays(){

        },
        //获取用户信息：并且缓存至vuex
        getUserInfo(){
            let _this = this;
            let api  = '/user_details';
            _this.axios.post(api,{
                uid:_this.$store.state.uid,
            }).then(res=>{
                // //console.log(res);
                _this.user = res.data.result[0];//获取用户信息
                _this.user.PushBetweenAll = _this.user.PushBetweenAll > 0 ? (_this.user.PushBetweenAll *100) + '%' : _this.user.PushBetweenAll;

                // console.log('用户信息',_this.user);
                if(_this.user.grade){
                    _this.levelImg = require('../assets/img/level'+_this.user.grade+'.jpg');
                }
                //将数据缓存至vuex:
                _this.$store.dispatch('getUserInfo',_this.user);
            });
        },

        //提现？？？
        withdraw(){
            let _this = this;
            if(_this.withdrawData.order_quantity == ""){
                _this.agree_agreement = true;//提示用户输入手机号
                _this.content = '请先输入提现数量';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }
            if(_this.withdrawData.key_password == ""){
                _this.agree_agreement = true;//提示用户输入手机号
                _this.content = '请先输入支付密码';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }
            let api = '/cash_withdrawal'
            _this.withdrawData.order_quantity = Number(_this.withdrawData.order_quantity);
            _this.withdrawData.user_id = _this.$store.state.uid;
            _this.axios.post(api,_this.withdrawData).then(res=>{
                // console.log(res);
                //提现申请成功？？？失败？？？
                _this.detailsInfo = false;
                if(res.data.order_quantity){
                    _this.affirmSuccess = true;//确认密码后确认成功
                    _this.getUserInfo();//刷新用户信息
                    _this.withdrawData.order_quantity = '';
                    _this.withdrawData.key_password = '';
                    return
                }
                _this.affirmError = true;//确认密码后确认失败
            }).catch(error=>{
                //console.log('error',error.response);
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
        },
        //退出登录
        exitLogin(){
            let _this = this;
            _this.$store.dispatch('exit');
            _this.$router.push({
                path:"/"
            });
        },
        // //确认二维码充值
        // sureRecharge(){
        //     let  _this = this;
        //     let api = '/user_recharge_emt';
        //     _this.axios.post(api,{
        //         uid:_this.$store.state.uid
        //     }).then(res=>{
        //         //console.log(res);
        //         if(res.data.status_end == 'ok'){
        //             //console.log('充值申请成功');
        //         }else{
        //             //console.log('充值申请失败');
        //         }
                
        //     });
            
        // },  
  },
  components:{
      barBottom,
  },
  mounted(){
      let _this = this;
      _this.getUserInfo();//获取用户所有基础信息
    //   _this.sureRecharge();//确认二维码充值结果
  }
}
</script>
<style scoped>
/* 默认选中认权 */
/* .personCenter>>>.rightToRecognize{
    background: url("../assets/img/认权2.jpg") 33px 5px no-repeat !important;
    background-size: 1.25rem !important;
} */
/* 整体样式，让整体页面高度满屏 */
.personCenter{
    overflow-y: hidden;
    height: 97vh;
    background-color: #FFFFFF;
    /* font-size: .75rem; */
    
}
.personCenter>>>.personalCenterIcon{
    background: url("../assets/img/selectedMine.jpg") 33px 5px no-repeat;
    background-size: 1.25rem;
}
/* 上部分 */
.personCenter>>>.top{
    width: 85vw;
    height: 29vh;
    background: rgba(0, 122, 255, 0.6) !important;
    color: white;
    position: relative;
    padding:.625rem 1.25rem;
}
/* 头部样式 */
.personCenter>>>.top header{
    background-color: transparent;
    height: 23%;
    font-size: 1.125rem
}
/* 基本信息第一行信息 */
.personCenter>>>.firstInfo{
    height: 10%;
}
/* 等级图片 */
.personCenter>>>.firstInfo img{
    width:1.5625rem;
    height: .8125rem;
    margin: 0 .3125rem;
}
/* 第一行按钮样式 */
.personCenter>>>.firstInfo button{
    font-size: .6875rem;
    width:5.5rem;
    height:1.0625rem;
    background-color: transparent;
    color: #FFFFFF;
    border: .0625rem solid #FFFFFF;
    opacity: 0.7;
    border-radius: .625rem;
}
/* 第二行基础信息 */
.personCenter>>>.secondInfo{
    height: 15%;
    opacity: 0.7;
    font-size:.625rem;
    margin: .375rem 0;
    margin-bottom: .9375rem;
}
.personCenter>>>.secondInfo table{
    width: 100%;
}



/* 基础信息的进度条 */
.personCenter>>>.secondInfo table td.progress{
    /* width: 40% */
    padding-right: 30%;
}
/* 进度条左边文字 */
.personCenter>>>.secondInfo table .left{
    width: 20% !important;
}
.personCenter>>>.secondInfo .mt-progress{
    height: 1.0625rem;
}
/* 进度条 */
.personCenter>>>.mt-progress-runway{
    border: .03125rem solid #FFFFFF;
    border-radius: .625rem;
    background-color: transparent;
    width: 100%;

}
/* 进度条完成的进度部分 */
.personCenter>>>.mt-progress-progress{
    background-color: #FFFFFF;
}
/* 上部分基本信息的资产部分 */
.personCenter>>>.property{
    width: 83%;
    margin: 0 auto;
    height: 10vh;
    font-size: .875rem;
    background-color: #FFFFFF;
    color: #1E1E1E;
    box-shadow:  inset 0 -5px 10px #E7E9EB;
    position: absolute;
    bottom: 0;
    padding: 0 .625rem;
}
/* 上部分资产的图片 */
.personCenter>>>.property .content img{
    position: absolute;
    bottom: 3.1875rem;
    right: 1.8125rem;
    width: 4rem;
    height: 2.375rem;
}
/* 上部分资产内容部分 */
.personCenter>>>.content{
    display: flex;
    position: relative;
    /* z-index: 1; */
}
/* 资产内容小字体 */
.personCenter>>>.small{
    font-size: .625rem;
    color: #999999;
}
/* 资产部分内容 */
.personCenter>>>.content div{
    margin-top: 1.875rem;
    margin-right: 1.25rem
}
.personCenter>>>.text{
    margin-top: 2rem
}
/* 资产数量 */
.personCenter>>>.property .usableNum{
    font-weight: 700;
    font-size: 1.125rem;
    margin-top: 1.6875rem !important;
}
/* 资产EMT单位 */
.personCenter>>>.EMT{
    font-size: .875rem;
    font-weight: 400;
    margin-left: 1.875rem;
    color: #666666
}
/* 资产充值按钮 */
.personCenter>>>.blue{
    color: #007AFF;
    position: relative;
    left: 55px;
}
/* 中间部分 */
.personCenter>>>.middle{
    background-color: #E8EAEC;
    height: 58vh;
    overflow-y: auto;
    overflow-x: hidden;
}
/* 中间收益部分 */
.personCenter>>>.middle .earnings{
    display: flex;
    color: #666666;
    height: 14vh;
    background-color: #FFFFFF;
}
.personCenter>>>.middle .earnings div{
    width: 20%;
    height: 10vh;
    text-align: center;
    border-right: .03125rem solid #E7E9EB;
    margin: .625rem 0;
}
.personCenter>>>.middle .earnings div p{
    margin:.625rem .125rem;
}
/* 收益部分数字样式 */
.personCenter>>>.middle .earnings .num{
    color: #1E1E1E;
    font-weight: 700;
    /* overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; */
}
/* 收益部分可提、绑定数据 */
.personCenter>>>.middle .returnNum{
    font-size: .8125rem;
    line-height: 1.25rem;
}
/* 收益部分最后一个div */
.personCenter>>>.middle .earnings .last{
    border: none;
}
/* emt情况 */
.personCenter>>>.EMTSituation{
    margin-top: .625rem;
    background-color: #FFFFFF;
    padding-left: .9375rem
}
.personCenter>>>.EMTSituation td{
    padding: .5rem 0;
}
/* emt数字 */
.personCenter>>>td.EMTNum{
    padding-left: 1.875rem
}

/* 选项部分 */
.personCenter>>>.middle .option{
    padding:.625rem 1.25rem;
    position: relative;
    background-color: #FFFFFF;
    margin-top: .625rem;
    height: 43vh;
}
.personCenter>>>.middle .option div{
    display: flex;
    padding: .9375rem 0;
    border-bottom: .0625rem solid #E7E9EB;
    padding-left:2.1875rem;
}
/* 选项部分更多...图片样式 */
.personCenter>>>.more{
    color: #666666;
    position: absolute;
    right: 1.5625rem;
}
/* .personCenter>>>.middle .option .moreImg{
    width: .75rem;
    height: .75rem;
    vertical-align: middle;
    position: absolute;
    right: 1.875rem;
} */
/* 选项第一个div背景图 */
.personCenter>>>.middle .option .optionDiv1{
    background: url('../assets/img/order.jpg') 7px 14px no-repeat;
    background-size: 1.125rem;
}
/* 选项第二个div背景图 */
.personCenter>>>.middle .option .optionDiv2{
    background: url('../assets/img/wallet.jpg') 7px 14px no-repeat;
    background-size: 1.125rem;
}
/* 选项第三个div背景图 */
.personCenter>>>.middle .option .optionDiv3{
    background: url('../assets/img/passward.jpg') 7px 14px no-repeat;
    background-size: 1.125rem;
    /* border: none; */
}
/* 选项第四个div背景图 */
.personCenter>>>.middle .option .optionDiv4{
    background: url('../assets/img/address.jpg') 7px 16px no-repeat;
    background-size: 1.125rem;
    border: none;
}
/* 选项部分退出登录按钮 */
.personCenter>>>.exit{
    padding-left: 0 !important;
    border: none !important;
}
.personCenter>>>.exitBtn{
    width: 98%;
    padding: 0 1.25rem !important;
    margin: 0 auto;
    /* margin-top: 1.25rem; */
}
/* 60s之内勿重复验证提示框 */
.personCenter>>>.getNum .mint-popup{
    background-color: transparent;
    color: white;
    height: 2%;
    line-height: 40px;
    border: none;
}

/* 确认提现模态框样式 */
.personCenter>>>.mint-popup{
    width: 60vw;
    height: 17.625rem;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #009FE8;
    border-radius: 10px;
    text-align: center;
    padding: 6px 0px;
}
/* 模态框关闭按钮样式 */
.personCenter>>>.closeModal img{
    position: absolute;
    top: .625rem;
    right: .8125rem;
    width: 1.25rem;
    height: 1.25rem;
}
.personCenter>>>.affirmModal button{
    width: 60%;
    margin-top: 1.25rem;
    background: rgba(0, 122, 255, 0.7);
}
/* 详情页 */
/* 模态框详情页文字样式 */
.personCenter>>>.modalText{
    font-size: 19px;
    padding-top: .9375rem;
}
.personCenter>>>.modalText .who{
    font-size: .75rem;
    margin: .9375rem 0;
}
.personCenter>>>.who .address{
    color:#009FE8 ;
}
/* 输入密码部分输入框样式 */
.personCenter>>>.pwdInput{
    background-color: transparent;
}
.personCenter>>>.pwdInput .mint-cell-wrapper{
    width: 100% !important;
}
.personCenter>>>.pwdInput .mint-cell-value{
    flex: 0.9 !important;
    margin: 0 auto;
}
.personCenter>>>.pwdInput input{
    border: 1px solid #BBBBBB;
    border-radius: 5px;
    background-color: #F2F2F2;
    padding-left: 15px;
}
.personCenter>>>.pwdInput input::-webkit-input-placeholder{
    color: #D3CDCC;
}
/* 购入成功页或者失败页 */
/* 提现成功或者失败部分样式 */
.personCenter>>>.affirmSuccess,.affirmError{
    color:  #007AFF;
    padding-top: 7px;
}
/* 提现成功√或者失败!图标样式 */
.personCenter>>>.affirmSuccess img,.affirmError img{
    width: 3.75rem;
    height: 3.75rem;
    margin-bottom: .625rem;
}
/* 提现成功或者失败按钮样式 */
.personCenter>>>.affirSuccessBtn,.affirErrorBtn{
    padding: 0 25PX;
    position: relative;
    top: .1875rem;
}
/* 提现失败、成功模态框小字 */
.personCenter>>>.affirmSuccess .small,.affirmError .small{
    font-size: .625rem;
    color: #007AFF;
    margin-top: 1.125rem

}
</style>
