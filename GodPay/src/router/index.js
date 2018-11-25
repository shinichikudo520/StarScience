import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import rightToRecognize from '@/components/rightToRecognize'
import card from '@/components/card'
import artist from '@/components/artist'

Vue.use(Router)

export default new Router({
  routes: [
    {//登录
      path: '/',
      name: 'login',
      component: login
    },
    {//注册
        path: '/register',
        name: 'register',
        component: register
    },
    {//认权
        path: '/rightToRecognize',
        name: 'rightToRecognize',
        component: rightToRecognize
    },
    {//Tide card
        path: '/card',
        name: 'card',
        component: card
    },
    {//artist
        path: '/artist',
        name: 'artist',
        component: artist
    },
  ]
})
