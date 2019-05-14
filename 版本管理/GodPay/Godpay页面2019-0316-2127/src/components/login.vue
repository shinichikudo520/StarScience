<template>
  <div class="login">
      <!-- 头部 -->
        <div class="top">
            <mt-header title="登录"></mt-header>
        </div>
        <!-- 中间 -->
        <div class="middle">
            <div class="logo">
                <img src="../assets/img/logo.jpg" alt="单曲-16.jpg">
            </div>
            <div class="userInfo">
                <mt-field  type="tel" class="userPhone" placeholder="用户手机号" :disableClear='true'  v-model="user.uphone"></mt-field>
                <img src="../assets/img/user.jpg" alt="" class="userPhoneIcon">
                <mt-field class="userPwd"  placeholder="登录密码" :type="showPwd" v-model="user.password" :disableClear='true' @keyup.enter.native="login"></mt-field>
                <img src="../assets/img/system-lock@3x.jpg" alt="" class="userPwdIcon">
                <img :src="showPwdEyesIconUrl" alt="" class="userPwdEyes" @click="showPwdOrNot">
            </div>
        </div>
        <!-- 底部 -->
        <div class="bottom">
            <mt-button class="loginBtn" type="primary" size="large" @click="login">登录</mt-button>
            <div class="getNum">
                <mt-popup v-model="agree_agreement" position="top" popup-transition="popup-fade">{{content}}</mt-popup>
            </div>
            <div class="forgetPwd" @click="toForgetPwd">
                忘记密码？
            </div>
            <mt-button class="registerBtn" type="primary" size="large" @click="toRegister">注册</mt-button>
        </div>
  </div>
