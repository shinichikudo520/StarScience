<template>
    <div id="adminLogin-page" :style="{height:bodyHeight+'px'}">
        <el-row>
            <el-col :md="{span: 8, offset: 8}" :sm="{span: 18, offset: 3}" :xs="{span: 24, offset: 0}">
                <el-container>
                    <el-form ref="form" :model="admin">
                        <el-form-item class="pc">
                            <h4>登录</h4>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="admin.account_number" placeholder="请输入您的用户名" id="stuId"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="admin.password" type="password" placeholder="请输入您的密码" id="stuPwd" @keyup.enter.native="uploadInfo"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="uploadInfo">登 录</el-button>
                        </el-form-item>
                    </el-form>
                </el-container>
            </el-col>
        </el-row>

    </div>
</template>

<script>
let ip_out = returnCitySN["cip"];//获取外网IP
export default {
    name: "adminLogin",
    data() {
        return {
            //登录账号的信息
            admin: {
                account_number: "",
                password: "",
                ip_out:"",
                ip_in:"",
                equipment:"",
            },
            ip:"",//操作用户的ip
            bodyHeight: "" ,//页面高度
            bodyWidth: "", //页面宽度
        };
    },
    methods: {
        //登录
        uploadInfo() {
            let _this = this;
            if(_this.admin.account_number == ""){
               this.$message({
                message: '请输入管理员账号',
                type: 'warning'
                });
                return
            } 
            if(_this.admin.password == ""){
                this.$message({
                message: '请输入账号密码',
                type: 'warning'
                });
                return
            }
            _this.admin.ip_out = ip_out;//获取外网ip
            let api = '/Super_Manager_login';
            _this.axios.post(api,_this.admin).then(res=>{
                // console.log(res);
                if(res.data == '登陆成功'){
                    _this.$store.dispatch('amdinLogin',_this.admin.account_number);
                    // console.log(_this.$store.state.adminUser);
                    _this.$router.push({
                        path:"/admin",
                    });
                }else{
                    this.$message({
                    message: res.data,
                    type: 'warning'
                    });
                }
            });
        },
        //获取用户IP
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
            }
    },
    mounted() {
        var _this = this;
        _this.bodyHeight = document.documentElement.clientHeight || document.body.clientHeight;
        _this.bodyWidth = document.documentElement.clientWidth || document.body.clientWidth;    
        let phone = navigator.userAgent;
        _this.admin.equipment = phone.substring(phone.indexOf('(')+1,phone.indexOf(';'));//获取用户机型
        //获取用户内网ip
        _this.getIPs(ip=>{
            _this.admin.ip_in = ip;
        });    
    },
};
</script>

<style>
/* 整体样式 */
/* ≤996px样式 */
@media screen and (max-width:996px)  {
    /* 显示头部 */
    .pc{
        display: none;
    }
    /* 头部文字样式 */
    .headerSchool{
        font-size: 18px;
        color: rgba(255, 255, 255, 0.8) !important;
    }
    .headerTitle{
        font-size: 24px;
    }
    /* 主体div样式 */
    #adminLogin-page {
        background: #68B0FF;
    }
    /* 信息内容div样式 */
    #adminLogin-page .el-container {
        /* transform: translateY(60%) !important;  */
        background-color: transparent !important;      
    }
    /* 记住密码、忘记密码样式 */
    .el-checkbox__label,#adminLogin-page a{
        font-size: 0.8em !important;
        color: rgba(255, 255, 255, 0.6) !important;
    }
    /* 头部logo样式 */
    header img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        margin-top: 1%;
    }
    /* 登录按钮的样式 */
    .el-button--primary{
        background-color:rgba(255, 255, 255, 0.6) !important;
        color: white;
        font-size: 1.3em !important;
    }
    /* 输入框样式 */
    /* #verification,验证码输入框 */
    #stuId, #stuPwd, .el-checkbox__inner{
        background-color:transparent !important;  
    }
    #stuId {
        background-image: url("../assets/img/900265428714012190.jpg") !important;
    }
    #stuPwd {
        background-image: url("../assets/img/497145720367027039.jpg") !important;
    }
    /* #verification {
        background-image: url("../assets/img/702621131188519460.jpg") !important;
    } */
    #adminLogin-page .el-container {
        transform: translateY(60%) !important;       
    }  
}
/* ＜376px样式 */
@media screen and (max-width:376px){
    /* 整体样式 */
    #adminLogin-page .el-container {
        transform: translateY(30%) !important;       
    }
    /* 头部文字样式 */
    .headerSchool{
        font-size: 18px !important;
    }
    .headerTitle{
        font-size: 23px !important;
    }
    /* 表单样式 */
    #adminLogin-page form{
        width: 75% !important;
    }
}
#adminLogin-page {
    color: white;
    background: url("../assets/img/backgroundImage.jpg") 0 0 no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
}
#adminLogin-page .el-container {
    transform: translateY(35%);
    background-color: rgba(0, 0, 0, 0.5);
    padding-bottom: 3%;
}
/* 表单整体 */
#adminLogin-page form {
    width: 60%;
    margin: 0 auto;
    padding-top: 20px;
}
/* 表单标题 */
#adminLogin-page form h4 {
    text-align: center;
}
/* 登陆按钮样式 */
#adminLogin-page .el-button {
    width: 100%;
    background-color: #236cc8;
}
/* 输入框样式 */
#stuId {
    background: url("../assets/img/550992895391150069.jpg") 10px 5px no-repeat;
}
#stuPwd {
    background: url("../assets/img/75331576642112394.jpg") 10px 5px no-repeat;
}
/* #verification {
    background: url("../assets/img/175459425380158681.jpg") 10px 5px no-repeat;
} */
#stuId,#stuPwd{
/* #verification 验证码输入框*/
    padding-left: 40px;
    background-size: 20px;
    background-color: #fff;
    outline: none;
}
</style>
