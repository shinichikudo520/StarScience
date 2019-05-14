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
            <mt-field placeholder="昵称" :disableClear='true'  v-model="user.username"></mt-field>
            <mt-field placeholder="请输入手机号" :disableClear='true'   v-model="user.uphone"></mt-field>
            <div class="getNum">
                <mt-cell title="获取验证码" @click.native="getCode" class="getNumBtn" v-if="!isVerify"></mt-cell>
                <!-- 弹出框，请勿重复验证 -->
                <mt-popup v-model="repeatVerify" position="top" popup-transition="popup-fade">亲，请勿重复验证哦！</mt-popup>
            </div>   
            <mt-field  placeholder="请输入验证码" :disableClear='true'  type="number" v-model="user.code"></mt-field>
            <!-- 60s验证 -->
            <div class="countdown" v-if="isVerify">
                <span>|</span>&nbsp;<span>{{countDown}}s</span>
            </div>
            <mt-field placeholder="请输入密码（最少6位）" :disableClear='true'  type="password" v-model="user.password1"></mt-field>
            <mt-field placeholder="请确认密码" :disableClear='true'  type="password" v-model="user.password2"></mt-field>             
            <mt-field placeholder="请填写推荐人手机号"  v-model="user.referee" class="referrer" :disabled='readOnly'></mt-field>       
        </div>
        <!-- 底部 -->
        <div class="bottom">
            <mt-button type="primary" size="large" @click="toRegister">注册</mt-button>
            <div class="getNum">
                <mt-popup v-model="agree_agreement" position="top" popup-transition="popup-fade">{{content}}</mt-popup>
            </div>
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
                        <div>注册成功</div>
                        <mt-button size="small" type="primary"  class="affirSuccessBtn" @click="hiddenModal">确认</mt-button>
                    </div>
                </template>
                <!-- 注册失败 -->
                <template v-else-if="fail">
                    <div class="affirmError">
                        <img src="../assets/img/error.jpg" alt="">
                        <div>{{errorReason}}</div>
                        <mt-button size="small" type="primary"  class="affirErrorBtn" @click="hiddenModal">重试</mt-button>
                    </div>
                </template>
            </mt-popup>
        </div>
  </div>
</template>

