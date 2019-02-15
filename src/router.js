/* global Vue */

import Router from 'vue-router'
// 登录
import Login from '@/components/Login'
// 忘记密码
import ForgetPassword from '@/components/ForgetPassword'
// 提示信息 版本更新
import PromptNew from '@/components/PromptNew'
import PromptOld from '@/components/PromptOld'
// 主页
import App from '@/components/App'
// 首页
import Home from '@/components/dist/Home'
// 首页 --->  动亮小护士
import Nurse from '@/components/dist/children/Nurse'
// 记录
import Record from '@/components/dist/Record'
// 咨询
import Consultation from '@/components/dist/Consultation'
// 我的
import Mine from '@/components/dist/Mine'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      redirect: '/home',
      component: App,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/record',
          name: 'Record',
          component: Record
        },
        {
          path: '/consultation',
          name: 'Consultation',
          component: Consultation
        },
        {
          path: '/mine',
          name: 'Mine',
          component: Mine
        }
      ]
    },
    {
      path: '/nurse',
      name: 'Nurse',
      component: Nurse
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/promptNew',
      name: 'PromptNew',
      component: PromptNew
    },
    {
      path: '/promptOld',
      name: 'PromptOld',
      component: PromptOld
    }
  ]
})
// console.log(router)
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    if (localStorage.getItem('loginKey')) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router
