import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainBoard from '@/components/MainBoard'
import ViewPost from '@/components/ViewPost'
import DealingList from '@/components/DealingList'
import LoginBoard from '@/components/LoginBoard'
import MyDealingList from '@/components/MyDealingList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainBoard',
      component: MainBoard,
      props: true
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
      component: DealingList,
      props: true
    },
    {
      path: '/MyDealingList',
      name: 'MyDealingList',
      component: MyDealingList,
      props: true
    },
    {
      path: '/LoginBoard',
      name: 'LoginBoard',
      component: LoginBoard,
      props: true
    }
  ]})
