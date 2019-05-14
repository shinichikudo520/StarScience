import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'//登录页面
import Statistics  from '@/components/statistics'//折线图，柱状图，交易对信息
import Exchange from '@/components/exchange'//交易操作，深度图，20档行情，实时成交
import kline from '@/components/kline'//k线图，MACD图
import admin from '@/components/admin'//k线图，MACD图




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
        path: '/admin',
        name: 'admin',
        component: admin
    },
    {
        path: '/Exchange',
        name: 'Exchange',
        component: Exchange
    },
    {
        path: '/Statistics',
        name: 'Statistics',
        component: Statistics
    },
    {
        path: '/kline',
        name: 'kline',
        component: kline
    }
  ]
})
