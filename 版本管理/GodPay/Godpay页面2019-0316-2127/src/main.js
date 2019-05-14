// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store/index'




Vue.prototype.axios= axios
Vue.prototype.qs = require('qs')
Vue.use(Vuex);
// Vue.use(VueJsonp)
Vue.use(MintUI)
Vue.use(ElementUI);
Vue.config.productionTip = false

axios.defaults.withCredentials = true;//跨域请求的全局凭证

const returnCitySN = window.returnCitySN;//获取外网IP的对象
// //console.log(returnCitySN);

// axios.defaults.baseURL = 'http://localhost:8080/'; //调试环境
//axios.defaults.baseURL = 'http://api.zxwyit.com/'; //开发环境
// axios.defaults.baseURL = 'http://bopinshangcheng.com:80'; //生产环境

// 全局 路由钩子函数
router.beforeEach((to,from,next)=>{
    //console.log(to);
    if(to.meta.Auth){//客户端需要登录状态
        if(store.state.isLogin){
            
            next();
        }else{
            router.push({ name: 'login' })
        }
    }else{//客户端不需要登录状态
        //console.log('客户端不需要登录状态',to.meta.Auth);
        if(to.meta.agentAuth){//代理商需要登录状态
            //console.log('代理商需要登录状态',to.meta.agentAuth);
            if(store.state.agentLogin){//代理商已登录
                next();
            }else{
                router.push({ name: 'agentLogin' })
            }
        }else{//代理商不需要登录状态
            //console.log('代理商不需要登录状态',to.meta.agentAuth);
            if(to.meta.adminAuth){//超级管理员需要登录状态
                //console.log('超级管理员需要登录状态',to.meta.adminAuth);
                if(store.state.adminLogin){//超级管理员已经登录
                    next();
                }else{//超级管理员没有登录
                    router.push({ name: 'adminLogin' })
                }
            }else{
                //console.log('超级管理员不需要登录状态',to.meta.adminAuth);
                next();
            }
        }
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
