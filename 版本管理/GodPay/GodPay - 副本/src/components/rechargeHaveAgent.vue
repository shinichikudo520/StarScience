<template>
<!-- 充值页面 -->
  <div class="recharge">
      <!-- 头部 -->
    <div class="top">
        <mt-header title="充值">
            <router-link to="/personCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="middle">
        <!-- tab选项卡 -->
        <div class="tab">
            <mt-navbar v-model="tabNum">
                <mt-tab-item id="1">二维码</mt-tab-item>
                <mt-tab-item id="2">代理商</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="tabNum">
                <mt-tab-container-item id="1"  >
                    <!-- 二维码对应选项卡内容 -->
                    <p>EMT 充值</p>
                    <!-- <img src="../assets/img/QRCode.jpg" alt="" ref="QRcodeImg"> -->
                    <div id="QRCode">
                        <div id='code'></div>
                        <canvas id="canvas"></canvas>
                    </div>
                    <p style="font-size:12px;text-align:center;color:red;">长按保存</p>
                    <div class="address small">
                        {{copyValue}}
                    </div>
                    <div>
                        <!-- <button type="primary" class="saveImg btn" :data-clipboard-text="copyValue">复制地址</button> -->
                        <mt-button type="primary" class="saveImg js-copy" id="btn" :data-clipboard-text="copyValue">复制地址</mt-button>
                        <!-- <mt-button type="primary" class="saveImg sureRecharge" @click="sureRecharge">确认充值</mt-button> -->
                    </div>
                    <div class="small">
                        <span class="red">注意：</span>转入EMT数量≤2000个，无法转入进账
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <!-- 代理商对应选项卡内容 -->
                    <div class="agent" >
                        <div class="seachPart shadow">
                            <mt-field placeholder="搜索代理商手机号" type="tel" v-model="phone" :disableClear='true'></mt-field>
                            <img src="../assets/img/seach.jpg" class="seach" alt="" @click="searchAgent">
                        </div>
                        <div class="agentList">
                            <template v-if="haveAgent">
                                <div class="agents" v-for="(item,index) in showAgent" :key="index" @click="showModal(item)">
                                    <p class="userName">{{item.agent_name}}</p>
                                    <p>
                                        <span>资&nbsp;&nbsp;&nbsp;产：<span class="red">{{item.agent_quantity}}</span>  EMT</span>&nbsp;&nbsp;&nbsp;
                                        <span>手机号：{{item.agent_uphone}}</span>
                                    </p>
                                </div>
                                <!-- <div class="agents" @click="showModal('test')">
                                    <p class="userName">用户名</p>
                                    <p>
                                        <span>资&nbsp;&nbsp;&nbsp;产：<span class="red">100000</span>  EMT</span>&nbsp;&nbsp;&nbsp;
                                        <span>手机号：138 1688 9888</span>
                                    </p>
                                </div> -->
                            </template>
                            <template v-if="!haveAgent">
                                <div class="NoData">
                                    暂无数据
                                </div>
                            </template>
                            <!-- <div class="agents">
                                <p class="userName">用户名</p>
                                <p>
                                    <span>资&nbsp;&nbsp;&nbsp;产：<span class="red">100000</span>  EMT</span>&nbsp;&nbsp;&nbsp;
                                    <span>手机号：138 1688 9888</span>
                                </p>
                            </div>
                            <div class="agents">
                                <p class="userName">用户名</p>
                                <p>
                                    <span>资&nbsp;&nbsp;&nbsp;产：<span class="red">100000</span>  EMT</span>&nbsp;&nbsp;&nbsp;
                                    <span>手机号：138 1688 9888</span>
                                </p>
                            </div>
                            <div class="agents">
                                <p class="userName">用户名</p>
                                <p>
                                    <span>资&nbsp;&nbsp;&nbsp;产：<span class="red">100000</span>  EMT</span>&nbsp;&nbsp;&nbsp;
                                    <span>手机号：138 1688 9888</span>
                                </p>
                            </div>
                            <div class="agents">
                                <p class="userName">用户名</p>
                                <p>
                                    <span>资&nbsp;&nbsp;&nbsp;产：<span class="red">100000</span>  EMT</span>&nbsp;&nbsp;&nbsp;
                                    <span>手机号：138 1688 9888</span>
                                </p>
                            </div>
                            <div>
                                <p class="userName">用户名</p>
                                <p>
                                    <span>资&nbsp;&nbsp;&nbsp;产：<span class="red">100000</span>  EMT</span>&nbsp;&nbsp;&nbsp;
                                    <span>手机号：138 1688 9888</span>
                                </p>
                            </div> -->
                        </div>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
    <div class="getNum">
        <mt-popup v-model="agree_agreement" position="top" popup-transition="popup-fade">{{content}}</mt-popup>
    </div>
    <!-- 充值确认模态框 -->
    <div class="affirmModal">
        <mt-popup v-model="showAffirmModal" popup-transition="popup-fade">
            <p class="closeModal" @click="hiddenModal">
                <img src="../assets/img/closeBtn.jpg" alt="">
            </p>
            <!-- 充值确认的详细信息内容 -->
            <template v-if="detailsInfo">
                <div class="modalText">
                    <!-- <mt-field class="pwdInput" placeholder="请输入钱包地址" type="number" v-model="walletAddress"></mt-field> -->
                    <div class="applyEMT">
                        申请EMT 
                    </div>
                    <mt-field class="pwdInput" :disableClear='true' placeholder="请输入申请EMT数量" type="number" v-model="applyEMT.order_quantity"></mt-field>
                    <mt-field class="pwdInput" :disableClear='true' placeholder="请输入交易密码" type="password" v-model="applyEMT.payment_password"></mt-field>
                    <mt-button size="small" type="primary" @click="affirmPwdMays" class="affirmBtn">提交申请</mt-button>
                </div>
            </template>
            <!-- 充值成功 -->
            <template v-else-if="affirmSuccess">
                <div class="affirmSuccess">
                    <img src="../assets/img/success.jpg" alt="">
                    <div>充值申请成功</div>
                    <div class="small">请前往我的订单里查看进度！</div>
                    <mt-button size="small" type="primary"  class="affirSuccessBtn" @click="hiddenModal">确认</mt-button>
                </div>
            </template>
            <!-- 充值失败 -->
            <template v-else-if="affirmError">
                <div class="affirmError">
                    <img src="../assets/img/error.jpg" alt="">
                    <div>充值申请失败</div>
                    <mt-button size="small" type="primary"  class="affirErrorBtn" @click="hiddenModal">重试</mt-button>
                </div>
            </template>
        </mt-popup>
    </div>
    <div class="bottom">
        <bar-bottom></bar-bottom>
    </div>
  </div>
