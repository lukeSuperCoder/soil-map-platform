import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import UserManage from '../views/user/UserManage.vue'
import SoilElementQuery from '../views/soil/SoilElementQuery.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'user',
        name: 'UserManage',
        component: UserManage,
        meta: { requiresAuth: true }
      },
      {
        path: 'soil/element-query',
        name: 'SoilElementQuery',
        component: SoilElementQuery,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('isLogin')
  if (to.meta.requiresAuth && !isLogin) {
    next('/login')
  } else {
    next()
  }
})

export default router 