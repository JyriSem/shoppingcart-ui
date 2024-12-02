import { createRouter, createWebHistory } from 'vue-router';
import ShoppingCart from '@/pages/ShoppingCart.vue'; // Import your home page component

const routes = [
    { path: '/', component: ShoppingCart },
    // other routes
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;