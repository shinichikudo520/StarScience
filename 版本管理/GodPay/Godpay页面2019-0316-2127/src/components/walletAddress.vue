<template>
  <div class="walletAddress">
      <!-- 头部 -->
        <div class="top">
            <mt-header title="EMT钱包地址">
                <router-link to="/personCenter" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
        </div>
        <!-- 中间 -->
        <div class="middle">
            <mt-field placeholder="请输入EMT钱包地址" class="bindAddress"  v-model="user.wallt_address" :disableClear='true'></mt-field>
            <mt-field placeholder="请确认EMT钱包地址"  v-model="user.confirm_wallt_address" :disableClear='true'></mt-field>
            <div class="getNum">
                <mt-popup v-model="agree_agreement" position="top" popup-transition="popup-fade">{{content}}</mt-popup>
            </div>
            <div class="preDivEyes">
                <mt-field placeholder="请输入支付密码"  v-model="user.payment_password" class="sureAddress" :type="showPwd" :disableClear='true'></mt-field>
                <img :src="showPwdEyesIconUrl" class="eyes" alt="" @click="showPwdOrNot">
            </div>
        </div>
        <!-- 底部 -->
        <div class="bottom">
            <mt-button type="primary" size="large" @click="bindAddress">提交</mt-button>
        </div>
        <!-- 模态框部分 -->
        <div class="affirmModal">
            <mt-popup v-model="popupVisible" popup-transition="popup-fade">
                <p class="closeModal" @click="hiddenModal">
                    <img src="../assets/img/closeBtn.jpg" alt="">
                </p>
                <!-- 绑定成功 -->
                <template v-if="success">
                    <div class="affirmSuccess">
                        <img src="../assets/img/success.jpg" alt="">
                        <div>绑定成功</div>
                        <mt-button size="small" type="primary"  class="affirSuccessBtn" @click="hiddenModal">确认</mt-button>
                    </div>
                </template>
                <!-- 绑定失败 -->
                <template v-else-if="fail">
                    <div class="affirmError">
                        <img src="../assets/img/error.jpg" alt="">
                        <div>绑定失败</div>
                        <mt-button size="small" type="primary"  class="affirErrorBtn"  @click="hiddenModal">重试</mt-button>
                    </div>
                </template>
            </mt-popup>
        </div>
  </div>
</template>

<script>
export default {
  name: 'walletAddress',
  data () {
    return {
        user:{//用户信息
            wallt_address:"",//钱包地址
            confirm_wallt_address:"",//确认钱包地址
            payment_password:"",//支付密码
        },
        showPwd:"password",//是否显示密码
        showPwdEyesIconUrl:require("../assets/img/a8a747b68e3d41ec785189cb44281c0.jpg"),//密码是否可见图标路径
        popupVisible:false,//绑定成功与否模态框
        success:true,//绑定成功模态框内容
        fail:false,//绑定失败模态框内容
        agree_agreement:false,//地址密码是否一致模态框
        content:"",//地址不一致
    }
  },
  methods:{
        //调转到登录页面
        toLogin(){
            let _this = this;
            _this.$router.push({path:"/"});
        },
        //显示绑定确认模态框
        showModal(status){
            let  _this = this;
            _this.popupVisible = true;
            _this.success = status;//绑定是否成功？
            _this.fail = !status;//绑定是否成功？
        },
        // 隐藏绑定确认模态框
        hiddenModal(){
            let  _this = this;
            _this.popupVisible = false;
        },
        //密码可见或不可见
        showPwdOrNot(){
            let _this = this;
            _this.showPwd = _this.showPwd == "password"?"":"password";//决定密码是否可见
             _this.showPwdEyesIconUrl = _this.showPwd == "password"?require("../assets/img/a8a747b68e3d41ec785189cb44281c0.jpg"):require("../assets/img/system-conceal.jpg");//决定密码是否可见
        },
        //提交绑定地址
        bindAddress(){
            let _this = this;

            //判断两次输入的钱包地址是否一致
            if(_this.user.wallt_address == ""){
                _this.agree_agreement = true;//
                _this.content = '请输入地址';
                setTimeout(() => {
                    _this.agree_agreement = false;
                }, 5000);
                return
            }
            //判断两次输入的钱包地址是否一致
            if(_this.user.wallt_address != _this.user.confirm_wallt_address){
                _this.agree_agreement = true;//地址不一致
                _this.content = '地址不一致，请重新输入';
                setTimeout(() => {
                    _this.agree_agreement = false;//地址不一致
                }, 5000);
                return
            }

            let api = '/binding_wallt';
            _this.user.uid = _this.$store.state.uid;
            //console.log(_this.user);
            _this.axios.post(api,_this.user).then(res=>{
                ////console.log(res);
                //成功？？失败？？=>模态框
                if(res.data.status_end == "ok"){
                    _this.showModal(true);
                    Object.keys(_this.user).forEach(item=>{
                        // _this.$store.dispatch('updateAddress',_this.user.wallt_address);
                        _this.user[item] = "";
                    });
                }else{
                    _this.showModal(false);
                }
            });
        }
  }
}
</script>

