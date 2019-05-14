<template>
  <div class="transferAccount">
    <P class="title">指定转账</P>
    <el-input v-model="user_uphone" placeholder="请输入对方手机号"></el-input>
    <el-input v-model="num" placeholder="请输入转出的EMT数量"></el-input>
    <el-input v-model="pwd" placeholder="请输入支付密码" type="password"></el-input>
    <el-button type="primary" @click="submit">确认转账</el-button>
  </div>
</template>

<script>
export default {
  name: 'transferAccount',
  data () {
    return {
        user_uphone:"",//用户手机号
        num:"",//申请EMT数量
        pwd:"",//密码
    }
  },
  methods:{
      //确认转账
      submit(){
        let _this = this;
        let api = '/agent_transfer';
        _this.axios.post(api,{
            user_uphone:_this.user_uphone,//用户手机号
            agent_uphone:_this.$store.state.agentInfo.agent_uphone,//代理商手机号
            // agent_uphone:'13530777957',//代理商手机号
            apply_quantity:_this.num,//申请数量
            key_password:_this.pwd,//支付密码
        }).then(res=>{
            //console.log(res);
            if(res.data.agent_code == '转账成功'){
                this.$message({
                message: '转账成功',
                type: 'success'
                });
            }else{
                this.$message({
                message: '转账失败',
                type: 'warning'
                });
            }
        });
        // let imgUrl = require('../assets/img/createSuccess.jpg');
        // _this.$alert('<p style="text-align:center;"><img style="width:70px;height:70px;margin:0 auto;" src="'+imgUrl+'" alt=""></p><p style="text-align:center;color:rgba(68, 126, 217, 1);font-size:18px;font-weight:700;">申请成功</p>', '', {
        //     dangerouslyUseHTMLString: true,
        //     lockScroll:false,//消除模态框超出部分
        // }); 
      }
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.transferAccount{
    width: 50%;
    height: 100%;
    overflow-y: hidden;
    text-align: center;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding-top: 6.25rem;
}
/* 标题 */
.transferAccount>>>.title{
    color: rgba(68, 126, 217, 1);
}
/* 输入框样式 */
.transferAccount>>>.el-input{
    width: 42%;
    margin: 0 auto;
    margin-bottom: 1.25rem;
}
/* 设置按钮 */
.transferAccount>>>button{
    /* padding: .625rem 2.5rem; */
    background-color: #447ED9;
    width: 9.375rem;
    margin: 0 auto;
}
/* 设置后模态框样式 :去除模态框弹出时多出的宽度*/
.el-popup-parent--hidden{
    overflow: auto;
}
/* 适配移动端 ≤768px */
@media screen and (max-width: 768px) {
    /* 整体 */
    .transferAccount{
        width: 90%;
        padding-top: .6875rem;
    }
    /* 输入框 */
    .transferAccount>>>.el-input{
        width: 90%;
    }
    /* 按钮 */
    .transferAccount>>>button{
        background-color:#447ED9 !important;
        font-size: .625rem !important;
        width: 5.125rem;
    }
}
</style>
