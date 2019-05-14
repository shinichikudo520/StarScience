<template>
  <div class="share">
      <!--分享 页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="分享">
            <!-- <img @click="showModal" slot="right" src="../assets/img/shareIcon.jpg" alt=""> -->
        </mt-header>
        <div class="basicInfo shadow">
            <div class="firstInfo">
                <span class="black">{{shareDetails.username}}</span>
                <img :src="levelImg" alt="">
                <img class="shareQRcode" @click="showModal"  src="../assets/img/shareQRcode.jpg" alt="">
            </div>
            <div class="shareCondition ">
                <!-- 分享总况 -->
                <div class="shareNum">
                    <div>
                        <p>代 理</p>
                        <p class="black">{{shareDetails.referee_username==""?"无":shareDetails.referee_username}}</p>
                    </div>
                    <div>
                        <p>合 伙</p>
                        <p class="black">{{shareDetails.subordinate_total}}人</p>
                    </div>
                    <div class="last">
                        <p>合 作</p>
                        <p class="black">{{shareDetails.lowersubordinate_total}}人</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="middle">
        <!-- 选项部分 -->
        <div class="option shadow">
            <div class="optionDiv1" @click="toMultiply">
                详情（{{shareDetails.total_multiple}}）<span class="more">&gt;</span>
                <!-- <img src="../assets/img/more.jpg" class="moreImg" alt=""> -->
            </div>
            <div class="optionDiv2" @click="toAccelerate">
                产品进度（{{shareDetails.PushBetweenAll * 100}} %）<span class="more">&gt;</span>
                <!-- <img src="../assets/img/more.jpg" class="moreImg" alt=""> -->
            </div>
        </div>
    </div>
    <div class="bottom">
        <bar-bottom></bar-bottom>
    </div>
    <!-- 提现确认模态框 -->
    <div class="affirmModal">
        <mt-popup v-model="showAffirmModal" popup-transition="popup-fade">
            <p class="closeModal" @click="hiddenModal">
                <img src="../assets/img/closeBtn.jpg" alt="">
            </p>
            <p class="shareText">
                分享
            </p>
            <div id="QRCode">
                <!-- <img src="../assets/img/QRCode.jpg" alt="网络错误，请重试！" class="QRCode"> -->
                <!-- <div id="qrcode" ref="qrcode" class="QRCode"></div> -->
                <div id='code'></div>
                <canvas id="canvas"></canvas>
                <p style="font-size:12px;text-align:center;color:red;">长按保存</p>
            </div>
        </mt-popup>
    </div>
  </div>
</template>

