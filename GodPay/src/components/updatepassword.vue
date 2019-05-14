<template>
  <div class="updatepassword">
      <!-- 头部 -->
        <div class="top">
            <mt-header :title="pwdKind">
                <router-link to="/passwordSetting" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
        </div>
        <!-- 中间 -->
        <div class="middle">
            <mt-field placeholder="请输入手机号"  v-model="user.uphone"></mt-field>
            <div class="getNum">
                <mt-cell title="获取验证码" @click.native="getCode" class="getNumBtn" v-if="!isVerify"></mt-cell>
                <!-- 弹出框，请勿重复验证 -->
                <mt-popup v-model="repeatVerify" position="top" popup-transition="popup-fade">亲，请勿重复验证哦！</mt-popup>
            </div>   
            <mt-field  placeholder="请输入验证码" type="number" v-model="user.code"></mt-field>
            <!-- 60s验证 -->
            <div class="countdown" v-if="isVerify">
                <span>|</span>&nbsp;<span>{{countDown}}s</span>
            </div>
            <mt-field placeholder="请输入新密码（最少6位）" type="password" v-model="user.new_password"></mt-field>
            <mt-field placeholder="请确认新密码" type="password" v-model="user.confirm_password"></mt-field>     
            <div class="getNum">
                <mt-popup v-model="agree_agreement" position="top" popup-transition="popup-fade">{{content}}</mt-popup>
            </div>        
        </div>
        <!-- 底部 -->
        <div class="bottom">
            <mt-button type="primary" size="large" @click="updatePwd">确认</mt-button>
        </div>
        <!-- 模态框部分 -->
        <div class="affirmModal">
            <mt-popup v-model="popupVisible" popup-transition="popup-fade">
                <p class="closeModal" @click="hiddenModal">
                    <img src="../assets/img/closeBtn.jpg" alt="">
                </p>
                <!-- 注册成功 -->
                <template v-if="success">
                    <div class="affirmSuccess">
                        <img src="../assets/img/success.jpg" alt="">
                        <div>设置成功</div>
                        <mt-button size="small" type="primary"  class="affirSuccessBtn" @click="hiddenModal">确认</mt-button>
                    </div>
                </template>
                <!-- 注册失败 -->
                <template v-else-if="fail">
                    <div class="affirmError">
                        <img src="../assets/img/error.jpg" alt="">
                        <div>设置失败</div>
                        <mt-button size="small" type="primary"  class="affirErrorBtn" @click="hiddenModal" >重试</mt-button>
                    </div>
                </template>
            </mt-popup>
        </div>
  </div>
</template>

<script>
export default {
  name: 'updatepassword',
  data () {
    return {
        pwdKind:"",//密码的种类
        user:{//用户信息
            uphone:"",//用户账号或手机号
            new_password:"",//密码
            confirm_password:"",//确认密码
            code:"",//验证码
        },
        isVerify:false,//是否显示验证码60s倒计时
        countDown:60,//验证码60s倒计时
        repeatVerify:false,//重复验证提示框是否显示
        popupVisible:false,//注册成功与否模态框
        success:true,//注册成功模态框内容
        fail:false,//注册失败模态框内容
        agree_agreement:false,//两次密码验证提示模态框
        content:"",//密码小于6位或者不一致的提示内容
    }
  },
  methods:{
        //60s倒计时
        count60(){
            clearTimeout(count60Timeout)//清除计时器
            let _this = this;
            if(_this.countDown > 0){
                _this.countDown--;
            //   ////console.log(_this.countDown)
            }
            if(_this.countDown == 0){
                _this.countDown = 60;//恢复60s设定
                _this.isVerify = false;//不显示60s计时器
                clearTimeout(count60Timeout)//清除计时器
                return //结束方法的调用
            }
            let count60Timeout = setTimeout(_this.count60,1000);
        },
        //调转到登录页面
        toLogin(){
            let _this = this;
            _this.$router.push({path:"/"});
        },
        //显示密码确认模态框
        showModal(status){
            let  _this = this;
            _this.popupVisible = true;
            _this.success = status;//注册是否成功？
            _this.fail = !status;//注册是否成功？
        },
        // 隐藏密码确认模态框
        hiddenModal(){
            let  _this = this;
            _this.popupVisible = false;
        },
        //是否为合法手机号
        isPoneAvailable(str) {
            var myreg=/^1\d{10}$/;
            if (!myreg.test(str)) {
                return false;
            } else {
                return true;
            }
        },
        //获取验证码
        getCode(){
            let _this = this;
            if(!_this.isPoneAvailable(_this.user.uphone)){
                _this.agree_agreement = true;//提示用户输入手机号
                _this.content = '请输入正确的手机号';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }
           
            if(_this.countDown < 60){ 
                _this.repeatVerify = true;//显示请勿重复验证提示框
                setTimeout(function(){
                    _this.repeatVerify = false;//5s后关闭请勿重复验证提示框
                },5000);
                return//正在获取验证码时不能重复获取验证码
            }
            _this.isVerify = true;//显示60s倒计时
            _this.count60();//开始60s倒计时
            
            
            let api = '/send_sms';
            _this.axios.post(api,_this.user).then(res=>{
                ////console.log(res);
            });
        },
        
        //修改登录/支付密码
        updatePwd(){
            let _this = this;
            if(!_this.isPoneAvailable(_this.user.uphone)){
                _this.agree_agreement = true;//提示用户输入手机号
                _this.content = '请输入正确的手机号';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }
             //验证码非空
            if(_this.user.code == ""){
                _this.agree_agreement = true;//提示用户同意协议
                _this.content = '请输入验证码';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }
            //密码少于6位
            if(_this.user.new_password.length<6){
                _this.agree_agreement = true;//密码少于6位
                _this.content = '密码不能少于6位';
                setTimeout(() => {
                    _this.agree_agreement = false;//密码少于6位
                }, 5000);
                return
            }
            //用户两次密码不一致
            if(_this.user.new_password != _this.user.confirm_password){
                _this.agree_agreement = true;//提示用户同意协议
                _this.content = '密码不一致，请重新输入';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }


            let api = _this.pwdKind == '登录密码'?'/modify_login':'/modify_payment';
            _this.user = _this.pwdKind  == '登录密码'?_this.user:{
                uphone:_this.user.uphone,
                new_password_payment:_this.user.new_password,
                confirm_password_payment:_this.user.confirm_password,
                code:_this.user.code,
            };

            ////console.log(_this.user);
            _this.axios.post(api,_this.user).then(res=>{
                ////console.log(res);
                //设置成功？？？失败？？？=>模态框
                if(res.data.status_end == "ok"){
                    _this.showModal(true);//请求成功
                    Object.keys(_this.user).forEach((item)=>{
                        _this.user[item] = "";
                    });
                }else{
                    _this.showModal(false);//请求失败
                }
            });
        },
  },
  mounted(){
      let _this = this;
      let pwdKind  = _this.$route.params.pwdKind;//接收确认修改的密码这里
      ////console.log(pwdKind);
      _this.pwdKind = pwdKind == 'login'?'登录密码':'支付密码';
  }
}
</script>

