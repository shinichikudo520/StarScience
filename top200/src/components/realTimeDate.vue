<template>
  <div class="realTimeDate">
      <template>
            <el-table :data="tableData.asks" style="width: 100%" id="left" :cell-style='red'>
                <el-table-column type="index" label="卖出" width="100">
                </el-table-column>
                <el-table-column prop="price" label="价格" width="180">
                </el-table-column>
                <el-table-column prop="quantity" label="数量">
                </el-table-column>
            </el-table>
        </template>
        <template>
            <el-table :data="tableData.bids" style="width: 100%" id="right" :cell-style='green'>
                <el-table-column type="index" label="买入" width="100">
                </el-table-column>
                <el-table-column prop="price" label="价格" width="180">
                </el-table-column>
                <el-table-column prop="quantity" label="数量">
                </el-table-column>
            </el-table>
        </template>
        <template>
            <el-table :data="tradeDetails" style="width: 100%" id="tradeDetails" :cell-style='tradeDirection'>
                <el-table-column prop="p" label="价格(USDT)" width="100">
                </el-table-column>
                <el-table-column prop="v" label="数量(EMT)" width="180">
                </el-table-column>
                <el-table-column prop="t" label="时间">
                </el-table-column>
            </el-table>
        </template>
  </div>
</template>

<script type="text/javascript">
// import jsonp from 'jsonp'
export default {
        name:'realTimeDate',
        data(){
            return {
                tableData: {
					//数据信息
					asks: [], //买入
					bids: [], //卖出
					timestamp: "" //时间戳
                },
                tradeDetails:[],//实时成交数据
            }
        },
        methods: {
            //请求top200数据
            ajax() {
                let _this = this;
                let api = 
                    '/v1/market/orderbook?symbol=EMTUSDT&depth=200';
                    // "http:/.coinbene.com/v1/market/orderbook?symbol=EMTUSDT&depth=200";
                    // "http://api.manbiwang.com/v1/market/orderbook?symbol=EMTUSDT&depth=200";
                _this.axios.get(api).then(res => {
                    console.log(res);
                    _this.tableData.asks = res.data.orderbook.asks; //卖出数组
                    _this.tableData.bids = res.data.orderbook.bids; //买入数组
                    _this.tableData.timestamp = res.data.timestamp; //时间戳
                });
                
                // jsonp('http://a.manbiwang.com/v1/market/orderbook?symbol=EMTUSDT&depth=200', null, (err, data) => {
                // if (err) {
                //     console.error(err.message);
                // } else {
                //    console.log(data);
                // }
                // })
            },
            //卖出价格列样式
            green({row,column,rowIndex,columnIndex}) {
                if(columnIndex === 1) { //指定坐标
                    return 'color:green'
                } else {
                    return ''
                }
            },
            //买入价格列样式
            red({row,column,rowIndex,columnIndex}) {
                if(columnIndex === 1) { //指定坐标
                    return 'color:red'
                } else {
                    return ''
                }
            },
            //买入价格列样式
            tradeDirection({row,column,rowIndex,columnIndex}) {
                //console.log(row,columnIndex)
                if(columnIndex === 1 && row.d == 'buy') { //指定坐标
                    return 'color:green'
                } 
                else if(columnIndex === 1 && row.d == 'sell') {
                    return 'color:red'
                }
            },
            getTradeDetails(){
                let _this = this;
                let api =  '/market/tradepair/latest/tradedetail?tradePair=EMTUSDT&num=50';
                _this.axios.get(api,{
                    headers:{
                        'site':'MAIN'
                    }
                }).then(res=>{
                    //console.log('实时成交res',res);
                    if(res.data.code == 200){
                        _this.tradeDetails = res.data.data;
                    //console.log('实时成交',_this.tradeDetails);
                    }
                });
            }		
        },
        mounted() {
            var _this = this;
            setInterval(()=>{
                _this.ajax();//请求200档行情
                _this.getTradeDetails();//获取实时成交、
            },1000)
            _this.h = document.documentElement.clientHeight || document.body.clientHeight;
            _this.rowN = parseInt(_this.h / 45); //整个页面最多多少行	
            
        },
    };
</script>
<style scoped>
.realTimeDate>>>.el-table {
    float: left;
    width: 30% !important;
    margin-right: 2%;
}
.realTimeDate>>>.el-table tr{
    color: grey !important;
}
.realTimeDate>>>.el-table th,
.realTimeDate>>>.el-table tr {
    background-color: black;
    text-align: center;
}

.realTimeDate>>>.el-table tr {
    color: white;
}

.realTimeDate>>>.el-table tr:hover {
    background-color: transparent;
}

/* .realTimeDate>>>#left table .el-table_1_column_2 {
    color: green;
}

.realTimeDate>>>#right table .el-table_2_column_5 {
    color: red;
} */

.realTimeDate>>>table {
    font-size: 12px;
}

.realTimeDate>>>.el-table .cell {
    /*line-height: 11px;*/
    text-align:center;
}

.realTimeDate>>>.el-table td,
.realTimeDate>>>.el-table th.is-leaf {
    border-bottom: 1px dotted #C0C0C0;
}
</style>
