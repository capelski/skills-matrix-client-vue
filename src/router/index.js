import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Employees from '@/components/Employees'
import Skills from '@/components/Skills'
import EmployeeDetails from '@/components/EmployeeDetails'
import SkillDetails from '@/components/SkillDetails'

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
    },
    {
        path: '/employee/:id',
        component: EmployeeDetails
    },
    {
        path: '/employee/edit/:id',
        component: EmployeeDetails
    },
    {
        path: '/skill/:id',
        component: SkillDetails
    },
    {
        path: '/skill/edit/:id',
        component: SkillDetails
    }
    ]
})
