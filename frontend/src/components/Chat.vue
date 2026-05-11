<script setup>
import { ref } from 'vue';
import socket from '../socket/socket';

//componentes
import ListaMensajes from './ListaMensajes.vue';
import InputMensaje from './InputMensaje.vue';
import Sidebar from './Sidebar.vue';

//las props que traemos del router
const props = defineProps({
    nombre: String,
    avatar: String
});

//mismo array de imagenes que en el login
const avatares = [
    'https://api.dicebear.com/7.x/thumbs/svg?seed=Felix',
    'https://api.dicebear.com/7.x/thumbs/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/thumbs/svg?seed=Luna',
    'https://api.dicebear.com/7.x/thumbs/svg?seed=Rocky',
    'https://api.dicebear.com/7.x/thumbs/svg?seed=Milo',
];

//obtener de nuevo la url del svg del usuario
const avatarUrl = avatares[Number(props.avatar)];

const mensajes = ref([]);
const usuariosOnline = ref(0);
const quienEscribe = ref('');
let timerEsribiendo = null;

//eventos del socket
socket.on('nuevo_mensaje', (datos) => {
    mensajes.value.push(datos);
});
socket.on('usuarios_online', (cantidad) => {
    usuariosOnline.value = cantidad;
});
socket.on('usuario_escribiendo', (nombre) => {
    quienEscribe.value = nombre;
    clearTimeout(timerEsribiendo);
    timerEsribiendo = setTimeout(() => {
        quienEscribe.value = '';
    }, 2000);
});

//funciones
function enviarMensaje(texto) {
    mensajes.value.push({
        tipo: 'mensaje',
        socketId: socket.id,
        nombre: props.nombre,
        avatar: avatarUrl,
        texto: texto
    });

    socket.emit('mensaje', {
        nombre: props.nombre,
        avatar: avatarUrl,
        texto: texto
    })
}

function escribiendo() {
    socket.emit('escribiendo', props.nombre);
}
</script>


<template>
    <div class="chat-layout">
        <Sidebar
            :usuariosOnline="usuariosOnline"
            :nombre="nombre"
            :avatarUrl="avatarUrl"
        />

        <div class="chat-main">
            <div class="chat-header">
                <span class="chat-titulo">Chat grupal</span>
                <span class="chat-online">{{ usuariosOnline }} en línea</span>
            </div>

            <ListaMensajes
                :mensajes="mensajes"
                :miSocketId="socket.id"
            />

            <div class="escribiendo" :class="{visible: quienEscribe}">
                <span>{{ quienEscribe }} está escribiendo...</span>
            </div>

            <InputMensaje
                @enviar="enviarMensaje"
                @escribir="escribiendo"
            />
        </div>
    </div>
</template>


<style scoped>
.chat-layout {
    display: flex;
    height: 100vh;
}

.chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: var(--color-fondo-chat);
}

.chat-header {
    height: var(--alto-header);
    background-color: var(--color-fondo-header);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    flex-shrink: 0;
}

.chat-titulo {
    font-weight: 600;
    color: var(--color-texto-claro);
    font-size: 1rem;
}

.chat-online {
    font-size: 0.8rem;
    color: var(--color-primary);
}

.escribiendo {
    height: 0;
    overflow: hidden;
    background-color: var(--color-fondo-chat);
    padding: 0 1rem;
    font-size: 0.8rem;
    color: var(--color-primary);
    transition: height 0.2s ease, padding 0.2s ease;
    flex-shrink: 0;
}

.escribiendo.visible {
    height: 28px;
    padding: 0.3rem 1rem;
}
</style>