<script>
import barBottom from './barBottom.vue'
import QRCode from 'qrcode'
export default {
  name: 'share',
  data () {
    return {
        showAffirmModal:false,//提现确认框     
        levelImg:"",//用户等级图片
        shareDetails:{},//分享情况
    }
  },
  methods:{
        // 调转到倍化明细页面
        toMultiply(){
            let _this = this;
            //console.log('去倍化明细页面');
            _this.$router.push({path:"/multiply"});
        },
        // 调转到加速明细页面
        toAccelerate(){
            let _this = this;
            //console.log('去加速明细页面');
            _this.$router.push({path:"/accelerate"});
        },
        //获取分享二维码：显示模态框
        showModal(){
            let _this = this;
            _this.showAffirmModal = true;
            _this.qrCode();
        },
        // 隐藏模态框
        hiddenModal(){
            let  _this = this;
            _this.showAffirmModal = false;
        },
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
            QRCode.toCanvas(canvas, 'https://www.bopinshangcheng.com/#/register/?uphone'+_this.$store.state.uphone, function (error) {
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
        //获取分享情况
        getShareSituation(){
            let _this = this;
            let api = '/spread';
            _this.axios.post(api,{
                uid:_this.$store.state.uid,
            }).then(res=>{
                _this.shareDetails = res.data.spread_result[0];
                //console.log('分享情况',res);
                
            });
        },
  },
  mounted(){
      let _this = this;
      let level = _this.$store.state.userInfo.grade;
      if(level){
          _this.levelImg = require('../assets/img/level'+level+'.jpg');
      }
      _this.getShareSituation();//初始化分享情况
        //console.log(_this.$store);
  },
  components:{
      barBottom,
      QRCode: QRCode,
  }
}
</script>
<style scoped>
/* 整体样式，让整体页面高度满屏 */
.share{
    overflow-y: hidden;
    height: 97vh;
    background-color: #FFFFFF;
}
.barBottom>>>.shareIcon{
    background: url("../assets/img/selectedShare.jpg") 35px 7px no-repeat;
    background-size: 1.4375rem;
}
/* 底部阴影样式 */
.share>>>.shadow{
    box-shadow: 0 .625rem 1.25rem #E7E9EB ;
}
/* 上部分 */
.share>>>.top{
    width: 85vw;
    height: 16vh;
    background: rgba(0, 122, 255, 0.6);
    color: white;
    position: relative;
    padding:.625rem 1.25rem;
    /* overflow: auto; */
}
/* 头部样式 */
.share>>>.top header{
    background-color: transparent;
    height: 23%;
    font-size: 1.125rem;
    margin-bottom: 1.25rem
}
/* 头部分享图标样式 */
/* .share>>>.mint-header img{
    width: 1.25rem;
    height: 1.25rem;
} */
/* 基础信息 */
.share>>>.basicInfo{
    background-color: #FFFFFF;
    color: #666666;
    font-size: .875rem;
}
/* 基础信息的黑色字体 */
.share>>>.basicInfo .black{
    color: #1E1E1E;
    font-weight: 700;
}
/* 基本信息第一行信息 */
.share>>>.firstInfo{
    height: 10%;
    padding-left: 1.375rem;
    padding-top: 1.1875rem;
    font-size: 1rem;
    position: relative;
}
/* 等级图片 */
.share>>>.firstInfo img{
    width:1.5625rem;
    height: .8125rem;
    margin: 0 .3125rem;
}
/* 基础信息的分享二维码 */
.share>>>.shareQRcode{
    width: 1.375rem !important;
    height: 1.375rem !important;
    position: absolute;
    right:.875rem;
}
/* 顶部收益部分 */
.share>>>.top .shareNum{
    display: flex;
    color: #666666;
    height: 14vh;
    background-color: #FFFFFF;
}
.share>>>.top .shareNum div{
    flex: 3;
    text-align: center;
    border-right: .03125rem solid #E7E9EB;
    margin: .625rem 0;
}
.share>>>.top .shareNum div p{
    margin:.625rem;
}
/* 收益部分最后一个div */
.share>>>.top .shareNum .last{
    border: none;
}
/* 中间部分 */
.share>>>.middle{
    background-color: white;
    height: 58vh;
    margin-top: 4.375rem;
}

/* 选项部分 */
.share>>>.middle .option{
    padding:.625rem 1.25rem;
    position: relative;
    background-color: #FFFFFF;
    height: 16vh;
}
.share>>>.middle .option div{
    display: flex;
    padding: .9375rem 0;
    border-bottom: .0625rem solid #E7E9EB;
    padding-left:.5rem;
}
/* 选项部分更多...图片样式 */
.share>>>.more{
    color: #666666;
    position: absolute;
    right: 1.5625rem;
}
/* .share>>>.middle .option .moreImg{
    width: .75rem;
    height: .75rem;
    vertical-align: middle;
    position: absolute;
    right: 1.875rem;
    top: 0%;
    
} */
/* 选项第一个div背景图 */
.share>>>.middle .option .optionDiv1{
    background-size: 1.125rem;
}
/* 选项第二个div背景图 */
.share>>>.middle .option .optionDiv2{
    border: none;
    background-size: 1.125rem;
}

/* 确认提现模态框样式 */
.share>>>.mint-popup{
    width: 60vw;
    height: 18.75rem;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #009FE8;
    border-radius: 10px;
    text-align: center;
    padding: 6px 0px;
    color: #009FE8;
    font-size: 1.125rem
}
/* 模态框关闭按钮样式 */
.share>>>.closeModal img{
    position: absolute;
    top: .625rem;
    right: .8125rem;
    width: 1.25rem;
    height: 1.25rem;
}
.share>>>.affirmModal button{
    width: 60%;
    margin-top: 1.25rem;
    background: #57A6FE;
}
/* 二维码长按保存图片 */
.share>>>.affirmModal .QRCode{
    -webkit-touch-callout:default;
}
</style>
