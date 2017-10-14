import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Employees from '@/components/Employees'
import Skills from '@/components/Skills'

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/',
        redirect: '/home'
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
