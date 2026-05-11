<script setup>
import ItemMensaje from './ItemMensaje.vue';

defineProps({
    mensajes: Array,
    miSocketId: String
});
</script>


<template>
    <div class="message-list">
        <ItemMensaje
            v-for="(mensaje, index) in mensajes"
            :key="index"
            :mensaje="mensaje"
            :esMio="mensaje.socketId === miSocketId"
        />
    </div>
</template>


<style scoped>
.message-list {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
</style>