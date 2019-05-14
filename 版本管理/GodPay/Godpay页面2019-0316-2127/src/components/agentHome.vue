<template>
  <div class="agentHome">
      <!-- 代理商基本信息 -->
      <div class="agentInfo">
          <p class="title">代理个人信息</p>
          <table>
              <tr>
                  <td class="blue">用户名：</td>
                  <td>{{agentInfo.agent_name}}</td>
                  <td></td>
              </tr>
              <tr>
                  <td class="blue">手机号：</td>
                  <td class="phone">
                      <el-input v-model="agentInfo.agent_uphone" :disabled='disable'></el-input>
                  </td>
                  <td class="blue update" @click="updatePhone">{{updateOrSave}}</td>
              </tr>
              <tr>
                  <td class="blue">资    产：</td>
                  <td>{{agentInfo.agent_quantity}} EMT</td>
                  <td></td>
              </tr>
          </table>
      </div>
      <!-- 密码管理 -->
      <div class="pwdSetting">
          <p class="title">密码管理</p>
          <!-- 登录密码 -->
          <div class="loginPwd">
            <p class="pwdTitle">设置登录密码</p>
            <el-input v-model="login.agent_uphone" placeholder="请输入手机号"></el-input>
            <div class="getCode" v-if="!isVerifyLogin" @click="getCode(0)">获取验证码</div>
            <!-- 60s验证 -->
            <div class="countdown" v-show="isVerifyLogin">
                <span>|</span>&nbsp;<span>{{countDownLogin}}s</span>
            </div>
            <el-input v-model="login.code" placeholder="请输入验证码" ></el-input>
            <!-- <el-input v-model="login.old_agent_password" placeholder="请输入原登录密码"></el-input> -->
            <el-input v-model="login.new_agent_password" placeholder="请输入登录新密码" type="password"></el-input>
            <el-input v-model="login.confirm_new_agent_password" placeholder="请确认登录新密码" type="password"></el-input>
            <el-button type="primary" @click="setting(0)">设置</el-button>
          </div>
          <!-- 支付密码 -->
          <div class="payPwd">
            <p class="pwdTitle">设置支付密码</p>
            <el-input v-model="pay.agent_uphone" placeholder="请输入手机号"></el-input>
            <div class="getCode" v-if="!isVerifyPay" @click="getCode(1)">获取验证码</div>
            <!-- 60s验证 -->
            <div class="countdown" v-show="isVerifyPay">
                <span>|</span>&nbsp;<span>{{countDownPay}}s</span>
            </div>
            <el-input v-model="pay.code" placeholder="请输入验证码" ></el-input>
            <el-input v-model="pay.payment_agent_password" placeholder="请输入支付密码" type="password"></el-input>
            <el-input v-model="pay.confirm_payment_agent_password" placeholder="请确认支付密码" type="password"></el-input>
            <el-button type="primary" @click="setting(1)">设置</el-button>
          </div>
          
      </div>
  </div>
</template>

