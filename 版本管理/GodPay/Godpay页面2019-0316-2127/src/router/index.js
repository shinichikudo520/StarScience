import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import forgetPwd from '@/components/forgetPwd'
import home from '@/components/home'
import right from '@/components/right'
import crowdfunding from '@/components/crowdfunding'
import shopping from '@/components/shopping'
import productDetails from '@/components/productDetails'
import payment from '@/components/payment'
import shoppingAddress from '@/components/shoppingAddress'
import addShoppingAddress from '@/components/addShoppingAddress'
import order from '@/components/order'
import share from '@/components/share'
import recharge from '@/components/recharge'
import accelerate from '@/components/accelerate'
import multiply from '@/components/multiply'
import walletAddress from '@/components/walletAddress'
import passwordSetting from '@/components/passwordSetting'
import updatepassword from '@/components/updatepassword'
import personCenter from '@/components/personCenter'









import adminLogin from '@/components/adminLogin'
import admin from '@/components/admin'
import openUp from '@/components/openUp'
import manageAgent from '@/components/manageAgent'
import agentApplyEMT from '@/components/agentApplyEMT'
import historyApply from '@/components/historyApply'
import userInfo from '@/components/userInfo'
import rightDetails from '@/components/rightDetails'
import crowdfundingDetails from '@/components/crowdfundingDetails'
import developDetails from '@/components/developDetails'//发展明细
import recommendDetails from '@/components/recommendDetails'//推荐明细
import risk from '@/components/risk'//推荐明细
import emtRight from '@/components/emtRight'
import emtCrowdfunding from '@/components/emtCrowdfunding'
import userDistribution from '@/components/userDistribution'
import manageRight from '@/components/manageRight'
import manageCrowdfunding from '@/components/manageCrowdfunding'
import auditWithdraw from '@/components/auditWithdraw'
import historyAudit from '@/components/historyAudit'




import agentLogin from '@/components/agentLogin'
import agentAdmin from '@/components/agentAdmin'
import agentHome from '@/components/agentHome'
import applyEMT from '@/components/applyEMT'
import transferAccount from '@/components/transferAccount'
import reviewApplication from '@/components/reviewApplication'
import applicationStatus from '@/components/applicationStatus'
import accountBook from '@/components/accountBook'


Vue.use(Router)





