<template>
  <div class="updatePwd">
      <!-- 头部 -->
        <div class="top">
            <mt-header title="更改密码">
                <router-link to="/" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
        </div>
        <!-- 中间 -->
        <div class="middle">
            <mt-field placeholder="请输入旧密码" type="password" v-model="user.beforepwd"></mt-field>   
            <mt-field placeholder="请输入新密码" type="password" v-model="user.nowPwd"></mt-field>     
            <mt-field placeholder="请重新输入新密码" type="password" v-model="user.repeatPwd"></mt-field>       
        </div>
        <!-- 底部 -->
        <div class="bottom">
            <mt-button type="primary" size="large" @click="submitPwd">提交</mt-button>
        </div>
  </div>
</template>

<script>
export default {
  name: 'updatePwd',
  data () {
    return {
        user:{//用户信息
            beforepwd:"",//旧密码
            nowPwd:"",//新密码
            repeatPwd:"",//重复新密码
        },
    }
  },
  methods:{ 
        //提交--更新密码
        submitPwd(){
            let _this = this;
            console.log("更新密码")
        }
  }
}
</script>

<style scoped>
/* 头部样式 */
.updatePwd>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.updatePwd>>>.mint-header-title{
    font-size: 18px;
}
/* 输入框样式 */
.updatePwd>>>.mint-field-core{
    background-color:#F2F2F2 ;
    line-height: 2.4 ;
    padding-left: 10px;
    margin:20px 0;
}
/* 消除输入框外层标签的盒子边框 */
.updatePwd>>>.mint-cell-wrapper{
    background-size:120% 0px;
}
/* 修改input-placeholder的样式 */
.updatePwd>>>input::-webkit-input-placeholder{
    color: #CCCCCC;
}
/* 登录、注册按钮样式 */
.updatePwd>>>.bottom .mint-button{
    margin-top: 20px;
}
</style>
