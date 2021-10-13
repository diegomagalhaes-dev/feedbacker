import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../views/Home/index.vue');

const Feedbacks = () => import('../views/Feedbacks/index.vue');

const Credencials = () => import('../views/Credencials/index.vue');

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feedbacks',
    name: 'Feedbacks',
    component: Feedbacks,
    // Neste meta, podemos definir informações que desejamos trafegar junto com a rota. Neste caso, definimos que a rota deve estar autenticada.
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/credencials',
    name: 'Credencials',
    component: Credencials,
    // Neste meta, podemos definir informações que desejamos trafegar junto com a rota. Neste caso, definimos que a rota deve estar autenticada.
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});
export default router;
