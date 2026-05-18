<script setup>
import { ref } from 'vue';

const emit = defineEmits(['enviar', 'escribir']);

const texto = ref('');

function enviar() {
    if (texto.value.trim()) {
        emit('enviar', texto.value.trim());
        texto.value = '';
    }
}

function alEscribir() {
    emit('escribir')
}
</script>


<template>
    <div class="input-bar">
        <input 
            type="text"
            v-model="texto"
            placeholder="Escribe algo..."
            @keydown="alEscribir"
            @keyup.enter="enviar"
        />
        <button @click="enviar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
        </button>
    </div>
</template>


<style scoped>
.input-bar {
    height: var(--alto-input);
    background-color: var(--color-fondo-header);
    display: flex;
    align-items: center;
    padding: 0 1rem;
    gap: 0.75rem;
    flex-shrink: 0;
}

input {
    flex: 1;
    background-color: var(--color-fondo-input);
    color: var(--color-texto-claro);
    padding: 0.6rem 1rem;
    border-radius: 9999px;
    font-size: 0.9rem;
}

input::placeholder {
    color: var(--color-texto-gris);
}

button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-primary);
    color: white;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background-color 0.15s;
}

button svg {
    width: 20px;
    height: 20px;
}

button:hover {
    background-color: var(--color-primary-dark);
}

@media (max-width: 768px) {
  .input-bar {
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
    /* Evita que el teclado virtual tape el input */
    position: sticky;
    bottom: 0;
  }

  input {
    font-size: 1rem; /* clave: evita el zoom automático de iOS */
    padding: 0.55rem 0.9rem;
  }

  button {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
  }

  button svg {
    width: 18px;
    height: 18px;
  }
}
</style>