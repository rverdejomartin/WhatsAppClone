<script setup>
import { ref } from 'vue';
import ItemMensaje from './ItemMensaje.vue';

defineProps({
    mensajes: Array,
    miSocketId: String
});

const lista = ref(null);
const mostrarFlecha = ref(false);

function alHacerScroll() {
    const el = lista.value;
    const distanciaAlFondo = el.scrollHeight - el.scrollTop - el.clientHeight;
    mostrarFlecha.value = distanciaAlFondo > 100;
}

function irAlFondo() {
    lista.value.scrollTo({ top: lista.value.scrollHeight, behavior: 'smooth' });
}
</script>

<template>
    <div class="contenedor">
        <div class="message-list" ref="lista" @scroll="alHacerScroll">
            <ItemMensaje
                v-for="(mensaje, index) in mensajes"
                :key="index"
                :mensaje="mensaje"
                :esMio="mensaje.socketId === miSocketId"
            />
        </div>

        <button v-if="mostrarFlecha" class="flecha-abajo" @click="irAlFondo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 16l-6-6h12z"/>
            </svg>
        </button>
    </div>
</template>

<style scoped>
.contenedor {
    flex: 1;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.message-list {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.flecha-abajo {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-fondo-header);
    color: var(--color-texto-claro);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.15s;
}

.flecha-abajo:hover {
    background-color: var(--color-primary);
    color: white;
}

.flecha-abajo svg {
    width: 20px;
    height: 20px;
}
</style>