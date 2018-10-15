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
// axios.defaults.baseURL = 'http://67.230.191.185:8000/'; //开发环境
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
