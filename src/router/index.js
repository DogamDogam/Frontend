import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainBoard from '@/components/MainBoard'
import ViewPost from '@/components/ViewPost'
import WritePost from '@/components/WritePost'

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
      path: '/WritePost',
      name: 'WritePost',
      component: WritePost
    }
  ]})
