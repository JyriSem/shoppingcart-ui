import { createRouter, createWebHistory } from 'vue-router';
import ShoppingCart from '@/pages/ShoppingCart.vue';

const routes = [
    { path: '/', component: ShoppingCart },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;