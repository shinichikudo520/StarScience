<template>
  <div class="emtCrowdfunding">
      <div v-for="(item,index) in  EMTCrowdfunding" :key="index">
         <label>{{item.product_name}}：</label><span>{{item.orders_qiantity_total}} </span>
      </div>
      <!-- <div>
          <label>数码 ：</label><span>20000000.00 </span>
      </div>
      <div>
          <label>电音节：</label><span>30000000.00 </span>
      </div>
      <div>
          <label>舞台秀：</label><span>50000000.00 </span>
      </div> -->
  </div>
</template>

<script>
export default {
  name: 'emtCrowdfunding',
  data () {
    return {
        EMTCrowdfunding:[],//EMT众筹数据
    }
  },
  mounted(){
      let _this = this;
      _this.getEMTCrowdfunding();//获取EMT众筹数据
  },
  methods:{
      //获取EMT众筹数据
      getEMTCrowdfunding(){
          let _this = this;
          let api = '/super_crowdfunding';
          _this.axios.get(api).then(res=>{
              console.log(res);
              _this.EMTCrowdfunding = res.data.result;//获取emt众筹数据
          });
      }
  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.emtCrowdfunding{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    text-align: center;
}
.emtCrowdfunding>>>div{
    padding-top: 3.125rem;
}
.emtCrowdfunding>>>label{
    color: rgba(68, 126, 217, 1);
    font-weight: bold;
    display: inline-block;
    width: 7.5rem;
    text-align: right;
}
.emtCrowdfunding>>>span{
    color: rgba(141, 141, 141, 1);
}
</style>
