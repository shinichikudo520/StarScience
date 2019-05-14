<template>
<!-- right页面 -->
  <div class="payment">
      <!-- 头部 -->
    <div class="top">
        <mt-header title="确认订单">
            <router-link :to="'/productDetails/'+$route.params.productUid" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <div class="shoppingAddress" v-if="haveAddress" >
            <p class="consignee"><span>收货人：{{address.receiver}}</span><span class="uphone">{{address.mobile}}</span></p>
            <p class="address">
                <!-- <img src="../assets/img/address.jpg" alt="" class="addressImg"> -->
                收货地址：{{address.address}}</p>
        </div>
        <div class="shoppingAddress" v-else style="text-align:center;margin-bottom:20px">
            <mt-button type="primary" class="addAddressBtn" @click="toAddAddress">添加地址</mt-button>
        </div>
        <div class="product">
            <img src="../assets/img/01.jpg" alt="" >
            <div class="productInfo">
                <div>{{productInfo.product_name}}</div>
                <div>EMT：{{productInfo.product_price}}</div>
                <div>数量：<mt-button size="small"  @click="changeProductNum(0)"><span>-</span></mt-button><mt-field placeholder="数量" type="number" v-model="productNum" :disableClear='true' class="productNum" @keyup.native="watchProductNum"></mt-field><mt-button size="small" @click="changeProductNum(1)"><span >+</span></mt-button></div>
            </div>
        </div>
        <div class="subtotal">
            合计金额：{{productNum * productInfo.product_price}} EMT <mt-button type="primary" @click="showModal">提交订单</mt-button>
        </div>
        <!-- 认权确认模态框 -->
        <div class="affirmModal">
            <mt-popup v-model="showAffirmModal" popup-transition="popup-fade">
                <p class="closeModal" @click="hiddenModal">
                    <img src="../assets/img/closeBtn.jpg" alt="">
                </p>
                <!-- 输入密码 -->
                <template v-if="inputPwd">
                    <div class="inputPwd">
                        <!-- <p class="inPwdNum">投入{{rightDetails.power_product_quantity}}EMT</p> -->
                        <mt-field class="pwdInput" placeholder="请输入支付密码" type="password" :disableClear='true' v-model="affirmPwd"></mt-field>
                        <mt-button size="small" type="primary"  class="affirmPwd" @click="purchaseProduct">确认投入</mt-button>
                    </div>
                </template>
                <!-- 认权成功 -->
                <template v-else-if="affirmSuccess">
                    <div class="affirmSuccess">
                        <img src="../assets/img/success.jpg" alt="">
                        <div>购买</div>
                        <mt-button size="small" type="primary"  class="affirSuccessBtn" @click="hiddenModal">确认</mt-button>
                    </div>
                </template>
                <!-- 认权失败 -->
                <template v-else-if="affirmError">
                    <div class="affirmError">
                        <img src="../assets/img/error.jpg" alt="">
                        <div>购买失败</div>
                        <div>请重试</div>
                        <mt-button size="small" type="primary"  class="affirErrorBtn" @click="hiddenModal">重试</mt-button>
                    </div>
                </template>
            </mt-popup>
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
  name: 'payment',
  data () {
    return {
        // sort:"v1",//认权产品的种类
        // imgUrl:"",//产品图片的url
        // levelImgUrl:"",//产品等级图片的url
        // upperSort:"V1",
        address:{},//地址信息
        productInfo:{},//商品信息
        productNum:1,
        haveAddress:false,//是否存在地址
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
            _this.inputPwd = true;//然后出现输入密码框
        },
        // 隐藏认权确认模态框
        hiddenModal(){
            let  _this = this;
            _this.showAffirmModal = false;
            // _this.paymentMethod = true;//关闭模态框后必须设置详情页为默认页。防止其他模态框模板内容出现
        },
        //加载产品详情信息
        getRightInfo(productId){
            let _this = this;          
            let api = '/product_details';
            _this.axios.post(api,{
                product_name_uid: productId,//商品id
            }).then(res=>{
                console.log('产品信息',res);
                _this.productInfo = res.data.result[0];
                _this.imgUrl = require('../assets/img/v1detailImg.jpg');
                // _this.levelImgUrl = require('../assets/img/order'+power_product_grade.substr(1)+'.jpg');

                console.log(_this.productInfo);
            });
        },
        //购买产品
        purchaseProduct(){
            let _this = this;  
            if(_this.affirmPwd == ""){//支付密码为""
                _this.agree_agreement = true;//提示用户输入手机号
                _this.content = '请先输入支付密码';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }    
             if(_this.address == {}){//地址为空
                _this.agree_agreement = true;//提示用户输入手机号
                _this.content = '请先添加地址';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }        
            let api = '/Settlement_exchange_product';
            let address = _this.address.receiver + _this.address.mobile + _this.address.address;
            _this.axios.post(api,{
                uid:_this.$store.state.uid,//用户等级
                key_password:_this.affirmPwd,//支付密码
                product_id:_this.productId,//产品id
                total_count:_this.productNum,//产品数量
                address:address,//地址
            }).then(res=>{
                //console.log(res);
                //console.log("确认购买")
                // 购买成功？？？失败？？？=》模态框
                 _this.inputPwd = false;
                 if(res.data.status == "已购买"){//购买成功
                        
                    _this.affirmSuccess = true;//确认密码后确认成功 
                    setTimeout(() => {
                        _this.hiddenModal();//隐藏模态框                      
                        _this.$router.back();//返回详情页
                    }, 5000);                   
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
        },
        //监控产品数量
        watchProductNum(){
            let _this = this;
            if(_this.productNum < 1 && _this.productNum != ''){
                _this.productNum = 1
            }
        },
        //改变产品数量
        changeProductNum(type){
            let _this = this;
            switch(type){
                case 1:
                    _this.productNum +=1;
                break
                case 0:
                    if(_this.productNum <= 1){
                        return
                    }
                    _this.productNum -= 1;
                break
            }
        },
        //获取收货地址
        getUserAddress(){
            let _this =this;
            let api = '/address_sure';
            _this.axios.post(api,{
                uid:_this.$store.state.uid
            }).then(res=>{
                console.log('地址',res);
                if(res.data == "请添加收货地址"){//没有地址
                    _this.haveAddress = false
                }else{
                    _this.haveAddress = true
                    _this.address = res.data.result[0];//获取默认地址，没有则返回第一条地址
                }
            });
        },
        //去添加地址
        toAddAddress(){
            let _this = this;
            _this.$router.push({
                path:"/addShoppingAddress/-1"
            });
        },

  },
  mounted(){
      let _this = this;
      _this.productId = _this.$route.params.productUid;
      _this.getUserAddress();//获取用户地址

      _this.getRightInfo(_this.productId);//获取产品详情信息
      
      //console.log('sort',_this.sort);
    //   _this.getRightInfo(_this.productId);//获取产品详情信息
    //   //console.log(sort);
  },
  components:{
      barBottom,
  }
}
</script>
<style scoped>
/* 整体样式，让整体页面高度满屏 */
.payment{
    height: 97vh;
    background-color: #FFFFFF;
    overflow-y: hidden;
}
/* 头部样式 */
.payment>>>.mint-header{
    height: 6vh;
    margin-bottom: .1875rem;
    background-color:#FFFFFF;
    color: #030303;
    border-bottom: .0625rem solid #D7D8DA;
    font-size: 1.125rem;
}
/* 中间部分设定高度 */
.payment>>>.middle{
    height: 85vh;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #F6F8FA;
    position: relative;
}
/* 中间部分 */
.payment>>>.shoppingAddress,.product,.subtotal{
    background-color: white;
    padding: .625rem;
    margin: .625rem;
    color: #444444;
}
/* 收货人 */
.payment>>>.consignee{
    padding-left: 2rem;    
}
/* 收货人手机号 */
.payment>>>.uphone{
    position: absolute;
    right: 12%;
}
/* 收货地址 */
.payment>>>.address{
    line-height: 1.5625rem;
    margin: 0;
    background: url('../assets/img/address.jpg') 0 .625rem no-repeat;
    background-size: 1.25rem;
    padding-left: 2rem;

}
/* 添加地址按钮 */
.shoppingAddress>>>.addAddressBtn{
    background-color: #007AFF;
    padding: 0 3.75rem;
    margin-top: 1.875rem;
}
/* 产品 */
/* 产品图片 */
.payment>>>img{
    width: 3.75rem;
    height: 3.75rem;
    position: relative;
    top: 45%;
}
/* 产品信息 */
.payment>>>.productInfo{
    display: inline-block;
    width: 70%;
    padding-left: 1rem;
    font-size: .875rem;
    /* position: relative; */
}
/* 产品数量 */
.payment>>>.productNum{
    width: 30%;
    min-height: .9375rem;
    display: inline-block;
    margin: 0 .625rem;
    position: relative;
    top: .6875rem;
}
/* 产品数量输入框 */
.payment>>>.productNum .mint-cell-wrapper{
    border: .0625rem solid;
}
/* 结算按钮 */
.payment>>>.subtotal button{
    background-color: rgba(0, 122, 255, 0.7);
    margin-left: .625rem;
    /* margin-left: 6.5rem; */
}
/* 小计 */
.payment>>>.subtotal{
    width: 85%;
    text-align: right;
    position: fixed;
    bottom: 3.1875rem;
    left: 2% ;
}
/* 60s之内勿重复验证提示框 */
.payment>>>.getNum .mint-popup{
    background-color: transparent;
    color: white;
    height: 2%;
    line-height: 40px;
    border: none;
}
/* 确认认权模态框样式 */
.payment>>>.mint-popup{
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
.payment>>>.closeModal img{
    position: absolute;
    top: .625rem;
    right: .8125rem;
    width: 1.25rem;
    height: 1.25rem;
}
/* 模态框下所有按钮 */
.payment>>>.affirmModal button{
    width: 60%;
    margin-top: 1.25rem;
    background: #007AFF ;
}

/* 确认密码页 */

/* 输入密码部分输入框样式 */
.payment>>>.pwdInput{
    margin-top: 3.125rem;
    background-color: transparent;
}
.payment>>>.pwdInput .mint-cell-wrapper{
    width: 100% !important;
}
.payment>>>.pwdInput .mint-cell-value{
    flex: 0.9 !important;
    margin: 0 auto;
}
.payment>>>.pwdInput input{
    border: 1px solid #BBBBBB;
    border-radius: 5px;
    background-color: #F2F2F2;
    padding-left: 15px;
}
.payment>>>.pwdInput input::-webkit-input-placeholder{
    color: #D3CDCC;
}
/* 输入密码部分按钮的样式 */
.payment>>>.affirmPwd{
    padding: 0 25px;
    position: relative;
    top: .625rem;
}
/* 购入成功页或者失败页 */
/* 认权成功或者失败部分样式 */
.payment>>>.affirmSuccess,.affirmError{
    color:  #007AFF;
    padding-top: 7px;
}
/* 认权成功√或者失败!图标样式 */
.payment>>>.affirmSuccess img,.affirmError img{
    width: 3.75rem;
    height: 3.75rem;
    margin-bottom: .625rem;
}
/* 认权成功或者失败按钮样式 */
.payment>>>.affirSuccessBtn,.affirErrorBtn{
    padding: 0 25PX;
    position: relative;
    top: .1875rem;
}
</style>
