<script setup>
defineProps({
    usuariosOnline: Number,
    nombre: String,
    avatarUrl: String
});
</script>

<template>
    <div class="sidebar">

        <div class="perfil">
            <img :src="avatarUrl" class="avatar" />
            <div class="perfil-info">
                <span class="perfil-nombre">{{ nombre }}</span>
                <span class="perfil-estado">En línea</span>
            </div>
        </div>

        <div class="chats">
            <div class="chat-item">
                <div class="chat-item-icono">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                </div>
                <div class="chat-item-info">
                    <span class="chat-item-nombre">Chat grupal</span>
                    <span class="chat-item-usuarios">{{ usuariosOnline }} usuarios en línea</span>
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
    color: var(--color-primary);
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
</style>