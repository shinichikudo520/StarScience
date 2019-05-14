<template>
  <div class="shopping">
      <!-- shopping页面 -->
      <!-- 头部 -->
    <div class="top">
        <mt-header title="商城"></mt-header>
    </div>
    <div class="middle">
        <div class="search">
            <div :class="{'sort':true,'select':isSelect1}">
                <div  @click="chooseTab(1)">综合</div> 
                <ul class="content">
                    <li>综合</li>
                    <li>升序</li>
                    <li>降序</li>
                </ul>
            </div>
            <div :class="{'kind':true,'select':isSelect2}">
                <div  @click="chooseTab(2)">分类</div> 
                <ul class="content">
                    <li>衣服</li>
                    <li>美妆</li>
                    <li>数码</li>
                </ul>
            </div>
            <div :class="{'price':true,'select':isSelect3}" >
                <div  @click="chooseTab(3)">价格</div> 
                <div class="selectPrice content">
                    <mt-field  placeholder="最低价" type="number"></mt-field> 
                    <div style="line-height:30px;display:inline-block;margin-top:-10px">-</div>
                    <mt-field  placeholder="最高价" type="number"></mt-field>
                    <div style="text-align:right;margin-right:9%">
                        <mt-button type="primary" size='small'>确认</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 认权产品 -->
        <div class="shoppingProduct">
            <div>
                <table>
                    <tr v-for="(item,index) in rightProduct" :key="index">
                        <td class="firstDiv">
                            <img :src="require('../assets/img/01.jpg')" class="productImg" alt="" @click="toproductDetails(item.id)">
                        </td>
                        <td class="secondTd" @click="toproductDetails(item.id)">
                            <div>{{item.product_name}}</div>
                            <div>
                                <span class="product">EMT：{{item.product_price}}</span>
                                <!-- <img :src="require('../assets/img/order'+(index+1)+'.jpg')" alt="" class="levelImg"> -->
                            </div>
                            <div class="productInfo product">
                                {{item.product_describe}}
                            </div>
                        </td>
                        <td>
                            <mt-button type="primary" @click="toproductDetails(item.id)">兑换</mt-button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- 众筹产品 -->
        <!-- <div class="crowdfunding">
            <div class="title">
                <div class="buleLeft"></div>
                <h3>众筹产品</h3>
            </div>
            <div class="crowdfundingDetails">
                <div v-for="(item,index) in crowdfundingProduct" :key="index">
                    <p class="crowdfundingName">{{item.crowdfunding_product_name}}</p>
                    <img :src="require('../assets/img/crowdfundingbig'+(index+1)+'.jpg')" alt="" >
                    <p class="interestRate">增加<span class="redInterestRate" >{{item.rate}}</span></p>
                    <mt-button type="default" @click="toCrowdfunding(item.crowdfunding_product_grade)">立即投入</mt-button>
                </div>
            </div>
        </div> -->
    </div>
    <div class="bottom">
        <bar-bottom></bar-bottom>
    </div>
  </div>
</template>

