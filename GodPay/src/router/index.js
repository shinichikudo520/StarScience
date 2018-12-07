import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import rightToRecognize from '@/components/rightToRecognize'
import card from '@/components/card'
import artist from '@/components/artist'
import music from '@/components/music'
import crowdfunding from '@/components/crowdfunding'
import composer from '@/components/composer'
import single from '@/components/single'
import album from '@/components/album'
import information from '@/components/information'
import infoCrowd from '@/components/infoCrowd'
import infoEMT from '@/components/infoEMT'
import personCenter from '@/components/personCenter'
import updatePwd from '@/components/updatePwd'
import admin from '@/components/admin'
import agentAdmin from '@/components/agentAdmin'
import applyEMT from '@/components/applyEMT'

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
    {//music
        path: '/music',
        name: 'music',
        component: music
    },
    {//众筹
        path: '/crowdfunding',
        name: 'crowdfunding',
        component: crowdfunding
    },
    {//创作人
        path: '/composer',
        name: 'composer',
        component: composer
    },
    {//单曲
        path: '/single',
        name: 'single',
        component: single
    },
    {//专辑
        path: '/album',
        name: 'album',
        component: album
    },
    {//资讯
        path: '/information',
        name: 'information',
        component: information
    },
    {//资讯下的众筹
        path: '/infoCrowd',
        name: 'infoCrowd',
        component: infoCrowd
    },
    {//资讯下的emt
        path: '/infoEMT',
        name: 'infoEMT',
        component: infoEMT
    },
    {//个人中心
        path: '/personCenter',
        name: 'personCenter',
        component: personCenter
    },
    {//更改密码
        path: '/updatePwd',
        name: 'updatePwd',
        component: updatePwd
    },
    {//后台管理
        path: '/admin',
        name: 'admin',
        component: admin
    },
    {//代理商后台管理
        path: '/agentAdmin',
        name: 'agentAdmin',
        component: agentAdmin
    },
    {//申请EMT流程
        path: '/applyEMT',
        name: 'applyEMT',
        component: applyEMT
    },
  ]
})
