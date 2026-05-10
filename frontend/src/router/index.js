import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Chat from "../components/Chat.vue";

const routes = [
    { path: '/', name: 'login', component: Login },
    { path: '/chat/:nombre/:avatar', name: 'chat', component: Chat } //cambio sugerido por la IA necesario para que se actualice correctamente
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;