<style scoped>
/* 整体样式 */
.walletAddress{
    overflow-y: hidden;
}
/* 头部样式 */
.walletAddress>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.walletAddress>>>.mint-header-title{
    font-size: 18px;
}
/* 输入框样式 */
.walletAddress>>>.mint-field-core{
    background-color:transparent;
    line-height: 2.4 ;
    padding-left: 2.5rem;
    margin-top: 20px;
    border-bottom: .09375rem solid #F5F5F5;
}
/* 绑定钱包地址输入框 */
.walletAddress>>>.bindAddress{
    background: url('../assets/img/property.jpg') 19px 29px no-repeat;
    background-size: 1.25rem
}
/* 验证提示框 */
.walletAddress>>>.getNum .mint-popup{
    background-color: transparent;
    color: white;
    height: 2%;
    line-height: 40px;
    border: none;
}
/* 验证提示框模板 */
.walletAddress>>>.getNum .v-modal{
    height: 8% !important;
}
/* 支付密码输入框 */
.walletAddress>>>.sureAddress{
    background: url('../assets/img/greypassward.jpg') 19px 25px no-repeat;
    background-size: 1.25rem;
    
}
.walletAddress>>>.preDivEyes{
    position: relative;
}
/* 眼睛小图标 */
.walletAddress>>>.eyes{
    position: absolute;
    width: 1.5625rem;
    height: 1.25rem;
    top: 1.875rem;
    right: 2rem;
}
/* 消除输入框外层标签的盒子边框 */
.walletAddress>>>.mint-cell-wrapper{
    background-size:120% 0px;
}
/* 修改input-placeholder的样式 */
.walletAddress>>>input::-webkit-input-placeholder{
    color: #CCCCCC;
}
/* 绑定按钮样式 */
.walletAddress>>>.bottom .mint-button{
    margin-top: 3.75rem;
    background: rgba(0, 122, 255, 0.7);

}
/* 模态框内容 */
/* 模态框样式 */
.walletAddress>>>.v-modal{
    height: 100%;
}
.walletAddress>>>.mint-popup{
    width: 60vw;
    height: 30vh;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #009FE8;
    border-radius: 10px;
    text-align: center;
    padding: 6px 0px;
}
/* 模态框下所有按钮 */
.walletAddress>>>.affirmModal button{
    width: 60%;
    background: #57A6FE;
}
/* 模态框关闭按钮样式 */
.walletAddress>>>.closeModal img{
    position: absolute;
    top: .625rem;
    right: .8125rem;
    width: 1.25rem;
    height: 1.25rem;
}
/* 绑定成功或者失败样式 */
.walletAddress>>>.affirmSuccess,.affirmError{
    color:  #007AFF;
    padding-top: 7px;
}
/* 绑定成功√或者失败!图标样式 */
.walletAddress>>>.affirmSuccess img,.affirmError img{
    width: 3.75rem;
    height: 3.75rem;
    margin-bottom: .625rem;
}
/* 绑定成功或者失败按钮样式 */
.walletAddress>>>.affirSuccessBtn,.affirErrorBtn{
    padding: 0 25PX;
    position: relative;
    top: .1875rem;
}
</style>
