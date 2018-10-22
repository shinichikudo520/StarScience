<template>
    <div id="exchangePage">
        <div>
        <el-button  round @click="quitLogin" class="quit">退出</el-button>
        </div>
        <div id="left">
            <!-- 操作部分 -->
            <el-container id="operate">
                <el-row>
                    <!-- 买入列 -->
                    <el-col :span="12">
                        <div class="grid-content" id="buy">
                            <h4 style="color:#ee6560;padding-left:0.5em;">买入EMT</h4>
                            <el-input v-model="buy.price" placeholder="买入价" type="number" @keyup.native="keepFour('buy')" @keydown.enter.native="operateEMTF('buy')"></el-input>
                            <span id="USDT1">USDT</span>
                            <el-input v-model="buy.quantity" placeholder="买入量" type="number" @keydown.enter.native="operateEMTF('buy')"></el-input>
                            <span id="EMT1">EMT</span>
                            <el-button-group>
                                <el-button @click="selectProportion('buy',1/4)">1/4</el-button>
                                <el-button @click="selectProportion('buy',1/2)">1/2</el-button>
                                <el-button @click="selectProportion('buy',1)">All</el-button>
                            </el-button-group>
                            <p style="color:#7c88a0;font-size:0.9em;padding-left:5px">可用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{usableUSDT}}&nbsp;USDT</p>
                            <p style="color:#7c88a0;font-size:0.9em;padding-left:5px">交易额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{buyEMTTrading}}&nbsp;USDT</p>
                            <el-button class="submitBtn" @click="operateEMTF('buy')" >买入 EMT</el-button>
                        </div>
                    </el-col>
                    <!-- 卖出列 -->
                    <el-col :span="12">
                        <div class="grid-content" id="sell">
                            <h4 style="color:#33ae72;padding-left:0.5em;">卖出EMT</h4>
                            <el-input v-model="sell.price" placeholder="卖出价" type="number" @keyup.native="keepFour('sell')" @keydown.enter.native="operateEMTF('sell')"></el-input>
                            <span id="USDT2">USDT</span>
                            <el-input v-model="sell.quantity" placeholder="卖出量" type="number" @keydown.enter.native="operateEMTF('sell')"></el-input>
                            <span id="EMT2">EMT</span>
                            <el-button-group>
                                <el-button @click="selectProportion('sell',1/4)">1/4</el-button>
                                <el-button @click="selectProportion('sell',1/2)">1/2</el-button>
                                <el-button @click="selectProportion('sell',1)">All</el-button>
                            </el-button-group>
                            <p style="color:#7c88a0;font-size:0.9em;padding-left:5px">可用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{usableEMT}}&nbsp;EMT</p>
                            <p style="color:#7c88a0;font-size:0.9em;padding-left:5px">交易额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{sellEMTTrading}}&nbsp;USDT</p>
                            <el-button class="submitBtn" @click="operateEMTF('sell')"  >卖出 EMT</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-container>
            <!-- 详细交易记录 -->
            <div id="details">
                <template>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="当前委托" name="first">
                            <!-- 当前委托 -->
                            <el-table :data="NowEntrust.slice((currentPageNowEntrust-1)*pageSizeNowEntrust,currentPageNowEntrust*pageSizeNowEntrust)"  border style="width: 100%" height="48%" :cell-style="cellStyleEntrust">
                                <el-table-column prop="createtime" label="委托时间" width="80" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="symbol" label="交易对" width="90" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="type" label="类型" width="60" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="price" label="委托价" width="80" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="orderquantity" label="委托量" width="90" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="filledquantity" label="成交量" width="90" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="orderstatus" label="状态" width="80" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column label="操作" width="70" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span class="cancel" @click="cancel(scope.row.orderid)">撤单</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-pagination :page-size="pageSizeNowEntrust"  layout="prev, pager, next" :total="totalNowEntrust" @current-change="handleCurrentChangeNow"></el-pagination>
                        </el-tab-pane>
                        <el-tab-pane label="历史委托" name="second">
                            <el-button  round @click="downLoad" class="downLoad">下载</el-button>
                            <!-- 历史委托 -->
                            <el-table :data="HisEntrust.slice((currentPageHistory-1)*pageSizeHistory,currentPageHistory*pageSizeHistory)"  border style="width: 100%" height="48%" id="downLoad" :cell-style="cellStyleHistory">
                                <el-table-column prop="createtime" label="委托时间" width="73" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="symbol" label="交易对" width="82" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="type" label="类型" width="49" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="price" label="委托价" width="80" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="orderquantity" label="委托量" width="80" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="filledquantity" label="成交量" width="80" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="address" label="成交均价" width="80" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="address" label="手续费" width="65" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="orderstatus" label="状态" width="75" show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-pagination :page-size="pageSizeHistory"  layout="prev, pager, next" :total="totalNowHistory" @current-change="handleCurrentChangeHis"></el-pagination>
                        </el-tab-pane>
                        <el-tab-pane label="我的持仓" name="third">
                            <!-- 账户余额 -->
                            <el-table :data="balance"  border style="width: 100%" height="48%">
                                <el-table-column prop="asset" label="资产类型" width="100" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="available" label="可用" width="180" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="reserved" label="冻结" width="180" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="total" label="总计" width="180" show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </template>
            </div>
        </div>
        <div id="center">
            <!-- 20档行情 -->
                <!-- 卖出 -->
                <el-table :data="tableData.asks" style="width: 100%;height:48%"  class="sellTop" :cell-style="green" :header-cell-style="green" @row-click="selectSellPrice">
                    <el-table-column width="70" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{'卖 '+(scope.$index+(20-2*scope.$index))+''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格" width="85" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="quantity" label="数量" width="85" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="挂单量" width="85" show-overflow-tooltip>
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                    <el-table-column label="差量" width="85" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-popover
                            placement="right"
                            width="400"
                            trigger="hover">
                            <p>这是第1档</p>
                            <p>这是第2档</p>
                            <p>这是第3档</p>
                            <p>这是第4档</p>
                            <span slot="reference">激活</span>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 行情 -->
                <p>{{last}}</p>
                <!-- 买入 -->
                <el-table :data="tableData.bids" style="width: 100%;height:44%"  class="buyTop" :cell-style="red" :header-cell-style="red" @row-click="selectBuyPrice">
                    <el-table-column width="70" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{'买 '+(scope.$index+1)+''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price"  width="85" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="quantity"  width="85" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column  width="85" show-overflow-tooltip>
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                    <el-table-column  width="85" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-popover
                            placement="right"
                            width="400"
                            trigger="hover">
                            <p>这是第1档</p>
                            <p>这是第2档</p>
                            <p>这是第3档</p>
                            <p>这是第4档</p>
                            <span slot="reference">激活</span>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
        </div>
        <div id="right">
            <!-- 实时成交 -->
            <el-container id="realTime">
                <el-table :data="realTimeData" style="width: 100%"  :cell-style="cellStyle">
                    <el-table-column prop="time" label="时间"  width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="take" label="方向" width="95" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="price" label="价格" width="95" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column prop="quantity" label="数量" width="95" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-container>
        </div>
    </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
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
            NowEntrust: [],//当前委托记录
            pageSizeNowEntrust:7,//当前委托记录每一页条数
            totalNowEntrust:0,//当前委托记录总数
            currentPageNowEntrust:1,//当前委托记录当前页
            HisEntrust:[],//历史委托
            currentPageHistory:1,//历史委托记录当前页
            totalNowHistory:0,//历史委托记录总数
            pageSizeHistory:7,//历史委托记录每一页条数
            balance:[],//账户余额
            orderid:"",//买卖操作成功后产生的orderid
            temp:"",//用来保存操作输入框数字保留四位数的中间值
            last:0,//目前最新价
            buy1:0,//买一的价格
            sell1:0,//卖一的价格
        };
    },
    computed:{
        buyEMTTrading(){//买入EMT操作的交易额
            let _this = this;
            // console.log(_this.buy);
            if(_this.buy.price&&_this.buy.quantity){
                return _this.buy.price*_this.buy.quantity+0.0001
            }
            return 0.0000
        },
        sellEMTTrading(){//卖出EMT操作的交易额
            let _this = this;
            if(_this.sell.price&&_this.sell.quantity){
                return _this.sell.price*_this.sell.quantity+0.0001
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
        //委托买入或者卖出单元格的样式
        cellStyleEntrust({row, column, rowIndex, columnIndex}){
            // console.log(row);
            if(columnIndex === 2 && row.type=="买入"){ //指定坐标
                return 'color:red'
            }
            else if(columnIndex === 2 && row.type=="卖出"){
                return 'color:green'
            
            }else if(columnIndex === 6 && row.orderstatus=="未成交"){ //指定坐标
                return 'color:#f66d43'
            }
            else if(columnIndex === 6 && row.orderstatus=="部分成交"){
                return 'color:#606266'
            }
        },
        cellStyleHistory({row, column, rowIndex, columnIndex}){
            if(columnIndex === 2 && row.type=="买入"){ //指定坐标
                return 'color:red'
            }
            else if(columnIndex === 2 && row.type=="卖出"){
                return 'color:green'
            
            }
        },
        //请求20档行情数据
        ajaxTop() {
            let _this = this;
            // let api = "/api/market/ticker?symbol=emtusdt";
                let api = "http://api.coinbene.com/v1/market/orderbook?symbol=EMTUSDT&depth=200";
            _this.axios.get(api,{
                cache:false,//清除缓存
            }).then(res => {
                console.log(res)
                let asks = res.data.orderbook.asks.slice(0,20).reverse(); //卖出数组颠倒 
                asks.forEach(item => {
                        item.price = Number(item.price).toFixed(4);
                        item.quantity = Number(item.quantity).toFixed(2);
                })              
                let bids = res.data.orderbook.bids.slice(0,20); //买入数组
                bids.forEach(item => {
                        item.price = Number(item.price).toFixed(4);
                        item.quantity = Number(item.quantity).toFixed(2);
                })    
                _this.setData("asks",asks);
                _this.tableData.asks = _this.getData("asks");
                _this.setData("bids",bids);
                _this.tableData.bids = _this.getData("bids");
            });
            if(_this.getData("asks")){
                _this.tableData.asks = _this.getData("asks");//接口不稳定时从缓存中取数据
            }
            if(_this.getData("bids")){
                _this.tableData.bids = _this.getData("bids");//接口不稳定时从缓存中取数据
            }
            if(_this.tableData.asks[19]!=undefined){
                _this.sell1 = _this.tableData.asks[19].price;//获取卖一的价格
            }
            if(_this.tableData.bids[0]!=undefined){
                _this.buy1 = _this.tableData.bids[0].price;//获取买一的价格
            }
            // console.log(_this.sell1,_this.buy1);
            // _this.timerCount[1] = setTimeout(this.ajaxTop, 500);//打开注释
        },
        //请求实时成交记录
        ajaxRealTime(){
            let _this = this;
            let api = "/api/market/trades?symbol=emtusdt";
            let realTimeData = [];
            _this.axios.get(api,{
                cache:false,//清除缓存
            }).then(res=>{
                realTimeData = res.data.trades;
                realTimeData.forEach(item=>{
                    item.time = _this.formatTime(new Date(item.time));
                    item.take = (item.take=="buy"?"买入":"卖出");
                });
                // console.log(realTimeData);
                _this.setData("realTimeData",realTimeData);
                _this.realTimeData = _this.getData("realTimeData");                
            });
            if(_this.getData("realTimeData")){
                _this.realTimeData = _this.getData("realTimeData");//接口不稳定时从缓存中取数据             
            }
            
            // console.log( _this.realTimeData);
            // _this.timerCount[2] =  setTimeout(_this.ajaxRealTime,500);//打开注释
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
            let api = "/api/order/place";
            // let api = "order/place";
            let temp = {};
            if(operate=="buy"){//买操作
                temp = _this.buy;
                if(_this.buyEMTTrading>_this.usableUSDT){//买入EMT所需的USDT超过可用USDT数量
                    _this.$message({
                        showClose: true,
                        message: '买入数量超过EMT可买数量'
                    });
                    return
                }
            }else{//卖操作
                temp = _this.sell;
                if(_this.sell.quantity>_this.usableEMT){//卖出EMT数量大于可用EMT数量
                    _this.$message({
                        showClose: true,
                        message: '卖出数量超过EMT可用数量'
                    });
                    return
                }
            }
            if(temp.price==""){
                _this.$message({
                    showClose: true,
                    message: '请输入价格'
                });
                return
            }
            if(temp.quantity==""){
                _this.$message({
                    showClose: true,
                    message: '请输入数量'
                });
                return
            }
            let fd = _this.transformFormData(temp);
            // console.log(fd);
            _this.axios.post(api,fd,{
                headers: {
                    'Content-Type': 'multipart/form-data',//指定参数为formData格式
                 },
                 cache:false,//清除缓存
            })
            .then(function (response) {
                console.log(response);
                if(response.data.status=="ok"){
                    _this.$message({
                        showClose: true,
                        message: '操作成功！',
                        type: 'success'
                    });
                    _this.orderid = response.data.orderid;//获取orderid
                    console.log(_this.orderid);
                    _this.requestBalance();//刷新账户余额
                    _this.requestNowEntrust();//刷新当前委托
                    _this.requestHisEntrust(_this.orderid);//刷新历史委托
                }else{
                    _this.$message('操作失败！');
                }
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
            _this.sell.price = row.price;
            _this.sell.quantity = "";
        },
        //点击行情选中买单的价格
        selectBuyPrice(row, event, column){//行，事件对象，列
            let _this = this;
            _this.sell.price = row.price
            _this.buy.price = row.price;
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
        //点击tab标签页
        handleClick(tab, event) {
            // console.log(tab.index);//tab标签页的下标
            let _this = this;
            if(tab.index==0){
                _this.requestNowEntrust();//请求当前委托
            }
            else if(tab.index==1){
                if(_this.orderid!=""){
                    console.log(1)
                    _this.requestHisEntrust(_this.orderid);//请求历史委托
                }
                else{
                    console.log(_this.getData("HisEntrust"))
                    if(_this.getData("HisEntrust")){
                        _this.HisEntrust = _this.getData("HisEntrust");
                    }
                    _this.pageSizeHistory = 7;//设置历史委托记录每一页条数
                    _this.totalNowHistory = _this.HisEntrust.length;//获取当前委托数据的总条数
                }
            }
            else if(tab.index==2){
                _this.requestBalance();//请求账户余额
            }
        },
        //请求当前委托
        requestNowEntrust(){
            let _this = this;
            let api = "/api/order/open-orders";
            // let api = "order/open-orders";
            _this.axios.post(api,{
                cache:false,//清除缓存
            }).then(res=>{
                console.log(res);
                if(res.data.orders==null){
                    return
                }
                let NowEntrust = res.data.orders.result;//获取当前委托数据
                NowEntrust.forEach(item=>{
                    item.price = Number(item.price).toFixed(4);
                    item.orderquantity = Number(item.orderquantity).toFixed(2);//委托量
                    item.filledquantity = Number(item.filledquantity).toFixed(2);//成交量
                    item.createtime = _this.formatTime(new Date(item.createtime)).split(" ")[1];
                    item.type = item.type=="sell-limit"?"卖出":"买入";
                    item.orderstatus = item.orderstatus=="unfilled"?"未成交":"部分成交";
                });
                _this.setData("NowEntrust",NowEntrust);
                _this.NowEntrust = _this.getData("NowEntrust");
            });
            if(_this.getData("NowEntrust")){
                _this.NowEntrust = _this.getData("NowEntrust");//接口不稳定时从缓存中取数据
            }
            // console.log(_this.NowEntrust);
            _this.pageSizeNowEntrust = 7;//设置当前委托记录每一页条数
            _this.totalNowEntrust = _this.NowEntrust.length;//获取当前委托数据的总条数
        },
        //改变当前委托记录当前页
        handleCurrentChangeNow(val){
            // console.log(val);
            let _this = this;
            _this.currentPageNowEntrust = val;
            if(_this.currentPageNowEntrust==1){
                _this.requestNowEntrust();
            }
        },
        //改变当前委托记录当前页
        handleCurrentChangeHis(val){
            // console.log(val);
            let _this = this;
            _this.currentPageHistory = val;
            if(_this.currentPageHistory==1&&_this.orderid!=""){
                _this.requestHisEntrust(_this.orderid);
            }
        },
        //请求历史委托
        requestHisEntrust(orderid){
            let _this = this;
            let api = "/api/order/info";
            console.log("请求历史记录",orderid)
            // let api = "order/info";
            let temp = {
                "orderid":orderid
            };
            let fd = _this.transformFormData(temp);
            _this.axios.post(api,fd,{
                 headers: {
                    'Content-Type': 'multipart/form-data',//指定参数为formData格式
                 },
                 cache:false,//清除缓存
            }).then(res=>{
                console.log(res,"历史委托");

                let HisEntrust = [];
                HisEntrust.push(res.data.order);
                // let HisEntrust = res.data.order;//获取历史委托

                HisEntrust.forEach(item=>{
                    item.price = Number(item.price).toFixed(4);
                    item.orderquantity = Number(item.orderquantity).toFixed(2);//委托量
                    item.filledquantity = Number(item.filledquantity).toFixed(2);//成交量
                    item.createtime = _this.formatTime(new Date(item.createtime)).split(" ")[1];
                    item.type = item.type=="sell-limit"?"卖出":"买入";
                    item.orderstatus = item.orderstatus=="filled"?"全部成交":(item.orderstatus=="canceled"?"已撤单":"部分撤单");
                });
                console.log(HisEntrust,"历史委托数组");
                _this.setData("HisEntrust",HisEntrust);
                _this.HisEntrust = _this.getData("HisEntrust");
            });
            if(_this.getData("HisEntrust")){
                _this.HisEntrust = _this.getData("HisEntrust");//接口不稳定时从缓存中取数据
            }
            _this.pageSizeHistory = 7;//设置历史委托记录每一页条数
            _this.totalNowHistory = _this.HisEntrust.length;//获取当前委托数据的总条数
            console.log(_this.totalNowHistory,"历史记录总条数");
        },
        //请求账户余额
        requestBalance(){
            let _this = this;
            let api = "/api/balance";
            // let api = "balance";
            _this.axios.post(api,{
                cache:false,//清除缓存
            }).then(res=>{
                // console.log(res)
                let balance = res.data.balance;
                balance = balance.filter(item=>{
                    return item.total!=0
                });
                // console.log(balance);
                _this.setData("balance",balance);
                _this.balance = _this.getData("balance");
            });
            if(_this.getData("balance")){
                _this.balance = _this.getData("balance");//接口不稳定时从缓存中取数据
            }
            _this.balance.map(item=>{
                        if(item.asset=="USDT"){
                            _this.usableUSDT = item.available
                        }
                        if(item.asset=="EMT"){
                            _this.usableEMT = item.available
                        }
            });
            
        },
        //转换为formData数据
        transformFormData(data){
            let fd = new FormData();
            Object.keys(data).forEach(key => fd.append(key, data[key]));
            return fd;
        },
        //撤单处理
        cancel(orderid){
            let _this = this;
            let api = "/api/order/cancel";
            // let api = "order/cancel";
            let temp = {
                "orderid":orderid
            };
            // console.log(temp);
            let fd = _this.transformFormData(temp);
            // console.log(fd);
            _this.axios.post(api,fd,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                 },
                 cache:false,//清除缓存
            }).then(res=>{
                console.log(res);
                if(res.data.status=="ok"){
                    _this.$message({
                        showClose: true,
                        message: '撤单成功！',
                        type: 'success'
                    });
                    _this.requestNowEntrust();
                     _this.orderid = orderid;
                     console.log(111);
                     _this.requestHisEntrust(_this.orderid);
                }else{
                    _this.$message('撤单失败！');
                }
            });
        },
        //存数据
        setData(name,data){
            data = JSON.stringify(data);
            window.sessionStorage.setItem(name,data);
        },
        //取数据
        getData(name){  
            // console.log(window.sessionStorage.getItem(name))   
            let data =  window.sessionStorage.getItem(name);
            // console.log(data,name,typeof(data));            
            if(data=="undefined"||data=="null"){
                return
            }
            let temp =  JSON.parse(data);
            if(temp){
                let jsonArr = [];
                for(let i =0 ;i < temp.length;i++){
                        jsonArr[i] = temp[i];
                }
                return jsonArr
            }           
        },
        //保证买卖操作的价格输入框值保留4位数
        keepFour(buyOrsell){
            let _this = this;
            // console.log(_this.buy.price);
            if(buyOrsell=="buy"){
                if(_this.buy.price.indexOf(".")!=-1){
                    let arr = _this.buy.price.split(".");
                    // console.log("字符串分割后的数组",arr)
                    if(arr[1].length>4){
                        arr[1] = arr[1].substr(0,4);
                        // console.log(arr[1])
                        let temp = arr.join(".");
                        // console.log("返回的字符串",temp);
                        _this.buy.price = temp;
                    }
                }               
            }else{
                if(_this.sell.price.indexOf(".")!=-1){
                    let arr = _this.sell.price.split(".");
                    // console.log("字符串分割后的数组",arr)
                    if(arr[1].length>4){
                        arr[1] = arr[1].substr(0,4);
                        // console.log(arr[1])
                        let temp = arr.join(".");
                        // console.log("返回的字符串",temp);
                        _this.sell.price = temp;
                    }
                }
            }
        },
        //请求最新价
        requestTradingInfo(){
            let _this = this;
            let api = "/api/market/ticker?symbol=emtusdt";
            // let api = "market/ticker?symbol=emtusdt";
            _this.axios.get(api,{
                cache:false,//清除缓存
            }).then(res=>{
                // console.log(res);
                _this.last = res.data.ticker[0].last;
                
            });
            // _this.timerCount[3] = setTimeout(_this.requestTradingInfo, 500);//打开注释
        },
        //自动挂单
        automation(){
            let _this = this;
            let random = (Math.random()*1000).toFixed(0);
            // console.log(randomSell,randomBuy)
            if(_this.sell1>_this.last+0.0001){
                console.log("卖出");
               _this.sell.price = (Number(_this.last)+0.0001).toString();
               _this.keepFour("sell");
               _this.sell.quantity = random;
                _this.operateEMTF("sell")
            }
            if(_this.buy1<_this.last-0.0001){
                console.log("买入");
                _this.buy.price = (Number(_this.last)-0.0001).toString();
               _this.keepFour("buy");
               _this.buy.quantity = random;
                console.log(_this.buy.price,_this.buy.quantity)
                _this.operateEMTF("buy");
            }
            // _this.timerCount[4] = setTimeout(_this.automation,60000);//打开注释
        },
        //退出登录
        quitLogin(){
            let _this = this;
            window.sessionStorage.removeItem("loginOrNot");
            console.log(window.sessionStorage.getItem("loginOrNot"));
            _this.$router.push({ path: "/" });
        },
        //下载历史委托记录
        downLoad(){
            var wb = XLSX.utils.table_to_book(document.querySelector('#downLoad'))
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'history.xlsx')
            } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
            return wbout
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
        _this.requestNowEntrust(); //请求当前委托
        _this.requestBalance(); //请求余额:获取可用资产 
        _this.requestTradingInfo();//为了请求最新价
        // _this.timerCount[5] = setTimeout(_this.automation,60000);//页面打开1min后自动操作//打开注释
    },
    //在创建组件进入组件页面前判断是否登录
    beforeRouteEnter(to,from,next){
        // 判断：是否登录成功，，没有则让用户先登录
        let loginOrNot = window.sessionStorage.getItem("loginOrNot");
        console.log("admin",loginOrNot,typeof(loginOrNot))
        if(loginOrNot!=='"yes"'){
            console.log("未登录状态",loginOrNot)
            next({
                path:"/"
            })   
        }else{
            console.log("登录状态",loginOrNot)
            next();  
        }
    },
    //组件被破坏之前，最好也把计时器清除
    beforeDestroy(){
        let _this = this;
        for(let i = 0; i <= _this.timerCount.length; i++){
            clearTimeout(_this.timerCount[i]);//清空容器的所有计时器
        }
        _this.timerCount.splice(0, _this.timerCount.length)//清空容器
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
    height:100%;
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
/* 操作部分输入框样式 */
#operate .el-input{
    margin-bottom:1.5em;
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
    top: 133px;
    right: 376px;
}
#EMT2 {
    top: 133px;
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
/* 撤单 */
.cancel{
    color: #5b90e4;
}
/* 详细记录下表格样式 */
#details .el-table .cell,
#details .el-table th div,
#details .el-table--border td:first-child .cell,
#details .el-table--border th:first-child .cell{
    line-height: 2.5em;
}
#details .el-table{
    overflow: hidden;
}
/* 详细记录下历史委托记录的下载按钮样式 */
.downLoad{
    color: #409EFF;
    z-index: 1;
    position: absolute;
    right: 3px;
    top: 0px;
    opacity: 0;
    cursor: pointer;
}
/* 历史委托记录表格样式 */
#downLoad{
    font-size: 0.8em
}
/* 退出登录按钮 */
.quit{
    position: absolute;
    z-index: 1;
    top: 0%;
    right: 0;
    opacity: 0;
}
.quit:hover,.downLoad:hover{
    opacity: 1;
}
</style>
