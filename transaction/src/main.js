// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import axios from 'axios'
import $ from 'jquery'



Vue.prototype.axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false


//全局配置axios
//axios.defaults.baseURL = ''; //调试环境
//axios.defaults.baseURL = ''; //生产环境
axios.defaults.baseURL = 'http://67.230.191.185:80/'; //开发环境
axios.defaults.withCredentials = true;



//设置一个全局数组接收所有计时器
Vue.prototype.timerCount = [];

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
//   beforeMount(){
//       let _this = this;
//     router.beforeEach((to, from, next) => {
//         for(let i = 0; i <= _this.timerCount.length; i++){
//             clearTimeout(_this.timerCount[i]);//清空容器的所有计时器
//         }
//         _this.timerCount.splice(0, _this.timerCount.length)//清空容器
//         next()
//     })
//   }
})
