<template>
  <div class="passwordSetting">
      <!-- 头部 -->
        <div class="top">
            <mt-header title="密码管理">
                <router-link to="/personCenter" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
        </div>
        <!-- 中间 -->
        <div class="middle">
            <!-- 选项部分 -->
            <div class="option shadow">
                <div class="optionDiv1" @click="toUpdatapassword('login')">
                    登录密码<span class="more">&gt;</span>
                </div>
                <div class="optionDiv2" @click="toUpdatapassword('pay')" >
                    支付密码<span class="more">&gt;</span>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div class="bottom">
            <bar-bottom></bar-bottom>            
        </div>
  </div>
</template>

<script>
import barBottom from './barBottom.vue'
export default {
  name: 'passwordSetting',
  data () {
    return {
        user:{//用户信息
            userPhone:"",//用户账号或手机号
            pwd:"",//登录密码
        },   
        showPwd:"password",//密码可见或不可见
        showPwdEyesIconUrl:require("../assets/img/a8a747b68e3d41ec785189cb44281c0.jpg"),//密码是否可见图标路径
    }
  },
  methods:{
        //去密码设置
        toUpdatapassword(kind){
            let _this = this;
            //console.log('去登陆密码或者注册密码');
            // let urlParam = kind == 'login'?''
            // _this.$router.push({path:'/updatepassword'});
            _this.$router.push({path:'/updatepassword/'+kind+''});
        },
        //密码可见或不可见
        showPwdOrNot(){
            let _this = this;
            _this.showPwd = _this.showPwd == "password"?"":"password";//决定密码是否可见
             _this.showPwdEyesIconUrl = _this.showPwd == "password"?require("../assets/img/a8a747b68e3d41ec785189cb44281c0.jpg"):require("../assets/img/system-conceal.jpg");//决定密码是否可见
        }
  },
  components:{
      barBottom,
  }
}
</script>

<style scoped>
/* 整体样式 */
.passwordSetting{
    height: 97vh;
    overflow-y: hidden;
    background-color: #F6F8FA;
}
/* 头部样式 */
.passwordSetting>>>.mint-header{
    height: 3.125rem;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.passwordSetting>>>.mint-header-title{
    font-size: 18px;
    margin-top: 1.25rem;
}
/* 选项部分 */
.passwordSetting>>>.middle .option{
    padding:.625rem 1.25rem;
    position: relative;
    background-color: #FFFFFF;
    height: 16vh;
}
.passwordSetting>>>.middle .option div{
    display: flex;
    padding: .9375rem 0;
    border-bottom: .0625rem solid #E7E9EB;
    padding-left:.5rem;
}
/* 选项部分更多...图片样式 */
.passwordSetting>>>.more{
    color: #666666;
    position: absolute;
    right: 1.5625rem;
}
/* .passwordSetting>>>.middle .option .moreImg{
    width: .75rem;
    height: .75rem;
    vertical-align: middle;
    position: absolute;
    right: 1.875rem;
} */
/* 选项第一个div背景图 */
.passwordSetting>>>.middle .option .optionDiv1{
    background-size: 1.125rem;
}
/* 选项第二个div背景图 */
.passwordSetting>>>.middle .option .optionDiv2{
    border: none;
    background-size: 1.125rem;
}

</style>
