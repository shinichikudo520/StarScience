<template>
    <div id="admin">
        <el-button-group>
            <el-button @click="exchange" round>交易页面</el-button>
            <el-button @click="kline" round>k线图</el-button>
            <el-button @click="statistics" round>数据分析</el-button>
        </el-button-group>
        <el-button  round @click="quitLogin" class="quit">退出</el-button>
        <el-row>
            <el-row>
                <el-col :span="22">
                    <span>时间：</span>
                    <el-date-picker v-model="dateAccount" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="exportAccount">导出</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table ref="filterTable" :data="tableData" style="width: 100%" class="Account">
                    <el-table-column prop="date" label="日期" width="180" column-key="date" :filter-method="filterHandler">
                        <!--  :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]" -->
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" width="180">
                    </el-table-column>
                    <el-table-column prop="tag" label="标签" width="100">
                    </el-table-column>
                </el-table>
            </el-row>
        </el-row>
    </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
    name: "admin",
    data() {
        return {
            dateAccount:"",//记账表格日期
            tableData: [{//记账表格
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                tag: '家'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                tag: '公司'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                tag: '家'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                tag: '公司'
            }]
        };
    },
    methods:{
        exchange(){//跳转到交易页面
            let _this = this;
            _this.$router.push({ path: "/exchange" });
        },
        kline(){//跳转到交易页面
            let _this = this;
            _this.$router.push({ path: "/kline" });
        },
        statistics(){//跳转到交易页面
            let _this = this;
            _this.$router.push({ path: "/statistics" });
        },
        //退出登录
        quitLogin(){
            let _this = this;
            window.sessionStorage.clear();//清除所有缓存
            // window.sessionStorage.removeItem("loginOrNot");
            // console.log(window.sessionStorage.getItem("loginOrNot"));
            _this.$router.push({ path: "/" });
        },
        //过滤记账表格的时间
        filterHandler(value, row, column) {
            const property = column['date'];
            return row[property] === value;
        },
        //导出记账表格数据
        exportAccount() {
         var wb = XLSX.utils.table_to_book(document.querySelector('.Account'))
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
     },
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
    }
};
</script>

<style>
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
