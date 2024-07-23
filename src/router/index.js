// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Settings from '@/views/settings/index.vue';
import Home from '@/views/home/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
