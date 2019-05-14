//导出actions对象
export default{
    //缓存登录状态
    isLogin({commit},obj){
        commit('IsLogin',obj);
    },
    //获取用户基础信息
    getUserInfo({commit},res){
        commit('GetUserInfo',res);
    },
    //退出用户登录
    exit({commit}){
        commit('Exit');
    },
    // //更新钱包地址
    // updateAddress({commit},address){
    //     commit('UpdateAddress',{address});
    // }
    //改变代理商的手机号
    changeAgentPhone({commit},agent_phone){
        commit('ChangeAgentPhone',{agent_phone});
    },
    //保存代理商信息
    saveAgentInfo({commit},obj){
        commit('SaveAgentInfo',obj);
    },
    //保存超级管理员账号
    amdinLogin({commit},adminUser){
        commit('AdminLogin',{adminUser});
    },
    //退出超级管理员登录
    exitLogin({commit}){
        commit('ExitLogin');
    },
    //退出代理商账户登录
    exitAgentLogin({commit}){
        commit('ExitAgentLogin');
    }
    
}