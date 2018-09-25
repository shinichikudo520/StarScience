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
                            <el-input v-model="buyEMT" placeholder="买入价" type="number"></el-input>
                            <span id="USDT1">USDT</span>
                            <p class="equivalentRMB">≈￥{{buyRMB}}</p>
                            <el-input v-model="buyNum" placeholder="买入量" type="number"></el-input>
                            <span id="EMT1">EMT</span>
                            <el-button-group>
                                <el-button>1/4</el-button>
                                <el-button>1/2</el-button>
                                <el-button>All</el-button>
                            </el-button-group>
                            <p style="color:#7c88a0;font-size:0.9em;padding-left:5px">可用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{usableUSDT}}&nbsp;USDT</p>
                            <p style="color:#7c88a0;font-size:0.9em;padding-left:5px">交易额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{usableUSDT}}&nbsp;USDT</p>
                            <el-button class="submitBtn">买入 EMT</el-button>
                        </div>
                    </el-col>
                    <!-- 卖出列 -->
                    <el-col :span="12">
                        <div class="grid-content" id="sell">
                            <h4 style="color:#33ae72;padding-left:0.5em;">卖出EMT</h4>
                            <el-input v-model="sellEMT" placeholder="卖出价" type="number"></el-input>
                            <span id="USDT2">USDT</span>
                            <p class="equivalentRMB">≈￥{{sellRMB}}</p>
                            <el-input v-model="sellNum" placeholder="卖出量" type="number"></el-input>
                            <span id="EMT2">EMT</span>
                            <el-button-group>
                                <el-button>1/4</el-button>
                                <el-button>1/2</el-button>
                                <el-button>All</el-button>
                            </el-button-group>
                            <p style="color:#7c88a0;font-size:0.9em;padding-left:5px">可用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{usableEMT}}&nbsp;EMT</p>
                            <p style="color:#7c88a0;font-size:0.9em;padding-left:5px">交易额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{usableEMT}}&nbsp;USDT</p>
                            <el-button class="submitBtn">卖出 EMT</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-container>
            <!-- 深度图 -->
            <el-container id="depthMap">
            </el-container>
        </div>
        <div id="center">
            <!-- 20档行情 -->
                <!-- 卖出 -->
                <el-table :data="tableData.asks" style="width: 100%;height:48%"  class="sellTop" :cell-style="green" :header-cell-style="green">
                    <el-table-column width="90" >
                        <template slot-scope="scope">
                            {{'卖 '+(scope.$index+(20-2*scope.$index))+''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格" width="95">
                    </el-table-column>
                    <el-table-column prop="quantity" label="数量" width="95">
                    </el-table-column>
                    <el-table-column label="挂单量" width="95">
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                    <el-table-column label="差量" width="95">
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 行情 -->
                <p>0.1113 <span>≈ ￥0.7639</span></p>
                <!-- 买入 -->
                <el-table :data="tableData.bids" style="width: 100%;height:44%"  class="buyTop" :cell-style="red" :header-cell-style="red">
                    <el-table-column width="90" >
                        <template slot-scope="scope">
                            {{'买 '+(scope.$index+1)+''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price"  width="95">
                    </el-table-column>
                    <el-table-column prop="quantity"  width="95">
                    </el-table-column>
                    <el-table-column  width="95">
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                    <el-table-column  width="95">
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                </el-table>
        </div>
        <div id="right">
            <!-- 实时成交 -->
            <el-container id="realTime">
                <el-table :data="tableData.bids" style="width: 100%;height:100%">
                    <el-table-column width="90" label="时间">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="方向" width="95">
                    </el-table-column>
                    <el-table-column prop="quantity" label="数量" width="95">
                    </el-table-column>
                    <el-table-column label="价格" width="95">
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" width="95">
                        <template slot-scope="scope">
                        </template>
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
            buyEMT: "", //买入EMT价格
            buyNum: "", //买入EMT数量
            buyRMB: 0.0, //买入EMT等值RMB
            usableUSDT: 0.0, //可用USDT
            sellEMT: "", //卖出EMT
            sellNum: "", //卖出EMT数量
            sellRMB: 0.0, //卖出EMT等值RMB
            usableEMT: 0.0, //可用EMT
            tableData: {
                //20档行情数据信息
                asks: [], //卖出
                bids: [], //买入
                timestamp: "" //时间戳
            },
            seriesDepthMap: [//深度图数据
                {
                    name: "成交",
                    type: "line",
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: "default" } } },
                    data: [10, 12, 21, 54, 260, 830, 710]
                },
                {
                    name: "意向",
                    type: "line",
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: "default" } } },
                    data: [1320, 1132, 601, 234, 120, 90, 20]
                }
            ]
        };
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
        //请求数据
        ajax() {
            let _this = this;
            let api =
                "http://api.coinbene.com/v1/market/orderbook?symbol=EMTUSDT&depth=200";
            _this.axios.get(api).then(res => {
                console.log(res)
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
            setTimeout(this.ajax, 100);
        },
        //加载深度图
        loadDepthMap() {
            let _this = this;
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById("depthMap"));
            let app = {};
            let optionDepthMap = null;
            //折线图配置
            optionDepthMap = {
                title: {
                    text: "深度图",
                    // subtext: "纯属虚构"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["意向", "成交"]
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ["line", "bar", "stack", "tiled"]
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false,
                        data: [
                            "周一",
                            "周二",
                            "周三",
                            "周四",
                            "周五",
                            "周六",
                            "周日"
                        ]
                    }
                ],
                yAxis: [
                    {
                        type: "value"
                    }
                ],
                series: _this.seriesDepthMap,
                
            };
            if (optionDepthMap && typeof optionDepthMap === "object") {
                myChart.setOption(optionDepthMap, true);
            }
        }
    },
    mounted() {
        let _this = this;
        _this.buyRMB = _this.buyRMB.toFixed(4); //买入EMT等值RMB保留4位数
        _this.sellRMB = _this.sellRMB.toFixed(4); //卖出EMT等值RMB保留4位数
        _this.usableUSDT = _this.usableUSDT.toFixed(3); //可用USDT保留3位数
        _this.usableEMT = _this.usableEMT.toFixed(3); //可用EMT保留3位数
        _this.ajax(); //加载数据
        _this.loadDepthMap(); //加载深度图
    }
};
</script>
<style>
/* 整体样式 */
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
#left,#center,#right{
    width: 33.3%;
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
    right: 289px;
}
#USDT2 {
    top: 73px;
    right: 36px;
}
/* EMT输入框右提示文字样式 */
#EMT1 {
    top: 155px;
    right: 289px;
}
#EMT2 {
    top: 155px;
    right: 36px;
}
/* 买卖1/4、1/2、All按钮样式 */
#buy button:not(.submitBtn),
#sell button:not(.submitBtn) {
    margin-top: 10px;
    padding: 6px 29px;
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
/* 实时成交单元格 */
#realTime .el-table .cell {
    line-height: 2.5em;
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
</style>
