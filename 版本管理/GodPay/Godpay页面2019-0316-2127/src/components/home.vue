<template>
  <div class="home">
      <!-- home页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="首页"></mt-header>
    </div>
    <div class="middle">
        <!-- 轮播部分 -->
        <div class="swipe">
            <div class="swipeLeft"></div>
            <div class="homeSwipeWrap">
                <div class="homeswipe" >
                    <mt-swipe :auto="5000">
                        <mt-swipe-item >
                            <mt-button @click="toright('v3')" type="default" >立即投入</mt-button>
                            <img @click="toright('v3')" src="../assets/img/swipe1.jpg" alt="" class="swipeImg">
                        </mt-swipe-item>
                        <mt-swipe-item >
                            <mt-button @click="toCrowdfunding('3M')" type="default">立即投入</mt-button>
                            <img @click="toCrowdfunding('3M')" src="../assets/img/swipe2.jpg" alt="" class="swipeImg">
                        </mt-swipe-item>
                        <mt-swipe-item >
                            <mt-button @click="toCrowdfunding('12M')" type="default">立即投入</mt-button>
                            <img @click="toCrowdfunding('12M')" src="../assets/img/swipe3.jpg" alt="" class="swipeImg">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
            <div class="swipeRight"></div>
        </div>
        <!-- 广播部分 -->
        <div class="broadcast">
            <dl>
                <dt>
                    <img src="../assets/img/Group.jpg" alt="">
                </dt>
                <dd style="height:20px;overflow:hidden;">
                    <ul id='marquee'>
                        <li v-for="(item,index) in scrollArr" :key="index">{{item}}</li>
                    </ul>
                </dd>
            </dl>
        </div>
        <!-- 认权产品 -->
        <div class="rightToRecognize">
            <div class="title">
                <div class="buleLeft"></div>
                <h3>认权产品</h3>
            </div>
            <div>
                <table>
                    <tr v-for="(item,index) in rightProduct" :key="index">
                        <td class="firstDiv">
                            <img :src="require('../assets/img/0'+(index+1)+'.jpg')" class="productImg" alt="" @click="toright(item.power_product_grade)">
                        </td>
                        <td>
                            <div>{{item.power_product_name}}</div>
                            <div>
                                <span class="product">认权产品</span>
                                <img :src="require('../assets/img/order'+(index+1)+'.jpg')" alt="" class="levelImg">
                            </div>
                        </td>
                        <td>
                            <mt-button type="primary" @click="toright(item.power_product_grade)">查看详情</mt-button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- 众筹产品 -->
        <div class="crowdfunding">
            <div class="title">
                <div class="buleLeft"></div>
                <h3>众筹产品</h3>
            </div>
            <div class="crowdfundingDetails">
                <div v-for="(item,index) in crowdfundingProduct" :key="index">
                    <p class="crowdfundingName">{{item.crowdfunding_product_name}}</p>
                    <img :src="require('../assets/img/crowdfundingbig'+(index+1)+'.jpg')" alt="" @click="toCrowdfunding(item.crowdfunding_product_grade)">
                    <p class="interestRate">增加<span class="redInterestRate" >{{item.rate}}</span></p>
                    <mt-button type="default" @click="toCrowdfunding(item.crowdfunding_product_grade)">立即投入</mt-button>
                </div>
            </div>
        </div>
    </div>
    <div class="bottom">
        <bar-bottom></bar-bottom>
    </div>
  </div>
</template>

