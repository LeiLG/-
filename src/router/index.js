import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Shopcar from '@/components/shopcar'
import Admin from '@/components/admin'
import Popvals from '@/components/popvals'
import Classify from '@/components/classify'
import Wages from '@/components/wages'
import Intquery from '@/components/intquery'
import Order from '@/components/order'
import Orderval from '@/components/orderval'
import Zhuce from '@/components/user/zhuce'
import Submi from '@/components/user/submi'
import Weatcher from '@/components/weatcher'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect:{name:'home'}
    },
    {
      path: '/home',
      name: 'home',
      component: Home,

    },{
    path:'/shopcar',
      name:'shopcar',
      component:Shopcar
    },{
      path:'/admin',
      name:'admin',
      component:Admin
    },{
      path:'/popvals',
      name:'popvals',
      component:Popvals,
      // meta: {
      //   keepAlive: true // 需要被缓存
      // }
    },{
      path:'/classify',
      name:'classify',
      component:Classify,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },{
      path:'/wages',
      name:'wages',
      component:Wages
    },{
      path:'/intquery',
      name:'intquery',
      component:Intquery
    }
    ,{
      path:'/order',
      name:'order',
      component:Order
    } ,{
      path:'/orderval',
      name:'orderval',
      component:Orderval
    } ,{
      path:'/zhuce',
      name:'zhuce',
      component:Zhuce
    },{
      path:'/submi',
      name:'submi',
      component:Submi
    },{
      path:'/weatcher',
      name:'weatcher',
      component:Weatcher
    }
  ]
})
