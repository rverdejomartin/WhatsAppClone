import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Chat from "../components/Chat.vue";

const routes = [
    { path: '/', name: 'login', component: Login },
    { path: '/chat', name: 'chat', component: Chat }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const usuarioEnLocal = localStorage.getItem('whatsapp_user');

  if (to.path === '/chat' && !usuarioEnLocal) {
    return '/';
  }
  if (to.path === '/' && usuarioEnLocal) {
    return '/chat'
  }
});

export default router;