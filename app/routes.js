import Home from './components/Home.vue'
import Login from './components/Login.vue'
import BottomNav from './components/BottomNav.vue'
import CreateEvent from './components/CreateEvent.vue'
import Register from './components/Register.vue'



export const routes = {
    '/home': {
        component: Home,
        meta: {needsAuth: false}
    },
    '/login': {
        component: Login,
        meta: {needsAuth: false}
    },
    '/bottomnav': {
        component: BottomNav,
        meta: {needsAuth: true}
    },
    '/createevent': {
        component: CreateEvent,
        meta: {needsAuth: true}
    },
    '/register': {
        component: Register,
        meta: {needsAuth: false}
    },
}
