<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import socket, { usuarioGlobal } from '../socket/socket';

const desplegado = ref(false);
const router = useRouter();

const props = defineProps({
    usuariosOnline: Array,
    nombre: String,
    avatarUrl: String,
    estado: String,
    sidebarAbierto: Boolean
});

const emit = defineEmits(['cerrar']);

function getColorEstado(estado) {
    if (estado === 'Disponible') return '#00a884';
    if (estado === 'Ocupado') return '#f59e0b';
    if (estado === 'No molestar') return '#ef4444';
    return '';
}

function cerrarSesion() {
    localStorage.removeItem('whatsapp_user');
    usuarioGlobal.value = { nombre: '', avatar: '', estado: '' };
    socket.disconnect();
    router.push({ name: 'login' });
}
</script>

<template>
    <div v-if="sidebarAbierto" class="overlay" @click="emit('cerrar')" />

    <div class="sidebar" :class="{ abierto: sidebarAbierto }">
        <div class="perfil">
            <img :src="avatarUrl" class="avatar" />
            <div class="perfil-info">
                <span class="perfil-nombre">{{ nombre }}</span>
                <span class="perfil-estado">
                    <svg width="8" height="8" viewBox="0 0 12 12">
                        <circle cx="6" cy="6" r="6" :fill="getColorEstado(estado)"/>
                    </svg>
                    {{ estado }}
                </span>
            </div>
            <button class="btn-logout" @click="cerrarSesion" title="Cerrar sesión">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zm-5 10H5V7h7V5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h7v-2z"/>
                </svg>
            </button>
        </div>

        <div class="chats">
            <div class="chat-item" @click="desplegado = !desplegado">
                <div class="chat-item-icono">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                </div>
                <div class="chat-item-info">
                    <span class="chat-item-nombre">Chat grupal</span>
                    <span class="chat-item-usuarios">{{ usuariosOnline.length }} usuarios en línea</span>
                </div>
                <svg class="flecha" :class="{ rotada: desplegado }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5z"/>
                </svg>
            </div>

            <div v-if="desplegado" class="lista-usuarios">
                <div v-for="usuario in usuariosOnline" :key="usuario.socketId" class="usuario-item">
                    <img :src="usuario.avatar" class="usuario-avatar" />
                    <div class="usuario-info">
                        <span class="usuario-nombre">{{ usuario.nombre }}</span>
                        <span class="usuario-estado">
                            <svg width="8" height="8" viewBox="0 0 12 12">
                                <circle cx="6" cy="6" r="6" :fill="getColorEstado(estado)"/>
                            </svg>
                            {{ usuario.estado }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    width: var(--ancho-sidebar);
    background-color: var(--color-fondo-sidebar);
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--color-borde);
    flex-shrink: 0;
}

.perfil {
    height: var(--alto-header);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0 1rem;
    background-color: var(--color-fondo-header);
    flex-shrink: 0;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-fondo-input);
    flex-shrink: 0;
    object-fit: cover;
}

.perfil-info {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.perfil-nombre {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-texto-claro);
}

.perfil-estado {
    font-size: 0.75rem;
    color: var(--color-texto-gris);
    display: flex;
    align-items: center;
    gap: 0.3rem;
}

.btn-logout {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: transparent;
    color: var(--color-texto-gris);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background-color 0.15s, color 0.15s;
}

.btn-logout svg {
    width: 20px;
    height: 20px;
}

.btn-logout:hover {
    background-color: #ef4444;
    color: white;
}

.chats {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
}

.chat-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.15s;
}

.chat-item:hover {
    background-color: var(--color-fondo-header);
}

.chat-item-icono {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: var(--color-fondo-input);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.chat-item-icono svg {
    width: 22px;
    height: 22px;
    color: var(--color-primary);
}

.chat-item-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.chat-item-nombre {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-texto-claro);
}

.chat-item-usuarios {
    font-size: 0.78rem;
    color: var(--color-texto-gris);
}

.flecha {
    width: 20px;
    height: 20px;
    color: var(--color-texto-gris);
    margin-left: auto;
    transition: transform 0.2s ease;
    flex-shrink: 0;
}

.flecha.rotada {
    transform: rotate(180deg);
}

.lista-usuarios {
    display: flex;
    flex-direction: column;
}

.usuario-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 1rem 0.6rem 1.5rem;
    transition: background-color 0.15s;
}

.usuario-item:hover {
    background-color: var(--color-fondo-header);
}

.usuario-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: var(--color-fondo-input);
    flex-shrink: 0;
    object-fit: cover;
}

.usuario-info {
    display: flex;
    flex-direction: column;
}

.usuario-nombre {
    font-size: 0.85rem;
    color: var(--color-texto-claro);
}

.usuario-estado {
    font-size: 0.72rem;
    color: var(--color-texto-gris);
}

.overlay {
    display: none;
}

@media (max-width: 768px) {
    .overlay {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 99;
        background: rgba(0, 0, 0, 0.4);
    }

    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 85%;
        max-width: 320px;
        height: 100dvh;
        z-index: 100;
        transform: translateX(-100%);
        transition: transform 0.25s ease;
        border-right: none;
    }

    .sidebar.abierto {
        transform: translateX(0);
    }
}
</style>