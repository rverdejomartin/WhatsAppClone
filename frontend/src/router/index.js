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

export default router;