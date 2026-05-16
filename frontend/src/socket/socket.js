import { io } from 'socket.io-client';
import { ref } from 'vue';

const usuarioGuardado = localStorage.getItem('whatsapp_user');

//cogemos los datos
export const usuarioGlobal = ref(usuarioGuardado ? JSON.parse(usuarioGuardado) : {
    nombre: '',
    avatar: '',
    estado: ''
})
export const usuariosOnlineGlobal = ref([]);

const socket = io('https://whatsappclone-myve.onrender.com', {
    autoConnect: false
});

socket.on('usuarios_online', (lista) => {
    usuariosOnlineGlobal.value = lista;
});

if (usuarioGuardado) {
    socket.connect();
    socket.emit('registro', JSON.parse(usuarioGuardado));
} //si hago F5, el connect de login se pierde, asiq este recupera en caso de localstorage

export default socket;