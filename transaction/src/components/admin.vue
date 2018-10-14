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
        }
    }
};
</script>

<style>

</style>
