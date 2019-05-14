<template>
  <div class="addShoppingAddress">
      <!-- 头部 -->
        <div class="top">
            <mt-header :title="addOrChange+'收货地址'">
                <router-link to="/shoppingAddress" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
        </div>
        <!-- 中间 -->
        <div class="middle">
            <mt-field placeholder="收货人"  v-model="user.receiver"></mt-field>   
            <mt-field  placeholder="手机号码" type="number" v-model="user.mobile"></mt-field>
            <div class="province" @click="toChooseAddress">
                <!-- <mt-picker  :slots="slots" @change="onValuesChange"></mt-picker> -->
                <mt-field  placeholder="所在地区"  v-model="user.area" :readonly='true'></mt-field>
                
            </div>
            <mt-field placeholder="详细地址：如道路、门牌路、小区、楼栋号、单元室等"  v-model="user.detailsAddress"></mt-field>   
            <div class="getNum">
                <mt-popup v-model="agree_agreement" position="top" popup-transition="popup-fade">{{content}}</mt-popup>

            </div>   
            <div class="defaultAddress">
                设为默认地址<mt-switch v-model="user.code"></mt-switch>
            </div>     
        </div>
        <!-- <div class="province"> -->
            <mt-popup class="addressChoose" v-model="addressChoose" position="bottom" popup-transition="popup-fade"> 
                    <!-- <h5>配送至</h5> -->
                    <div class="provinceList">
                        <div class="title">
                            {{provinceTitle}}
                        </div>
                        <div class="content">
                            <ul>
                                <li v-for="(item,index) in province" :key="index" @click="chooseProvince(item,index)">{{item}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="cityList" v-show="provinceTitle != '请选择'">
                        <div class="title">
                            {{cityTitle}}
                        </div>
                        <div class="content">
                            <ul>
                                <li v-for="(item,index) in city" :key="index" @click="chooseCity(item,index)">{{item}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="districtList" v-show="cityTitle != '请选择'">
                        <div class="title">
                            {{districtTitle}}
                        </div>
                        <div class="content">
                            <ul>
                                <li v-for="(item,index) in district" :key="index" @click="chooseDistrict(item,index)">{{item}}</li>
                            </ul>
                        </div>
                    </div>
                </mt-popup>
        <!-- </div> -->
        <!-- 底部 -->
        <div class="bottom">
            <mt-button type="primary" size="large" @click="addAddress">确认</mt-button>
        </div>
  </div>
</template>

<script>
export default {
  name: 'addShoppingAddress',
  data () {
    return {
        addressId:"",//路径上的地址id
        addOrChange:"添加",//添加还是编辑地址
        province:[],//省
        provinceId:[],//省份的id
        city:[],//市
        cityId:[],//市id
        district:[],//区
        districtId:[],//区id
        user:{//用户信息
            receiver:"",//收货人
            mobile:"",//手机号           
            address:"",//整个地址
            area:"",//省市区
            province:"",//省
            provinceId:"",//省ID
            city:"",//市
            cityId:"",//市ID
            district:"",//区
            districtId:"",//区ID
            detailsAddress:"",//详细地址

            code:false,//是否为默认地址
        },      
        provinceTitle:"请选择",
        cityTitle:"请选择",
        districtTitle:"请选择",
        addressChoose:false,//是否显示选择省市区的弹框
        defaultAddress:false,//默认地址
        popupVisible:false,//注册成功与否模态框
        success:true,//注册成功模态框内容
        fail:false,//注册失败模态框内容
        agree_agreement:false,//两次密码验证提示模态框
        content:"",//密码小于6位或者不一致的提示内容
        // oldProvince:"",//原省
        // oldCity:"",//原市
        // oldDistrict:"",//原区
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
        //开始选择地址
        toChooseAddress(){
            let _this = this;
            _this.addressChoose = true;
            _this.getProvince();//获取所有的省份
        },
        //选择省
        chooseProvince(province,index){
            let _this = this;
            // console.log('1111');
            _this.user.province = province;//选择省
            _this.provinceTitle = province;//显示选择的省
            _this.user.provinceId = _this.provinceId[index];

            console.log(_this.user.province,_this.user.provinceId);


            //请求市
            let api = '/address_city';
            _this.axios.post(api,{
                province_id:_this.user.provinceId
            }).then(res=>{
                console.log(res);
                _this.city = res.data.result[0];//省份数组
                _this.cityId = res.data.result[1];//省份ID
            });

        },
        //选择市
        chooseCity(city,index){
            // console.log('2222');

            let _this = this;
            _this.user.city = city;//选择市
            _this.cityTitle = city;//显示选择的市
            _this.user.cityId = _this.cityId[index];

            console.log(_this.user.city,_this.user.cityId);


            //请求区
            let api = '/address_country';
            _this.axios.post(api,{
                city_id:_this.user.cityId
            }).then(res=>{
                console.log(res);
                _this.district = res.data.result[0];//省份数组
                _this.districtId = res.data.result[1];//省份ID

            });

        },
        //选择区
        chooseDistrict(district,index){
            // console.log('2222');

            let _this = this;
            _this.user.district = district;//选择区
            _this.districtTitle = district;//显示选择的区
            _this.user.districtId = _this.districtId[index];

            console.log(_this.user.district,_this.user.districtId);


            _this.addressChoose = false;
            _this.provinceTitle = '请选择';
            _this.cityTitle = '请选择';
            _this.districtTitle = '请选择';
            _this.user.area = _this.user.province + ' ' + _this.user.city + ' ' + _this.user.district;

        },
        //添加地址
        addAddress(){
            let _this = this;
            if(_this.user.receiver == ''){
                _this.agree_agreement = true;//提示用户输入手机号
                _this.content = '请先填写收货人';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }
            if(!_this.isPoneAvailable(_this.user.mobile)){
                _this.agree_agreement = true;//提示用户输入手机号
                _this.content = '请输入正确的手机号';
                setTimeout(() => {
                    _this.agree_agreement = false;//提示用户同意协议
                }, 5000);
                return
            }
            _this.user.address = _this.user.province + '-' + _this.user.city + '-' + _this.user.district + '-' + _this.user.detailsAddress;
            let api = '/address_details';
            _this.axios.post(api,{
                uid:_this.$store.state.uid,
                address:_this.user.address,
                receiver:_this.user.receiver,
                mobile:_this.user.mobile,
                code:_this.user.code?'yes':'no',
                address_id:_this.addressId,//地址id，如果是添加地址就是 默认 -1 ，编辑地址就是地址的address_id

            }).then(res=>{
                console.log(res);
                if(res.data.staus_code == 'ok'){//请求成功
                    // _this.$router.push({
                    //     path:"/shoppingAddress"
                    // });
                    _this.$router.back();
                }else{
                    _this.agree_agreement = true;//提示用户输入手机号
                    _this.content = '添加地址失败，请重试';
                    setTimeout(() => {
                        _this.agree_agreement = false;//提示用户同意协议
                    }, 5000);
                    return
                }
            });
        },
        //获取所有的省份
        getProvince(){
            let _this = this;
            let api = '/address_province';
            _this.axios.get(api).then(res=>{
                // _this.slots[0].values = res.data.result[0];//省份名称
                _this.province = res.data.result[0];//省份数组
                _this.provinceId = res.data.result[1];//省份ID
            });
        },
        
        //编辑地址时获取地址信息
        getChangeAddress(address_id){
            let _this = this;
            let api = '/address_change';
            _this.axios.post(api,{
                uid:_this.$store.state.uid,
                address_id,
            }).then(res=>{
                console.log(res);
                _this.user = res.data.result[0];
                let arr = _this.user.address.split('-');


                _this.user.province = arr[0];//省
                _this.user.city = arr[1];//市
                _this.user.district = arr[2];//区
                _this.user.area = _this.user.province + ' ' + _this.user.city + ' ' + _this.user.district ;
                _this.user.detailsAddress = arr[3];//详细地址

                _this.user.code = _this.user.code == 'yes' ? true : false;//是否为默认地址
            });
        }
  },
  mounted(){
      let _this = this;

      _this.addressId = _this.$route.params.addressId;//获取地址id，如果有，则显示为添加地址
      if(_this.addressId == -1){
          _this.addOrChange = '添加';
      }else{
          _this.addOrChange = '编辑';
          _this.getChangeAddress(_this.addressId);//编辑地址时获取地址信息

      }


    //   let pwdKind  = _this.$route.params.pwdKind;//接收确认修改的密码这里
      ////console.log(pwdKind);
    //   _this.pwdKind = pwdKind == 'login'?'登录密码':'支付密码';
  }
}
</script>

<style scoped>
/* 整体样式 */
.addShoppingAddress{
    overflow-y: hidden;
}
/* 搜索内容部分列表 */
.addShoppingAddress>>>ul{
    list-style: none;
    padding-left: 0;
    margin: 0;
    color: #525151;
    /* display: none; */
}
/* 头部样式 */
.addShoppingAddress>>>.mint-header{
    height: 50px;
    margin-bottom: 20px;
}
/* 头部文字样式 */
.addShoppingAddress>>>.mint-header-title{
    font-size: 18px;
}
/* .addShoppingAddress>>>.middle{
    position: relative;
} */

/* 输入框样式 */
.addShoppingAddress>>>.mint-field-core{
    background-color:transparent;
    line-height: 2.4 ;
    padding-left: 10px;
    margin-top: 20px;
    border-bottom: .09375rem solid #F5F5F5;
}
/* 消除输入框外层标签的盒子边框 */
.addShoppingAddress>>>.mint-cell-wrapper{
    background-size:120% 0px;
}
/* 修改input-placeholder的样式 */
.addShoppingAddress>>>input::-webkit-input-placeholder{
    color: #CCCCCC;
}
/* 清除闪动 */
/* 联动省市 */
.addShoppingAddress>>>.province{
    transform:translate3d(0,0,0);
    overflow:hidden;
}
/* 省市级输入框 */
/* .addShoppingAddress>>>.province .v-modal{
    position: absolute;
    bottom: 0 !important;
} */
/* 联动省市子级 */
/* .addShoppingAddress>>>.picker{
    transform:translate3d(0,0,0)
} */

/* 设为默认地址 */
.addShoppingAddress>>>.defaultAddress{
    margin-top: 1.25rem;
    padding-left: 1.125rem;
}
.addShoppingAddress>>>.defaultAddress .mint-switch{
    display: inline-block;
    float: right;
}

/* 注册按钮样式 */
.addShoppingAddress>>>.bottom .mint-button{
    margin-top: 60px;
    background: rgba(0, 122, 255, 0.7);
}
/* 60s之内勿重复验证提示框 */
.addShoppingAddress>>>.getNum .mint-popup{
    background-color: transparent;
    color: white;
    height: 2%;
    line-height: 40px;
    border: none;
}
/* 60s验证提示框模板 */
.addShoppingAddress>>>.getNum .v-modal{
    height: 8% !important;
}
/* 模态框内容 */
/* 确认认权模态框样式 */
.addShoppingAddress>>>.v-modal{
    height: 100%;
}
.addShoppingAddress>>>.mint-popup{
    width: 60vw;
    height: 30vh;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #009FE8;
    border-radius: 10px;
    text-align: center;
    padding: 6px 0px;
}
/* 模态框下所有按钮 */
.addShoppingAddress>>>.affirmModal button{
    width: 60%;
    background: #57A6FE;
}
/* 模态框关闭按钮样式 */
.addShoppingAddress>>>.closeModal img{
    position: absolute;
    top: .625rem;
    right: .8125rem;
    width: 1.25rem;
    height: 1.25rem;
}
/* 注册成功或者失败样式 */
.addShoppingAddress>>>.affirmSuccess,.affirmError{
    color:  #007AFF;
    padding-top: 7px;
}
/* 注册成功√或者失败!图标样式 */
.addShoppingAddress>>>.affirmSuccess img,.affirmError img{
    width: 3.75rem;
    height: 3.75rem;
    margin-bottom: .625rem;
}
/* 注册成功或者失败按钮样式 */
.addShoppingAddress>>>.affirSuccessBtn,.affirErrorBtn{
    padding: 0 25PX;
    position: relative;
    top: .1875rem;
}
/* 省市联动 模态框 */
.addShoppingAddress>>>.addressChoose.mint-popup{
    width:100vw;
}
/* 每一块 */
.addShoppingAddress>>>.addressChoose.mint-popup>div{
    width: 33%;
    color: #908c8c;
    float: left;
}
/* 省市区 选中的显示在title */
.addShoppingAddress>>>.addressChoose.mint-popup>div .title{
    padding: .625rem 0;
}
/* 每一块的内容，省、市、区 */
.addShoppingAddress>>>.addressChoose.mint-popup>div .content{
    height:26vh;
    overflow-y: auto;
}
.addShoppingAddress>>>.addressChoose.mint-popup>div li{
    padding: .1875rem 0;
}
</style>