export default new Router({
  routes: [
    {//后台管理登陆页面
        path: '/adminLogin',
        name: 'adminLogin',
        component: adminLogin,
        meta:{
            adminAuth:false,//验证是否需要登陆状态，false不需要
        }
    },  
    {//后台管理
        path: '/admin',
        name: 'admin',
        component: admin,
        meta:{
            adminAuth:true,//验证是否需要登陆状态，false不需要
        },        
        children:[//1. 路由嵌套，声明children数组存储配置子路由
            {
                path:"/openUp",
                name: 'openUp',
                component:openUp,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/manageAgent",
                name: 'manageAgent',
                component:manageAgent,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/agentApplyEMT",
                name: 'agentApplyEMT',
                component:agentApplyEMT,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/historyApply",
                name: 'historyApply',
                component:historyApply,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/userInfo",
                name: 'userInfo',
                component:userInfo,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/rightDetails",
                name: 'rightDetails',
                component:rightDetails,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/crowdfundingDetails",
                name: 'crowdfundingDetails',
                component:crowdfundingDetails,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/developDetails",
                name: 'developDetails',
                component:developDetails,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/recommendDetails/:userPhone",
                name: 'recommendDetails',
                component:recommendDetails,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/risk",
                name: 'risk',
                component:risk,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/emtRight",
                name: 'emtRight',
                component:emtRight,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/emtCrowdfunding",
                name: 'emtCrowdfunding',
                component:emtCrowdfunding,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/userDistribution",
                name: 'userDistribution',
                component:userDistribution,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/manageRight",
                name: 'manageRight',
                component:manageRight,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/manageCrowdfunding",
                name: 'manageCrowdfunding',
                component:manageCrowdfunding,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/auditWithdraw",
                name: 'auditWithdraw',
                component:auditWithdraw,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
            {
                path:"/historyAudit",
                name: 'historyAudit',
                component:historyAudit,//3.引入子路由组件
                meta:{
                    adminAuth:true,//验证是否需要登陆状态，false不需要
                }, 
            },
        ],
        redirect:"/openUp",//需要默认某个子路由时，用redirect重定向父级路由的路径
    },  
    {//代理商管理登陆页面
        path: '/agentLogin',
        name: 'agentLogin',
        component: agentLogin,
        meta:{
            agentAuth:false,//验证是否需要登陆状态，false不需要
        }
    },   
    {//代理商后台管理
        path: '/agentAdmin',
        name: 'agentAdmin',
        component: agentAdmin,
        meta:{
            agentAuth:true,//验证是否需要登陆状态，false不需要
        },
        children:[//1. 路由嵌套，声明children数组存储配置子路由
            {
                path:"/agentHome",
                name: 'agentHome',
                component:agentHome,//3.引入子路由组件
                meta:{
                    agentAuth:true,//验证是否需要登陆状态，false不需要
                }
            },
            {
                path:"/applyEMT",
                name: 'applyEMT',
                component:applyEMT,//3.引入子路由组件
                meta:{
                    agentAuth:true,//验证是否需要登陆状态，false不需要
                }
            },
            {
                path:"/transferAccount",
                name: 'transferAccount',
                component:transferAccount,//3.引入子路由组件
                meta:{
                    agentAuth:true,//验证是否需要登陆状态，false不需要
                }
            },
            {
                path:"/reviewApplication",
                name: 'reviewApplication',
                component:reviewApplication,//3.引入子路由组件
                meta:{
                    agentAuth:true,//验证是否需要登陆状态，false不需要
                }
            },
            {
                path:"/applicationStatus",
                name: 'applicationStatus',
                component:applicationStatus,//3.引入子路由组件
                meta:{
                    agentAuth:true,//验证是否需要登陆状态，false不需要
                }
            },
            {
                path:"/accountBook",
                name: 'accountBook',
                component:accountBook,//3.引入子路由组件
                meta:{
                    agentAuth:true,//验证是否需要登陆状态，false不需要
                }
            }
        ],
        redirect:"/agentHome",//需要默认某个子路由时，用redirect重定向父级路由的路径
    },


    {//登录
      path: '/',
      name: 'login',
      component: login,
      meta:{
            Auth:false,//验证是否需要登陆状态，false不需要
        }
    },
    {//注册
        path: '/register',
        name: 'register',
        component: register,
        meta:{
            Auth:false,//验证是否需要登陆状态，false不需要
        }
    },
    {//忘记密码
        path: '/forgetPwd',
        name: 'forgetPwd',
        component: forgetPwd,
        meta:{
            Auth:false,//验证是否需要登陆状态，false不需要
        }
    },
    {//首页
        path: '/home',
        name: 'home',
        component: home,
        meta:{
            Auth:false,//验证是否需要登陆状态，false不需要
        }
    },
    {//认权
        path: '/right/:sort',
        name: 'right',
        component: right,
        meta:{
            Auth:false,//验证是否需要登陆状态，false不需要
        }
    },
    {//众筹
        path: '/crowdfunding/:kind',
        name: 'crowdfunding',
        component: crowdfunding,
        meta:{
            Auth:false,//验证是否需要登陆状态，false不需要
        }
    },
    {//商品
        path: '/shopping',
        name: 'shopping',
        component: shopping,
        meta:{
            Auth:false,//验证是否需要登陆状态，false不需要
        }
    },
    {//商品详情
        path: '/productDetails/:productId',
        name: 'productDetails',
        component: productDetails,
        meta:{
            Auth:false,//验证是否需要登陆状态，false不需要
        }
    },
    {//商品地址
        path: '/shoppingAddress',
        name: 'shoppingAddress',
        component: shoppingAddress,
        meta:{
            Auth:true,//验证是否需要登陆状态，false不需要
        }
    },
    {//添加商品地址
        path: '/addShoppingAddress/:addressId',
        name: 'addShoppingAddress',
        component: addShoppingAddress,
        meta:{
            Auth:true,//验证是否需要登陆状态，false不需要
        }
    },
    {//商品结算
        path: '/payment/:productUid',
        name: 'payment',
        component: payment,
        meta:{
            Auth:true,//验证是否需要登陆状态，false不需要
        }
    },
    {//order
        path: '/order',
        name: 'order',
        component: order,
        meta:{
            Auth:true,//验证是否需要登陆状态，false不需要
        }
    },
    {//share
        path: '/share',
        name: 'share',
        component: share,
        meta:{
            Auth:true,//验证是否需要登陆状态，false不需要
        }
    },
    {//recharge:充值
        path: '/recharge',
        name: 'recharge',
        component: recharge,
        meta:{
            Auth:true,//验证是否需要登陆状态，false不需要
        }
    },
    //accelerate：加速
    {
        path: '/accelerate',
        name: 'accelerate',
        component: accelerate,
        meta:{
            Auth:true,//验证是否需要登陆状态，false不需要
        }
    },
    //multiply：倍化
    {
        path: '/multiply',
        name: 'multiply',
        component: multiply,
        meta:{
            Auth:true,//验证是否需要登陆状态，false不需要
        }
    },
    // walletAddress：绑定钱包地址
    {
        path: '/walletAddress',
        name: 'walletAddress',
        component: walletAddress,
        meta:{
            Auth:true,//验证是否需要登陆状态，false不需要
        }
    },
    //passwordSetting：
    {
        path: '/passwordSetting',
        name: 'passwordSetting',
        component: passwordSetting,
        meta:{
            Auth:true,//验证是否需要登陆状态，false不需要
        }
    },
    //updatepassword：更新密码
    {
        path: '/updatepassword/:pwdKind',
        name: 'updatepassword',
        component: updatepassword,
        meta:{
            Auth:true,//验证是否需要登陆状态，false不需要
        }
    },
    // 个人中心 personCenter
    {
        path: '/personCenter',
        name: 'personCenter',
        component: personCenter,
        meta:{
            Auth:true,//验证是否需要登陆状态，false不需要
        }
    },
  ]
})
