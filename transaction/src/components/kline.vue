<template>
    <!-- 后台统计页面 -->
    <!-- k线 -->
    <div id="klinePage" style="height: 100%">
        <el-button  round @click="quitLogin" class="quit">退出</el-button>
        <!-- 顶部 -->
        <div id="btnGrounp" style="height: 3%">
            <h3>电音链  EMT/USDT 
                <small>
                    <span class="red nowPrice greenFont" style="margin-left:20px" >{{Number(TradingInfo.last).toFixed(4)}}</span>  
                    <span style="margin-left:20px">涨跌幅 <span class="red">{{TradingInfo.upOrDown+"%"}}</span></span>  
                    <span style="margin-left:20px">24H量 {{Number(TradingInfo.Vol).toFixed(2)}}</span>
                </small>
            </h3>
            <!-- 各时间段按钮 -->
            <el-button-group>
                <el-button>1min</el-button>
                <el-button>5min</el-button>
                <el-button>15min</el-button>
                <el-button>30min</el-button>
                <el-button>1hour</el-button>
                <el-button>4hour</el-button>
                <el-button>1day</el-button>
                <el-button>1week</el-button>
                <el-button>1mon</el-button>
            </el-button-group>
        </div>
        <!-- k线图 -->
        <div id="kline" style="height: 70%"></div>
        <!-- MACD -->
        <div id="macd" style="height: 27%"></div>
    </div>
    
