//导出mutations对象
export default{
    //登录状态
    IsLogin(state,obj){
        state.isLogin = true;//改为登录状态
        state.uid = obj.uid;//用户的uid
        state.uphone = obj.uphone;//用户手机号
    },
    //用户基础信息
    GetUserInfo(state,obj){
        state.userInfo = obj;//存储用户信息
    },
    //退出登录
    Exit(state){
        // Object.keys(state)
        state.isLogin = false;//未登录状态
        state.uid = "";//清空用户uid
        state.uphone = "";//清空用户手机
        state.userInfo = {};//清除用户信息
    },
    // //更新钱包地址
    // UpdateAddress(state,obj){
    //     state.userInfo.wallt_address = obj.address;//更新钱包地址
    // }
    //改变代理商手机号
    ChangeAgentPhone(state,obj){
        state.agentInfo.agent_phone = obj.agent_phone;//修改代理商用户手机号
    },
     //保存代理商信息
    SaveAgentInfo(state,obj){
        state.agentLogin = true;//保存代理商信息的同时改变代理商登录状态
        state.agentInfo = obj
    },
    //保存超级管理员账号
    AdminLogin(state,obj){
        state.adminLogin = true;//改变超级管理员的登录状态
        state.adminUser = obj.adminUser;//保存超级管理员账号
    },
    //退出超级管理员登录
    ExitLogin(state){
        state.adminLogin = false;//改变超级管理员的登录状态
        state.adminUser = "";//清除超级管理员账号
    },
    //退出代理商账户登录
    ExitAgentLogin(state){
        state.agentLogin = false;//改变代理商的登录状态
        state.agentInfo = {};//清空代理商信息
    }
}