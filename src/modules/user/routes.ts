
export default [
    { path: '/register', component: () => import('./components/register.vue') },
    { path: '/login', component: () => import('./components/login.vue')},
    { path: '/system/roles', component: () => import('./components/role.form.vue')},
]