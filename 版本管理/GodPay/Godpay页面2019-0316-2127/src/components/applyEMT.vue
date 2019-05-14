<template>
  <div class="applyEMT">
    <P class="title">申请EMT</P>
    <el-input v-model="params.allocate_quantity" placeholder="请输申请EMT数量"></el-input>
    <el-input v-model="params.key_password" placeholder="请输入支付密码" type="password"></el-input>
    <el-button type="primary" @click="submit">提交申请</el-button>
  </div>
</template>

<script>
export default {
  name: 'applyEMT',
  data () {
    return {
        params:{
            allocate_quantity:"",//申请EMT数量
            key_password:"",//密码
        }
    }
  },
  methods:{
      //申请EMT
      submit(){
        let _this = this;
        if(_this.params.allocate_quantity==""){
                _this.$message({
                message: '请先输入申请EMT的数量',
                type: 'warning'
                });
                return
        }
        let api = '/agent_recharge';
        _this.params.agent_uphone = _this.$store.state.agentInfo.agent_uphone;//代理商手机号
        // _this.params.agent_uphone = '13530777957';
        //console.log('代理商申请EMT',_this.params);
        _this.axios.post(api,_this.params).then(res=>{
            //console.log(res);
            let imgUrl = "";
            let text = "";
            if(res.data.allocate_quantity > 0){
                imgUrl = require('../assets/img/createSuccess.jpg');
                text = '申请成功';
            }else{
                imgUrl = require('../assets/img/error.jpg');
                text = '申请失败';
            }
            _this.$alert('<p style="text-align:center;"><img style="width:70px;height:70px;margin:0 auto;" src="'+imgUrl+'" alt=""></p><p style="text-align:center;color:rgba(68, 126, 217, 1);font-size:18px;font-weight:700;">'+text+'</p>', '', {
                dangerouslyUseHTMLString: true,
                lockScroll:false,//消除模态框超出部分
            }); 
        }).catch(error=>{
                //console.log(error.response);
                let status = error.response.status;//获取状态
                if(status == 400){//报400错误
                    _this.$message({
                    message: error.response.data[0],
                    type: 'warning'
                    });
                    return
                }
            });
        
      }
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.applyEMT{
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
.applyEMT>>>.title{
    color: rgba(68, 126, 217, 1);
}
/* 输入框样式 */
.applyEMT>>>.el-input{
    width: 42%;
    margin: 0 auto;
    margin-bottom: 1.25rem;
}
/* 设置按钮 */
.applyEMT>>>button{
    /* padding: .625rem 2.5rem; */
    background-color: #447ED9;
    width: 9.375rem;
    margin: 0 auto;
}
/* 设置后模态框样式 :去除模态框弹出时多出的宽度*/
.el-popup-parent--hidden{
    overflow: auto;
}
</style>
