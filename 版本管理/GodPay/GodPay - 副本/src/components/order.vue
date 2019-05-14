<template>
<!-- order页面 -->
  <div class="order">
      <!-- 头部 -->
    <div class="top">
        <mt-header title="我的订单">
            <router-link to="/personCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- tab选项卡 -->
        <div class="tab">
            <mt-navbar v-model="tabNum">
                <mt-tab-item id="1">买入</mt-tab-item>
                <mt-tab-item id="2">提现</mt-tab-item>
                <mt-tab-item id="3">充值</mt-tab-item>
                <mt-tab-item id="4">兑换</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="tabNum">
                <mt-tab-container-item id="1">
                    <!-- 买入对应选项卡内容 -->
                    <div class="purchase">
                        <template v-if="havePursed">
                            <!-- 购买认权产品 -->
                            <div class="purchaseRight template"  v-for="(item,index) in purchase" :key="index">
                                <!-- 流水号 -->
                                <div class="number">
                                    <span class="numName">流水号：</span>
                                    {{item.serial_number}}
                                    <!-- <span class="blue">进行中</span> -->
                                </div>
                                <!-- 产品信息 -->
                                <div class="basicInfo">
                                    <img class="productImg" :src="item.productImg" alt="">
                                    <div class="product">
                                    <span class="productName">{{item.order_detailed_name}}</span>  <br>
                                        <span>产品周期：{{item.zhouqi}}<img class="levelImg" :src="item.levelImg" alt="" v-if="item.levelImg != ''"></span>
                                    </div>
                                    <div class="purchaseNum">
                                        <span class="num">{{item.order_quantity}}</span> EMT
                                    </div>
                                </div>
                                <!-- 购买时间 -->
                                <div class="purchaseTime">
                                    购买时间: &nbsp;{{item.order_time}}
                                </div>
                            </div>
                            <!-- 购买众筹产品 -->
                            <!-- <div class="purchaseCrowdfunding template">
                                <div class="number">
                                <span class="numName">流 水 号：</span>
                                    20180123GHHUUOJKLUUUUUIW2844
                                    <span class="blue">进行中</span>
                                </div>
                                <div class="basicInfo">
                                    <img class="productImg" src="../assets/img/product2.jpg" alt="">
                                    <div class="product">
                                        <span class="productName">Raise Your Glass</span> <br>
                                        <span>产品周期：3个月 </span>
                                    </div>
                                    <div class="purchaseNum">
                                        <span class="num">4000.00</span> EMT
                                    </div>
                                </div>
                                <div class="purchaseTime">
                                    购买时间: &nbsp;2018-10-06
                                </div>
                            </div> -->
                        </template>
                        <template v-if="!havePursed">
                            <div class="NoData">
                                暂无数据
                            </div>
                        </template>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <template v-if="havewithdrawed">
                        <!-- 提取对应选项卡内容 -->
                        <div class="withdraw">
                            <!-- 模板 -->
                            <div class="template" v-for="(item,index) in withdraw" :key="index">
                                <div class="number">
                                    <span class="black">{{item.serial_number}}</span>
                                    <span class="blue">{{item.operation}}</span>
                                </div>
                                <!-- 产品信息 -->
                                <div class="basicInfo">
                                    <table>
                                        <tr>
                                            <td>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</td>
                                            <td>
                                                <span class="num">{{item.order_quantity}}</span> EMT                                            
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>钱包地址：</td>
                                            <td class="black">{{item.CashWithdrawal_wallt_address}}</td>
                                        </tr>
                                        <tr>
                                            <td>提取日期：</td>
                                            <td class="black">{{item.order_time}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="!havewithdrawed">
                        <div class="NoData">
                            暂无数据
                        </div>
                    </template>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <template v-if="haveRecharged">
                        <!-- 充值对应选项卡内容 -->
                        <div class="recharge">
                            <!-- 模板 -->
                            <div class="template" v-if="haveRecharged" v-for="(item,index) in recharge" :key="index">
                                <div class="number">
                                    <span class="black">{{item.serial_number}}</span>
                                    <span class="blue">{{item.operation}}</span>
                                </div>
                                <!-- 产品信息 -->
                                <div class="basicInfo">
                                    <table>
                                        <tr>
                                            <td>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</td>
                                            <td>
                                                <span class="num">{{item.order_quantity}}</span> EMT     
                                            </td>
                                        </tr>
                                        <tr v-if="item.CashWithdrawal_wallt_address">
                                            <td>充&nbsp;币&nbsp;地&nbsp;址：</td>
                                            <td class="black">{{item.CashWithdrawal_wallt_address}}</td>
                                        </tr>
                                         <tr v-if="item.agent_uphone">
                                            <td>代理商手机号：</td>
                                            <td class="black">{{item.agent_uphone}}</td>
                                        </tr>
                                        <tr>
                                            <td>充&nbsp;值&nbsp;日&nbsp;期：</td>
                                            <td class="black">{{item.order_time}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <!-- <div class="template" v-if="haveRecharged">
                                <div class="number">
                                    <span class="black">20180123256987654197236546800227</span>
                                    <span class="blue">代确认</span>
                                </div>
                                <div class="basicInfo">
                                    <table>
                                        <tr>
                                            <td>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</td>
                                            <td>
                                                <span class="num">8000.00</span> EMT     
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>充&nbsp; 币&nbsp; 地&nbsp; 址：</td>
                                            <td class="black">89uujd384ueuu9u9dw998r0w2-1er43rfj</td>
                                        </tr>
                                         <tr>
                                            <td>代理商手机号：</td>
                                            <td class="black">13530777957</td>
                                        </tr>
                                        <tr>
                                            <td>充&nbsp; 值&nbsp; 日&nbsp; 期：</td>
                                            <td class="black">2018-12-18  10:17:32</td>
                                        </tr>
                                    </table>
                                </div>
                            </div> -->
                            <!-- <div class="template">
                                <div class="number">
                                    <span class="black">20180123256987654197236546800227</span>
                                    <span class="blue">充值成功</span>
                                </div>
                                <div class="basicInfo">
                                    <table>
                                        <tr>
                                            <td>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</td>
                                            <td>
                                                <span class="num">4000.00</span> EMT     
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>充币地址：</td>
                                            <td class="black">89uujd384ueuu9u9dw998r0w2-1er43rfj</td>
                                        </tr>
                                        <tr>
                                            <td>充值日期：</td>
                                            <td class="black">2018-12-18  10:17:32</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="template">
                                <div class="number">
                                    <span class="black">20180123256987654197236546800227</span>
                                    <span class="blue">充值成功</span>
                                </div>
                                <div class="basicInfo">
                                    <table>
                                        <tr>
                                            <td>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</td>
                                            <td>
                                                <span class="num">4000.00</span> EMT     
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>充币地址：</td>
                                            <td class="black">89uujd384ueuu9u9dw998r0w2-1er43rfj</td>
                                        </tr>
                                        <tr>
                                            <td>充值日期：</td>
                                            <td class="black">2018-12-18  10:17:32</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="template">
                                <div class="number">
                                    <span class="black">20180123256987654197236546800227</span>
                                    <span class="blue">充值成功</span>
                                </div>
                                <div class="basicInfo">
                                    <table>
                                        <tr>
                                            <td>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</td>
                                            <td>
                                                <span class="num">4000.00</span> EMT     
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>充币地址：</td>
                                            <td class="black">89uujd384ueuu9u9dw998r0w2-1er43rfj</td>
                                        </tr>
                                        <tr>
                                            <td>充值日期：</td>
                                            <td class="black">2018-12-18  10:17:32</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="template">
                                <div class="number">
                                    <span class="black">20180123256987654197236546800227</span>
                                    <span class="blue">充值成功</span>
                                </div>
                                <div class="basicInfo">
                                    <table>
                                        <tr>
                                            <td>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</td>
                                            <td>
                                                <span class="num">4000.00</span> EMT     
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>充币地址：</td>
                                            <td class="black">89uujd384ueuu9u9dw998r0w2-1er43rfj</td>
                                        </tr>
                                        <tr>
                                            <td>充值日期：</td>
                                            <td class="black">2018-12-18  10:17:32</td>
                                        </tr>
                                    </table>
                                </div>
                            </div> -->
                        </div>
                    </template>
                    <template v-if="!haveRecharged">
                        <div class="NoData">
                            暂无数据
                        </div>
                    </template>
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                    <template v-if="haveConversion">
                        <!-- 兑换对应选项卡内容 -->
                        <div class="recharge">
                            <!-- 模板 -->
                            <div class="template" v-if="haveConversion" v-for="(item,index) in conversion" :key="index">
                                <div class="number">
                                    <span class="black">{{item.product_Serial_number}}</span>
                                    <span class="blue">{{item.status}}</span>
                                </div>
                                <!-- 产品信息 -->
                                <div class="basicInfo">
                                    <table>
                                        <tr>
                                            <td>商&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：</td>
                                            <td>
                                                <span class="black">{{item.product_name}}</span>    
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额：</td>
                                            <td>
                                                <span class="num">{{item.total_amount}}</span> EMT     
                                            </td>
                                        </tr>
                                        <tr v-if="item.logistics_number">
                                            <td>物&nbsp;流&nbsp;单&nbsp;号：</td>
                                            <td class="black">{{item.logistics_number}}  
                                                <mt-button type="primary" size='small' class="saveImg js-copy" id="btn" :data-clipboard-text="item.CashWithdrawal_wallt_address" >复制</mt-button> </td>
                                        </tr>
                                        <tr>
                                            <td>订&nbsp;单&nbsp;日&nbsp;期：</td>
                                            <td class="black">{{item.product_order_time}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="!haveConversion">
                        <div class="NoData">
                            暂无数据
                        </div>
                    </template>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
    <div class="bottom">
        <bar-bottom></bar-bottom>
    </div>
  </div>
</template>

<script>
import barBottom from './barBottom.vue'
import Clipboard from 'clipboard'
export default {
  name: 'order',
  data () {
    return {
        tabNum:"1",//选中的tab选项
        purchase:[],//买入订单
        havePursed:false,//有买入的订单
        withdraw:[],//提现订单
        havewithdrawed:false,//有提现的订单
        recharge:[],//充值订单
        haveRecharged:false,//有充值的订单
        conversion:[],//兑换订单
        haveConversion:true,//有兑换的订单
    }
  },
  methods:{  
      //处理时间
      formatDate(date){
           //处理时间
            date = new Date(date);
            date =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())
            return date 
      },
      //获取认权订单信息
      getRightOrder(){
        let  _this = this;
        let api = '/renquan_check/'+_this.$store.state.uid;//认权产品订单的api
        //请求认权订单
        _this.axios.get(api).then(res=>{
        //    console.log('认权',res);
            let rightOrder = res.data;
            if(rightOrder == []){
                return
            }
            rightOrder.forEach(element => {
                //处理时间
                element.order_time = _this.formatDate(element.order_time);
                element.time = (new Date(element.order_time)).valueOf(); 
                switch(element.order_product){
                    case 'v1':
                        element.levelImg = require('../assets/img/order1.jpg');
                        element.productImg = require('../assets/img/product1.jpg');
                    break
                    case 'v2':
                        element.levelImg = require('../assets/img/order2.jpg');
                        element.productImg = require('../assets/img/product2.jpg');
                    break
                    case 'v3':
                        element.levelImg = require('../assets/img/order3.jpg');
                        element.productImg = require('../assets/img/product3.jpg');
                    break
                }                  
            });
            _this.purchase = _this.purchase.concat(rightOrder);
            if(_this.purchase.length > 0){
                _this.havePursed = true
            }else{
                _this.havePursed = false
            }
            //console.log(_this.purchase);
            _this.purchase.sort((a,b)=>{//按时间排序
                return b.time - a.time
            });  
        });  
      },
      //获取众筹订单信息
      getCrowdOrder(){
          let  _this = this;
          let api = '/zhongchou_check/'+_this.$store.state.uid;//众筹产品订单的api
          //请求众筹订单
           _this.axios.get(api).then(res=>{
            //    console.log('众筹',res);
                let crowdOrder = res.data;
                if(crowdOrder == []){
                    return
                }
                crowdOrder.forEach(element => {
                    //处理时间
                    element.order_time = _this.formatDate(element.order_time);
                    element.time = (new Date(element.order_time)).valueOf(); 
                    switch(element.order_product){
                        
                        case '3M':
                            element.zhouqi = '3个月';
                            element.productImg = require('../assets/img/product4.jpg');
                        break
                        case '6M':
                            element.zhouqi = '6个月';
                            element.productImg = require('../assets/img/product5.jpg');
                        break
                        case '12M':
                            element.zhouqi = '12个月';
                            element.productImg = require('../assets/img/product6.jpg');
                        break
                    };
                    element.levelImg = "";
                });
            _this.purchase = _this.purchase.concat(crowdOrder);
            if(_this.purchase.length > 0){
                _this.havePursed = true
            }else{
                _this.havePursed = false
            }
            //console.log(_this.purchase);
            _this.purchase.sort((a,b)=>{//按时间排序
                return b.time - a.time
            });  
           });  
      },
      //获取买入操作订单
      getPurchaseOrder(){
        //console.log('买入订单');
        let _this = this;
        _this.purchase = [];//清空数组，避免重复添加订单信息
        //认权和购买订单统一放入数组
        _this.getRightOrder();//获取认权订单
        _this.getCrowdOrder();//获取众筹订单
      },
      //获取提现订单
      getWithdrawOrder(){
            //console.log('提现订单');
            let _this = this;
            let api = '/tixian_check/'+_this.$store.state.uid;//提现订单的api
           _this.axios.get(api).then(res=>{
               //console.log(res);
               _this.withdraw = res.data;
               _this.withdraw.forEach(item=>{
                   item.order_time = _this.formatDate(item.order_time);
               });
               if(_this.withdraw.length>0){
                    _this.havewithdrawed = true
                }else{
                    _this.havewithdrawed = false
                }
           });
           
      },
      //通过二维码充值的订单
      getCodeRecharge(){
          let _this = this;
          let api = '/chongzhi_check/'+_this.$store.state.uid;//提现订单的api
          
          //请求用户通过二维码充值的订单         
           _this.axios.get(api).then(res=>{
               console.log(res);
               let codeOrder = res.data;
               if(codeOrder == []){
                   return
               }
               codeOrder.forEach(item=>{
                    item.time = (new Date(item.order_time)).valueOf(); 
                });
                _this.recharge = _this.recharge.concat(codeOrder);
                _this.recharge.sort((a,b)=>{//按时间排序
                    return b.time - a.time
                });
                if(_this.recharge.length>0){
                    _this.haveRecharged = true
                }else{
                    _this.haveRecharged = false 
                }
           });
      },
    //   //通过向代理商申请EMT充值的订单
    //   getApplyForAgent(){
    //       let _this = this;
    //       //请求用户通过代理商申请EMT的订单
    //         let api = '/agent_chongzhi_check/'+_this.$store.state.uid;//提现订单的api
    //         _this.axios.get(api).then(res=>{
    //             //console.log(res);
    //             let applyForAgent = res.data;
    //             if(applyForAgent == []){
    //                return
    //             }
    //             applyForAgent.forEach(item=>{
    //                 item.time = (new Date(item.order_time)).valueOf(); 
    //             });
    //             _this.recharge = _this.recharge.concat(applyForAgent);
    //             _this.recharge.sort((a,b)=>{//按时间排序
    //                 return b.time - a.time
    //             });
    //             if(_this.recharge.length>0){
    //                 _this.haveRecharged = true
    //             }else{
    //                 _this.haveRecharged = false 
    //             }
    //         });
    //   },
    //通过代理商转账的充值订单
      getAgentTransferAccounts(){
          let _this = this;
          //请求用户通过代理商申请EMT的订单
            let api = '/user_agent_chongzhi_check/'+_this.$store.state.uid;//提现订单的api
            _this.axios.get(api).then(res=>{
                console.log(res);
                let AgentTransferAccounts = res.data;
                if(AgentTransferAccounts == []){
                   return
                }
                AgentTransferAccounts.forEach(item=>{
                    item.order_time = _this.formatDate(item.order_time);
                    item.time = (new Date(item.order_time)).valueOf(); 
                });
                _this.recharge = _this.recharge.concat(AgentTransferAccounts);
                _this.recharge.sort((a,b)=>{//按时间排序
                    return b.time - a.time
                });
                if(_this.recharge.length>0){
                    _this.haveRecharged = true
                }else{
                    _this.haveRecharged = false 
                }
            });
      },
      //获取充值订单
      getRechargeOrder(){
          //console.log('充值订单');
            let _this = this;
            _this.recharge = [];//清空数组，避免重复添加订单信息
            _this.getCodeRecharge();//获取二维码充值的订单
            _this.getAgentTransferAccounts();//获取代理商转账部分的充值订单
            // _this.getApplyForAgent();//获取向代理商申请EMT充值的订单 
      },
      //获取商品订单
      getShoppingOrder(){
          let _this = this;
          let  api = '/exchange_order_show/'+_this.$store.state.uid;
          _this.axios.get(api).then(res=>{

            //   console.log(res);
              _this.conversion = res.data;
              _this.conversion.forEach(item=>{
                  item.product_order_time = _this.formatDate(item.product_order_time);
              });
              if(_this.conversion.length>0){
                    _this.haveConversion = true
                }else{
                    _this.haveConversion = false 
                }
          });
      }
  },
  mounted(){
      let _this = this;
      _this.getPurchaseOrder();//获取买入操作订单
      //复制物流单号
        var btn = document.getElementById('btn');
        if(btn){
            var clipboard = new Clipboard(btn);//实例化
        }
  },
  watch:{
      tabNum(newValue){
          let _this = this;
        //   //console.log(newValue);
        switch(newValue){
            case "1":
                _this.getPurchaseOrder()
                break;
            case "2":
                _this.getWithdrawOrder()
                break;
            case "3":
                _this.getRechargeOrder()
                break;
            case "4":
                _this.getShoppingOrder()
                break;
        }
      }
  },
  components:{
      barBottom,
  }
}
</script>
<style scoped>
/* 整体样式，让整体页面高度满屏 */
.order{
    height: 97vh;
    background-color: #FFFFFF;
    overflow-y: hidden;
}
/* 头部样式 */
.order>>>.mint-header{
    height: 6vh;
    margin-bottom: .1875rem;
    background-color:#FFFFFF;
    color: #030303;
    border-bottom: .0625rem solid #D7D8DA;
    font-size: 1.125rem;
}
/* 中间部分设定高度 */
.order>>>.middle{
    height: 79vh;
}
/* 中间部分 */
/* 中间tab导航条 */
/* tab导航选项卡 */
.order>>>.tab .mint-navbar{
    height: 5vh;
    margin-bottom: .3125rem;
}
.order>>>.tab .mint-tab-item{
    padding: .625rem 0;
    position: relative;
}
/* 中间tab导航条字体 */
.order>>>.tab .mint-tab-item-label{
    color: #1E1E1E;
    font-size: 1rem
}
/* tab导航条选中项的字体 */
.order>>>.tab .mint-tab-item.is-selected .mint-tab-item-label{
    font-weight: 700;
    font-size: 1.125rem;
    color: #007AFF;
}
/* 替换tab导航条选择项的底部样式 */
.order>>>.mint-navbar .mint-tab-item.is-selected{
    border: none
}
.order>>>.tab .is-selected .mint-tab-item-icon{
    width: 1.25rem;
    height: .3125rem;
    background-color: #007AFF;
    display: block;
    border-radius: .625rem;
    position: absolute;
    left: 40%;
    top: 2.0625rem;
}
/* 买入选项下的内容 */
/* 选项具体内容整体样式 */
.order>>>.mint-tab-container{
    padding: .625rem.3125rem;
    background-color: #FAFAFA;
    overflow: auto;
    height: 79vh;
    overflow-x: hidden;
}
/* 每个订单的整块样式 */
.order>>>.template{
    box-shadow: inset 0 0.625rem .625rem #EEEEEE;
    width: 100%;
    height: 19vh;
    padding: 1.25rem .3125rem 0;
    font-size: .75rem;
    color:#666666 ;
}
/* 购买众筹产品整体样式 */
.order>>>.purchase .purchaseCrowdfunding{
    background-color: #FFFFFF
}
/* 流水号 */
.order>>> .template .number{
    color: #1E1E1E;
    padding-bottom: .5rem;
    border-bottom: .0625rem solid #DFDFDF;
    position: relative;
}
.order>>>.purchase .template>div .numName{
    color:#666666 ;
}
/* 进度 */
.order>>>.blue{
    color: #047CFF;
    margin-left: 1.25rem;
    position: absolute;
    right: .625rem
}
/* 买入tab下内容每个订单的产品基础信息 */
.order>>>.purchase .basicInfo{
    margin-top: .5rem;
    display: flex;
    position: relative;
    height: 9vh;
}
.order>>>.purchase .basicInfo .product{
    margin-top: .3125rem
}
/* 基础信息中产品图片 */
.order>>>.purchase .basicInfo .productImg{
    width:3.125rem;
    height: 3.125rem;
    margin-right: .5rem
}
/* 基础信息产品等级图片 */
.order>>>.purchase .basicInfo .levelImg{
    width: .75rem;
    height: .75rem;
    vertical-align: middle;
    margin-left: .3125rem
}
/* 基础信息中产品名称 */
.order>>>.purchase .basicInfo .productName,.purchase .basicInfo .num{
    color: #1E1E1E;
    font-size: 1rem;
    font-weight: 700;

}
/* 买入产品购买数量 */
.order>>>.purchase .basicInfo .purchaseNum{
    position: absolute;
    right: 1.25rem;
    height: 100%;
    line-height: 3.75rem;
}
/* 买入产品购买时间 */
.order>>>.purchase .purchaseTime{
    margin: .3125rem 0;
}
.order>>>.NoData{
    text-align: center;
    padding: 1.25rem;
    font-size: 1.125rem;
}
/* 提现板块、充值 */
/* 整体样式 */
.order>>>.withdraw .template,.recharge .template{
    padding: .9375rem;
    width: 91%;
    margin-bottom: .5rem;
}
/* 提现、充值状态 */
.order>>>.withdraw .num,.recharge .num{
    color: #1E1E1E;
    font-size: 1.5625rem;
    font-weight: 700;
}
/* 提现、充值数量 */
.order>>>.withdraw .blue,.recharge .blue{
   top: 2.5rem;
}
/* 提现、充值主要内容部分 */
.order>>>table{
    table-layout: fixed;
    font-size: .625rem
}
.order>>>table td{
    padding: .3125rem 0;
}
/* 提现、充值内容中黑色字体 */
.order>>>.black{
    color: #1E1E1E
}
/* 兑换模块 */
.order>>>.recharge .template{
    height: 21.5vh;
}
/* 复制按钮 */
.order>>>.js-copy{
    background-color: #007AFF;
    margin-left: 1.25rem;
    cursor: pointer;
    font-size: .75rem;
    /* text-decoration: underline; */
}
</style>