</template>
<script>
//引入echarts
let echarts = require("echarts");
export default {
    name: "klinePage",
    data() {
        return {
            TradingInfo:{//页面顶部综述信息的数据
                last:0.0000,//当前价格
                reference:0.0,//参考价
                upOrDown:0.0,//涨跌幅
                Vol: 0.0,//24h交易量
            }
        };
    },
    methods: {      
        //请求页面顶部综述信息的数据
        requestTradingInfo(){
            let _this = this;
            let api = "/api/market/ticker?symbol=emtusdt";
            // let api = "market/ticker?symbol=emtusdt";
            _this.axios.get(api,{
                cache:false,//清除缓存
            }).then(res=>{
                // console.log(res);
                _this.TradingInfo.last = res.data.ticker[0].last
                _this.TradingInfo.Vol = res.data.ticker[0]["24hrVol"]
                console.log(_this.TradingInfo);
            });
            _this.timerCount[0] = setTimeout(_this.requestTradingInfo, 500);
        },
        //加载k线图
        loadkline() {
            let _this = this;
            //获取装载图表的dom结构
            let domkline = document.getElementById("kline");
            let domMacd = document.getElementById("macd");
            //初始化dom
            let myChartkline = echarts.init(domkline);
            let myChartMacd = echarts.init(domMacd);
            let app = {};
            //声明option配置对象
            let optionkline = null;
            let optionkMacd = null;
            //上升的背景颜色：红色
            let upColor = '#ec0000';
            //下降的背景颜色：绿色
            let downColor = '#00da3c';
            //请求数据
            let api = '../../static/stock.json';
            _this.axios.get(api).then(rawData=>{
                //处理数据
                let data = _this.splitData(rawData.data);
                // console.log(data);
                //开始配置信息
                myChartkline.setOption(optionkline = {
                    backgroundColor: '#fff',
                    animation: false,
                    legend: {//图例，图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
                        bottom: 10,
                        left: 'center',
                        data: ['k线图', 'MA5', 'MA10', 'MA20', 'MA30']
                    },
                    tooltip: {//提示框组件
                        trigger: 'axis',//触发类型: 'axis'坐标轴触发
                        axisPointer: {//坐标轴指示器是指示坐标轴当前刻度的工具。
                            type: 'cross'// tooltip.axisPointer.type 设置为 'cross'，则此时坐标系会自动选择显示哪个轴的 axisPointer
                        },
                        backgroundColor: 'rgba(245, 245, 245, 0.8)',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        textStyle: {//提示框文本颜色
                            color: '#000'
                        },
                        position: function (pos, params, el, elRect, size) {//提示框定位
                            let obj = {top: 10};
                            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                            return obj;
                        }
                    },
                    axisPointer: {//坐标轴指示器
                        link: {// axisPointer.link 来关联不同的坐标系中的 axisPointer
                            xAxisIndex: 'all'//// 表示所有xAxisIndex坐标轴。
                        },
                        label: {//文本背景颜色
                            backgroundColor: '#777'
                        }
                    },
                    toolbox: {//工具栏
                        feature: {//各工具配置项
                            dataZoom: {//dataZoom 组件 用于区域缩放
                                yAxisIndex: false//关闭dataZoom-inside 组件控制的 y轴的缩放
                            },
                            brush: {//brush 是区域选择组件，用户可以选择图中一部分数据，从而便于向用户展示被选中数据，或者他们的一些统计计算结果。
                                type: ['lineX', 'clear']//使用的按钮,取值：
                                // 'lineX'：开启横向选择功能。
                                // 'lineY'：开启纵向选择功能。
                                // 'keep'：切换『单选』和『多选』模式。后者可支持同时画多个选框。前者支持单击清除所有选框。
                                // 'clear'：清空所有选框。
                            }
                        }
                    },
                    visualMap: {//visualMap 是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
                        show: false,//是否显示,如果设置为 false，不会显示，但是数据映射的功能还存在。
                        seriesIndex: 5,//指定取哪个系列的数据，即name=Volume系列的 series.data。
                        dimension: 2,//指定用数据的『哪个维度』，映射到视觉元素上。『数据』即 series.data。
                        pieces: [{
                            value: 1,//下降
                            color: downColor//绿色
                        }, {
                            value: -1,//上升
                            color: upColor//红色
                        }]
                    },
                    grid: [//直角坐标系内绘图网格:整个坐标系
                        {
                            left: '10%',
                            right: '8%',
                            height: '50%'
                        },
                        {
                            left: '10%',
                            right: '8%',
                            top: '63%',
                            height: '16%'
                        }
                    ],
                    xAxis: [//直角坐标系 grid 中的 x 轴
                        {
                            type: 'category',//坐标轴类型。'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
                            data: data.categoryData,//指定数据
                            scale: true,//是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。
                            boundaryGap : false,//坐标轴两边留白策略,类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
                            axisLine: {//坐标轴轴线相关设置。
                                onZero: false//X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效。
                            },
                            splitLine: {//坐标轴在 grid 区域中的分隔线。
                                show: false//是否显示分隔线。默认数值轴显示，类目轴不显示。
                            },
                            splitNumber: 20,//坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整。在类目轴中无效。
                            min: 'dataMin',//坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。
                            max: 'dataMax',//坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。
                            axisPointer: {//坐标轴指示器
                                z: 100//坐标轴指示器的 z 值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
                            }
                        },
                        {
                            type: 'category',
                            gridIndex: 1,//x 轴所在的 grid(坐标系) 的索引，默认位于第一个 grid。
                            data: data.categoryData,
                            scale: true,
                            boundaryGap : false,
                            axisLine: {onZero: false},
                            axisTick: {//坐标轴刻度相关设置。
                                show: false//是否显示坐标轴刻度。
                            },
                            splitLine: {show: false},
                            axisLabel: {//坐标轴刻度标签的相关设置。
                                show: false//是否显示坐标轴刻度。
                            },
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax'
                        }
                    ],
                    yAxis: [//直角坐标系 grid 中的 y 轴
                        {
                            scale: true,
                            splitArea: {//坐标轴在 grid 区域中的分隔区域
                                show: true
                            }
                        },
                        {
                            scale: true,
                            gridIndex: 1,
                            splitNumber: 2,
                            axisLabel: {show: false},
                            axisLine: {show: false},
                            axisTick: {show: false},
                            splitLine: {show: false}
                        }
                    ],
                    dataZoom: [//dataZoom 组件 用于区域缩放
                        {
                            type: 'inside',//内置型数据区域缩放组件,所谓『内置』，即内置在坐标系中
                            xAxisIndex: [0, 1],//设置 dataZoom-inside 组件控制的 x轴, [0, 1]表示这个 dataZoom 组件控制 第一个 和 第二个 xAxis
                            start: 98,//数据窗口范围的起始百分比98%
                            end: 100//数据窗口范围的结束百分比 100%
                        }
                    ],
                    series: [//系列列表
                        {
                            name: 'k线图',//系列名称，用于tooltip的显示，legend 的图例筛选，
                            type: 'candlestick',//类型：K线图
                            data: data.values,//绑定数据
                            itemStyle: {//K 线图的图形样式。
                                normal: {
                                    color: upColor,//阳线 图形的颜色。
                                    color0: downColor,//阴线 图形的颜色。
                                    borderColor: null,
                                    borderColor0: null
                                }
                            },
                            tooltip: {////提示框组件
                                formatter: function (param) {//提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
                                    param = param[0];
                                    return [
                                        'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                                        'Open: ' + param.data[0] + '<br/>',
                                        'Close: ' + param.data[1] + '<br/>',
                                        'Lowest: ' + param.data[2] + '<br/>',
                                        'Highest: ' + param.data[3] + '<br/>'
                                    ].join('');
                                }
                            }
                        },
                        {
                            name: 'MA5',
                            type: 'line',
                            data: _this.calculateMA(5, data),
                            smooth: true,
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },
                        {
                            name: 'MA10',
                            type: 'line',
                            data: _this.calculateMA(10, data),
                            smooth: true,
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },
                        {
                            name: 'MA20',
                            type: 'line',
                            data: _this.calculateMA(20, data),
                            smooth: true,
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },
                        {
                            name: 'MA30',
                            type: 'line',
                            data: _this.calculateMA(30, data),
                            smooth: true,
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },
                        {
                            name: 'Volume',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: data.volumes
                        }
                    ]
                }, true);
                // MACD图数据获取
                var xAxisData = data.categoryData;//macd图x轴
                var data1 = [];//macd图柱状图数据数组
                data.volumes.map(item=>{
                    data1.push(item[1]);
                });
                var data2 = [];//macd线条1的数组
                data1.map(item=>{
                    item = item + 100000;
                    data2.push(item);
                });
                var data3 = [];//macd线条2的数组
                data1.map(
                    item=>{item = item - 100000;
                    data3.push(item);
                });
                //MACD配置信息             
                myChartMacd.setOption(optionkMacd = {
                    title: {
                        text: 'MACD图'
                    },
                    legend: {
                        align: 'left',
                        show:false
                    },
                    toolbox: {
                        // y: 'bottom',
                        feature: {
                            magicType: {
                                type: ['stack', 'tiled']
                            },
                            dataView: {},
                            saveAsImage: {
                                pixelRatio: 2
                            }
                        }
                    },
                    tooltip: {//提示框组件
                        trigger: 'axis',//触发类型: 'axis'坐标轴触发
                        axisPointer: {//坐标轴指示器是指示坐标轴当前刻度的工具。
                            type: 'cross'// tooltip.axisPointer.type 设置为 'cross'，则此时坐标系会自动选择显示哪个轴的 axisPointer
                        },
                        backgroundColor: 'rgba(245, 245, 245, 0.8)',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        textStyle: {//提示框文本颜色
                            color: '#000'
                        },
                        position: function (pos, params, el, elRect, size) {//提示框定位
                            let obj = {top: 10};
                            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                            return obj;
                        }
                    },
                    axisPointer: {//坐标轴指示器
                        link: {// axisPointer.link 来关联不同的坐标系中的 axisPointer
                            xAxisIndex: 'all'//// 表示所有xAxisIndex坐标轴。
                        },
                        label: {//文本背景颜色
                            backgroundColor: '#777'
                        }
                    },

                    // 数据中有一个标识符，根据标识符，上升的为红色，下降的绿色
                    // visualMap: {//visualMap 是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
                    //     show: false,//是否显示,如果设置为 false，不会显示，但是数据映射的功能还存在。
                    //     seriesIndex: 5,//指定取哪个系列的数据，即name=Volume系列的 series.data。
                    //     dimension: 2,//指定用数据的『哪个维度』，映射到视觉元素上。『数据』即 series.data。
                    //     pieces: [{//自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式。
                    //         value: 1,//下降
                    //         color: downColor//绿色
                    //     }, {
                    //         value: -1,//上升
                    //         color: upColor//红色
                    //     }]
                    // },
                    
                    xAxis: {
                        data: xAxisData,
                        show:false,
                        silent: false,
                        splitLine: {
                            show: false
                        },
                        axisPointer: {//坐标轴指示器
                            // z: 100//坐标轴指示器的 z 值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
                        }
                    },
                    yAxis: {
                    },
                    dataZoom: [//dataZoom 组件 用于区域缩放
                        {
                            type: 'inside',//内置型数据区域缩放组件,所谓『内置』，即内置在坐标系中
                            xAxisIndex: 0,//设置 dataZoom-inside 组件控制的 x轴, [0, 1]表示这个 dataZoom 组件控制 第一个 和 第二个 xAxis
                            start: 98,//数据窗口范围的起始百分比98%
                            end: 100//数据窗口范围的结束百分比 100%
                        }
                    ],
                    series: [{
                            name: 'bar',
                            type: 'bar',
                            data: data1,
                        }, {
                            name: 'line1',
                            type: 'line',
                            data: data2,
                        }, {
                            name: 'line2',
                            type: 'line',
                            data: data3,
                    }]
                }, true);
                myChartkline.dispatchAction({//触发图表行为
                    type: 'brush',//brush 是区域选择组件
                    areas: [
                        {
                            brushType: 'lineX',
                            coordRange: ['2016-06-02', '2016-06-20'],
                            xAxisIndex: 0
                        }
                    ]
                });
                myChartMacd.dispatchAction({//触发图表行为
                    type: 'brush',//brush 是区域选择组件
                    areas: [
                        {
                            brushType: 'lineX',
                            coordRange: ['2016-06-02', '2016-06-20'],
                            xAxisIndex: 0
                        }
                    ]
                });
            });
            if (optionkline && typeof optionkline === "object") {
                myChartkline.setOption(optionkline, true);
            }
            if (optionkMacd && typeof optionkMacd === "object") {
                myChartMacd.setOption(optionkMacd, true);
            }
            //两表联动
            echarts.connect([myChartkline,myChartMacd]);
        },
        //处理k线的数据
        splitData(rawData) {
            let categoryData = [];//时间
            let values = [];//每个时间点的交易数据，开盘价，收盘价，最低，最高，交易数量
            let volumes = [];//每次变化的相关信息，下标，交易数量，下降(1--绿色)或上升(-1--红色)
            for (let i = 0; i < rawData.length; i++) {
                categoryData.push(rawData[i].splice(0, 1)[0]);
                values.push(rawData[i]);
                volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
            }
            return {
                categoryData: categoryData,
                values: values,
                volumes: volumes
            };
        },
        //处理不同时间的均线的数据
        calculateMA(dayCount, data) {//(时间线，数据)
            let result = [];
            for (let i = 0, len = data.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                let sum = 0;
                for (let j = 0; j < dayCount; j++) {
                    sum += data.values[i - j][1];//前面几个收盘价的平均值
                }
                result.push(+(sum / dayCount).toFixed(3));
            }
            return result;
        },
         //存数据
        setData(name,data){
            data = JSON.stringify(data);
            window.sessionStorage.setItem(name,data);
        },
        //取数据
        getData(name){
            let temp =  JSON.parse(window.sessionStorage.getItem(name));
            if(temp){
                let jsonArr = [];
                for(let i =0 ;i < temp.length;i++){
                        jsonArr[i] = temp[i];
                }
                return jsonArr
            }
        },
        //退出登录
        quitLogin(){
            let _this = this;
            window.sessionStorage.clear();//清除所有缓存
            // window.sessionStorage.removeItem("loginOrNot");
            // console.log(window.sessionStorage.getItem("loginOrNot"));
            _this.$router.push({ path: "/" });
        }
    },
    mounted() {
        let _this = this;
        _this.requestTradingInfo();//请求页面顶部综述信息的数据
        _this.loadkline();//加载k线图
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
body {
    height: 100%;
    overflow: hidden;
}
/* 按钮组 */
#btnGrounp{
    position: relative;
    z-index: 1;
    top: 0px;
    left: 152px;
}
#btnGrounp h3{
    font-weight: 400;
}
.red{
    color: #ec0000;
}
.green{
    color: #00da3c
}
/* 退出登录按钮样式 */
.quit{
    position: absolute;
    right: 0;
    top: o;
    z-index: 1;
    opacity: 0;
}
.quit:hover{
    opacity: 1;
}
</style>
