import App from './App'
import LandingPage from './components/marketing/LandingPage'
import About from './components/marketing/About'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'
import TestVariable from './components/marketing/TestVariable'


const routes =
    [
        {
            path: '/',
            name: 'home',
            component: LandingPage
        },
        {
            path: '/todo',
            name: 'app',
            component: App,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/login',
            name: 'login',
            props:true,
            component: Login,
            meta: {
                requiresVisitor: true,
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                requiresVisitor: true,
            }
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },
        {
            path: '/todos/:id',
            name: 'test-variables',
            component: TestVariable
        },
    ];

export default routes