<script setup>
defineProps({
    mensaje: Object,
    esMio: Boolean
});
</script>


<template>
    <div v-if="mensaje.tipo === 'sistema'" class="mensaje-sistema">
        {{ mensaje.texto }}
    </div>

    <div v-else class="mensaje-wrapper" :class="esMio ? 'derecha' : 'izquierda'">
        <img v-if="!esMio" :src="mensaje.avatar" class="avatar">

        <div class="burbuja" :class="esMio ? 'burbuja-propia' : 'burbuja-ajena'">
            <span v-if="!esMio" class="nombre">{{ mensaje.nombre }}</span>
            <p class="texto">{{ mensaje.texto }}</p>
        </div>
    </div>
</template>


<style scoped>
/* Mensaje de sistema: centrado y discreto */
.mensaje-sistema {
    text-align: center;
    font-size: 0.75rem;
    color: var(--color-texto-gris);
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    align-self: center;
    margin: 0.25rem 0;
}

/* Wrapper de cada mensaje: controla si va a izquierda o derecha */
.mensaje-wrapper {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    animation: fadeInUp 0.2s ease;
    max-width: 70%;
}

.izquierda {
    align-self: flex-start;
}

.derecha {
    align-self: flex-end;
    flex-direction: row-reverse; /* avatar a la derecha si lo hubiera */
}

/* Avatar del que escribe */
.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: var(--color-fondo-input);
}

/* Burbuja base */
.burbuja {
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.13);
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.burbuja-propia {
    background-color: var(--color-burbuja-propia);
    color: var(--color-texto-oscuro);
    border-bottom-right-radius: 2px; /* detalle WhatsApp */
}

.burbuja-ajena {
    background-color: var(--color-burbuja-ajena);
    color: var(--color-texto-oscuro);
    border-bottom-left-radius: 2px; /* detalle WhatsApp */
}

/* Nombre encima del texto en mensajes ajenos */
.nombre {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-primary);
}

.texto {
    font-size: 0.9rem;
    line-height: 1.4;
}
</style>