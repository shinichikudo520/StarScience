<template>
  <div class="register">
      <!-- 头部 -->
        <div class="top">
            <mt-header title="注册">
                <router-link to="/" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
        </div>
        <!-- 中间 -->
        <div class="middle">
            <mt-field placeholder="账号/手机号"  v-model="user.userId"></mt-field>
            <mt-field  placeholder="验证码" type="number" v-model="user.verificationCode"></mt-field>
            <!-- 60s验证 -->
            <div class="countdown" v-if="isVerify">
                <span>|</span>&nbsp;<span>{{countDown}}s</span>
            </div>
            <div class="getNum">
                <mt-cell title="获取验证码" @click.native="getNum"></mt-cell>
                <!-- 弹出框，请勿重复验证 -->
                <mt-popup v-model="repeatVerify" position="top" popup-transition="popup-fade">亲，请勿重复验证哦！</mt-popup>
            </div>     
            <mt-field placeholder="推荐人"  v-model="user.referrer" class="referrer"></mt-field>       
        </div>
        <!-- 底部 -->
        <div class="bottom">
            <mt-button type="primary" size="large">注册</mt-button>
            <mt-button type="primary" size="large" @click="toLogin">账号登录</mt-button>
        </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
        user:{//用户信息
            userId:"",//用户账号或手机号
            verificationCode:"",//验证码
            referrer:"",//推荐人
        },
        isVerify:false,//是否显示验证码60s倒计时
        countDown:60,//验证码60s倒计时
        repeatVerify:false,//重复验证提示框是否显示
    }
  },
  methods:{
        //60s倒计时
        count60(){
            clearTimeout(count60Timeout)//清除计时器
            let _this = this;
            if(_this.countDown > 0){
                _this.countDown--;
              console.log(_this.countDown)
            }
            if(_this.countDown == 0){
                _this.countDown = 60;//恢复60s设定
                _this.isVerify = false;//不显示60s计时器
                clearTimeout(count60Timeout)//清除计时器
                return //结束方法的调用
            }
            let count60Timeout = setTimeout(_this.count60,1000);
        },
        //点击获取验证码
        getNum(){
            let _this = this;
            if(_this.countDown < 60){ 
                _this.repeatVerify = true;//显示请勿重复验证提示框
                setTimeout(function(){
                    _this.repeatVerify = false;//5s后关闭请勿重复验证提示框
                },5000);
                return//正在获取验证码时不能重复获取验证码
            }
            _this.isVerify = true;//显示60s倒计时
            _this.count60();//开始60s倒计时
        },
        //调转到登录页面
        toLogin(){
            let _this = this;
            _this.$router.push({path:"/"});
        }
  }
}
</script>

<style scoped>
/* 头部样式 */
.register>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.register>>>.mint-header-title{
    font-size: 18px;
}
/* 输入框样式 */
.register>>>.mint-field-core{
    background-color:#F2F2F2 ;
    line-height: 2.4 ;
    padding-left: 10px;
    margin-top: 20px;
}
/* 消除输入框外层标签的盒子边框 */
.register>>>.mint-cell-wrapper{
    background-size:120% 0px;
}
/* 修改input-placeholder的样式 */
.register>>>input::-webkit-input-placeholder{
    color: #CCCCCC;
}
/* 验证码60s倒计时样式 */
.register>>>.countdown{
    position: absolute;
    top: 168px;
    right: 32px;
    color: #CCCCCC;
}
/* 获取验证码按钮样式 */
.referrer>>>.middle .mint-cell{
    min-height:36px;
}
.register>>>.mint-cell-text{
    display: inline-block;
    width: 100%;
    font-size: 14px;
    color: #CCCCCC;
    text-align: right;
    position: relative;
    bottom: 10px;
    z-index: 3;
    cursor: pointer;
}
/* 推荐人输入框样式 */
.register>>>.referrer .mint-field-core{
    margin-top: 0;
    margin-bottom: 20px;
}
/* 登录、注册按钮样式 */
.register>>>.bottom .mint-button{
    margin-bottom: 20px;
}
/* 60s之内勿重复验证提示框 */
.register>>>.mint-popup{
    background-color: transparent;
    color: white;
    height: 6%;
    line-height: 40px;
}
/* 60s验证提示框模板 */
.register>>>.v-modal{
    height: 6%;
}
</style>
