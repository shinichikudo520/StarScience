<template>
    <div id="exchangePage">
        <div id="left">
            <!-- 操作部分 -->
            <el-container id="operate">
                <el-row>
                    <!-- 买入列 -->
                    <el-col :span="12">
                        <div class="grid-content" id="buy">
                            <h4 style="color:#ee6560;padding-left:0.5em;">买入EMT</h4>
                            <el-input v-model="buy.price" placeholder="买入价" type="number"></el-input>
                            <span id="USDT1">USDT</span>
                            <p class="equivalentRMB">≈￥{{buyRMB}}</p>
                            <el-input v-model="buy.quantity" placeholder="买入量" type="number"></el-input>
                            <span id="EMT1">EMT</span>
                            <el-button-group>
                                <el-button @click="selectProportion('buy',1/4)">1/4</el-button>
                                <el-button @click="selectProportion('buy',1/2)">1/2</el-button>
                                <el-button @click="selectProportion('buy',1)">All</el-button>
                            </el-button-group>
                            <p style="color:#7c88a0;font-size:0.9em;padding-left:5px">可用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{usableUSDT}}&nbsp;USDT</p>
                            <p style="color:#7c88a0;font-size:0.9em;padding-left:5px">交易额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{buyEMTTrading}}&nbsp;USDT</p>
                            <el-button class="submitBtn" @click="operateEMTF('buy')">买入 EMT</el-button>
                        </div>
                    </el-col>
                    <!-- 卖出列 -->
                    <el-col :span="12">
                        <div class="grid-content" id="sell">
                            <h4 style="color:#33ae72;padding-left:0.5em;">卖出EMT</h4>
                            <el-input v-model="sell.price" placeholder="卖出价" type="number"></el-input>
                            <span id="USDT2">USDT</span>
                            <p class="equivalentRMB">≈￥{{sellRMB}}</p>
                            <el-input v-model="sell.quantity" placeholder="卖出量" type="number"></el-input>
                            <span id="EMT2">EMT</span>
                            <el-button-group>
                                <el-button @click="selectProportion('sell',1/4)">1/4</el-button>
                                <el-button @click="selectProportion('sell',1/2)">1/2</el-button>
                                <el-button @click="selectProportion('sell',1)">All</el-button>
                            </el-button-group>
                            <p style="color:#7c88a0;font-size:0.9em;padding-left:5px">可用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{usableEMT}}&nbsp;EMT</p>
                            <p style="color:#7c88a0;font-size:0.9em;padding-left:5px">交易额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{sellEMTTrading}}&nbsp;USDT</p>
                            <el-button class="submitBtn" @click="operateEMTF('sell')">卖出 EMT</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-container>
            <!-- 详细交易记录 -->
            <div id="details">
                <template>
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="当前委托" name="first">
                            <!-- 当前委托 -->
                            <el-table :data="tableData3"  border style="width: 100%" height="47%">
                                <el-table-column prop="date" label="委托时间" width="80">
                                </el-table-column>
                                <el-table-column prop="name" label="交易对" width="80">
                                </el-table-column>
                                <el-table-column prop="address" label="类型" width="80">
                                </el-table-column>
                                <el-table-column prop="address" label="委托价" width="80">
                                </el-table-column>
                                <el-table-column prop="address" label="委托量" width="80">
                                </el-table-column>
                                <el-table-column prop="address" label="成交量" width="80">
                                </el-table-column>
                                <el-table-column prop="address" label="状态" width="80">
                                </el-table-column>
                                <el-table-column prop="address" label="操作" width="80">
                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>
                        </el-tab-pane>
                        <el-tab-pane label="历史委托" name="second">
                            <!-- 历史委托 -->
                            <el-table :data="tableData3"  border style="width: 100%" height="47%">
                                <el-table-column prop="date" label="委托时间" width="80">
                                </el-table-column>
                                <el-table-column prop="name" label="交易对" width="74">
                                </el-table-column>
                                <el-table-column prop="address" label="类型" width="70">
                                </el-table-column>
                                <el-table-column prop="address" label="委托价" width="74">
                                </el-table-column>
                                <el-table-column prop="address" label="委托量" width="74">
                                </el-table-column>
                                <el-table-column prop="address" label="成交量" width="74">
                                </el-table-column>
                                <el-table-column prop="address" label="成交均价" width="80">
                                </el-table-column>
                                <el-table-column prop="address" label="手续费" width="74">
                                </el-table-column>
                                <el-table-column prop="address" label="状态" width="70">
                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>
                        </el-tab-pane>
                        <el-tab-pane label="我的持仓" name="third">
                            <!-- 账户余额 -->
                            <el-table :data="balance"  border style="width: 100%" height="47%">
                                <el-table-column prop="asset" label="资产类型" width="100">
                                </el-table-column>
                                <el-table-column prop="available" label="可用" width="180">
                                </el-table-column>
                                <el-table-column prop="reserved" label="冻结" width="180">
                                </el-table-column>
                                <el-table-column prop="total" label="总计" width="180">
                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>
                        </el-tab-pane>
                    </el-tabs>
                </template>
            </div>
        </div>
        <div id="center">
            <!-- 20档行情 -->
                <!-- 卖出 -->
                <el-table :data="tableData.asks" style="width: 100%;height:48%"  class="sellTop" :cell-style="green" :header-cell-style="green" @row-click="selectSellPrice">
                    <el-table-column width="70">
                        <template slot-scope="scope">
                            {{'卖 '+(scope.$index+(20-2*scope.$index))+''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格" width="85">
                    </el-table-column>
                    <el-table-column prop="quantity" label="数量" width="85">
                    </el-table-column>
                    <el-table-column label="挂单量" width="85">
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                    <el-table-column label="差量" width="85">
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 行情 -->
                <p>0.1113 <span>≈ ￥0.7639</span></p>
                <!-- 买入 -->
                <el-table :data="tableData.bids" style="width: 100%;height:44%"  class="buyTop" :cell-style="red" :header-cell-style="red" @row-click="selectBuyPrice">
                    <el-table-column width="70">
                        <template slot-scope="scope">
                            {{'买 '+(scope.$index+1)+''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price"  width="85">
                    </el-table-column>
                    <el-table-column prop="quantity"  width="85">
                    </el-table-column>
                    <el-table-column  width="85">
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                    <el-table-column  width="85">
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                </el-table>
        </div>
        <div id="right">
            <!-- 实时成交 -->
            <el-container id="realTime">
                <el-table :data="realTimeData" style="width: 100%"  :cell-style="cellStyle">
                    <el-table-column prop="time" label="时间"  width="120">
                    </el-table-column>
                    <el-table-column prop="take" label="方向" width="95" >
                    </el-table-column>
                    <el-table-column prop="price" label="价格" width="95"  >
                    </el-table-column>
                    <el-table-column prop="quantity" label="数量" width="95">
                    </el-table-column>
                </el-table>
            </el-container>
        </div>
    </div>
</template>

<script>
let echarts = require("echarts");
export default {
    name: "exchange",
    data() {
        return {
            buy:{//提交买
                type:"buy-limit",
                price: "", //买入EMT价格
                quantity: "", //买入EMT数量
            },
            sell:{//提交卖
                type:"sell-limit",
                price: "", //卖出EMT价格
                quantity: "", //卖出EMT数量
            },
            buyRMB: 0.0, //买入EMT等值RMB
            usableUSDT: 0.0, //可用USDT
            sellRMB: 0.0, //卖出EMT等值RMB
            usableEMT: 0.0, //可用EMT
            tableData: {//20档行情数据信息
                asks: [], //卖出
                bids: [], //买入
                timestamp: "" //时间戳
            },
            realTimeData:[],//实时成交数据信息
            activeName: 'first',//默认选中tab标签页的第一页
            //详细交易数据
            tableData3: [//当前交易记录
                // {
                //     date: "2016-05-03",
                //     name: "王小虎",
                //     address: "上海市普陀区金沙江路 1518 弄"
                // },
                // {
                //     date: "2016-05-02",
                //     name: "王小虎",
                //     address: "上海市普陀区金沙江路 1518 弄"
                // },
                // {
                //     date: "2016-05-04",
                //     name: "王小虎",
                //     address: "上海市普陀区金沙江路 1518 弄"
                // },
                // {
                //     date: "2016-05-01",
                //     name: "王小虎",
                //     address: "上海市普陀区金沙江路 1518 弄"
                // },
                // {
                //     date: "2016-05-08",
                //     name: "王小虎",
                //     address: "上海市普陀区金沙江路 1518 弄"
                // },
                // {
                //     date: "2016-05-06",
                //     name: "王小虎",
                //     address: "上海市普陀区金沙江路 1518 弄"
                // },
                // {
                //     date: "2016-05-07",
                //     name: "王小虎",
                //     address: "上海市普陀区金沙江路 1518 弄"
                // }
            ],
            balance:[],//账户余额
        };
    },
    computed:{
        buyEMTTrading(){//买入EMT操作的交易额
            let _this = this;
            if(_this.buy.price&&_this.buy.quantity){
                return _this.buy.price*_this.buy.quantity+0.0001
            }
            return 0.0000
        },
        sellEMTTrading(){//卖出EMT操作的交易额
            let _this = this;
            if(_this.sell.price&&_this.sell.quantity){
                return _this.sell.price*_this.sell.quantity-0.0001
            }
            return 0.0000
        }
    },
    methods: {
        //卖出价格列样式
        green({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 1) {
                //指定坐标
                return "color:green";
            } else {
                return "";
            }
        },
        //买入价格列样式
        red({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 1) {
                //指定坐标
                return "color:red";
            } else {
                return "";
            }
        },
        //实时成交买入或者卖出单元格的样式
        cellStyle({row, column, rowIndex, columnIndex}){
            if(columnIndex === 1 && row.take=="买入"){ //指定坐标
                return 'color:red'
            }
            else if(columnIndex === 1 && row.take=="卖出"){
                return 'color:green'
            }
        },
        //请求20档行情数据
        ajaxTop() {
            let _this = this;
            // let api = "market/ticker?symbol=emtusdt";
                let api = "http://api.coinbene.com/v1/market/orderbook?symbol=EMTUSDT&depth=200";
            _this.axios.get(api).then(res => {
                // console.log(res)
                _this.tableData.asks = res.data.orderbook.asks.slice(0,20).reverse(); //卖出数组颠倒 
                _this.tableData.asks.forEach(item => {
                        item.price = Number(item.price).toFixed(4);
                        item.quantity = Number(item.quantity).toFixed(2);
                })              
                _this.tableData.bids = res.data.orderbook.bids.slice(0,20); //买入数组
                _this.tableData.bids.forEach(item => {
                        item.price = Number(item.price).toFixed(4);
                        item.quantity = Number(item.quantity).toFixed(2);
                })              
            });
            // setTimeout(this.ajaxTop, 500);
        },
        //请求实时成交记录
        ajaxRealTime(){
            let _this = this;
            let api = "market/trades?symbol=emtusdt";
            _this.axios.get(api).then(res=>{
                _this.realTimeData = res.data.trades;
                _this.realTimeData.forEach(item=>{
                    item.time = _this.formatTime(new Date(item.time));
                    item.take = (item.take=="buy"?"买入":"卖出");
                });
                // console.log(_this.realTimeData);
            });
            // setTimeout(_this.ajaxRealTime,500);
        },
        //处理时间格式
        formatTime(date){
            let mon = date.getMonth()+1;
            let day = date.getDate();
            let hour = date.getHours();
            let minu = date.getMinutes();
            let second = date.getSeconds();
            return (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day) + " " +(hour < 10 ? "0" + hour : hour)+":"+(minu < 10 ? "0" + minu : minu)+":"+(second < 10 ? "0" + second : second)
        },
        //买卖EMT操作
        operateEMTF(operate){
            let _this = this;
            let api = "order/place";
            let temp = {};
            if(operate=="buy"){
                temp = _this.buy;
            }else{
                temp = _this.sell;
            }
            console.log(temp);
            _this.axios.post(api,{
                type:temp.type,
                price:temp.price.toString(),
                quantity:temp.quantity.toString()
            }).then(res=>{
                console.log(temp,res);
                _this.buy.price = "";
                _this.buy.quantity = "";
                _this.sell.price = "";
                _this.sell.quantity = "";
            });
        },
        //点击行情选中卖单的价格
        selectSellPrice(row, event, column){//行，事件对象，列
            let _this = this;
            _this.buy.price = row.price;
            _this.sell.price = "";
            _this.sell.quantity = "";
        },
        //点击行情选中买单的价格
        selectBuyPrice(row, event, column){//行，事件对象，列
            let _this = this;
            _this.sell.price = row.price
            _this.buy.price = "";
            _this.buy.quantity = "";
        },
        //选中可用额的1/4,1/2,all
        selectProportion(buyOrSell,proportion){
            let _this = this;
            if(buyOrSell=="buy"){//买操作
                _this.buy.quantity = _this.usableUSDT*proportion;
                _this.sell.price = "";
                _this.sell.quantity = "";
            }else{//卖操作
                _this.sell.quantity = _this.usableEMT*proportion;
                _this.buy.price = "";
                _this.buy.quantity = "";
            }
        },
        //请求账户余额
        requestBalance(){
            let _this = this;
            let api = "order/balance";
            _this.axios.post(api).then(res=>{
                _this.balance = res.data.balance;
                _this.balance = _this.balance.filter(item=>{
                    return item.total!=0
                });
                // console.log(_this.balance);
                _this.balance.map(item=>{
                    if(item.asset=="USDT"){
                        _this.usableUSDT = item.available
                    }
                    if(item.asset=="EMT"){
                        _this.usableEMT = item.available
                    }
                });
            });
            // setTimeout(_this.requestBalance,500);
        }
    },
    mounted() {
        let _this = this;
        _this.buyRMB = _this.buyRMB.toFixed(4); //买入EMT等值RMB保留4位数
        _this.sellRMB = _this.sellRMB.toFixed(4); //卖出EMT等值RMB保留4位数
        _this.usableUSDT = _this.usableUSDT.toFixed(3); //可用USDT保留3位数
        _this.usableEMT = _this.usableEMT.toFixed(3); //可用EMT保留3位数
        _this.ajaxTop(); //加载20档行情数据
        _this.ajaxRealTime(); //请求实时成交记录
        _this.requestBalance(); //请求账户余额
    }
};
</script>
<style>
/* 整体样式 */
html,
body{
    overflow: hidden;
}
html,
body,
#exchangePage {
    height: 100%;
    margin: 0;
    padding: 0 2px;
}
#left,
#center,
#right {
    height: 100%;
    float: left;
}
#left{
    width: 44%;
}
#center,#right{
    width: 28%;
}
/* 操作部分、深度部分 */
#operate{
    width: 100%;
    height: 50%;
}
#depthMap {
    width: 100%;
    height: 50%;
}
/* 实时成交部分 */
#realTime {
    width: 100%;
    height: 100%;
}
/* 操作部分 */
/* 操作部分行的样式 */
.el-row {
    width: 100%;
}
/* 操作部分列的样式 */
.grid-content {
    width: 95%;
    border-radius: 4px;
    min-height: 36px;
}
/* 输入框的样式 */
.el-input__inner {
    padding-right: 2px;
}
/* RMB等值样式 */
.equivalentRMB {
    font-size: 0.8em;
    color: #7c88a0;
    padding-left: 1.1em;
}
/* 操作部分 */
#operate {
    position: relative;
}
/* USDT、EMT输入框右提示文字样式 */
#USDT1,
#USDT2,
#EMT1,
#EMT2 {
    position: absolute;
    z-index: 1;
    color: #7c88a0;
}
/* USDT输入框右提示文字样式 */
#USDT1 {
    top: 73px;
    right: 376px;
}
#USDT2 {
    top: 73px;
    right: 38px;
}
/* EMT输入框右提示文字样式 */
#EMT1 {
    top: 155px;
    right: 376px;
}
#EMT2 {
    top: 155px;
    right: 39px;
}
/* 买卖1/4、1/2、All按钮样式 */
#buy button:not(.submitBtn),
#sell button:not(.submitBtn) {
    margin-top: 10px;
    padding: 6px 43px;
    border: 1px dashed #cacccec4;
}
/* 买入、卖出提交按钮 */
.submitBtn {
    width: 100%;
}
#buy .submitBtn {
    background-color: #ee6560;
    color: #fff;
}
#sell .submitBtn {
    background-color: #33ae72;
    color: #fff;
}
/* 20档行情部分和实时成交 */
/* 20档和实时成交整体表格 */
#center .el-table,#realTime .el-table{
    overflow-x: hidden;
    font-size: 14px;
}
/* 20档和实时成交单元格 */
.el-table td,.el-table th {
    text-align: center;
    padding: 0;
}
/* 20档单元格 */
#center .el-table .cell {
    line-height: 1.16em;
}
/* 20档表格样式 */
.sellTop th>.cell{
    line-height: 2em !important;
}
.buyTop thead{
    display: none;
}
/* 消除表格的边框线 */
.el-table td, .el-table th.is-leaf{
    border: none;
}
/* 20档行情的实时行情 */
#center p{
    text-align: center;
}
#center span{
    color: #7c88a0;
}
/* 实时成交单元格 */
#realTime .el-table{
    overflow: auto;
}
/* 隐藏水平滚动条 */
#realTime .el-table--scrollable-x .el-table__body-wrapper{
     overflow-x: hidden
}
/* 红绿色调 */
.red{
    color: red;
}
.green{
    color: green;
}
/* 详细交易记录 */
#details {
    width: 100%;
    height: 100%;
}
#details .el-tabs,#details .el-tab-pane{
    height: 100%;
}
#details .el-tabs__content{
    height: 80%;
}
/* 详细记录分页样式 */
#details .el-pagination{
    text-align: right;
}
</style>
