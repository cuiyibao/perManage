import Vue from 'vue'
import Router from 'vue-router'
import Message from '@/pages/message'
// import sqlManage from '@/pages/sqlManage'

Vue.use(Router)

export const router = [
  {
    path: '/',
    name: 'Message',
    title: '信息管理',
    component: Message
  },
  // {
  //   path: '/sqlManage',
  //   name: 'sqlManage',
  //   title: '数据管理',
  //   component: sqlManage
  // }
]

export default new Router({
  routes: router
})
