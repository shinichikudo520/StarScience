import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import statistics from '@/components/statistics'
import enterprise from '@/components/enterprise'
import congratulation from '@/components/congratulation'
import bgMusic from '@/components/bgMusic'

Vue.use(Router)

export default new Router({
    // mode:'history',
  routes: [
    //首页
    {
      path: '/',
      name: 'home',
      component: home
    },
    //统计
    {
        path: '/statistics',
        name: 'statistics',
        component: statistics
    },
    //企业信息
    {
        path: '/enterprise',
        name: 'enterprise',
        component: enterprise
    },
    //祝贺信息
    {
        path: '/congratulation',
        name: 'congratulation',
        component: congratulation
    },
    //音乐
    {
        path: '/bgMusic',
        name: 'bgMusic',
        component: bgMusic
    }
  ]
})
