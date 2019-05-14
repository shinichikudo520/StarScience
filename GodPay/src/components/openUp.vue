<template>
  <div class="openUp">
      <div>
         <label>代理用户名：</label><el-input v-model="agent.agent_name" placeholder="请输入用户名"></el-input>
      </div>
      <div>
         <label>代理手机号：</label><el-input v-model="agent.agent_uphone" placeholder="请输入手机号"></el-input>
      </div>
      <div>
          <label>设置登录密码：</label><el-input v-model="agent.key_password" placeholder="请输入登录密码" type="password"></el-input>
      </div>
      <div>
          <label>确认登录密码：</label><el-input v-model="agent.login_password" placeholder="请确认登录密码" type="password"></el-input>
      </div>
      <div class="last">
          <el-button type="primary" @click="create">设置</el-button>
      </div>
      
  </div>
</template>

<script>
export default {
  name: 'openUp',
  data () {
    return {
        agent:{
            agent_name:"",//代理商用户名
            agent_uphone:"",//
            key_password:"",//代理商登录密码
            login_password:"",//确认代理商密码
        },
        
    }
  },
  methods:{
      //是否为合法手机号
        isPoneAvailable(str) {
            var myreg=/^1\d{10}$/;
            if (!myreg.test(str)) {
                return false;
            } else {
                return true;
            }
        },
      //创建新代理商
      create(){
        let _this = this;
        //非空验证
        Object.keys(_this.agent).forEach(item=>{
            if(_this.agent[item] == ''){
                _this.$message({
                message: '所有参数都为必填项，请先输入各参数',
                type: 'warning'
                });
                return
            }
        })
        //验证手机号
        if(!_this.isPoneAvailable(_this.agent.agent_uphone)){

            _this.$message({
            message: '请输入合法的手机号码',
            type: 'warning'
            });
            return
        }
        if(_this.agent.key_password != _this.agent.login_password){
            _this.$message({
            message: '两次密码不一致，请重新输入',
            type: 'warning'
            });
            return
        }
        let api = '/agent_establish';
        _this.axios.post(api,_this.agent).then(res=>{
            // console.log(res);
            if(res.data.operation == '进行中'){
                
                //设置成功
                let imgUrl = require('../assets/img/createSuccess.jpg');
                _this.$alert('<p style="text-align:center;"><img style="width:70px;height:70px;margin:0 auto;" src="'+imgUrl+'" alt=""></p><p style="text-align:center;color:rgba(68, 126, 217, 1);font-size:18px;font-weight:700;">设置成功</p>', '', {
                    dangerouslyUseHTMLString: true,
                    lockScroll:false,//消除模态框超出部分
                }); 
                Object.keys(_this.agent).forEach(item=>{
                    // console.log(_this.agent[item])
                    _this.agent[item] = '';//清空输入框
                });
                
            }else{
                this.$message.error('开通代理商失败，请重试');
            }
        }).catch(res=>{
            // console.log(res.response)
            this.$message.error(res.response.data[0]);
        });
        
      }
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.openUp{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
}
.openUp>div{
    display: flex;
    padding:2.5rem 1.25rem ;
}
/* 每一行label样式 */
.openUp>div label{
    flex: 0.6;
    text-align: right;
    line-height: 2.5rem;
    color: #447ED9;
    font-size: 1.625rem;
}
/* 输入框样式 */
.openUp .el-input{
    width: 40%;
}
/* 设置按钮 */
.openUp .last button{
    padding: .625rem 2.5rem;
    margin-left: 46%;
    background-color: #447ED9;
}
/* 设置后模态框样式 :去除模态框弹出时多出的宽度*/
.el-popup-parent--hidden{
    overflow: auto;
}
</style>
