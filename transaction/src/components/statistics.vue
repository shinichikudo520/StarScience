<template>
    <!-- 后台统计页面 -->
    <div id="statisticsPage" style="height: 100%">
        <!-- 上半部 -->
        <el-container id="top">
            <!-- 折线图 -->
            <div id="line"></div>
            <!-- 柱状图 -->
            <div id="histogram"></div>
        </el-container>
        <!-- 下半部 -->
        <el-container id="bottom">
            <!-- 详细交易记录 -->
            <div id="details">
                <el-table :data="tableData3"  border style="width: 100%">
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table>
            </div>
        </el-container>
    </div>
</template>

<script>
//引入echarts
let echarts = require("echarts");
export default {
    name: "statistics",
    data() {
        return {
            //折线图数据
            seriesLine: [
                {
                    name: "邮件营销",
                    type: "line",
                    stack: "总量",
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: "联盟广告",
                    type: "line",
                    stack: "总量",
                    data: [220, 182, 191, 234, 290, 330, 310]
                }
            ],
            //柱状图数据
            seriesHistogram: [
                {
                    name: "蒸发量",
                    type: "bar",
                    data: [
                        2.0,
                        4.9,
                        7.0,
                        23.2,
                        25.6,
                        76.7,
                        135.6,
                        162.2,
                        32.6,
                        20.0,
                        6.4,
                        3.3
                    ]
                },
                {
                    name: "降水量",
                    type: "bar",
                    data: [
                        2.6,
                        5.9,
                        9.0,
                        26.4,
                        28.7,
                        70.7,
                        175.6,
                        182.2,
                        48.7,
                        18.8,
                        6.0,
                        2.3
                    ]
                }
            ],
            //详细交易数据
            tableData3: [
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-08",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-06",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-07",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                }
            ]
        };
    },
    methods: {
        //加载线状图
        loadLine() {
            let _this = this;
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById("line"));
            let app = {};
            let optionLine = null;
            //折线图配置
            optionLine = {
                //声明是折线图
                title: {
                    text: "折线图堆叠"
                },
                tooltip: {
                    trigger: "axis"
                },
                //每条线的名称
                legend: {
                    data: ["邮件营销", "联盟广告"]
                },
                //整体图的距离设置
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                //x轴
                xAxis: {
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
                },
                //y轴
                yAxis: {
                    type: "value"
                },
                series: _this.seriesLine
            };
            if (optionLine && typeof optionLine === "object") {
                myChart.setOption(optionLine, true);
            }
        },
        //加载柱状图
        loadHistogram() {
            let _this = this;
            let dom = document.getElementById("histogram");
            let myChart = echarts.init(dom);
            let app = {};
            let optionHistogram = null;
            app.title = "柱状图";
            optionHistogram = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        crossStyle: {
                            color: "#999"
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ["line", "bar"] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                //柱名
                legend: {
                    data: ["蒸发量", "降水量"]
                },
                //x轴
                xAxis: [
                    {
                        type: "category",
                        data: [
                            "1月",
                            "2月",
                            "3月",
                            "4月",
                            "5月",
                            "6月",
                            "7月",
                            "8月",
                            "9月",
                            "10月",
                            "11月",
                            "12月"
                        ],
                        axisPointer: {
                            type: "shadow"
                        }
                    }
                ],
                //y轴
                yAxis: [
                    {
                        type: "value",
                        name: "水量",
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            formatter: "{value} ml"
                        }
                    }
                ],
                //柱状图数据
                series: _this.seriesHistogram
            };
            if (optionHistogram && typeof optionHistogram === "object") {
                myChart.setOption(optionHistogram, true);
            }
        }
    },
    mounted() {
        let _this = this;
        //加载折线图
        _this.loadLine();
        //加载柱状图
        _this.loadHistogram();
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

/* 上半部、下半部样式 */
#top,
#bottom {
    width: 100%;
    height: 49%;
}
/* 折线图、柱状图样式 */
#line,
#histogram {
    width: 48%;
    float: left;
}
/* 折线图 */
#line {
    height: 100%;
    margin-right: 4%;
}
/* 柱状图 */
#histogram {
    height: 109%;
}
/* 详细交易记录 */
#details {
    width: 100%;
    height: 95% !important;
    overflow: auto;
}
</style>