<script>
import barBottom from './barBottom.vue'
export default {
  name: 'home',
  data () {
    return {
        scrollArr:[
            '60秒前 ***  用户购入 ***  产品 ***  EMT','60秒前 ***  用户购入 ***  产品 ***  EMT','60秒前 ***  用户购入 ***  产品 ***  EMT',
        ],//滚动条数据
        rightProduct:[],//认权产品
        crowdfundingProduct:[],//众筹产品
    }
  },
  mounted(){
      let _this = this;
      _this.getProduct();//获取产品信息
      _this.scrollAnimation();//滚动条
        //console.log(_this.$store);
  },
  methods:{
    //去认权产品详情页
    toright(sort){
        let _this = this;
        //console.log('去认权产品');
        _this.$router.push({path:'/right/'+sort});
    },
    //去众筹产品详情页
    toCrowdfunding(kind){
        let _this = this;
        //console.log('去众筹产品');
        _this.$router.push({path:'/crowdfunding/'+kind});
    },
    //获取产品信息
    getProduct(){
        let _this = this;
        let api = '/index_views';
        _this.axios.get(api).then(res=>{
            console.log(res);
            let result = res.data.result;
            //认权产品
            _this.rightProduct = result.filter(item=>{
                return item.power_product
            });
            //众筹产品
            _this.crowdfundingProduct = result.filter(item=>{
                return item.crowdfunding_product
            });
            _this.crowdfundingProduct.forEach((item)=>{
                switch(item.crowdfunding_product_grade){
                    case "3M":
                    item.rate = '2.0%';
                    break
                    case "6M":
                    item.rate = '4.5%';
                    break
                    case "12M":
                    item.rate = '10.0%';
                    break
                }
            });
            //console.log(_this.rightProduct,_this.crowdfundingProduct);

        });
    },
    //滚动条
    scrollAnimation(){
        var marquee = document.getElementById('marquee');
        var offset=0;
        var scrollheight =marquee.offsetHeight;//整个高度
        var firstNode = marquee.children[0].cloneNode(true);
        marquee.appendChild(firstNode);//还有这里
        setInterval(function(){
            if(offset == scrollheight){
                offset = 0;
            }
            marquee.style.marginTop = "-"+offset+"px";
            offset += 1;
        },50);
    }
  },
  
  components:{
      barBottom,
  }
}
</script>
<style scoped>
/* 整体样式，让整体页面高度满屏 */
.home{
    height: 97vh;
    background-color: #F6F8FA;
    overflow-y: hidden;
}
/* 选中首页 */
.home>>>.barBottom .homeIcon{
    background: url("../assets/img/selectedHome.jpg") 33px 8px no-repeat;
    background-size: 1.4375rem;
}
/* 头部样式 */
.home>>>.mint-header{
    height: 6vh;
    margin-bottom: .1875rem;
    background-color: #F7F7F8;
    color: #444444;
    border-bottom: .0625rem solid #D7D8DA;
}
/* 中间部分设定高度 */
.home>>>.middle{
    height: 85vh;
    overflow-y: auto;
}
/* 轮播样式 */
.home>>>.middle{
    position: relative;
}
.home>>>.swipe{
    height: 22vh;
    display: flex;
}
.home>>>.middle .swipeLeft,.middle .homeswipe,.middle .swipeRight{
    float: left;
}
/* 轮播图左、右边的条 */
.home>>>.middle .swipeLeft,.middle .swipeRight{
    display: inline-block;
    width: 1.5%;
    height: 20vh;
}
/* 轮播左边的条 */
.home>>>.middle .swipeLeft{
    background-color: #F2836B;
    margin-top: .625rem;
    border-top-right-radius: .3125rem;
    border-bottom-right-radius: .3125rem;
}
/* 轮播右边的条 */
.home>>>.middle .swipeRight{
    background-color: #FBBC35;
    margin-top: .625rem;
    border-top-left-radius: .3125rem;
    border-bottom-left-radius: .3125rem;
}
/* 全局轮播中被选中图片的下标定位样式 */
.home>>>.mint-swipe-indicator.is-active{
    background-color: white;
    opacity: 1;
}
/* home轮播部分整体样式 */
.home>>>.homeSwipeWrap{
    width: 90%;
    height: 23vh;
    margin: 0 auto;
    display: inline-block;
    position: relative;
    transform:translate3d(0,0,0);
    overflow:hidden;
}
.home>>>.homeswipe{
    width: 100%;
    margin: 0 auto;
    border-radius: .3125rem;
    height: 23vh;
}
/* 轮播外层元素样式 */
.home>>>.mint-swipe-items-wrap > div{
    text-align: center;
}
/* 轮播图片的样式 */
.home>>>.swipeImg{
    width: 100%;
    height:23vh;
} 
/* 全局轮播中图片的下标定位样式 */
.home>>>.mint-swipe-indicators{
    position: absolute;
    bottom: 2vh;
}
.home>>>.mint-swipe-indicator{
    width: 1.5625rem;
    height: 0.3vh;
    border-radius: .1875rem;
    background-color: #878C8D;
}
.home>>>.homeswipe button{
    position: absolute;
    top: 60%;
    left: 1.5625rem;
    background-color: transparent;
    border-radius:1.25rem;
    color: white;
    font-size: .8125rem;
    border: .0625rem solid white;
    padding: 0 .9375rem;
    line-height: 1.875rem;
    height: 1.875rem;
}
/* 广播部分样式 */
.home>>>.broadcast{
    height: 3vh;
    padding: .125rem 0;
}
.home>>>.broadcast dl{
    overflow: hidden;
    margin: 0;
}
.home>>>.broadcast dt,.broadcast dd{
    float: left;
}
.home>>>.broadcast dt{
    padding-left: 1.25rem;
}
.home>>>.broadcast dd,.broadcast ul{
    margin: 0;
    padding-left: .3125rem;
    color: #7A7B7D;
    font-size: .9375rem;
}

