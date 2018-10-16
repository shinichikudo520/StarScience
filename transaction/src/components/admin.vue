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
    //在创建组件进入组件页面前判断是否登录
    beforeRouteEnter(to,from,next){
        // 判断：是否登录成功，，没有则让用户先登录
        let loginOrNot = window.sessionStorage.getItem("loginOrNot");
        if(loginOrNot!="true"){
            next({
                path:"/"
            })
        }
    }
};
</script>

<style>

</style>