<script>
import barBottom from './barBottom.vue'
export default {
  name: 'shopping',
  data () {
    return {
        rightProduct:[],//产品
        // crowdfundingProduct:[],//众筹产品
        // selectedTab:"1",//tab选中
        isSelect1:false,//选中tab1
        isSelect2:false,//选中tab2
        isSelect3:false,//选中tab3
    };
    
  },
  mounted(){
      let _this = this;
      _this.getProductList();//获取商品展示列表
  },
  methods:{
    //选中tab
    chooseTab(tabIndex){
        let _this = this;
        switch(tabIndex){
            case 1:
            if(_this.isSelect1){
                _this.isSelect1 = false;
                return
            }
            _this.isSelect1 = true;
            _this.isSelect2 = false;
            _this.isSelect3 = false;
            break;
            case 2:
            if(_this.isSelect2){
                _this.isSelect2 = false;
                return
            }
            _this.isSelect2 = true;
            _this.isSelect1 = false;
            _this.isSelect3 = false;
            break;
            case 3:
            if(_this.isSelect3){
                _this.isSelect3 = false;
                return
            }
            _this.isSelect3 = true;
            _this.isSelect1 = false;
            _this.isSelect2 = false;
            break;
        }
    },
    //跳转到产品详情
    toproductDetails(productId){
        let _this = this;
        _this.$router.push({
            path:"/productDetails/"+productId,
        });
    },
    //获取商品展示列表
    getProductList(){
        let _this = this;
        let api = '/exchange_product_display';

        _this.axios.get(api).then(res=>{
            console.log(res);
            _this.rightProduct = res.data;
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
.shopping{
    height: 95vh;
    background-color: #F6F8FA;
    overflow-y: hidden;
}
/* 选中商城 */
.shopping>>>.barBottom .exchangeIcon{
    background: url("../assets/img/selectShopping.jpg") 33px 8px no-repeat;
    background-size: 1.4375rem;
}
/* 头部样式 */
.shopping>>>.mint-header{
    height: 6vh;
    margin-bottom: .1875rem;
    background-color: #F7F7F8;
    color: #444444;
    border-bottom: .0625rem solid #D7D8DA;
}
/* 搜索部分 */
.shopping>>>.search{
    display: flex;
}
/* 搜索的每部分 */
.shopping>>>.search>div{
    width: 33vw;
    text-align: center;
    line-height: 2.5rem;
    background-color: white;
    border-bottom: transparent .125rem solid;
    /* padding-bottom: --0.125rem; */

}
/* 搜索内容部分列表 */
.shopping>>>.search>div ul{
    list-style: none;
    padding-left: 0;
    margin: 0;
    display: none;
}
/* 搜索第三个内容部分 */
.shopping>>>.search .selectPrice{
    display: none;
}
/* 选中搜索的部分 */
.shopping>>>.search .select{
    color: #007AFF;
    border-bottom: #007AFF .125rem solid;
    text-align: center;
}
.shopping>>>.search .select .content{
    display: block;
    position: absolute;
    left: 0;
    z-index: 1000;
    color: #444444;
    text-align: center;
    width: 100%;
    background-color: #F6F8FA;
}
/* 选中价格tab */
.shopping>>>.search .select .mint-field{
    /* background-color: red; */
    display: inline-block;
    width: 41%;
    min-height:1.875rem;
    margin-top: .25rem;
    border: .0625rem #DFE0E2 solid;
}
/* 选中价格tab 的按钮 */
.shopping>>>.selectPrice button{
    position:relative;
    right:0 ;
    background-color:#007AFF;
}
/* 中间部分设定高度 */
.shopping>>>.middle{
    height: 85vh;
    overflow-y: auto;
}

/* 认权产品详情部分 */
.shopping>>>.shoppingProduct{
    height: 78vh;
    overflow: auto;
}
/* 认权产品第一个td的样式（包含图片的td） */
.shopping>>>table{
    table-layout:fixed;
    width: 100%;
}
.shopping>>>.shoppingProduct .firstDiv{
    width: 16%;
}
.shopping>>>.shoppingProduct .secondTd{
    width: 65% !important;
    /* overflow: hidden; */
}
/* 产品大图 */
.shopping>>>.shoppingProduct .productImg{
    width: 100%;
    height:7vh;
}
/* 产品价格 */
.shopping>>>.shoppingProduct .product{
    font-size: .75rem;  
}
/* 产品介绍 */
.shopping>>>.shoppingProduct .productInfo{
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* 认权产品下查看详情的按钮 */
.shopping>>>.shoppingProduct button{
    font-size: .6875rem;
    line-height: .75rem;
    height: 4vh;
    padding: .3125rem .8125rem;
    background-color: rgba(0, 122, 255, 0.7);
    /* margin-left: 6.5rem; */
}
/* 每一行认权产品的样式 */
.shopping>>>.shoppingProduct td{
    padding: .1875rem .3125rem;
    border-bottom: .0625rem solid #EBEBEB;
    background-color: #FFFFFF;

}
.shopping>>>.shoppingProduct table tr{
    width: 100%;
    margin-top: .625rem;
    /* margin-bottom: .625rem; */
    display: inline-block;
}
</style>
