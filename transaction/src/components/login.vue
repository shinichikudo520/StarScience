<template>
    <div id="login-page" :style="{height:bodyHeight+'px'}">
        <el-row>
            <el-col :md="{span: 8, offset: 8}" :sm="{span: 18, offset: 3}" :xs="{span: 24, offset: 0}">
                <el-container>
                    <el-form ref="form" :model="form">
                        <el-form-item class="pc">
                            <h4>登录</h4>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="form.stuId" placeholder="请输入您的用户名" id="stuId"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="form.stuPwd" placeholder="请输入您的密码" id="stuPwd"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="uploadInfo" @keyup.enter.native="uploadInfo">登 录</el-button>
                        </el-form-item>
                    </el-form>
                </el-container>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            //登录账号的信息
            form: {
                stuId: "",
                stuPwd: "",
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
            // console.log(_this.loginOrNot)
            // _this.getIPs(function(ip){//获取用户ip的函数
            //     _this.ip = ip;
            //     console.log(_this.ip)                    
            // });
            let api = "/api/login";
            // let api = "login";
            let params = {
                username:_this.form.stuId,
                passwprd:_this.form.stuPwd,
                // ip:_this.ip,
            };
            let fd = _this.transformFormData(params);
            _this.axios.post(api,fd,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                 },
                cache:false,
            }).then(res=>{
                // console.log(res);
                if(res.data){
                    _this.setData("loginOrNot","yes");
                    _this.$message({
                        showClose: true,
                        message: '登录成功！',
                        type: 'success'
                    });
                    _this.$router.push({ path: "/admin" });
                }else{
                    _this.setData("loginOrNot","no");
                    this.$message({
                        message: '用户名或者密码错误，请重新输入！',
                        type: 'warning'
                    });
                }
            });
        },
        //转换为formData数据
        transformFormData(data){
            let fd = new FormData();
            Object.keys(data).forEach(key => fd.append(key, data[key]));
            return fd;
        },
        //存数据
        setData(name,data){
            data = JSON.stringify(data);
            window.sessionStorage.setItem(name,data);
        },
        //取数据
        getData(name){
            let temp =  JSON.parse(window.sessionStorage.getItem(name));
            if(temp){
                let jsonArr = [];
                for(let i =0 ;i < temp.length;i++){
                        jsonArr[i] = temp[i];
                }
                return jsonArr
            }
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
    #login-page {
        background: linear-gradient(to bottom,#00a3dc,#0081cc 20%) !important;
    }
    /* 信息内容div样式 */
    #login-page .el-container {
        /* transform: translateY(60%) !important;  */
        background-color: transparent !important;      
    }
    /* 记住密码、忘记密码样式 */
    .el-checkbox__label,#login-page a{
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
        background-image: url("../assets/img/900265428714012190.png") !important;
    }
    #stuPwd {
        background-image: url("../assets/img/497145720367027039.png") !important;
    }
    /* #verification {
        background-image: url("../assets/img/702621131188519460.png") !important;
    } */
    #login-page .el-container {
        transform: translateY(60%) !important;       
    }  
}
/* ＜376px样式 */
@media screen and (max-width:376px){
    /* 整体样式 */
    #login-page .el-container {
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
    #login-page form{
        width: 75% !important;
    }
}
html,
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}
#login-page {
    color: white;
    background: url("../assets/img/backgroundImage.jpg") 0 0 no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
}
#login-page .el-container {
    transform: translateY(35%);
    background-color: rgba(0, 0, 0, 0.5);
    padding-bottom: 3%;
}
/* 表单整体 */
#login-page form {
    width: 60%;
    margin: 0 auto;
    padding-top: 20px;
}
/* 表单标题 */
#login-page form h4 {
    text-align: center;
}
/* 登陆按钮样式 */
#login-page .el-button {
    width: 100%;
    background-color: #236cc8;
}
/* 输入框样式 */
#stuId {
    background: url("../assets/img/550992895391150069.png") 10px 5px no-repeat;
}
#stuPwd {
    background: url("../assets/img/75331576642112394.png") 10px 5px no-repeat;
}
/* #verification {
    background: url("../assets/img/175459425380158681.png") 10px 5px no-repeat;
} */
#stuId,#stuPwd{
/* #verification 验证码输入框*/
    padding-left: 40px;
    background-size: 20px;
    background-color: #fff;
    outline: none;
}
</style>
