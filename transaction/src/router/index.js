import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Statistics  from '@/components/statistics'
import Exchange from '@/components/exchange'
import kline from '@/components/kline'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'kline',
      component: kline
    }
  ]
})