<style scoped>
/* 整体样式 */
.updatepassword{
    overflow-y: hidden;
}
/* 头部样式 */
.updatepassword>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.updatepassword>>>.mint-header-title{
    font-size: 18px;
}
/* .updatepassword>>>.middle{
    position: relative;
} */
/* 输入框样式 */
.updatepassword>>>.mint-field-core{
    background-color:transparent;
    line-height: 2.4 ;
    padding-left: 10px;
    margin-top: 20px;
    border-bottom: .09375rem solid #F5F5F5;
}
/* 消除输入框外层标签的盒子边框 */
.updatepassword>>>.mint-cell-wrapper{
    background-size:120% 0px;
}
/* 修改input-placeholder的样式 */
.updatepassword>>>input::-webkit-input-placeholder{
    color: #CCCCCC;
}
/* 验证码60s倒计时样式 */
.updatepassword>>>.countdown,.middle .getNumBtn{
    position: absolute;
    top: 168px;
    right: 32px;
    color: #CCCCCC;
    z-index: 1;
}
/* 获取验证码按钮样式 */
.updatepassword>>>.middle .getNumBtn{
    min-height:2.25rem;
    height: 25px;
    /* position: absolute;
    top: 6.125rem;
    left: 15.625rem; */
    top: 10.0625rem;
}
.updatepassword>>>.getNumBtn .mint-cell-wrapper{
    height: 25px;
}
.updatepassword>>>.mint-cell-text{
    display: inline-block;
    width: 100%;
    color: #1484FE;    
    text-align: right;
    z-index: 3;
    cursor: pointer;
}
/* 注册按钮样式 */
.updatepassword>>>.bottom .mint-button{
    margin-top: 60px;
    background: rgba(0, 122, 255, 0.7);
}
/* 60s之内勿重复验证提示框 */
.updatepassword>>>.getNum .mint-popup{
    background-color: transparent;
    color: white;
    height: 2%;
    line-height: 40px;
    border: none;
}
/* 60s验证提示框模板 */
.updatepassword>>>.getNum .v-modal{
    height: 8% !important;
}
/* 模态框内容 */
/* 确认认权模态框样式 */
.updatepassword>>>.v-modal{
    height: 100%;
}
.updatepassword>>>.mint-popup{
    width: 60vw;
    height: 30vh;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #009FE8;
    border-radius: 10px;
    text-align: center;
    padding: 6px 0px;
}
/* 模态框下所有按钮 */
.updatepassword>>>.affirmModal button{
    width: 60%;
    background: #57A6FE;
}
/* 模态框关闭按钮样式 */
.updatepassword>>>.closeModal img{
    position: absolute;
    top: .625rem;
    right: .8125rem;
    width: 1.25rem;
    height: 1.25rem;
}
/* 注册成功或者失败样式 */
.updatepassword>>>.affirmSuccess,.affirmError{
    color:  #007AFF;
    padding-top: 7px;
}
/* 注册成功√或者失败!图标样式 */
.updatepassword>>>.affirmSuccess img,.affirmError img{
    width: 3.75rem;
    height: 3.75rem;
    margin-bottom: .625rem;
}
/* 注册成功或者失败按钮样式 */
.updatepassword>>>.affirSuccessBtn,.affirErrorBtn{
    padding: 0 25PX;
    position: relative;
    top: .1875rem;
}
</style>