</template>

<script>
import barBottom from './barBottom.vue'
import QRCode from 'qrcode'
import Clipboard from 'clipboard'
export default {
  name: 'recharge',
  data () {
    return {
        tabNum:"1",//选中的tab选项
        copyValue:"复制钱包地址",//复制钱包地址
        codes:'',//二维码
        agent:[],//代理商列表
        showAgent:[],//显示的代理商列表
        haveAgent:false,//有没有代理商
        phone:"",//代理商手机号
        showAffirmModal:false,//充值确认框
        detailsInfo:false,//充值确认模态框详细信息
        applyEMT:{
            uid:"",//用户uid
            agent_uphone:"",//代理商手机号
            order_quantity:"",//申请数量
            payment_password:"",//支付密码
        },//申请EMT参数
        // num:"",//充值EMT数量
        // tradePwd:"",//交易密码
        affirmSuccess:false,//充值成功
        affirmError:false,//充值失败
        agree_agreement:false,//是否同意协议提示模态框或者两次密码是否一致
        content:"",//协议或者密码不一致
        // errorReason:"",//充值失败的原因
    }
  },
  methods:{  
      //保存图片
    //   saveImg(){
    //       let _this = this;
    //       let imgSrc  = _this.$refs.QRcodeImg.src;
    //       //console.log(imgSrc)
    //       let a = document.createElement('a');
    //       a.href = imgSrc;
    //       a.download = '充值二维码';
    //       a.click();
    //   },
      //显示充值确认模态框
        showModal(item){
            let  _this = this;
            //console.log(item)
            _this.applyEMT.agent_uphone = item.agent_uphone;//代理商手机号
            // _this.applyEMT.agent_uphone = '13530777957';//代理商手机号
            _this.showAffirmModal = true;
            _this.detailsInfo = true;//显示充值模态框时第一次显示的内容一定是详细信息内容
        },
        // 隐藏充值确认模态框
        hiddenModal(){
            let  _this = this;
            _this.showAffirmModal = false;
            _this.errorReason = "";
            // _this.paymentMethod = true;//关闭模态框后必须设置详情页为默认页。防止其他模态框模板内容出现
        },
        // 确认提交:向代理商申请EMT
        affirmPwdMays(){
            let  _this = this;
            _this.applyEMT.uid = _this.$store.state.uid;//获取用户id
            //console.log(_this.applyEMT,'applyEMT');            
            let api = '/User_agent_recharge';
            _this.axios.post(api,_this.applyEMT).then(res=>{
                //console.log(res.data);

                if(res.data.order_quantity > 0){//申请成功
                    _this.detailsInfo = false
                    _this.affirmSuccess = true
                    Object.keys(_this.applyEMT).forEach(item=>{
                        _this.applyEMT[item] = "";
                    });
                }else{//申请失败
                    _this.detailsInfo = false
                    _this.affirmError = true
                }
            }).catch(error=>{
                //console.log(error.response);
                let status = error.response.status;//获取状态
                if(status == 400){//报400错误
                    // _this.hiddenModal();//隐藏购买模态框
                    _this.agree_agreement = true;//提示框
                    _this.content = error.response.data.order_quantity[0];
                    setTimeout(() => {
                        _this.agree_agreement = false;//提示用户同意协议
                        _this.hiddenModal();//隐藏模态框
                    }, 5000);
                    return
                }
            });
            
            
        },
        // //确认充值成功
        // affirSuccessWays(){

        // },
        // //确认充值失败
        // affirmErrorWays(){

        // },
        //生成二维码
        qrCode (url) {
            let _this = this;
            let fatherQrcode = document.getElementById('QRCode');
            
            //先清除fatherQrcode的img子节点：防止重复添加
            let childs = fatherQrcode.children; 
            //console.log(childs);
            for(var i = childs .length - 1; i >= 0; i--) {
                // //console.log(typeof childs[i])
                if(childs[i].className == "QRCode"){
                    fatherQrcode.removeChild(childs[i]);
                }
            }

            var canvas = document.getElementById('canvas');
            QRCode.toCanvas(canvas, url, function (error) {
            // if (error) //console.error(error)
            //console.log('success!');
            })

            //获取网页中的canvas对象
            var mycanvas1=document.getElementsByTagName('canvas')[0];
            mycanvas1.style.display = 'none'//隐藏生成的canvas
            //将转换后的img标签插入到html中
            var img=_this.convertCanvasToImage(mycanvas1);
            img.classList.add("QRCode");
            fatherQrcode.append(img);//imagQrDiv表示你要插入的容器id

        },
        //转换为img
        convertCanvasToImage(canvas) {
            //新Image对象，可以理解为DOM
            var image = new Image();
            // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
            // 指定格式 PNG
            image.src = canvas.toDataURL("image/jpg");
            return image;
        },
        //获取充值地址
        getQRcode(){
            let  _this = this;
            let api = '/company_address/'+_this.$store.state.uid;
            _this.axios.get(api).then(res=>{
                //console.log(res);
                let address = res.data[0].company_address
                //获取二维码图片路径
                _this.qrCode(address);//地址地址生成二维码
                _this.copyValue = address;//复制钱包地址
            });
        },
        // //确认二维码充值
        // sureRecharge(){
        //     let  _this = this;
        //     let api = '/user_recharge_emt';
        //     _this.axios.post(api,{
        //         uid:_this.$store.state.uid
        //     }).then(res=>{
        //         //console.log(res);
        //         //充值成功？？？失败？？？=>模态框
        //         _this.showAffirmModal = true;
        //         if(res.data.status_end == 'ok'){
        //             _this.affirmSuccess = true;//确认密码后确认成功
        //             _this.affirmError = false;//确认密码后确认成功

        //         }else{
        //             _this.affirmSuccess = false;//确认密码后确认成功
        //             _this.affirmError = true;//确认密码后确认成功
        //             _this.errorReason = res.data;
        //         }
                
        //     });
            
        // },   
        //获取代理商信息
        getAgentInfo(){
            let _this = this;
            let api = '/agent_display';
            _this.axios.get(api).then(res=>{
                _this.showAgent = _this.agent = res.data;
                //console.log('代理商列表',_this.agent);
                if(_this.agent.length>0){//有代理商
                    _this.haveAgent = true
                }else{
                    _this.haveAgent = false
                }
            });
        },
        //查找代理商
        searchAgent(){
            let _this = this;
            if(_this.phone == ""){
                _this.showAgent = _this.agent;
                return
            }
            _this.showAgent = _this.agent.filter(item=>{
                return item.agent_uphone.indexOf(_this.phone) > -1
            });
        }
  },
  mounted(){
    let _this = this;

    //复制钱包地址
    var btn = document.getElementById('btn');
    var clipboard = new Clipboard(btn);//实例化
    _this.getQRcode();//获取钱包地址
  },
  watch:{
      tabNum(newValue){
          let  _this = this;
          switch(newValue){
            case '1':
                _this.getQRcode();//获取充值二维码
                break;
            case '2':
                _this.getAgentInfo();//获取代理商用户信息
                break;
          }
      }
  },
  components:{
      barBottom,
      QRCode: QRCode,
  }
}
</script>
<style scoped>
/* 整体样式，让整体页面高度满屏 */
.recharge{
    height: 97vh;
    background-color: #FFFFFF;
    overflow-y: hidden;
    background: rgba(0, 122, 255, 0.6);
}
/* 底部阴影样式 */
.recharge>>>.shadow{
    box-shadow: 0 .625rem 1.25rem #E7E9EB ;
}
/* 头部样式 */
.recharge>>>.mint-header{
    height: 6vh;
    color: #FFFFFF;
    background-color: transparent;
}
/* 中间部分设定高度 */
.recharge>>>.middle{
    height: 79vh;
}
/* 中间部分 */
/* 中间tab导航条 */
/* tab导航选项卡 */
.recharge>>>.tab .mint-navbar{
    height: 5vh;
    background-color: transparent;
}
.recharge>>>.tab .mint-tab-item{
    padding: .625rem 0;
    position: relative;
}
/* 中间tab导航条字体 */
.recharge>>>.tab .mint-tab-item-label{
    color: #FFFFFF;
}
/* tab导航条选中项的字体 */
.recharge>>>.tab .mint-tab-item.is-selected .mint-tab-item-label{
    /* font-weight: 700; */
    font-size: 1.125rem;
    color: #FFFFFF;
}
/* 替换tab导航条选择项的底部样式 */
.recharge>>>.mint-navbar .mint-tab-item.is-selected{
    border: none
}
.recharge>>>.tab .is-selected .mint-tab-item-icon{
    width: 1.25rem;
    height: .3125rem;
    background-color: #FFFFFF;
    display: block;
    border-radius: .625rem;
    position: absolute;
    left: 45%;
    top: 2.0625rem;
}
/* 选项下的内容 */
/* 选项具体内容整体样式 */
.recharge>>>.mint-tab-container{
    padding: .625rem.3125rem;
    background-color: #FAFAFA;
    width: 86%;
    margin: 0 auto;
    margin-top: 2.8125rem;
    border-radius: .625rem;
    text-align: center;
}
/* 二维码选项下的内容 */
.recharge>>>.QRcode{
    color: #666666;
}
.recharge>>>img.QRcode{
    -webkit-touch-callout: default;
}
/* 地址*/
.recharge>>>.address{
    background-color: #F6F8FA;
    margin: 0 auto;
    margin-top: .5rem;
}
/* 小字 */
.recharge>>>.small{
    font-size: .75rem;
    padding: 1.25rem 0;
    color: #666666;
}
/* 二维码注意部分 */
.recharge>>>.red{
    color: #D0021B
}
/* 保存图片按钮 */
.recharge>>>.saveImg{
    border-radius: 1.25rem;
    font-size: .875rem;
    padding: 0 1.125rem;
    background: rgba(0, 122, 255, 0.7);
    margin:0 .9375rem;
}
/* 确认充值按钮 */
/* .recharge>>>.sureRecharge{
    background: transparent;
    color: #097EFF;
    border: .0625rem solid #097EFF;
} */
/* 代理商版块 */
.recharge>>>.seachPart{
    background-color: transparent;
    margin-bottom: 1.25rem;
    border-radius: .625rem;
}
.recharge>>>.agent .mint-cell{
    margin: 0 auto;
    border: .0625rem solid rgba(0, 0, 0, 0.1);
    border-radius: .625rem;
    position: relative;
}
.recharge>>>.NoData{
    text-align: center;
    padding: 1.25rem;
    font-size: 1.125rem;
}
/* 输出框placeholder */
.recharge>>>input::-webkit-input-placeholder{
    color: #9B9B9B;
}
/* 搜索图标 */
.recharge>>>.seach{
    position: absolute;
    right: 1.5rem;
    top: 1.625rem;
    width: 1.25rem;
    height: 1.25rem;
}
/* 代理商列表模板 */
.recharge>>>.agentList{
    font-size: .6875rem;
    text-align: left;
    padding:0 .625rem;
    overflow-y: auto;
    height: 50vh;
}
.recharge>>>.agentList .agents{
    border-bottom: .0625rem solid #E7E9EB;
}
.recharge>>>.agentList .userName{
    font-size: .875rem;
    font-weight: bold;  
}
.recharge>>>.agentList .red{
    color: red;
}
/* 提示框 */
.recharge>>>.getNum .mint-popup{
    background-color: transparent;
    color: white;
    height: 2%;
    line-height: 40px;
    border: none;
}
/* 确认充值模态框样式 */
.recharge>>>.mint-popup{
    width: 60vw;
    height: 15.9375rem;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #009FE8;
    border-radius: 10px;
    text-align: center;
    padding: 6px 0px;
}
/* 模态框关闭按钮样式 */
.recharge>>>.closeModal img{
    position: absolute;
    top: .625rem;
    right: .8125rem;
    width: 1.25rem;
    height: 1.25rem;
}
.recharge>>>.affirmModal button{
    width: 60%;
    margin-top: .875rem;
    background: #0879F4;
    border-radius: 1.25rem;
}
/* 详情页 */
/* 模态框详情页文字样式 */
.recharge>>>.modalText{
    font-size: 19px;
    padding-top: .9375rem;
    color: #007AFF;
}
/* 输入密码部分输入框样式 */
.recharge>>>.pwdInput{
    background-color: transparent;
}
.recharge>>>.pwdInput .mint-cell-wrapper{
    width: 100% !important;
}
.recharge>>>.pwdInput .mint-cell-value{
    flex: 0.9 !important;
    margin: 0 auto;
}
.recharge>>>.pwdInput input{
    border: 1px solid #BBBBBB;
    border-radius: 5px;
    background-color: #F2F2F2;
    padding-left: 15px;
}
.recharge>>>.pwdInput input::-webkit-input-placeholder{
    color: #D3CDCC;
}
/* 购入成功页或者失败页 */
/* 充值成功或者失败部分样式 */
.recharge>>>.affirmSuccess,.affirmError{
    color:  #007AFF;
    padding-top: 7px;
}
/* 充值成功√或者失败!图标样式 */
.recharge>>>.affirmSuccess img,.affirmError img{
    width: 3.75rem;
    height: 3.75rem;
    margin-bottom: .625rem;
}
/* 充值成功或者失败按钮样式 */
.recharge>>>.affirSuccessBtn,.affirErrorBtn{
    padding: 0 25PX;
    position: relative;
    top: 1.25rem;
    /* margin-top: .3125rem; */
}
/* 充值失败、成功模态框小字 */
.recharge>>>.affirmSuccess .small{
    font-size: .625rem;
    color: #666666;
    padding: .875rem 0;

}
</style>
