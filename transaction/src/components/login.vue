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
                            <el-button type="primary" @click="uploadInfo">登 录</el-button>
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
            bodyHeight: "" ,//页面高度
            bodyWidth: "", //页面宽度
        };
    },
    methods: {
        //登录
        uploadInfo() {
            let _this = this;
            let api = "login";
            let params = {
                apiid:_this.form.stuId,
                secret:_this.form.stuPwd,
            };
            let fd = _this.transformFormData(params);
            _this.axios.post(api,fd,{
                'Content-Type': 'multipart/form-data'
            }).then(res=>{
                console.log(res);
                if(res.data=="OK"){
                    _this.$message({
                        showClose: true,
                        message: '登录成功！',
                        type: 'success'
                    });
                }else{
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
    },
    mounted() {
        var _this = this;
        _this.bodyHeight = document.documentElement.clientHeight || document.body.clientHeight;
        _this.bodyWidth = document.documentElement.clientWidth || document.body.clientWidth;        
    }
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
