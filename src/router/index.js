import Vue from 'vue'
import Router from 'vue-router'
import Ping from '@/components/Ping'
import Pong from '@/components/Pong'
import Home from '@/components/Home'
import Employees from '@/components/Employees'
import Skills from '@/components/Skills'

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/',
        redirect: '/ping'
    },
    {
        path: '/ping',
        component: Ping
    },
    {
        path: '/pong',
        component: Pong
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/employees',
        component: Employees
    },
    {
        path: '/skills',
        component: Skills
    }
    ]
})
