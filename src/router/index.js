import Vue from 'vue'
import Router from 'vue-router'
import Ping from '@/components/Ping'
import Pong from '@/components/Pong'

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/',
        component: Ping
    },
    {
        path: '/ping',
        component: Ping
    },
    {
        path: '/pong',
        component: Pong
    }
    ]
})
