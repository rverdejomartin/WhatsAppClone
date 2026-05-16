<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import socket, { usuarioGlobal } from '../socket/socket';

const router = useRouter();

//variables de ayuda
const nombre = ref('');
const avatarElegido = ref(null);
const error = ref('');
const estadoElegido = ref('Disponible');
const estados = [
  { valor: 'Disponible', color: '#00a884' },
  { valor: 'Ocupado', color: '##f59e0b' },
  { valor: 'No molestar', color: '#ef4444' }
];

const avatares = [
    '/img/caballopfp.jpg',
    '/img/finoseñores.jpg',
    '/img/gatochadpfp.jpg',
    '/img/gatopfp1.jpg',
    '/img/sahur.jpg',
];

function entrar() {
  if (nombre.value.trim() && avatarElegido.value !== null) {
    //guardamos los datos en el ref
    const datosUsuario = {
      nombre: nombre.value.trim(),
      avatar: avatares[avatarElegido.value],
      estado: estadoElegido.value
    };
    usuarioGlobal.value = datosUsuario;
    localStorage.setItem('whatsapp_user', JSON.stringify(datosUsuario))
    //se emite el registro al server y se conecta
    socket.connect();
    socket.emit('registro', datosUsuario);

      //navegamos con el router
      router.push({name: 'chat'});
    } else
        error.value = 'Faltan parametros para el registro.';
}
</script>


<template>
    <div class="login-page">
        <div class="login-card">
            <h1>WhatsApp Dude?</h1>
            <p class="subtitulo">Elija su nombre y avatar para continuar</p>

            <!--input para el nombre-->
            <div class="campo">
                <label>Tu nombre</label>
                <input
                    v-model="nombre"
                    type="text"
                    placeholder="Raúl"
                    maxlength="15"
                />
            </div>

            <!--selección del avatar-->
            <div class="campo">
                <label>Tu avatar</label>
                <div class="avatares">
                    <img
                        v-for="(avatar,index) in avatares"
                        :key="avatar"
                        :src="avatar"
                        :class="['avatar', {seleccionado: avatarElegido === index}]"
                        @click="avatarElegido = index"
                    />
                    <!--el img :class nos agrega la classe de manera condicional para los estilos-->
                </div>
            </div>
            <div class="campo">
              <label>Tu estado</label>
              <div class="estados">
                <button
                  v-for="estado in estados"
                  :key="estado.valor"
                  :class="['estado-btn', {seleccionado: estadoElegido === estado.valor}]"
                  @click="estadoElegido = estado.valor"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="6" :fill="estado.color"/>
                  </svg>
                  {{ estado.valor }}
                </button>
              </div>
            </div>

            <p v-if="error" class="error">{{ error }}</p>

            <button class="btn-entrar" @click="entrar">Entrar al chat</button>
        </div>
    </div>
</template>


<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-fondo-app);
}
 
.login-card {
  background-color: var(--color-fondo-header);
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
 
h1 {
  font-size: 1.5rem;
  color: var(--color-primary);
  text-align: center;
}
 
.subtitulo {
  color: var(--color-texto-gris);
  font-size: 0.85rem;
  text-align: center;
  margin-top: -1rem;
}
 
.campo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
 
.campo label {
  font-size: 0.85rem;
  color: var(--color-texto-gris);
}
 
.campo input {
  background-color: var(--color-fondo-input);
  color: var(--color-texto-claro);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
}
 
.avatares {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}
 
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid transparent;
  transition: border-color 0.15s, transform 0.15s;
  background-color: var(--color-fondo-input);
}
 
.avatar.seleccionado {
  border-color: var(--color-primary);
  transform: scale(1.1);
}
 
.error {
  color: #f87171;
  font-size: 0.82rem;
  text-align: center;
}
 
.btn-entrar {
  background-color: var(--color-primary);
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.15s;
}
 
.btn-entrar:hover {
  background-color: var(--color-primary-dark);
}

.estados {
    display: flex;
    gap: 0.5rem;
}

.estado-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    background-color: var(--color-fondo-input);
    color: var(--color-texto-gris);
    font-size: 0.85rem;
    transition: background-color 0.15s, color 0.15s;
}

.estado-btn.seleccionado {
    background-color: var(--color-primary);
    color: white;
}
</style>