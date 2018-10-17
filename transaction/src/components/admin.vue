<template>
    <div id="admin">
        <el-button-group>
            <el-button @click="exchange" round>交易页面</el-button>
            <el-button @click="kline" round>k线图</el-button>
            <el-button @click="statistics" round>数据分析</el-button>
            <el-button  round @click="quitLogin" class="quit">退出</el-button>
        </el-button-group>
    </div>
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
        //退出登录
        quitLogin(){
            let _this = this;
            window.sessionStorage.removeItem("loginOrNot");
            console.log(window.sessionStorage.getItem("loginOrNot"));
            _this.$router.push({ path: "/" });
        }
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
.quit{
    color: #606266;
}
</style>