<script>
// //console.log($store);
export default {
  name: 'agentHome',
  data () {
    return {
        agentInfo:{
            // agent_uphone:"18816889988",//代理商手机号
        },//代理商信息
        // phone:'18816889988',//基本信息的手机号码
        oldPhone:"",//修改手机时保存旧手机号
        updateOrSave:"修改",//修改或者保存手机
        disable:true,//信息手机号码输入框是否禁用
        login:{//登录密码
            agent_uphone:"",//手机号
            code:"",//验证码
            // old_agent_password:"",//原密码
            new_agent_password:"",//新密码
            confirm_new_agent_password:"",//重复新密码
        },
        pay:{//支付密码
            agent_uphone:"",//手机号
            code:"",//验证码
            payment_agent_password:"",//密码
            confirm_payment_agent_password:"",//重复新密码
        },
        isVerifyLogin:false,//登录60s倒计时可见
        countDownLogin:60,//登录60s
        isVerifyPay:false,//支付60s倒计时可见
        countDownPay:60,//登录60s
    }
  },
  mounted(){
      let _this = this;
      _this.getAgentInfo();//获取代理商基本信息
  },
  methods:{
    //获取代理商信息
    getAgentInfo(){
        let _this = this;
        _this.agentInfo = _this.$store.state.agentInfo;//从vuex获取代理商信息
    },
    //是否为合法手机号
    isPoneAvailable(str) {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    },
    //修改手机号
    updatePhone(){
        let _this = this;
        _this.disable = !_this.disable;//手机输入框可写？只读？
        _this.updateOrSave = _this.disable == true?'修改':'保存';//按钮为修改？保存？
        if(_this.updateOrSave == "保存"){//按下修改时，disable是为false的，updateOrSave是为'保存'
            _this.oldPhone = _this.agentInfo.agent_uphone;//保存住旧密码
            return
        }
        let api = '/change_uphone';
        //console.log('旧密码',_this.oldPhone,'新密码',_this.agentInfo.agent_uphone);
        _this.axios.post(api,{
            uphone:_this.agentInfo.agent_uphone,//手机号
            account_number:_this.oldPhone,//代理商标识
        }).then(res=>{
            //console.log(res);
            if(res.data == "ok"){
                _this.$store.dispatch('changeAgentPhone',_this.agentInfo.agent_uphone);
                //console.log(_this.$store.state.agentInfo);
                _this.$message({
                    message: '设置成功',
                    type: 'success'
                });
            }else{
                this.$message.error(res.data);
                _this.agentInfo.agent_uphone = _this.oldPhone;
            }
        });
    },
    //设置登录或者支付密码
    setting(type){
        let _this = this;
        if(type == 0){
            if(_this.login.agent_uphone == ""){
                    _this.$message({
                        message: '请先输入手机号',
                        type: 'warning'
                    });
                    return
            }
            if(_this.login.code == ""){
                    _this.$message({
                        message: '请先输入验证码',
                        type: 'warning'
                    });
                    return
            }
            if(_this.login.new_agent_password == ""){
                    _this.$message({
                        message: '请先输入密码',
                        type: 'warning'
                    });
                    return
            }
            if(_this.login.new_agent_password != _this.login.confirm_new_agent_password){
                    _this.$message({
                        message: '两次输入的密码不一致',
                        type: 'warning'
                    });
                    return
            }
        }else{
            if(_this.pay.agent_uphone == ""){
                    _this.$message({
                        message: '请先输入手机号',
                        type: 'warning'
                    });
                    return
            }
            if(_this.pay.code == ""){
                    _this.$message({
                        message: '请先输入验证码',
                        type: 'warning'
                    });
                    return
            }
            if(_this.pay.payment_agent_password == ""){
                    _this.$message({
                        message: '请先输入密码',
                        type: 'warning'
                    });
                    return
            }
            if(_this.pay.payment_agent_password != _this.pay.confirm_payment_agent_password){
                    _this.$message({
                        message: '两次输入的密码不一致',
                        type: 'warning'
                    });
                    return
            }
        }
        
        let api = type == 0?"/agen_login_secret":"/agen_payment_secret";
        let param = type == 0?_this.login:_this.pay;
        let text = "";
        let imgUrl = "";//请求成功或失败的图片路径
        _this.axios.post(api,param).then(res=>{
            //console.log(res);
            if(res.data == "ok"){
                imgUrl = require('../assets/img/createSuccess.jpg');//成功图标
                text = "设置成功";
            }else{
                imgUrl = require('../assets/img/error.jpg');//失败图标
                text = res.data;
            }
            _this.$alert('<p style="text-align:center;"><img style="width:70px;height:70px;margin:0 auto;" src="'+imgUrl+'" alt=""></p><p style="text-align:center;color:rgba(68, 126, 217, 1);font-size:18px;font-weight:700;">'+text+'</p>', '', {
                dangerouslyUseHTMLString: true,
                lockScroll:false,//消除模态框超出部分
            }); 
        });
    },
    //60s倒计时
    count60Login(){
        clearTimeout(count60Timeout)//清除计时器
        let _this = this;
        // //console.log(_this.countDownLogin,_this.isVerifyLogin);
        if(_this.countDownLogin > 0){
            _this.countDownLogin--;
            ////console.log(_this.countDown)
        }
        if(_this.countDownLogin == 0){
            _this.countDownLogin = 60;//恢复60s设定
            _this.isVerifyLogin = false;//不显示60s计时器
            clearTimeout(count60Timeout)//清除计时器
            return //结束方法的调用
        }
        let count60Timeout = setTimeout(_this.count60Login,1000);
    },
    //倒计时60s
    count60Pay(){
        clearTimeout(count60Timeout)//清除计时器
        let _this = this;
        // //console.log(_this.countDownPay,_this.isVerifyPay);
        if(_this.countDownPay > 0){
            _this.countDownPay--;
        ////console.log(_this.countDown)
        }
        if(_this.countDownPay == 0){
            _this.countDownPay = 60;//恢复60s设定
            _this.isVerifyPay = false;//不显示60s计时器
            clearTimeout(count60Timeout)//清除计时器
            return //结束方法的调用
        }
        let count60Timeout = setTimeout(_this.count60Pay,1000);
    },
    //获取验证码
    getCode(type){
        let _this = this;
       if(type == 0){//登录
             if(_this.login.agent_uphone == ""){
                _this.$message({
                    message: '请先输入手机号',
                    type: 'warning'
                });
                return
            }
            if(!_this.isPoneAvailable(_this.login.agent_uphone)){
                _this.$message({
                    message: '请输入正确的手机号',
                    type: 'warning'
                });
                return
            }
            if(_this.countDownLogin < 60){ 
                _this.$message({
                    message: '亲，请勿重复验证哦',
                    type: 'warning'
                });
                return//正在获取验证码时不能重复获取验证码
            }
            _this.isVerifyLogin = true;//显示60s倒计时
            _this.count60Login();//开始60s倒计时
       }else{//支付
             if(_this.pay.agent_uphone == ""){
                _this.$message({
                    message: '请先输入手机号',
                    type: 'warning'
                });
                return
            }
            if(!_this.isPoneAvailable(_this.pay.agent_uphone)){
                _this.$message({
                    message: '请输入正确的手机号',
                    type: 'warning'
                });
                return
            }
            if(_this.countDownPay < 60){ 
                _this.$message({
                    message: '亲，请勿重复验证哦',
                    type: 'warning'
                });
                return//正在获取验证码时不能重复获取验证码
            }
            _this.isVerifyPay = true;//显示60s倒计时
            _this.count60Pay();//开始60s倒计时

       }
        
        let  api = '/send_sms';
        let uphone = type == 0?_this.login.agent_uphone:_this.pay.agent_uphone;
        _this.axios.post(api,{
            uphone,
        }).then(res=>{
            //console.log(res);
        });
    },
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.agentHome{
    background-color: #F9F9F9;
    height: 88vh;
    overflow-y: auto;
    overflow-x: hidden;
}
/* 标题信息 */
.agentHome>>>.title{
     background-color: #447ED9;
     color: white;
     font-size: .875rem;
     padding: .3125rem
}
/* 整块样式 */
.agentHome>>>.agentInfo,.pwdSetting{
    margin-left: 1.25rem;
}
/* 基本信息 */
.agentHome>>>table{
    margin-left: 34.5%;
    color: #8D8D8D;
    font-size: .875rem;
}
.agentHome>>>td{
    line-height: 1.5625rem;
}
/* 基本信息蓝色字体 */
.agentHome>>>.blue{
    color: #447ED9;
    font-size: 1rem;
    font-weight: bold;
}
/* 修改按钮 */
.agentHome>>>.update{
    font-size: .875rem;
    font-weight: normal;
    padding-left: 1.25rem;
    cursor: pointer;
}

/* 密码管理 */
.agentHome>>>.loginPwd,.payPwd{
    width: 25vw;
    margin: 0 auto;
    position: relative;
    text-align: center;
}
/* 密码管理 */
.agentHome>>>.pwdTitle{
    text-align: center;
    color: rgba(68, 126, 217, 1);
}
/* 获取验证码按钮 */
.agentHome>>>.getCode{
    color: rgba(68, 126, 217, 1);
    font-size: .8125rem;
    position: absolute;
    top: 6.125rem;
    right: .625rem;
    z-index: 1;
    cursor: pointer;
}
/* 验证码60s倒计时样式 */
.agentHome>>>.countdown{
    position: absolute;
    top: 6.125rem;
    right: .625rem;
    color: #CCCCCC;
    z-index: 100;
}
/* 输入框样式 */
.agentHome>>>.loginPwd .el-input,.payPwd .el-input{
    margin-bottom: .625rem;
}
/* 设置按钮 */
.agentHome>>>.loginPwd button,.payPwd button{
    padding: .625rem 3.125rem;
    background-color: rgba(68, 126, 217, 1);
    /* margin-left: 34%; */
    margin-top: 1.875rem;
    margin-bottom: 1.25rem;
}
/* 模态框 */
.el-message-box{
    text-align: center !important;
}
</style>
