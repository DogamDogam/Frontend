import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainBoard from '@/components/MainBoard'
import ViewPost from '@/components/ViewPost'
import DealingList from '@/components/DealingList'
import SaleList from '@/components/SaleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainBoard',
      component: MainBoard
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ViewPost',
      name: 'ViewPost',
      component: ViewPost
    },
    {
      path: '/DealingList',
      name: 'DealingList',
      component: DealingList
    },
    {
      path: '/SaleList',
      name: 'SaleList',
      component: SaleList
    }
  ]})
