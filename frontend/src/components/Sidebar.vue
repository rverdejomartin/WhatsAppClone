<script setup>
import { ref, computed } from 'vue';

const desplegado = ref(false);
const props = defineProps({
    usuariosOnline: Array,
    nombre: String,
    avatarUrl: String,
    estado: String
});

const colorEstado = computed(() => {
    let color = '';
    if (props.estado === 'Disponible'){
        color = '#00a884';
    } else if (props.estado === 'Ocupado') {
        color = '#f59e0b';
    } else if (props.estado === 'No molestar') {
        color = '#ef4444';
    }
    return color;
})
</script>

<template>
    <div class="sidebar">

    <div class="perfil">
        <img :src="avatarUrl" class="avatar" />
        <div class="perfil-info">
            <span class="perfil-nombre">{{ nombre }}</span>
            <span class="perfil-estado">
                <svg width="8" height="8" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="6" :fill="colorEstado"/>
                </svg>
                {{ estado }}</span>
        </div>
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
                            <circle cx="6" cy="6" r="6" :fill="colorEstado"/>
                        </svg>
                        {{ usuario.estado }}</span>
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

/* Perfil */
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
}

.perfil-info {
    display: flex;
    flex-direction: column;
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

/* Lista de chats */
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
</style>