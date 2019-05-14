<template>
  <div class="accountBook">
      <div>
         <label>成功转出EMT：</label><span>{{agentAsset.agent_turned_quantity}} EMT</span>
      </div>
      <div>
          <label>剩余可转EMT：</label><span>{{agentAsset.agent_quantity}} EMT</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'accountBook',
  data () {
    return {
        agentAsset:{},//代理商资产
    }
  },
  mounted(){
      let _this = this;
      _this.getAgentAsset();//获取代理商资产
  },
  methods:{
      //获取代理商资产
      getAgentAsset(){
          let _this = this;
          let api = '/agent_Account_book/'+_this.$store.state.agentInfo.agent_uphone;
        //   let api = '/agent_Account_book/13530777957';
          _this.axios.get(api).then(res=>{
              //console.log(res);
              _this.agentAsset = res.data[0];
          });
      }
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.accountBook{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    text-align: center;
}
.accountBook>>>div{
    padding-top: 6.25rem;
}
.accountBook>>>label{
    color: rgba(68, 126, 217, 1);
    font-weight: bold;
}
.accountBook>>>span{
    color: rgba(141, 141, 141, 1);
}
</style>
