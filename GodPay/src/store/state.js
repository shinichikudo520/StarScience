//导出state对象
export default{
    //用户：
    isLogin:false,//验证是否为登陆状态  
    uid:"",//用户uid
    uphone:"",//用户手机号
    userInfo:{},//用户的基础信息
    //代理商：
    agentLogin:false,//代理商登录状态
    agentInfo:{},//代理商用户信息
    //超级管理员
    adminLogin:false,//超级管理员登录状态
    adminUser:"",//超级管理员账号
}