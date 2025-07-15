import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/salas',
                    name: 'salasList',
                    component: () => import('@/views/SalasLista.vue')
                },
                {
                    path: '/salas/registro',
                    name: 'salasRegister',
                    component: () => import('@/views/SalaRegistro.vue')
                }
            ]
        }
    ]
});

export default router;