.home>>>#marquee li{
    height:20px;
    line-height: 20px;
    margin:0
}


/* 喇叭小图标样式 */
.home>>>.broadcast img{
    width: .875rem;
    height: .875rem;
}
/* 消除li的小黑点 */
.home>>>li{
    list-style: none;
}
/* 广播中的蓝色字体 */
.home>>>.broadcast .bule{
    color: #7BAEE8;
}
/* 定义动画 */
/* @keyframes changeMargin {
    0% {  margin-top: 0 }
    20% {  margin-top: -1.25rem  }
    40% {  margin-top: -2.5rem }
    60% {  margin-top: -3.75rem  }
    80% {  margin-top: -5rem }
    80.0000001% {  margin-top: 1.25rem }
} */
.home>>>.broadcast dd{
    height: 1.25rem;
    overflow: hidden;
}
/* .home>>>.broadcast ul{
    animation: changeMargin 10s infinite;
} */
/* 左边蓝条部分的样式 */
.home>>>.buleLeft{
    width: 1.5%;
    height: 1.5625rem;
    background-color: #007AFF;
    border-top-right-radius: .3125rem;
    border-bottom-right-radius: .3125rem;
}
/* 认权产品部分样式 */
/* 认权产品标题部分样式 */
.home>>>.title{
    overflow: hidden;
    margin: .3125rem 0;
    height:4vh;
}
.home>>>.title .buleLeft,.title h3{
    float: left;
}
.home>>>h3{
    margin: 0 .9375rem;
    font-weight: 400;
}
/* 认权产品详情部分 */
/* 认权产品第一个td的样式（包含图片的td） */
.home>>>.rightToRecognize .firstDiv{
    width: 16%;
}
/* 产品大图 */
.home>>>.rightToRecognize .productImg{
    width: 100%;
    height:7vh;
}
/* 产品小字体 */
.home>>>.rightToRecognize .product{
    font-size: .75rem;
}
/* 等级小图标 */
.home>>>.rightToRecognize .levelImg{
    width: .625rem;
    height: .625rem;
}
/* 认权产品下查看详情的按钮 */
.home>>>.rightToRecognize button{
    font-size: .6875rem;
    line-height: .75rem;
    height: 4vh;
    padding: .3125rem .8125rem;
    background-color: rgba(0, 122, 255, 0.7);
    margin-left: 6.5rem;
}
/* 每一行认权产品的样式 */
.home>>>.rightToRecognize td{
    padding: .1875rem .3125rem;
    border-bottom: .0625rem solid #EBEBEB;
    background-color: #FFFFFF;
}
.home>>>.rightToRecognize table tr{
    margin-top: .625rem;
}
/* 众筹产品 */
/* 众筹产品整体样式 */
.home>>>.crowdfunding{
    height: 5vh;
}
.home>>>.crowdfundingDetails{
    display: flex;
    align-items: center;
}
/* 众筹产品每一种产品的整块样式 */
.home>>>.crowdfundingDetails div{
    width: 31%;
    height: 19%;
    background-color: #FFFFFF;
    margin-left: .4125rem;
    text-align: center;
}
/* 众筹产品图片 */
.home>>>.crowdfundingDetails img{
    width: 6.25rem;
    height: 7.5vh;
}
/* 众筹产品名称 */
.home>>>.crowdfundingDetails p{
    margin: .125rem 0;
    text-align: center;
    font-size: .75rem;
}
/* 众筹产品利率文字样式 */
.home>>>.crowdfundingDetails .interestRate{
    font-size: .625rem;
    color: #333333;
}
/* 众筹产品红色利率样式 */
.home>>>.crowdfundingDetails .redInterestRate{
    color: #EE3128;
    font-size: .875rem;
    font-weight: 700;
}
/* 众筹产品立即投入按钮样式 */
.home>>>.crowdfundingDetails button{
    width: 5rem;
    height: 1.25rem;
    font-size: .75rem;
    margin: .5rem 0;
    color: #007AFF;
    background-color: transparent;
    border-radius: .625rem;
    border: .0625rem solid #007AFF;
}
</style>
