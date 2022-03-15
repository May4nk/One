import { createRouter, createWebHistory } from 'vue-router'; 
import Create from '../components/create.vue';
import Home from '../components/home.vue';
import Events from '../components/events.vue';
import Space from '../components/space.vue';
import Navbar from '../components/navbar.vue';
import Login from '../components/login.vue';
import Signup from '../components/signup.vue';
import CreatePost from '../components/create_post.vue';

const routes = [
    {
        path: '/po',
        name: 'CreatePost',
        component: CreatePost
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    { 
        path: '/',
        name: 'Navbar',
        component: Navbar,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home
            },
            {
                path: 'create',
                name: 'Create',
                component: Create
            },
            {
                path: 'events',
                name: 'Events',
                component: Events
            },
            {
                path: 'events',
                name: 'Events',
                component: Events,
            },
            {
                path: 'space',
                name: 'Space',
                component: Space
            }
       ]
    }
]

const router = createRouter({ history: createWebHistory(), routes });
export default router;
