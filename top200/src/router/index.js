import Vue from 'vue'
import Router from 'vue-router'
import realTimeDate from '@/components/realTimeDate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'realTimeDate',
      component: realTimeDate
    }
  ]
})
