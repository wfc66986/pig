import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const pages = x => () => import('@/pages/' + x + '/index.vue')

const constantRouterMap = [
    {
        path:'/login',
        component:pages('login')
    }
]

const router = new Router({
    mode: 'history',
    base: '/',
    routes:constantRouterMap
})

export default router