</template>
<script>
let ip_out = returnCitySN["cip"];//获取外网IP
// ////console.log(ip_out);
export default {
  name: 'login',
  data () {
    return {
        // isLogin:false,//登录状态
        user:{//用户信息
            uphone:"",//用户账号或手机号
            password:"",//登录密码
            ip_in:"",//内网ip
            ip_out:"",//外网ip
            equipment:"",//设备机型
        },   
        showPwd:"password",//密码可见或不可见
        showPwdEyesIconUrl:require("../assets/img/a8a747b68e3d41ec785189cb44281c0.jpg"),//密码是否可见图标路径
        agree_agreement:false,//提示模态框
        content:"",//提示内容
    }
  },
  methods:{
        // 调转到注册页面
        toRegister(){
            let _this = this;
            _this.$router.push({path:"/register"});
        },
        //跳转去忘记密码页
        toForgetPwd(){
            let _this = this;
            _this.$router.push({path:"/forgetPwd"});
        },
        //密码可见或不可见
        showPwdOrNot(){
            let _this = this;
            _this.showPwd = _this.showPwd == "password"?"":"password";//决定密码是否可见
             _this.showPwdEyesIconUrl = _this.showPwd == "password"?require("../assets/img/a8a747b68e3d41ec785189cb44281c0.jpg"):require("../assets/img/system-conceal.jpg");//决定密码是否可见
        },
        
        //获取内网ip
        getIPs(){
            let _this = this;
            var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
            if (RTCPeerConnection) (function () {
                var rtc = new RTCPeerConnection({iceServers:[]});
                if (1 || window.mozRTCPeerConnection) {     
                    rtc.createDataChannel('', {reliable:false});
                };
                
                rtc.onicecandidate = function (evt) {
                    if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
                };
                rtc.createOffer(function (offerDesc) {
                    grepSDP(offerDesc.sdp);
                    rtc.setLocalDescription(offerDesc);
                }, function (e) { console.warn("offer failed", e); });
                
                
                var addrs = Object.create(null);
                addrs["0.0.0.0"] = false;
                function updateDisplay(newAddr) {
                    if (newAddr in addrs) return;
                    else addrs[newAddr] = true;
                    var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
                    for(var i = 0; i < displayAddrs.length; i++){
                        if(displayAddrs[i].length > 16){
                            displayAddrs.splice(i, 1);
                            i--;
                        }
                    }
                    console.log('内网ip',displayAddrs[0]);      //打印出内网ip
                    _this.user.ip_in = displayAddrs[0];//获取内网ip
                }
                
                function grepSDP(sdp) {
                    var hosts = [];
                    sdp.split('\r\n').forEach(function (line, index, arr) { 
                    if (~line.indexOf("a=candidate")) {    
                            var parts = line.split(' '),       
                                addr = parts[4],
                                type = parts[7];
                            if (type === 'host') updateDisplay(addr);
                        } else if (~line.indexOf("c=")) {       
                            var parts = line.split(' '),
                                addr = parts[2];
                            updateDisplay(addr);
                        }
                    });
                }
            })();
            else{
                console.log("请使用主流浏览器：chrome,firefox,opera,safari");
            }
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
        
        //登录
        login(){
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
            if(_this.user.password == ""){
                _this.agree_agreement = true;//提示用户输入密码
                _this.content = '请先输入密码';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }
            _this.user.ip_out = ip_out;
            
            let api = '/login';
            _this.axios.post(api,_this.user).then(res=>{
                ////console.log('res',res);
                // alert(JSON.stringify(res.data));
                if(res.data.status_end == "ok"){
                    let data = {}
                    data.uid = res.data.uid;
                    data.uphone = _this.user.uphone;
                    _this.$store.dispatch('isLogin',data);//缓存登录状态    
                    _this.$router.push({
                        name:"home"
                    });   

                }else{
                    _this.agree_agreement = true;//提示用户输入正确的手机号与密码
                    _this.content = '手机号或密码错误';
                    setTimeout(() => {
                        _this.agree_agreement = false;//提示用户同意协议
                    }, 5000);
                    return
                }
            });

        },
  },
  mounted(){
        let _this = this;
        let phone = navigator.userAgent;
        _this.user.equipment = phone.substring(phone.indexOf('(')+1,phone.indexOf(';'));//获取用户机型
        // //获取用户内网ip
        _this.getIPs();//获取用户内网ip
        
        // //console.log(_this.$store);
  },
}
</script>

<style scoped>
/* 整体样式 */
.login{
    height: 97vh;
    overflow-y: hidden;
    background-color: #F6F8FA;
}
/* 头部样式 */
.login>>>.mint-header{
    height: 3.125rem;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.login>>>.mint-header-title{
    font-size: 18px;
    margin-top: 1.25rem;
}
/* logo标志的样式 */
.login>>>.logo img{
    width: 40%;
    height: 30%;
    margin-left: 30%;
    margin-bottom: 1.875rem;
}
/* 单元格样式 */
.login>>>.mint-cell{
    background-color: #F6F8FA;
}
/* 整体输入框样式 */
.login>>>.userInfo{
    width: 90%;
    margin-left: 5%;
    box-shadow: 0px 0px 8px 6px #E9EBED;
    margin-bottom: 1.25rem;
    position: relative;
}
/* 输入框样式 */
.login>>>.mint-cell-wrapper{   
    background-color:#FFFFFF;
    height: 1.6875rem;
    line-height: 5.9375rem ;
    padding-left: 2.8125rem;   
    border: .0625rem #F5F5F5 solid;
}
.login>>>.mint-cell-value{
    line-height: 5.9375rem ;
    height: 1.6875rem;
}
/* 消除输入框外层标签的盒子边框 */
.login>>>.mint-cell-wrapper{
    background-size:120% 0px;
}
/* 修改input-placeholder的样式 */
.login>>>input::-webkit-input-placeholder{
    color: #E0E0E0
}
/* 用户手机号图片样式 */
.login>>>.userPhoneIcon,.userPwdIcon{
    width: 1.5625rem;
    height: 1.5625rem !important;
    position: absolute;
    z-index: 1;
}
/* 密码眼睛图标 */
.login>>>.userPwdEyes{
    width: 1.5625rem;
    height: .9375rem !important;
    position: absolute;
    z-index: 1;
}
.login>>>.userPhoneIcon{
    top:.8125rem;
    left: .625rem;
}
.login>>>.userPwdIcon{
    top:3.5rem;
    left: .625rem;
}
.login>>>.userPwdEyes{
    top:4.125rem;
    left: 17.5rem;
}
/* 登录按钮样式 */
.login>>>.loginBtn{
    width: 90%;
    margin-left: 5%;
    background: rgba(0, 122, 255, 0.7);
}
/* 60s之内勿重复验证提示框 */
.login>>>.getNum .mint-popup{
    background-color: transparent;
    color: white;
    height: 2%;
    line-height: 40px;
    border: none;
}
/* 60s验证提示框模板 */
.login>>>.getNum .v-modal{
    height: 8% !important;
}
/* 忘记密码样式 */
.login>>>.forgetPwd{
    text-align: right;
    padding-right: .75rem;
    margin-top: .75rem;
    color: #CFD0D1;
    font-size: .875rem;
}
/* 注册按钮样式 */
.login>>>.registerBtn{
    width: 25%;
    font-size: .875rem;
    height: 1.875rem;
    background-color: transparent;
    color: #007AFF;
    border: .0625rem solid  #007AFF;
    margin-top: 28%;
    margin-left: 37.5%;
    font-weight: 700;
}
</style>
