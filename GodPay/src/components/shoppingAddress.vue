<template>
  <div class="shoppingAddress">
      <!-- shopping页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="我的收货地址">
            <router-link to="/personCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <div class="productAddress" v-for="(item,index) in addressList" :key="index">
            <p class="consignee"><span>{{item.receiver}}</span><span class="uphone">{{item.mobile}}</span></p>
            <img src="../assets/img/defaultAddress.jpg" alt="" v-if="item.code == 'yes'" class="defaultAddressIcon">
            <div class="address">
                <div class="addressDetails">{{item.address}}</div>
                <div class="compileBtn" @click="changeAddress(item.address_id)">编辑</div>
                <div class="deleteBtn" @click="deleteAddress(item.address_id,item.code)">删除</div>
            </div>
        </div>
        <div class="addAddress">
            <mt-button type="primary" class="addAddressBtn" @click="toAddAddress">添加地址</mt-button>
        </div>
    </div>
    <div class="getNum">
        <mt-popup v-model="agree_agreement" position="top" popup-transition="popup-fade">{{content}}</mt-popup>
    </div>
    <div class="bottom">
        <bar-bottom></bar-bottom>
    </div>
  </div>
</template>

<script>
import barBottom from './barBottom.vue'
export default {
  name: 'shoppingAddress',
  data () {
    return {
        addressList:[],//地址列表
        agree_agreement:false,//提示模态框显示
        content:"",//提示内容
    }
  },
  mounted(){
      let _this = this;
      _this.getAddressList();//获取地址列表
  },
  methods:{
      //去添加地址
      toAddAddress(){
          let _this = this;
          _this.$router.push({
              path:"/addShoppingAddress/-1"
          });
      },
      //获取地址列表
      getAddressList(){
          let _this = this;
          let api = '/address_many_show';
          _this.axios.post(api,{
              uid:_this.$store.state.uid
          }).then(res=>{
              console.log('地址列表',res);
              _this.addressList = res.data.result;
          });
      },
      //删除地址
      deleteAddress(address_id,code){
          let _this = this;
          let api = '/address_delete';
          _this.axios.post(api,{
              uid:_this.$store.state.uid,
              address_id,
              code:code?'yes':'no',
          }).then(
              res=>{
                  console.log(res);
                  if(res.data.staus_code == '删除成功'){
                      _this.agree_agreement = true;//提示用户输入手机号
                        _this.content = res.data.staus_code;
                        setTimeout(() => {
                            _this.agree_agreement = false;//提示用户同意协议
                        }, 5000);

                    _this.getAddressList();//刷新地址列表
                  }
              }
          );
      },
      //去编辑地址
      changeAddress(address_id){
          let _this = this;
          _this.$router.push({
              path:"/addShoppingAddress/"+address_id
          });
      }
  },
  
  components:{
      barBottom,
  }
}
</script>
<style scoped>
/* 整体样式，让整体页面高度满屏 */
.shoppingAddress{
    height: 95vh;
    background-color: #F6F8FA;
    overflow-y: hidden;
}
/* 60s之内勿重复验证提示框 */
.shoppingAddress>>>.getNum .mint-popup{
    background-color: transparent;
    color: white;
    height: 2%;
    line-height: 40px;
    border: none;
}
/* 60s验证提示框模板 */
.shoppingAddress>>>.getNum .v-modal{
    height: 8% !important;
}
/* 头部样式 */
.shoppingAddress>>>.mint-header{
    height: 6vh;
    margin-bottom: .1875rem;
    background-color: #F7F7F8;
    color: #444444;
    border-bottom: .0625rem solid #D7D8DA;
}
/* 中间部分 */
.shoppingAddress>>>.productAddress{
    background-color: white;
    padding: .625rem;
    margin: .625rem;
    color: #444444;
    position: relative;
}
/* 收货人 */
.shoppingAddress>>>.consignee{
    padding-left:  1.5625rem;    
}
/* 收货人手机号 */
.shoppingAddress>>>.uphone{
    margin-left: 1.25rem;
    font-size: .75rem;
}
/* 默认地址图标 */
.shoppingAddress>>>.defaultAddressIcon{
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 0;
    right: 0;
}
/* 收货地址 */
.shoppingAddress>>>.address{
    line-height: 1.5625rem;
    margin: 0;
    padding-left: 1.5625rem;
    background: url('../assets/img/address.jpg') 0 .625rem no-repeat;
    background-size: 1.25rem;

}
.shoppingAddress>>>.address>div{
    display: inline-block;
}
/* 详细地址 */
.shoppingAddress>>>.addressDetails{
    width: 80%;
    padding-right: 5%;
    border-right: 1px solid #777777;
    margin-right: .625rem;
}
/* 编辑按钮 */
.shoppingAddress>>>.compileBtn{
    color: #777777;
    cursor: pointer;
    position: absolute;
    top: 50%;
    color: #007AFF
}
.shoppingAddress>>>.deleteBtn{
    position: absolute;
    top: 72%;
    color: #EB3B43;
}
/* 添加地址版块 */
.shoppingAddress>>>.addAddress{
    text-align: center;
}
/* 添加地址按钮 */
.shoppingAddress>>>.addAddressBtn{
    background-color: #007AFF;
    padding: 0 3.75rem;
    margin-top: 1.875rem;
}
</style>
