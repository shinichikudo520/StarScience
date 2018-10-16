<template>
    <el-button-group>
        <el-button @click="exchange">交易页面</el-button>
        <el-button @click="kline">k线图</el-button>
        <el-button @click="statistics">数据分析</el-button>
    </el-button-group>
</template>

<script>
export default {
    name: "admin",
    data() {
        return {
            
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
    },
    mounted(){
        let _this = this;
        // 判断：如果不是从登录页面过来，则让用户先登录
        // var urL=document.referrer;//获取页面跳转之前的网址
        // if(urL!="http://emt.emt.wiki/#/login"){
        //     this.$message({
        //         showClose: true,
        //         message: '亲，请先登录哦！',
        //         type: 'warning'
        //     });
        //     _this.$router.push({ path: "/login" });
        // }
    }
};
</script>

<style>

</style>