<script>
let ip_out = returnCitySN["cip"];//获取外网IP
export default {
  name: 'register',
  data () {
    return {
        user:{//用户信息
            username:"",//用户昵称
            uphone:"",//用户手机
            password1:"",//用户密码
            password2:"",//用户重复密码
            code:"",//短信验证码
            referee:"",//推荐人
            ip_out:"",//外网IP
            ip_in:"",//内网IP
        },
        readOnly:false,//推荐人输入框是否只读
        isVerify:false,//是否显示验证码60s倒计时
        countDown:60,//验证码60s倒计时
        repeatVerify:false,//重复验证提示框是否显示
        popupVisible:false,//注册成功与否模态框
        success:true,//注册成功模态框内容
        fail:false,//注册失败模态框内容
        agree_agreement:false,//是否同意协议提示模态框或者两次密码是否一致
        content:"",//协议或者密码不一致
        isRepeatRegister:false,//是否重复注册
        errorReason:"注册失败",//注册失败的原因

    }
  },
  methods:{
        //60s倒计时
        count60(){
            clearTimeout(count60Timeout)//清除计时器
            let _this = this;
            if(_this.countDown > 0){
                _this.countDown--;
              ////console.log(_this.countDown)
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
        //显示注册确认模态框
        showModal(status){
            let  _this = this;
            _this.popupVisible = true;
            _this.success = status;//注册是否成功？status是注册成功的状态
            _this.fail = !status;//注册是否成功？
        },
        // 隐藏注册确认模态框
        hiddenModal(){
            let  _this = this;
            _this.popupVisible = false;
        },
        //获取验证码
        getCode(){
            let _this = this;
            if(_this.user.uphone == ""){
                _this.agree_agreement = true;//提示用户输入手机号
                _this.content = '请先输入手机号';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }
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
            
            let  api = '/send_sms';
            _this.axios.post(api,{
                uphone:_this.user.uphone,
            }).then(res=>{
                ////console.log(res);
            });
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
        //获取内网用户IP
        getIPs(callback){
                var ip_dups = {};
                var RTCPeerConnection = window.RTCPeerConnection
                    || window.mozRTCPeerConnection
                    || window.webkitRTCPeerConnection;
                var useWebKit = !!window.webkitRTCPeerConnection;
                if(!RTCPeerConnection){
                    var iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.sandbox = 'allow-same-origin';
                    iframe.addEventListener("DOMNodeInserted", function(e){
                        e.stopPropagation();
                    }, false);
                    iframe.addEventListener("DOMNodeInsertedIntoDocument", function(e){
                        e.stopPropagation();
                    }, false);
                    document.body.appendChild(iframe);
                    var win = iframe.contentWindow;
                    RTCPeerConnection = win.RTCPeerConnection
                        || win.mozRTCPeerConnection
                        || win.webkitRTCPeerConnection;
                    useWebKit = !!win.webkitRTCPeerConnection;
                }
                var mediaConstraints = {
                    optional: [{RtpDataChannels: true}]
                };
                var servers = undefined;
                if(useWebKit)
                    servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
                var pc = new RTCPeerConnection(servers, mediaConstraints);
                function handleCandidate(candidate){
                    var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
                    var ip_addr = ip_regex.exec(candidate)[1];
                    if(ip_dups[ip_addr] === undefined)
                        callback(ip_addr);
                    ip_dups[ip_addr] = true;
                }
                pc.onicecandidate = function(ice){
                    if(ice.candidate)
                        handleCandidate(ice.candidate.candidate);
                };
                pc.createDataChannel("");
                pc.createOffer(function(result){
                    pc.setLocalDescription(result, function(){}, function(){});
                }, function(){});
                setTimeout(function(){
                    var lines = pc.localDescription.sdp.split('\n');
                    lines.forEach(function(line){
                        if(line.indexOf('a=candidate:') === 0)
                            handleCandidate(line);
                    });
                }, 1000);
        },
        //用户注册
        toRegister(){
            let _this = this;
            // ////console.log(_this.agreement);
            if(_this.user.uphone == ""){
                _this.agree_agreement = true;//提示用户输入手机号
                _this.content = '请先输入手机号';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }
            if(!_this.isPoneAvailable(_this.user.uphone)){
                _this.agree_agreement = true;//提示用户输入手机号
                _this.content = '请输入正确的手机号';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }
            //密码少于6位
            if(_this.user.password1.length<6){
                _this.agree_agreement = true;//密码少于6位
                _this.content = '密码不能少于6位';
                setTimeout(() => {
                    _this.agree_agreement = false;//密码少于6位
                }, 5000);
                return
            }
            //用户两次密码不一致
            if(_this.user.password1 != _this.user.password2){
                _this.agree_agreement = true;//提示用户同意协议
                _this.content = '密码不一致，请重新输入';
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
            
            if(_this.isRepeatRegister){//禁止重复注册
                _this.agree_agreement = true;//提示用户同意协议
                _this.content = '注册已提交，请30s后重试';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }
            _this.isRepeatRegister = true;//正在注册状态

            _this.user.ip_out = ip_out;//获取外网ip
            //console.log(_this.user);
            let api = '/register';
            _this.axios.post(api,_this.user).then(res=>{
                ////console.log(res);
                // 注册成功？失败？=>模态框
                // 成功跳转到登录？？
                if(res.data.status_end == "ok"){
                    _this.showModal(true);//注册成功
                    setTimeout(()=>{
                        _this.$router.push({
                            path:"/"
                        });//跳转为登录页面
                    },2000);
                }else{
                    _this.errorReason = res.data;//注册失败的原因
                    _this.showModal(false);//注册失败
                }

            });
        },
  },
  mounted(){
      let _this = this;
      //获取内网IP
        _this.getIPs(ip=>{
            _this.user.ip_in = ip;
        });

        //获取推荐人:路径上是否存在推荐人信息，存在即输入框只读，否则，可写
        let href = location.href;//获取推荐人信息
        let index = href.indexOf("register");
        ////console.log(index);
        if(index > -1){
            let referee = href.substring(index+("register").length);//截取register后面一个字符开始截取
            if(referee){//如果截取存在
                _this.user.referee = referee.substr(8,11);//去掉路径的中的‘/uphone=’
                _this.readOnly = true;//携带推荐人信息，输入框只读
            }else{
                _this.readOnly = false;//不携带，输入框可写
            }
        }
        ////console.log(_this.user.referee,_this.readOnly)
        
  },
  watch:{
      isRepeatRegister(value){//检测是否已为注册状态
            let _this = this;
            if(value){
                setTimeout(() => {
                    _this.isRepeatRegister = false;//30s后改为未登录状态
                }, 30000);
            }
      }
  },
}
</script>

<style scoped>
/* 整体样式 */
.register{
    overflow-y: hidden;
}
/* 头部样式 */
.register>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.register>>>.mint-header-title{
    font-size: 18px;
}
/* .register>>>.middle{
    position: relative;
} */
/* 输入框样式 */
.register>>>.mint-field-core{
    background-color:transparent;
    line-height: 2.4 ;
    padding-left: 10px;
    margin-top: 20px;
    border-bottom: .09375rem solid #F5F5F5;
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
.register>>>.countdown,.middle .getNumBtn{
    position: absolute;
    top: 14rem;
    right: 32px;
    color: #CCCCCC;
    z-index: 1;
}
/* 获取验证码按钮样式 */
.register>>>.middle .getNumBtn{
    min-height:2.25rem;
    height: 25px;
    /* position: absolute;
    top: 9.6875rem;
    left: 15.625rem; */
}
.register>>>.getNumBtn .mint-cell-wrapper{
    height: 25px;
}
.register>>>.mint-cell-text{
    display: inline-block;
    width: 100%;
    color: #1484FE;    
    text-align: right;
    z-index: 3;
    cursor: pointer;
}
/* 推荐人输入框样式 */
.register>>>.referrer .mint-field-core{
    margin-bottom: 2.5rem;
}
/* 注册按钮样式 */
.register>>>.bottom .mint-button{
    /* margin-bottom: 20px; */
    background: rgba(0, 122, 255, 0.7);
}
/* 60s之内勿重复验证提示框 */
.register>>>.getNum .mint-popup{
    background-color: transparent;
    color: white;
    height: 2%;
    line-height: 40px;
    border: none;
}
/* 60s验证提示框模板 */
.register>>>.getNum .v-modal{
    height: 8% !important;
}
/* 模态框内容 */
/* 确认认权模态框样式 */
.register>>>.v-modal{
    height: 100%;
}
.register>>>.mint-popup{
    width: 60vw;
    height: 30vh;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #009FE8;
    border-radius: 10px;
    text-align: center;
    padding: 6px 0px;
}
/* 模态框下所有按钮 */
.register>>>.affirmModal button{
    width: 60%;
    background: #0879F4;
}
/* 模态框关闭按钮样式 */
.register>>>.closeModal img{
    position: absolute;
    top: .625rem;
    right: .8125rem;
    width: 1.25rem;
    height: 1.25rem;
}
/* 注册成功或者失败样式 */
.register>>>.affirmSuccess,.affirmError{
    color:  #007AFF;
    padding-top: 7px;
}
/* 注册成功√或者失败!图标样式 */
.register>>>.affirmSuccess img,.affirmError img{
    width: 3.75rem;
    height: 3.75rem;
    margin-bottom: .625rem;
}
/* 注册成功或者失败按钮样式 */
.register>>>.affirSuccessBtn,.affirErrorBtn{
    padding: 0 25PX;
    position: relative;
    top: .1875rem;
}
</style>
