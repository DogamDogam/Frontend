// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ViewPost from './components/ViewPost'
import State from './components/State'
import WritePost from './components/WritePost'
import PostList from './components/PostList'
import PostBox from './components/PostBox'
import CommentBoard from './components/CommentBoard'
import SaleList from './components/SaleList'
import PurchaseList from './components/PurchaseList'
import LikeList from './components/LikeList'

Vue.config.productionTip = false

Vue.component('view-post', ViewPost)
Vue.component('state', State)
Vue.component('write-post', WritePost)
Vue.component('post-list', PostList)
Vue.component('post-box', PostBox)
Vue.component('comment-board', CommentBoard)
Vue.component('sale-list', SaleList)
Vue.component('purchase-list', PurchaseList)
Vue.component('like-list', LikeList)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
